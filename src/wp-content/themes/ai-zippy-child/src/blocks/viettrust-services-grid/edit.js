import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, Button, TextControl, TextareaControl } from "@wordpress/components";
import { useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, sectionBgUrl, sectionBgId, services = [] } = attributes;
	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const [activeSubIndex, setActiveSubIndex] = useState(null);

	const blockProps = useBlockProps({
		className: "v-services",
		style: sectionBgUrl ? { backgroundImage: `url(${sectionBgUrl})` } : {}
	});

	const updateService = (index, key, value) => {
		const newServices = [...services];
		newServices[index] = { ...newServices[index], [key]: value };
		setAttributes({ services: newServices });
	};

	const addService = () => {
		const newServices = [
			...services,
			{
				title: "Dịch vụ mới",
				description: "Mô tả ngắn gọn về dịch vụ mới.",
				bgImageUrl: "",
				bgImageId: 0,
				overlayColor: "rgba(16,43,92,0.82)",
				linkUrl: "#",
				subServices: []
			},
		];
		setAttributes({ services: newServices });
		setActiveCardIndex(newServices.length - 1);
		setActiveSubIndex(null);
	};

	const removeService = (index) => {
		if (services.length <= 1) return;
		const newServices = services.filter((_, i) => i !== index);
		setAttributes({ services: newServices });
		setActiveCardIndex(Math.max(0, index - 1));
		setActiveSubIndex(null);
	};

	const addSubService = (cardIndex) => {
		const newServices = [...services];
		const card = { ...newServices[cardIndex] };
		const subs = card.subServices ? [...card.subServices] : [];
		subs.push({
			title: "Dịch vụ con mới",
			iconUrl: "",
			iconId: 0
		});
		card.subServices = subs;
		newServices[cardIndex] = card;
		setAttributes({ services: newServices });
		setActiveSubIndex(subs.length - 1);
	};

	const updateSubService = (cardIndex, subIndex, key, value) => {
		const newServices = [...services];
		const card = { ...newServices[cardIndex] };
		const subs = [...card.subServices];
		subs[subIndex] = { ...subs[subIndex], [key]: value };
		card.subServices = subs;
		newServices[cardIndex] = card;
		setAttributes({ services: newServices });
	};

	const removeSubService = (cardIndex, subIndex) => {
		const newServices = [...services];
		const card = { ...newServices[cardIndex] };
		const subs = card.subServices.filter((_, i) => i !== subIndex);
		card.subServices = subs;
		newServices[cardIndex] = card;
		setAttributes({ services: newServices });
		setActiveSubIndex(null);
	};

	const currentCard = services[activeCardIndex] || null;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Ảnh nền Block chính" initialOpen={false}>
					<MediaUpload
						onSelect={(media) => setAttributes({ sectionBgId: media.id, sectionBgUrl: media.url })}
						allowedTypes={["image"]}
						value={sectionBgId}
						render={({ open }) => (
							<div>
								{sectionBgUrl && (
									<img
										src={sectionBgUrl}
										alt="Section Background"
										style={{ width: "100%", maxHeight: 100, objectFit: "cover", display: "block", marginBottom: 8, borderRadius: 8 }}
									/>
								)}
								<Button variant="secondary" onClick={open} style={{ width: "100%", marginBottom: 8 }}>
									{sectionBgUrl ? "Thay đổi ảnh nền block" : "Chọn ảnh nền block"}
								</Button>
								{sectionBgUrl && (
									<Button variant="link" isDestructive onClick={() => setAttributes({ sectionBgUrl: "", sectionBgId: 0 })} style={{ width: "100%", textAlign: "center" }}>
										Xóa ảnh nền block
									</Button>
								)}
							</div>
						)}
					/>
				</PanelBody>

				{currentCard && (
					<PanelBody title={`Cài đặt Dịch vụ: ${currentCard.title || "Không tên"}`} initialOpen={true}>
						<div style={{ marginBottom: 15 }}>
							<label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Ảnh nền Card</label>
							<MediaUpload
								onSelect={(media) => updateService(activeCardIndex, "bgImageUrl", media.url)}
								allowedTypes={["image"]}
								value={currentCard.bgImageId}
								render={({ open }) => (
									<div>
										{currentCard.bgImageUrl && (
											<img
												src={currentCard.bgImageUrl}
												alt="Card Background Preview"
												style={{ width: "100%", maxHeight: 120, objectFit: "cover", display: "block", marginBottom: 8, borderRadius: 8 }}
											/>
										)}
										<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
											{currentCard.bgImageUrl ? "Thay đổi ảnh nền card" : "Chọn ảnh nền card"}
										</Button>
									</div>
								)}
							/>
						</div>

						<TextControl
							label="Màu lớp phủ overlay (RGBA/HEX/RGB)"
							value={currentCard.overlayColor || ""}
							onChange={(val) => updateService(activeCardIndex, "overlayColor", val)}
							placeholder="rgba(0,167,109,0.82)"
						/>

						<TextControl
							label="Đường dẫn khám phá (URL Link)"
							value={currentCard.linkUrl || ""}
							onChange={(val) => updateService(activeCardIndex, "linkUrl", val)}
						/>

						<TextareaControl
							label="Mô tả dịch vụ"
							value={currentCard.description || ""}
							onChange={(val) => updateService(activeCardIndex, "description", val)}
							rows={3}
						/>

						<hr style={{ margin: "20px 0", border: "0", borderTop: "1px solid #ddd" }} />

						<div style={{ fontWeight: "bold", marginBottom: 10 }}>Danh sách Dịch vụ Con (Sub-services)</div>
						
						{currentCard.subServices && currentCard.subServices.length > 0 && (
							<div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
								{currentCard.subServices.map((sub, index) => (
									<Button
										key={index}
										variant={activeSubIndex === index ? "primary" : "secondary"}
										onClick={() => setActiveSubIndex(index)}
										style={{ fontSize: 11, padding: "4px 8px" }}
									>
										{sub.title || `Dịch vụ con ${index + 1}`}
									</Button>
								))}
							</div>
						)}

						<Button variant="secondary" onClick={() => addSubService(activeCardIndex)} style={{ width: "100%", marginBottom: 10 }}>
							+ Thêm Dịch vụ con
						</Button>

						{activeSubIndex !== null && currentCard.subServices && currentCard.subServices[activeSubIndex] && (
							<div style={{ background: "#f1f5f9", padding: 12, borderRadius: 8, marginTop: 10 }}>
								<div style={{ fontWeight: "bold", fontSize: 12, marginBottom: 8 }}>Chỉnh sửa Dịch vụ con</div>
								
								<TextControl
									label="Tên dịch vụ con"
									value={currentCard.subServices[activeSubIndex].title || ""}
									onChange={(val) => updateSubService(activeCardIndex, activeSubIndex, "title", val)}
								/>

								<div style={{ marginBottom: 10 }}>
									<label style={{ display: "block", marginBottom: 5, fontSize: 12 }}>Icon trắng (PNG/SVG)</label>
									<MediaUpload
										onSelect={(media) => updateSubService(activeCardIndex, activeSubIndex, "iconUrl", media.url)}
										allowedTypes={["image"]}
										value={currentCard.subServices[activeSubIndex].iconId}
										render={({ open }) => (
											<div>
												{currentCard.subServices[activeSubIndex].iconUrl && (
													<img
														src={currentCard.subServices[activeSubIndex].iconUrl}
														alt="Icon Preview"
														style={{ width: 40, height: 40, objectFit: "contain", display: "block", marginBottom: 8, background: "#1e293b", padding: 4, borderRadius: 4 }}
													/>
												)}
												<Button variant="secondary" onClick={open} size="small" style={{ width: "100%" }}>
													{currentCard.subServices[activeSubIndex].iconUrl ? "Thay đổi Icon" : "Chọn Icon"}
												</Button>
											</div>
										)}
									/>
								</div>

								<Button variant="link" isDestructive onClick={() => removeSubService(activeCardIndex, activeSubIndex)} style={{ width: "100%", textAlign: "right" }}>
									Xoá dịch vụ con này
								</Button>
							</div>
						)}
					</PanelBody>
				)}

				<PanelBody title="Quản lý danh sách Dịch vụ chính" initialOpen={true}>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
						{services.map((item, index) => (
							<Button
								key={index}
								variant={activeCardIndex === index ? "primary" : "secondary"}
								onClick={() => {
									setActiveCardIndex(index);
									setActiveSubIndex(null);
								}}
								style={{ fontSize: 11, padding: "4px 8px" }}
							>
								{item.title || `Dịch vụ ${index + 1}`}
							</Button>
						))}
					</div>
					<Button variant="secondary" onClick={addService} style={{ marginRight: 8 }}>
						+ Thêm dịch vụ
					</Button>
					{services.length > 1 && (
						<Button variant="link" isDestructive onClick={() => removeService(activeCardIndex)}>
							Xoá dịch vụ hiện tại
						</Button>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-services__container">
					<div className="v-services__header">
						<RichText
							tagName="h2"
							className="v-services__title"
							value={title}
							onChange={(val) => setAttributes({ title: val })}
							placeholder="Nhập tiêu đề chính..."
						/>
						<RichText
							tagName="p"
							className="v-services__subtitle"
							value={subtitle}
							onChange={(val) => setAttributes({ subtitle: val })}
							placeholder="Nhập mô tả phụ..."
						/>
					</div>

					<div className="v-services__grid">
						{services.map((service, index) => {
							const isActive = index === activeCardIndex;
							return (
								<div
									key={index}
									className={`v-services__card ${isActive ? "is-editing" : ""}`}
									style={{ backgroundImage: service.bgImageUrl ? `url(${service.bgImageUrl})` : "none" }}
									onClick={(e) => {
										e.stopPropagation();
										setActiveCardIndex(index);
										setActiveSubIndex(null);
									}}
									role="button"
									tabIndex={0}
								>
									<div className="v-services__card-overlay" style={{ backgroundColor: service.overlayColor || "rgba(16,43,92,0.8)" }}>
										<div className="v-services__card-arrow">
											<svg width="32" height="32" viewBox="0 0 32 32">
												<circle fillOpacity="0.98" fill="#FFFFFF" cx="16" cy="16" r="16"></circle>
												<path fill={service.overlayColor ? service.overlayColor : "#00a76d"} stroke={service.overlayColor ? service.overlayColor : "#00a76d"} d="M13.6782988,15.5990467 L19.6552568,8.6457479 C19.802325,8.47465605 19.802325,8.20051382 19.6552568,8.02942196 C19.5083274,7.85845111 19.2725399,7.85845111 19.1256104,8.02942196 L12.8822517,15.2926382 C12.7352875,15.4635687 12.7352875,15.7378723 12.8822517,15.9088028 L19.1256104,23.1687118 C19.1976537,23.2526847 19.294763,23.2977365 19.3889948,23.2977365 C19.4832613,23.2977365 19.5803706,23.2558307 19.6525526,23.1687118 C19.7994821,22.9977813 19.7994821,22.7234777 19.6525526,22.5525472 L13.6782988,15.5990467 Z" strokeWidth="0.8" transform="translate(16.268793, 15.599465) rotate(90) translate(-16.268793, -15.599465)"></path>
											</svg>
										</div>

										<RichText
											tagName="h4"
											className="v-services__card-title"
											value={service.title || ""}
											onChange={(val) => updateService(index, "title", val)}
											placeholder="Tên Dịch vụ..."
											style={{ color: "#ffffff", fontWeight: "bold" }}
										/>

										<div className="v-services__card-desc-preview">
											{service.description || "Nhập mô tả ngắn..."}
										</div>

										{service.subServices && service.subServices.length > 0 && (
											<div className="v-services__sub-services-preview" style={{ marginTop: 15, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
												{service.subServices.map((sub, sIdx) => (
													<div key={sIdx} style={{ display: "flex", alignItems: "center", gap: 5 }}>
														{sub.iconUrl && <img src={sub.iconUrl} alt="" style={{ width: 16, height: 16, objectFit: "contain", filter: "brightness(0) invert(1)" }} />}
														<span style={{ color: "#ffffff", fontSize: 10 }}>{sub.title}</span>
													</div>
												))}
											</div>
										)}
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
