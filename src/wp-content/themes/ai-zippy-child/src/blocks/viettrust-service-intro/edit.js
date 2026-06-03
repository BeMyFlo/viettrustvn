import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { title, description, btnText, btnUrl } = attributes;

	const blockProps = useBlockProps({ className: "v-service-intro" });

	return (
		<>
			<InspectorControls>
				<PanelBody title="Cài đặt nút liên hệ" initialOpen={true}>
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
				<div className="v-service-intro__container">
					<div className="v-service-intro__row">
						{/* Left Column: Text */}
						<div className="v-service-intro__col-text">
							<RichText
								tagName="h3"
								className="v-service-intro__title"
								value={title}
								onChange={(val) => setAttributes({ title: val })}
								placeholder="Nhập tiêu đề giới thiệu..."
							/>
							<RichText
								tagName="p"
								className="v-service-intro__desc"
								value={description}
								onChange={(val) => setAttributes({ description: val })}
								placeholder="Nhập đoạn mô tả chi tiết..."
							/>
						</div>

						{/* Right Column: CTA Button */}
						<div className="v-service-intro__col-btn">
							<span className="v-service-intro__btn">
								{btnText}
								<i className="v-service-intro__btn-icon" style={{ marginLeft: 8 }}>&rarr;</i>
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
