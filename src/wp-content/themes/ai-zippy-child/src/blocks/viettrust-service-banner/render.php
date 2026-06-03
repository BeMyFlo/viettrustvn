<?php

defined('ABSPATH') || exit;

$slogan = $attributes['slogan'] ?? '';
$bg_url = $attributes['bgImageUrl'] ?? '';

$style_attr = '';
if ($bg_url) {
    $style_attr = ' style="background-image: url(' . esc_url($bg_url) . ');"';
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-service-banner',
]);

// Build breadcrumbs dynamically
$post_title = get_the_title();
$breadcrumbs = ['<a href="' . esc_url(home_url('/')) . '">Trang chủ</a>'];

$terms = wp_get_post_terms(get_the_ID(), 'viettrust_service_group');
if (!is_wp_error($terms) && !empty($terms)) {
    $breadcrumbs[] = esc_html($terms[0]->name);
} else {
    $breadcrumbs[] = 'Dịch vụ';
}
$breadcrumbs[] = '<span class="active">' . esc_html($post_title) . '</span>';
?>

<div <?php echo $wrapper_attributes; ?><?php echo $style_attr; ?>>
    <div class="v-service-banner__overlay">
        <div class="v-service-banner__container">
            <div class="v-service-banner__breadcrumbs">
                <?php echo implode(' <span class="sep">/</span> ', $breadcrumbs); ?>
            </div>
            
            <h1 class="v-service-banner__title"><?php echo esc_html($post_title); ?></h1>
            
            <?php if ($slogan) : ?>
                <div class="v-service-banner__slogan-wrap">
                    <h2 class="v-service-banner__slogan"><?php echo wp_kses_post($slogan); ?></h2>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>
