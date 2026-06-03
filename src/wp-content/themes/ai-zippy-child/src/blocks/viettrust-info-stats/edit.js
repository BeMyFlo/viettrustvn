import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";
import { useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
	const { stats = [] } = attributes;
	const [activeItemIndex, setActiveItemIndex] = useState(0);

	const blockProps = useBlockProps({ className: "v-stats" });

	const updateStat = (index, key, value) => {
		const newStats = [...stats];
		newStats[index] = { ...newStats[index], [key]: value };
		setAttributes({ stats: newStats });
	};

	const addStat = () => {
		const newStats = [
			...stats,
			{
				number: "100+",
				labelVi: "Dự Án Thành Công",
				labelEn: "SUCCESS PROJECTS",
				iconUrl: "",
				iconId: 0,
			},
		];
		setAttributes({ stats: newStats });
		setActiveItemIndex(newStats.length - 1);
	};

	const removeStat = (index) => {
		if (stats.length <= 1) return;
		const newStats = stats.filter((_, i) => i !== index);
		setAttributes({ stats: newStats });
		setActiveItemIndex(Math.max(0, index - 1));
	};

	const currentItem = stats[activeItemIndex] || {};

	return (
		<>
			<InspectorControls>
				{currentItem && (
					<PanelBody title={`Cài đặt Stat Item ${activeItemIndex + 1}`} initialOpen={true}>
						<div style={{ marginBottom: 15 }}>
							<label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Icon hiển thị (PNG/SVG)</label>
							<MediaUpload
								onSelect={(media) => updateStat(activeItemIndex, "iconUrl", media.url)}
								allowedTypes={["image"]}
								value={currentItem.iconId}
								render={({ open }) => (
									<div>
										{currentItem.iconUrl && (
											<img
												src={currentItem.iconUrl}
												alt="Stat Icon Preview"
												style={{ width: 50, height: 50, objectFit: "contain", display: "block", marginBottom: 8, background: "#102b5c", padding: 6, borderRadius: 6 }}
											/>
										)}
										<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
											{currentItem.iconUrl ? "Thay đổi Icon" : "Chọn Icon"}
										</Button>
									</div>
								)}
							/>
						</div>
					</PanelBody>
				)}

				<PanelBody title="Quản lý danh sách Thống kê" initialOpen={true}>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
						{stats.map((item, index) => (
							<Button
								key={index}
								variant={activeItemIndex === index ? "primary" : "secondary"}
								onClick={() => setActiveItemIndex(index)}
								style={{ fontSize: 11, padding: "4px 8px" }}
							>
								{item.number || `Item ${index + 1}`}
							</Button>
						))}
					</div>
					<Button variant="secondary" onClick={addStat} style={{ marginRight: 8 }}>
						+ Thêm thống kê
					</Button>
					{stats.length > 1 && (
						<Button variant="link" isDestructive onClick={() => removeStat(activeItemIndex)}>
							Xoá hiện tại
						</Button>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-stats__grid">
					{stats.map((item, index) => {
						const isActive = index === activeItemIndex;
						return (
							<div
								key={index}
								className={`v-stats__col ${isActive ? "is-editing" : ""}`}
								onClick={(e) => {
									e.stopPropagation();
									setActiveItemIndex(index);
								}}
								role="button"
								tabIndex={0}
							>
								<div className="v-stats__icon-wrap">
									{item.iconUrl ? (
										<img className="v-stats__icon" src={item.iconUrl} alt="" />
									) : (
										// Fallback Stat Icon
										<svg className="v-stats__icon-fallback" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
										</svg>
									)}
								</div>

								<div className="v-stats__content">
									<RichText
										tagName="div"
										className="v-stats__number"
										value={item.number || ""}
										onChange={(val) => updateStat(index, "number", val)}
										placeholder="Số..."
									/>
									<RichText
										tagName="div"
										className="v-stats__label-vi"
										value={item.labelVi || ""}
										onChange={(val) => updateStat(index, "labelVi", val)}
										placeholder="Nhãn Tiếng Việt..."
									/>
									<RichText
										tagName="div"
										className="v-stats__label-en"
										value={item.labelEn || ""}
										onChange={(val) => updateStat(index, "labelEn", val)}
										placeholder="Nhãn Tiếng Anh..."
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
