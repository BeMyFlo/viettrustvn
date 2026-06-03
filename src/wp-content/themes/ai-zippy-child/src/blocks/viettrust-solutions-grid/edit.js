import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, Button, TextControl, TextareaControl } from "@wordpress/components";
import { useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
	const { title, solutions = [] } = attributes;
	const [activeIndex, setActiveIndex] = useState(0);

	const blockProps = useBlockProps({ className: "v-solutions-grid" });

	const updateSolution = (index, key, value) => {
		const newSols = [...solutions];
		newSols[index] = { ...newSols[index], [key]: value };
		setAttributes({ solutions: newSols });
	};

	const addSolution = () => {
		const newSols = [
			...solutions,
			{
				title: "Giải pháp mới",
				description: "Mô tả chi tiết giải pháp con...",
				imageUrl: "",
				imageId: 0
			}
		];
		setAttributes({ solutions: newSols });
		setActiveIndex(newSols.length - 1);
	};

	const removeSolution = (index) => {
		if (solutions.length <= 1) return;
		const newSols = solutions.filter((_, i) => i !== index);
		setAttributes({ solutions: newSols });
		setActiveIndex(Math.max(0, index - 1));
	};

	const currentSol = solutions[activeIndex] || {};

	return (
		<>
			<InspectorControls>
				{currentSol && (
					<PanelBody title={`Cài đặt Giải pháp: ${currentSol.title || "Không tên"}`} initialOpen={true}>
						<div style={{ marginBottom: 15 }}>
							<label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Ảnh đại diện</label>
							<MediaUpload
								onSelect={(media) => updateSolution(activeIndex, "imageUrl", media.url)}
								allowedTypes={["image"]}
								value={currentSol.imageId}
								render={({ open }) => (
									<div>
										{currentSol.imageUrl && (
											<img
												src={currentSol.imageUrl}
												alt="Solution Preview"
												style={{ width: "100%", maxHeight: 120, objectFit: "cover", display: "block", marginBottom: 8, borderRadius: 8 }}
											/>
										)}
										<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
											{currentSol.imageUrl ? "Thay đổi hình ảnh" : "Chọn hình ảnh"}
										</Button>
									</div>
								)}
							/>
						</div>

						<TextControl
							label="Tiêu đề giải pháp"
							value={currentSol.title || ""}
							onChange={(val) => updateSolution(activeIndex, "title", val)}
						/>

						<TextareaControl
							label="Mô tả giải pháp"
							value={currentSol.description || ""}
							onChange={(val) => updateSolution(activeIndex, "description", val)}
							rows={4}
						/>
					</PanelBody>
				)}

				<PanelBody title="Danh sách các giải pháp" initialOpen={true}>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
						{solutions.map((item, index) => (
							<Button
								key={index}
								variant={activeIndex === index ? "primary" : "secondary"}
								onClick={() => setActiveIndex(index)}
								style={{ fontSize: 11, padding: "4px 8px" }}
							>
								{item.title || `Giải pháp ${index + 1}`}
							</Button>
						))}
					</div>
					<Button variant="secondary" onClick={addSolution} style={{ marginRight: 8 }}>
						+ Thêm giải pháp
					</Button>
					{solutions.length > 1 && (
						<Button variant="link" isDestructive onClick={() => removeSolution(activeIndex)}>
							Xoá giải pháp hiện tại
						</Button>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-solutions-grid__container">
					<div className="v-solutions-grid__header">
						<RichText
							tagName="h2"
							className="v-solutions-grid__title"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder="GIẢI PHÁP CỦA CHÚNG TÔI"
						/>
					</div>

					<div className="v-solutions-grid__items">
						{solutions.map((item, index) => {
							const isActive = index === activeIndex;
							return (
								<div
									key={index}
									className={`v-solutions-grid__card ${isActive ? "is-editing" : ""}`}
									onClick={(e) => {
										e.stopPropagation();
										setActiveIndex(index);
									}}
									role="button"
									tabIndex={0}
								>
									<div className="v-solutions-grid__image-wrap">
										{item.imageUrl ? (
											<img src={item.imageUrl} alt="" className="v-solutions-grid__image" />
										) : (
											<div className="v-solutions-grid__placeholder" style={{ background: "#cbd5e1", height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
												<span>Chọn ảnh trong sidebar</span>
											</div>
										)}
									</div>
									<div className="v-solutions-grid__body">
										<RichText
											tagName="h3"
											className="v-solutions-grid__card-title"
											value={item.title || ""}
											onChange={(val) => updateSolution(index, "title", val)}
											placeholder="Nhập tiêu đề giải pháp..."
										/>
										<p className="v-solutions-grid__card-desc">
											{item.description || "Nhập mô tả chi tiết giải pháp..."}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
