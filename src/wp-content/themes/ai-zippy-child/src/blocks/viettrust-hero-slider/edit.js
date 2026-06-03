import { useBlockProps, RichText, InspectorControls, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, Button, TextControl, ToggleControl, RangeControl } from "@wordpress/components";
import { useState } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
	const { slides = [], autoplay, autoplaySpeed } = attributes;
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);

	const blockProps = useBlockProps({ className: "v-hero" });

	const updateSlide = (index, key, value) => {
		const newSlides = [...slides];
		newSlides[index] = { ...newSlides[index], [key]: value };
		setAttributes({ slides: newSlides });
	};

	const addSlide = () => {
		const newSlides = [
			...slides,
			{
				title: "TIÊU ĐỀ SLIDE MỚI",
				description: "Mô tả ngắn cho slide này để thu hút sự chú ý.",
				imageUrl: "",
				imageId: 0,
				btnText: "Xem chi tiết",
				btnUrl: "#",
				overlayOpacity: 40,
			},
		];
		setAttributes({ slides: newSlides });
		setActiveSlideIndex(newSlides.length - 1);
	};

	const removeSlide = (index) => {
		if (slides.length <= 1) return;
		const newSlides = slides.filter((_, i) => i !== index);
		setAttributes({ slides: newSlides });
		setActiveSlideIndex(Math.max(0, index - 1));
	};

	const currentSlide = slides[activeSlideIndex] || slides[0] || {};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Cài đặt Slider" initialOpen={true}>
					<ToggleControl
						label="Tự động chuyển slide (Autoplay)"
						checked={autoplay}
						onChange={(val) => setAttributes({ autoplay: val })}
					/>
					{autoplay && (
						<RangeControl
							label="Tốc độ chuyển (ms)"
							value={autoplaySpeed}
							onChange={(val) => setAttributes({ autoplaySpeed: val })}
							min={2000}
							max={10000}
							step={500}
						/>
					)}
				</PanelBody>

				{currentSlide && (
					<PanelBody title={`Cài đặt Slide ${activeSlideIndex + 1}`} initialOpen={true}>
						<div style={{ marginBottom: 15 }}>
							<label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>Ảnh nền Slide</label>
							<MediaUpload
								onSelect={(media) => updateSlide(activeSlideIndex, "imageUrl", media.url)}
								allowedTypes={["image"]}
								value={currentSlide.imageId}
								render={({ open }) => (
									<div>
										{currentSlide.imageUrl && (
											<img
												src={currentSlide.imageUrl}
												alt="Slide bg preview"
												style={{ width: "100%", borderRadius: 6, marginBottom: 8, maxHeight: 150, objectFit: "cover" }}
											/>
										)}
										<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
											{currentSlide.imageUrl ? "Thay đổi ảnh" : "Chọn ảnh nền"}
										</Button>
									</div>
								)}
							/>
						</div>

						<RangeControl
							label="Độ mờ lớp phủ màu tối (Overlay Opacity)"
							value={currentSlide.overlayOpacity || 0}
							onChange={(val) => updateSlide(activeSlideIndex, "overlayOpacity", val)}
							min={0}
							max={90}
							step={5}
						/>

						<TextControl
							label="Đường dẫn nút (Button URL)"
							value={currentSlide.btnUrl || ""}
							onChange={(val) => updateSlide(activeSlideIndex, "btnUrl", val)}
						/>
					</PanelBody>
				)}

				<PanelBody title="Quản lý danh sách Slide" initialOpen={false}>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
						{slides.map((_, index) => (
							<Button
								key={index}
								variant={activeSlideIndex === index ? "primary" : "secondary"}
								onClick={() => setActiveSlideIndex(index)}
							>
								Slide {index + 1}
							</Button>
						))}
					</div>
					<Button variant="secondary" isBusy={false} onClick={addSlide} style={{ marginRight: 8 }}>
						+ Thêm Slide
					</Button>
					{slides.length > 1 && (
						<Button variant="link" isDestructive onClick={() => removeSlide(activeSlideIndex)}>
							Xoá Slide hiện tại
						</Button>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-hero__editor-notice">
					<span>[Chế độ chỉnh sửa] Bạn đang sửa <strong>Slide {activeSlideIndex + 1}</strong>. Sử dụng thanh bên phải để cấu hình ảnh nền và hiệu ứng.</span>
				</div>

				<div
					className="v-hero__slide"
					style={{
						backgroundImage: currentSlide.imageUrl ? `url(${currentSlide.imageUrl})` : "none",
						backgroundColor: currentSlide.imageUrl ? "transparent" : "#102b5c",
					}}
				>
					<div
						className="v-hero__overlay"
						style={{
							backgroundColor: "rgba(9, 18, 33, 0.9)",
							opacity: (currentSlide.overlayOpacity || 40) / 100,
						}}
					/>

					<div className="v-hero__container">
						<div className="v-hero__content">
							<RichText
								tagName="h2"
								className="v-hero__title"
								value={currentSlide.title || ""}
								onChange={(val) => updateSlide(activeSlideIndex, "title", val)}
								placeholder="Nhập tiêu đề slide..."
							/>

							<RichText
								tagName="p"
								className="v-hero__desc"
								value={currentSlide.description || ""}
								onChange={(val) => updateSlide(activeSlideIndex, "description", val)}
								placeholder="Nhập mô tả ngắn..."
							/>

							<div className="v-hero__cta">
								<RichText
									tagName="span"
									className="v-hero__btn"
									value={currentSlide.btnText || ""}
									onChange={(val) => updateSlide(activeSlideIndex, "btnText", val)}
									placeholder="Nhãn nút..."
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
