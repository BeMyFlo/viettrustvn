<?php
/**
 * Render php for viettrust-about-hero block.
 *
 * @package WordPress
 */

defined('ABSPATH') || exit;

$title      = $attributes['title'] ?? __('VỀ CHÚNG TÔI', 'ai-zippy-child');
$subtitle   = $attributes['subtitle'] ?? __('ĐỐI TÁC TIN CẬY - GIẢI PHÁP HIỆU QUẢ', 'ai-zippy-child');
$bgImageUrl = $attributes['bgImageUrl'] ?? '';

$wrapper_style = '';
if ($bgImageUrl) {
    $wrapper_style = ' style="background-image: url(' . esc_url($bgImageUrl) . ');"';
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-about-hero',
]);
?>

<div <?php echo $wrapper_attributes; ?><?php echo $wrapper_style; ?>>
    <div class="v-about-hero__overlay">
        <div class="v-about-hero__container">
            <div class="v-about-hero__breadcrumbs v-animate fade-in-up">
                <a href="<?php echo esc_url(home_url('/')); ?>"><?php _e('Trang chủ', 'ai-zippy-child'); ?></a>
                <span class="sep">/</span>
                <span class="active"><?php _e('Về chúng tôi', 'ai-zippy-child'); ?></span>
            </div>
            <h1 class="v-about-hero__title v-animate fade-in-up delay-100"><?php echo wp_kses_post($title); ?></h1>
            <?php if ($subtitle) : ?>
                <div class="v-about-hero__subtitle-wrap v-animate fade-in-up delay-200">
                    <p class="v-about-hero__subtitle"><?php echo wp_kses_post($subtitle); ?></p>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>
