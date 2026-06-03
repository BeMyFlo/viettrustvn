<?php

defined('ABSPATH') || exit;

$title          = $attributes['title'] ?? '';
$description    = $attributes['description'] ?? '';
$highlight_text = $attributes['highlightText'] ?? '';
$btn_text       = $attributes['btnText'] ?? '';
$btn_url        = $attributes['btnUrl'] ?? '';
$image_url      = $attributes['imageUrl'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-cta-banner',
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="v-cta-banner__container">
        <div class="v-cta-banner__box">
            <div class="v-cta-banner__row">
                
                <!-- Left Column: Image -->
                <div class="v-cta-banner__col-img">
                    <?php if ($image_url) : ?>
                        <div class="v-cta-banner__image-wrap">
                            <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" class="v-cta-banner__image" loading="lazy" />
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Right Column: Text & CTA Button -->
                <div class="v-cta-banner__col-content">
                    <div class="v-cta-banner__item">
                        <?php if ($title) : ?>
                            <h4 class="v-cta-banner__item-title"><?php echo wp_kses_post($title); ?></h4>
                        <?php endif; ?>

                        <?php if ($description) : ?>
                            <div class="v-cta-banner__item-desc"><?php echo wp_kses_post($description); ?></div>
                        <?php endif; ?>

                        <?php if ($highlight_text) : ?>
                            <p class="v-cta-banner__item-highlight"><?php echo wp_kses_post($highlight_text); ?></p>
                        <?php endif; ?>

                        <?php if ($btn_text && $btn_url) : ?>
                            <div class="v-cta-banner__button-wrap">
                                <a href="<?php echo esc_url($btn_url); ?>" class="v-cta-banner__button">
                                    <span><?php echo esc_html($btn_text); ?></span>
                                    <svg class="v-cta-banner__button-arrow" width="18" height="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                    </svg>
                                </a>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
