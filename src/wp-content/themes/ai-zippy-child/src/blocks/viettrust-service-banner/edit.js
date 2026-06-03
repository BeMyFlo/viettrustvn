import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

export default function Edit({ attributes, setAttributes }) {
	const { slogan, bgImageUrl, bgImageId } = attributes;

	const postTitle = useSelect((select) => {
		return select("core/editor").getEditedPostAttribute("title");
	}, []) || "Tên Dịch Vụ Chi Tiết";

	const blockProps = useBlockProps({
		className: "v-service-banner",
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
				<div className="v-service-banner__overlay">
					<div className="v-service-banner__container">
						<div className="v-service-banner__breadcrumbs">
							<span>Trang chủ</span> <span className="sep">/</span> <span>Nhóm dịch vụ</span> <span className="sep">/</span> <span className="active">{postTitle}</span>
						</div>
						<h1 className="v-service-banner__title">{postTitle}</h1>
						<div className="v-service-banner__slogan-wrap">
							<RichText
								tagName="h2"
								className="v-service-banner__slogan"
								value={slogan}
								onChange={(val) => setAttributes({ slogan: val })}
								placeholder="Nhập câu khẩu hiệu (slogan)..."
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
