import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, Button, SelectControl, TextControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { tagline, title, description, btnText, btnUrl, imageUrl, imageId, imagePosition, styleType } = attributes;

	const blockProps = useBlockProps({
		className: `v-imgtext v-imgtext--${imagePosition} v-imgtext--${styleType}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title="Cài đặt Layout & Style" initialOpen={true}>
					<SelectControl
						label="Vị trí hình ảnh"
						value={imagePosition}
						options={[
							{ label: "Bên trái", value: "left" },
							{ label: "Bên phải", value: "right" },
						]}
						onChange={(val) => setAttributes({ imagePosition: val })}
					/>
					<SelectControl
						label="Kiểu hiển thị (Style Type)"
						value={styleType}
						options={[
							{ label: "Cổ điển (Sạch sẽ)", value: "classic" },
							{ label: "Nền kính mờ (Glassmorphism)", value: "modern-glass" },
						]}
						onChange={(val) => setAttributes({ styleType: val })}
					/>
					<TextControl
						label="Đường dẫn nút (Button URL)"
						value={btnUrl}
						onChange={(val) => setAttributes({ btnUrl: val })}
					/>
				</PanelBody>

				<PanelBody title="Hình ảnh" initialOpen={true}>
					<MediaUpload
						onSelect={(media) => setAttributes({ imageId: media.id, imageUrl: media.url })}
						allowedTypes={["image"]}
						value={imageId}
						render={({ open }) => (
							<div>
								{imageUrl && (
									<img
										src={imageUrl}
										alt="Preview"
										style={{ width: "100%", borderRadius: 12, marginBottom: 8 }}
									/>
								)}
								<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
									{imageUrl ? "Thay đổi hình ảnh" : "Chọn hình ảnh"}
								</Button>
							</div>
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-imgtext__container">
					<div className="v-imgtext__row">
						{/* Media Column */}
						<div className="v-imgtext__media-col">
							{imageUrl ? (
								<div className="v-imgtext__img-wrap">
									<img className="v-imgtext__img" src={imageUrl} alt="" />
								</div>
							) : (
								<MediaUpload
									onSelect={(media) => setAttributes({ imageId: media.id, imageUrl: media.url })}
									allowedTypes={["image"]}
									render={({ open }) => (
										<div className="v-imgtext__placeholder" onClick={open} role="button" tabIndex={0}>
											<span>+ Chọn hình ảnh giới thiệu</span>
										</div>
									)}
								/>
							)}
						</div>

						{/* Content Column */}
						<div className="v-imgtext__content-col">
							<div className="v-imgtext__content">
								<RichText
									tagName="span"
									className="v-imgtext__tagline"
									value={tagline}
									onChange={(val) => setAttributes({ tagline: val })}
									placeholder="TAGLINE..."
								/>

								<RichText
									tagName="h2"
									className="v-imgtext__title"
									value={title}
									onChange={(val) => setAttributes({ title: val })}
									placeholder="Tiêu đề giới thiệu..."
								/>

								<RichText
									tagName="p"
									className="v-imgtext__desc"
									value={description}
									onChange={(val) => setAttributes({ description: val })}
									placeholder="Mô tả nội dung chi tiết ở đây..."
								/>

								<div className="v-imgtext__cta">
									<RichText
										tagName="span"
										className="v-imgtext__btn"
										value={btnText}
										onChange={(val) => setAttributes({ btnText: val })}
										placeholder="Nút liên kết..."
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
