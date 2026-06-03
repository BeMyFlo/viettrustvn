import { useBlockProps, RichText, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";

export default function Edit({ attributes, setAttributes }) {
	const { blockTitle, blockIntro, moreLinkText, moreLinkUrl } = attributes;
	
	const blockProps = useBlockProps({ className: "v-latest-news-block" });

	// Query 5 latest posts
	const posts = useSelect((select) => {
		return select("core").getEntityRecords("postType", "post", {
			per_page: 5,
			status: "publish"
		});
	}, []);

	// Mock posts if none exist or still loading
	const mockPosts = [
		{
			id: 1,
			title: { rendered: "Aden hoàn thành phương án vận hành cho nhà máy quản lý nước mới tại Việt Nam" },
			excerpt: { rendered: "Aden đã bàn giao hoạt động của một nhà máy xử lý nước thải thông qua hợp đồng tổng thầu EPC (Thiết kế, Mua sắm và Xây dựng) cho một đối tác thương mại Hàn Quốc tại miền Bắc Việt Nam." },
			date: "2026-06-01",
			featured_media_url: "https://www.adenservices.com/content/media/2023/04/news-1-700x500.jpg"
		},
		{
			id: 2,
			title: { rendered: "Aden Việt Nam nhận chứng nhận ISO 14001 với hệ thống Quản lý Môi trường" },
			excerpt: { rendered: "Sự xuất sắc trong hoạt động là xương sống của các giải pháp Quản Lý Tiện Ích Tích Hợp của Aden. Đối với Aden, xuất sắc không chỉ là đáp ứng các tiêu chuẩn, mà còn là liên tục cải thiện chúng." },
			date: "2026-05-28"
		},
		{
			id: 3,
			title: { rendered: "Aden Việt Nam trở thành đơn vị quản lý cơ sở (IFM) của FPT Software" },
			excerpt: { rendered: "Aden Việt Nam vừa củng cố quan hệ đối tác với FPT Software bằng việc trở thành đơn vị Quản Lý Tiện Ích Tích Hợp (IFM) với F-Complex (Đà Nẵng) – một trong những tòa nhà của FPT Software." },
			date: "2026-05-25"
		},
		{
			id: 4,
			title: { rendered: "Aden mở rộng mối quan hệ đối tác với Schaeffler để cung cấp giải pháp quản lý tiện ích tích hợp IFM cho chi nhánh của họ ở Việt Nam" },
			excerpt: { rendered: "Aden Vietnam vừa tăng cường mối quan hệ đối tác với Schaeffler khu vực ASEAN bằng việc cung cấp giải pháp ấm thực cho nhà máy Schaeffler Vietnam đặt tại Khu công nghiệp Amata, tỉnh Đồng Nai." },
			date: "2026-05-20"
		},
		{
			id: 5,
			title: { rendered: "Aden hợp tác để tăng cường sức khỏe và dinh dưỡng cho Trường Quốc tế Hàn Quốc tại Hà Nội" },
			excerpt: { rendered: "Là đối tác tin cậy của nhiều tổ chức giáo dục toàn cầu trên khắp châu Á, Aden Việt Nam rất vui mừng được công bố đối tác mới nhất của Trường Quốc tế Hàn Quốc tại Hà Nội." },
			date: "2026-05-15"
		}
	];

	const displayPosts = posts && posts.length > 0 ? posts : mockPosts;

	// Distribute posts into 3 columns
	const col1Post = displayPosts[0];
	const col2Posts = displayPosts.slice(1, 3);
	const col3Posts = displayPosts.slice(3, 5);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Cài đặt nút xem thêm" initialOpen={true}>
					<TextControl
						label="Nhãn nút xem thêm"
						value={moreLinkText}
						onChange={(val) => setAttributes({ moreLinkText: val })}
					/>
					<TextControl
						label="Đường dẫn xem thêm"
						value={moreLinkUrl}
						onChange={(val) => setAttributes({ moreLinkUrl: val })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="v-latest-news-block__header">
					<RichText
						tagName="h2"
						className="v-latest-news-block__title"
						value={blockTitle}
						onChange={(val) => setAttributes({ blockTitle: val })}
						placeholder="TIN TỨC MỚI NHẤT"
					/>
					<RichText
						tagName="p"
						className="v-latest-news-block__intro"
						value={blockIntro}
						onChange={(val) => setAttributes({ blockIntro: val })}
						placeholder="Xem những tin tức gần đây của chúng tôi"
					/>
				</div>

				<div className="v-latest-news-block__grid">
					{/* Column 1: Featured Post with Image */}
					<div className="v-latest-news-block__col">
						{col1Post && (
							<div className="v-latest-news-block__item v-latest-news-block__item--featured">
								<div className="v-latest-news-block__image-wrap">
									<img
										src={col1Post.featured_media_url || "https://www.adenservices.com/content/media/2023/04/news-1-700x500.jpg"}
										alt=""
										className="v-latest-news-block__image"
									/>
								</div>
								<div className="v-latest-news-block__content">
									<h3 className="v-latest-news-block__item-title">{col1Post.title.rendered}</h3>
									<div
										className="v-latest-news-block__item-excerpt"
										dangerouslySetInnerHTML={{ __html: col1Post.excerpt.rendered }}
									/>
								</div>
							</div>
						)}
					</div>

					{/* Column 2: Text only posts */}
					<div className="v-latest-news-block__col">
						{col2Posts.map((post) => (
							<div key={post.id} className="v-latest-news-block__item v-latest-news-block__item--text-only">
								<div className="v-latest-news-block__content">
									<h3 className="v-latest-news-block__item-title">{post.title.rendered}</h3>
									<div
										className="v-latest-news-block__item-excerpt"
										dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
									/>
								</div>
							</div>
						))}
					</div>

					{/* Column 3: Text only posts */}
					<div className="v-latest-news-block__col">
						{col3Posts.map((post) => (
							<div key={post.id} className="v-latest-news-block__item v-latest-news-block__item--text-only">
								<div className="v-latest-news-block__content">
									<h3 className="v-latest-news-block__item-title">{post.title.rendered}</h3>
									<div
										className="v-latest-news-block__item-excerpt"
										dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="v-latest-news-block__more text-center" style={{ marginTop: 40 }}>
					<span className="v-latest-news-block__more-btn">
						{moreLinkText}
					</span>
				</div>
			</div>
		</>
	);
}
