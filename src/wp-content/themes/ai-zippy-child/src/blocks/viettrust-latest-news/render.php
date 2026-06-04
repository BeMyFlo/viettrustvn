<?php

defined('ABSPATH') || exit;

$block_title   = $attributes['blockTitle'] ?? '';
$block_intro   = $attributes['blockIntro'] ?? '';
$more_text     = $attributes['moreLinkText'] ?? '';
$more_url      = $attributes['moreLinkUrl'] ?? '';

// Query 5 latest posts
$args = [
    'post_type'      => 'post',
    'posts_per_page' => 5,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
];
$recent_posts = get_posts($args);

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-latest-news-block',
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="v-latest-news-block__container">
        <?php if ($block_title || $block_intro) : ?>
            <div class="v-latest-news-block__header v-animate fade-in-up">
                <?php if ($block_title) : ?>
                    <h2 class="v-latest-news-block__title"><?php echo esc_html($block_title); ?></h2>
                <?php endif; ?>
                
                <?php if ($block_intro) : ?>
                    <p class="v-latest-news-block__intro"><?php echo esc_html($block_intro); ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($recent_posts)) : ?>
            <div class="v-latest-news-block__grid">
                
                <!-- Column 1: Featured Post with Image -->
                <div class="v-latest-news-block__col v-animate fade-in-left">
                    <?php 
                    if (isset($recent_posts[0])) : 
                        $post1 = $recent_posts[0];
                        $image_id = get_post_thumbnail_id($post1->ID);
                        $image_src = $image_id ? wp_get_attachment_image_url($image_id, 'medium_large') : '';
                        // Fallback image if no featured thumbnail
                        if (!$image_src) {
                            $image_src = 'https://www.adenservices.com/content/media/2023/04/news-1-700x500.jpg';
                        }
                        $excerpt = get_the_excerpt($post1->ID);
                        if (!$excerpt) {
                            $excerpt = wp_trim_words($post1->post_content, 35);
                        }
                        ?>
                        <a href="<?php echo esc_url(get_permalink($post1->ID)); ?>" class="v-latest-news-block__item v-latest-news-block__item--featured">
                            <div class="v-latest-news-block__image-wrap">
                                <img src="<?php echo esc_url($image_src); ?>" alt="<?php echo esc_attr($post1->post_title); ?>" class="v-latest-news-block__image" loading="lazy" />
                            </div>
                            <div class="v-latest-news-block__content">
                                <h3 class="v-latest-news-block__item-title"><?php echo esc_html($post1->post_title); ?></h3>
                                <p class="v-latest-news-block__item-excerpt"><?php echo esc_html($excerpt); ?></p>
                            </div>
                        </a>
                    <?php endif; ?>
                </div>

                <!-- Column 2: Text only posts (Posts 2 & 3) -->
                <div class="v-latest-news-block__col v-animate fade-in-up delay-200">
                    <?php 
                    for ($i = 1; $i <= 2; $i++) :
                        if (isset($recent_posts[$i])) :
                            $post = $recent_posts[$i];
                            $excerpt = get_the_excerpt($post->ID);
                            if (!$excerpt) {
                                $excerpt = wp_trim_words($post->post_content, 35);
                            }
                            ?>
                            <a href="<?php echo esc_url(get_permalink($post->ID)); ?>" class="v-latest-news-block__item v-latest-news-block__item--text-only">
                                <div class="v-latest-news-block__content">
                                    <h3 class="v-latest-news-block__item-title"><?php echo esc_html($post->post_title); ?></h3>
                                    <p class="v-latest-news-block__item-excerpt"><?php echo esc_html($excerpt); ?></p>
                                </div>
                            </a>
                        <?php 
                        endif;
                    endfor; 
                    ?>
                </div>

                <!-- Column 3: Text only posts (Posts 4 & 5) -->
                <div class="v-latest-news-block__col v-animate fade-in-right delay-400">
                    <?php 
                    for ($i = 3; $i <= 4; $i++) :
                        if (isset($recent_posts[$i])) :
                            $post = $recent_posts[$i];
                            $excerpt = get_the_excerpt($post->ID);
                            if (!$excerpt) {
                                $excerpt = wp_trim_words($post->post_content, 35);
                            }
                            ?>
                            <a href="<?php echo esc_url(get_permalink($post->ID)); ?>" class="v-latest-news-block__item v-latest-news-block__item--text-only">
                                <div class="v-latest-news-block__content">
                                    <h3 class="v-latest-news-block__item-title"><?php echo esc_html($post->post_title); ?></h3>
                                    <p class="v-latest-news-block__item-excerpt"><?php echo esc_html($excerpt); ?></p>
                                </div>
                            </a>
                        <?php 
                        endif;
                    endfor; 
                    ?>
                </div>

            </div>
        <?php else : ?>
            <p class="v-latest-news-block__empty text-center"><?php esc_html_e('Chưa có tin tức nào được đăng.', 'ai-zippy-child'); ?></p>
        <?php endif; ?>

        <?php if ($more_text && $more_url) : ?>
            <div class="v-latest-news-block__more text-center v-animate fade-in-up delay-200">
                <a class="v-latest-news-block__more-link" href="<?php echo esc_url($more_url); ?>"><?php echo esc_html($more_text); ?></a>
            </div>
        <?php endif; ?>
    </div>
</div>
