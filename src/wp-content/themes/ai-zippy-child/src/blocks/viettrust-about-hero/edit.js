import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, bgImageUrl, bgImageId } = attributes;

	const blockProps = useBlockProps({
		className: "v-about-hero",
		style: bgImageUrl ? { backgroundImage: `url(${bgImageUrl})` } : {}
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title="Ảnh nền Banner" initialOpen={true}>
					<MediaUpload
						onSelect={(media) => setAttributes({ bgImageId: media.id, bgImageUrl: media.url })}
						allowedTypes={["image"]}
						value={bgImageId}
						render={({ open }) => (
							<div>
								{bgImageUrl && (
									<img
										src={bgImageUrl}
										alt="Banner Background Preview"
										style={{ width: "100%", maxHeight: 150, objectFit: "cover", display: "block", marginBottom: 10, borderRadius: 8 }}
									/>
								)}
								<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
									{bgImageUrl ? "Thay đổi ảnh nền" : "Chọn ảnh nền"}
								</Button>
							</div>
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-about-hero__overlay">
					<div className="v-about-hero__container">
						<div className="v-about-hero__breadcrumbs">
							<span>Trang chủ</span> <span className="sep">/</span> <span className="active">Về chúng tôi</span>
						</div>
						<RichText
							tagName="h1"
							className="v-about-hero__title"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder="VỀ CHÚNG TÔI"
						/>
						<div className="v-about-hero__subtitle-wrap">
							<RichText
								tagName="p"
								className="v-about-hero__subtitle"
								value={subtitle}
								onChange={(val) => setAttributes({ subtitle: val })}
								placeholder="Nhập câu mô tả / slogan..."
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
