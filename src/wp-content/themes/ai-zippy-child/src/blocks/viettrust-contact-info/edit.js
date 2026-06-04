import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, TextControl, TextareaControl, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { directorName, directorTitle, phone, email, website, qrCodeUrl, officeAddress, mapIframe } = attributes;

	const blockProps = useBlockProps({ className: "v-contact-info" });

	return (
		<>
			<InspectorControls>
				<PanelBody title="Thông tin cá nhân (Danh thiếp)" initialOpen={true}>
					<TextControl
						label="Họ tên Director"
						value={directorName}
						onChange={(val) => setAttributes({ directorName: val })}
					/>
					<TextControl
						label="Chức danh"
						value={directorTitle}
						onChange={(val) => setAttributes({ directorTitle: val })}
					/>
					<TextControl
						label="Số điện thoại"
						value={phone}
						onChange={(val) => setAttributes({ phone: val })}
					/>
					<TextControl
						label="Email"
						value={email}
						onChange={(val) => setAttributes({ email: val })}
					/>
					<TextControl
						label="Website"
						value={website}
						onChange={(val) => setAttributes({ website: val })}
					/>
					<div style={{ marginBottom: 15 }}>
						<label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Mã QR Zalo</label>
						<MediaUpload
							onSelect={(media) => setAttributes({ qrCodeUrl: media.url })}
							allowedTypes={["image"]}
							value={qrCodeUrl}
							render={({ open }) => (
								<div>
									{qrCodeUrl && (
										<img
											src={qrCodeUrl}
											alt="Zalo QR Code Preview"
											style={{ width: 100, height: 100, display: "block", marginBottom: 8, borderRadius: 4 }}
										/>
									)}
									<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
										{qrCodeUrl ? "Thay đổi mã QR" : "Chọn mã QR"}
									</Button>
								</div>
							)}
						/>
					</div>
				</PanelBody>

				<PanelBody title="Địa chỉ & Bản đồ" initialOpen={true}>
					<TextareaControl
						label="Địa chỉ văn phòng"
						value={officeAddress}
						onChange={(val) => setAttributes({ officeAddress: val })}
						rows={3}
					/>
					<TextareaControl
						label="Mã nhúng Google Map (Iframe)"
						value={mapIframe}
						onChange={(val) => setAttributes({ mapIframe: val })}
						rows={5}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-contact-info__container">
					<div className="v-contact-info__grid">
						{/* Cột trái: Business Card mô phỏng */}
						<div className="v-contact-info__col-card">
							<div className="v-contact-card">
								<div className="v-contact-card__left">
									<div className="v-contact-card__header">
										<h3 className="v-contact-card__name">{directorName || "Họ và Tên"}</h3>
										<p className="v-contact-card__title">{directorTitle || "Chức danh"}</p>
									</div>
									<div className="v-contact-card__details">
										<p className="v-contact-card__item">
											<span className="v-contact-card__icon">📞</span>
											<span className="v-contact-card__val">{phone || "Số điện thoại"}</span>
										</p>
										<p className="v-contact-card__item">
											<span className="v-contact-card__icon">✉️</span>
											<span className="v-contact-card__val">{email || "Email"}</span>
										</p>
										<p className="v-contact-card__item">
											<span className="v-contact-card__icon">🌐</span>
											<span className="v-contact-card__val">{website || "Website"}</span>
										</p>
									</div>
									<div className="v-contact-card__qr">
										{qrCodeUrl ? (
											<img src={qrCodeUrl} alt="Zalo QR" className="v-contact-card__qr-img" />
										) : (
											<div className="v-contact-card__qr-placeholder">QR Code Zalo</div>
										)}
									</div>
								</div>
								<div className="v-contact-card__right">
									<div className="v-contact-card__brand">
										<div className="v-contact-card__logo-placeholder">Logo Viettrust</div>
										<p className="v-contact-card__slogan">ĐỐI TÁC TIN CẬY - GIẢI PHÁP HIỆU QUẢ</p>
									</div>
								</div>
							</div>
						</div>

						{/* Cột phải: Bản đồ và Địa chỉ */}
						<div className="v-contact-info__col-map">
							<div className="v-contact-address">
								<h3 className="v-contact-address__heading">VĂN PHÒNG ĐẠI DIỆN</h3>
								<p className="v-contact-address__text">{officeAddress}</p>
							</div>
							<div className="v-contact-map-wrap">
								{mapIframe ? (
									<div className="v-contact-map-iframe-preview" dangerouslySetInnerHTML={{ __html: mapIframe }} />
								) : (
									<div className="v-contact-map-placeholder">Nhập mã nhúng Google Map bên Sidebar</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
