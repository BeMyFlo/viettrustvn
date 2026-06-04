<?php
/**
 * Render php for viettrust-contact-hero block.
 *
 * @package WordPress
 */

defined('ABSPATH') || exit;

$title      = $attributes['title'] ?? __('LIÊN HỆ', 'ai-zippy-child');
$subtitle   = $attributes['subtitle'] ?? __('GIẢI ĐÁP MỌI THẮC MẮC VÀ KẾT NỐI VỚI NHU CẦU CỦA BẠN', 'ai-zippy-child');
$bgImageUrl = $attributes['bgImageUrl'] ?? '';

$wrapper_style = '';
if ($bgImageUrl) {
    $wrapper_style = ' style="background-image: url(' . esc_url($bgImageUrl) . ');"';
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-contact-hero',
]);
?>

<div <?php echo $wrapper_attributes; ?><?php echo $wrapper_style; ?>>
    <div class="v-contact-hero__overlay">
        <div class="v-contact-hero__container">
            <div class="v-contact-hero__breadcrumbs v-animate fade-in-up">
                <a href="<?php echo esc_url(home_url('/')); ?>"><?php _e('Trang chủ', 'ai-zippy-child'); ?></a>
                <span class="sep">/</span>
                <span class="active"><?php _e('Liên hệ', 'ai-zippy-child'); ?></span>
            </div>
            <h1 class="v-contact-hero__title v-animate fade-in-up delay-100"><?php echo wp_kses_post($title); ?></h1>
            <?php if ($subtitle) : ?>
                <div class="v-contact-hero__subtitle-wrap v-animate fade-in-up delay-200">
                    <p class="v-contact-hero__subtitle"><?php echo wp_kses_post($subtitle); ?></p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>
