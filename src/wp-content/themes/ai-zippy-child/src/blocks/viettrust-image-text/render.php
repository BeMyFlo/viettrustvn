<?php

defined('ABSPATH') || exit;

$tagline        = $attributes['tagline'] ?? '';
$title          = $attributes['title'] ?? '';
$desc           = $attributes['description'] ?? '';
$btn_text       = $attributes['btnText'] ?? '';
$btn_url        = $attributes['btnUrl'] ?? '#';
$image_url      = $attributes['imageUrl'] ?? '';
$image_position = $attributes['imagePosition'] ?? 'left';
$style_type     = $attributes['styleType'] ?? 'classic';

$classes = array(
    'v-imgtext',
    'v-imgtext--' . esc_attr($image_position),
    'v-imgtext--' . esc_attr($style_type),
);

$wrapper_attributes = get_block_wrapper_attributes(['class' => implode(' ', $classes)]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="v-imgtext__container">
        <div class="v-imgtext__row">
            
            <!-- Media Column -->
            <div class="v-imgtext__media-col">
                <?php if ($image_url) : ?>
                    <div class="v-imgtext__img-wrap">
                        <img class="v-imgtext__img" src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy" />
                    </div>
                <?php endif; ?>
            </div>
            
            <!-- Content Column -->
            <div class="v-imgtext__content-col">
                <div class="v-imgtext__content">
                    <?php if ($tagline) : ?>
                        <span class="v-imgtext__tagline"><?php echo wp_kses_post($tagline); ?></span>
                    <?php endif; ?>
                    
                    <?php if ($title) : ?>
                        <h2 class="v-imgtext__title"><?php echo wp_kses_post($title); ?></h2>
                    <?php endif; ?>
                    
                    <?php if ($desc) : ?>
                        <p class="v-imgtext__desc"><?php echo wp_kses_post($desc); ?></p>
                    <?php endif; ?>
                    
                    <?php if ($btn_text) : ?>
                        <div class="v-imgtext__cta">
                            <a href="<?php echo esc_url($btn_url); ?>" class="v-imgtext__btn">
                                <span><?php echo esc_html($btn_text); ?></span>
                                <svg class="v-imgtext__btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </a>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            
        </div>
    </div>
</div>
