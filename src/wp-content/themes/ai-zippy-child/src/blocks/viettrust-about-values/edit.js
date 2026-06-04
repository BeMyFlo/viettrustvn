import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";
import { useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
	const { title, items = [] } = attributes;
	const [activeIndex, setActiveIndex] = useState(0);

	const blockProps = useBlockProps({ className: "v-about-values" });

	const updateItem = (index, key, value) => {
		const newItems = [...items];
		newItems[index] = { ...newItems[index], [key]: value };
		setAttributes({ items: newItems });
	};

	const currentItem = items[activeIndex] || {};

	return (
		<>
			<InspectorControls>
				{currentItem && (
					<PanelBody title={`Cài đặt Mục: ${currentItem.title || "Không tên"}`} initialOpen={true}>
						<div style={{ marginBottom: 15 }}>
							<label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Icon / Hình ảnh</label>
							<MediaUpload
								onSelect={(media) => updateItem(activeIndex, "imageUrl", media.url)}
								allowedTypes={["image"]}
								value={currentItem.imageId}
								render={({ open }) => (
									<div>
										{currentItem.imageUrl && (
											<img
												src={currentItem.imageUrl}
												alt="Value Preview"
												style={{ width: "100%", maxHeight: 120, objectFit: "contain", background: "#102b5c", padding: 10, display: "block", marginBottom: 8, borderRadius: 8 }}
											/>
										)}
										<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
											{currentItem.imageUrl ? "Thay đổi hình ảnh" : "Chọn hình ảnh"}
										</Button>
									</div>
								)}
							/>
						</div>
					</PanelBody>
				)}

				<PanelBody title="Chọn mục chỉnh sửa" initialOpen={true}>
					<div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
						{items.map((item, index) => (
							<Button
								key={index}
								variant={activeIndex === index ? "primary" : "secondary"}
								onClick={() => setActiveIndex(index)}
							>
								{item.title || `Mục ${index + 1}`}
							</Button>
						))}
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-about-values__container">
					<div className="v-about-values__header">
						<RichText
							tagName="h2"
							className="v-about-values__title"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder="Sứ mệnh - Tầm nhìn - Giá trị cốt lõi"
						/>
					</div>

					<div className="v-about-values__items">
						{items.map((item, index) => {
							const isActive = index === activeIndex;
							return (
								<div
									key={index}
									className={`v-about-values__card ${isActive ? "is-editing" : ""}`}
									onClick={(e) => {
										e.stopPropagation();
										setActiveIndex(index);
									}}
									role="button"
									tabIndex={0}
								>
									<div className="v-about-values__icon-wrap">
										{item.imageUrl ? (
											<img src={item.imageUrl} alt="" className="v-about-values__icon" />
										) : (
											<div className="v-about-values__placeholder-icon" style={{ width: 64, height: 64, background: "#cbd5e1", borderRadius: "50%" }}></div>
										)}
									</div>
									<div className="v-about-values__body">
										<RichText
											tagName="h3"
											className="v-about-values__card-title"
											value={item.title || ""}
											onChange={(val) => updateItem(index, "title", val)}
											placeholder="Nhập tiêu đề..."
										/>
										<RichText
											tagName="p"
											className="v-about-values__card-desc"
											value={item.description || ""}
											onChange={(val) => updateItem(index, "description", val)}
											placeholder="Nhập mô tả chi tiết..."
										/>
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
