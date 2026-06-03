import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { title, description, highlightText, btnText, btnUrl, imageUrl, imageId } = attributes;

	const blockProps = useBlockProps({ className: "v-cta-banner" });

	return (
		<>
			<InspectorControls>
				<PanelBody title="Cài đặt nút bấm" initialOpen={true}>
					<TextControl
						label="Chữ nút bấm"
						value={btnText}
						onChange={(val) => setAttributes({ btnText: val })}
					/>
					<TextControl
						label="Đường dẫn nút bấm"
						value={btnUrl}
						onChange={(val) => setAttributes({ btnUrl: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-cta-banner__box">
					<div className="v-cta-banner__row">
						{/* Left Column: Image Selection */}
						<div className="v-cta-banner__col-img">
							<MediaUpload
								onSelect={(media) => setAttributes({ imageId: media.id, imageUrl: media.url })}
								allowedTypes={["image"]}
								value={imageId}
								render={({ open }) => (
									<div className="v-cta-banner__image-container" onClick={open} role="button" tabIndex={0} style={{ cursor: "pointer" }}>
										{imageUrl ? (
											<img src={imageUrl} alt="" className="v-cta-banner__image" />
										) : (
											<div className="v-cta-banner__image-placeholder" style={{ background: "#e2e8f0", height: "300px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #cbd5e1" }}>
												<span>+ Chọn ảnh banner</span>
											</div>
										)}
									</div>
								)}
							/>
						</div>

						{/* Right Column: Content */}
						<div className="v-cta-banner__col-content">
							<div className="v-cta-banner__content-item">
								<RichText
									tagName="h4"
									className="v-cta-banner__item-title"
									value={title}
									onChange={(val) => setAttributes({ title: val })}
									placeholder="Nhập tiêu đề banner..."
								/>
								<RichText
									tagName="p"
									className="v-cta-banner__item-desc"
									value={description}
									onChange={(val) => setAttributes({ description: val })}
									placeholder="Nhập mô tả chi tiết..."
								/>
								<RichText
									tagName="p"
									className="v-cta-banner__item-highlight"
									value={highlightText}
									onChange={(val) => setAttributes({ highlightText: val })}
									placeholder="Nhập dòng chữ gạch chân..."
								/>
								<div className="v-cta-banner__button-wrap">
									<span className="v-cta-banner__button">
										{btnText}
										<i className="v-cta-banner__button-icon" style={{ marginLeft: 8 }}>&rarr;</i>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
