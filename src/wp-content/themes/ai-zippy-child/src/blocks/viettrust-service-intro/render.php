<?php

defined('ABSPATH') || exit;

$title       = $attributes['title'] ?? '';
$description = $attributes['description'] ?? '';
$btn_text    = $attributes['btnText'] ?? '';
$btn_url     = $attributes['btnUrl'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-service-intro',
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="v-service-intro__container">
        <div class="v-service-intro__row">
            
            <!-- Left Column: Content -->
            <div class="v-service-intro__col-text v-animate fade-in-left">
                <?php if ($title) : ?>
                    <h3 class="v-service-intro__title"><?php echo wp_kses_post($title); ?></h3>
                <?php endif; ?>

                <?php if ($description) : ?>
                    <div class="v-service-intro__desc"><?php echo wp_kses_post($description); ?></div>
                <?php endif; ?>
            </div>

            <!-- Right Column: CTA Button -->
            <div class="v-service-intro__col-btn v-animate fade-in-right delay-200">
                <?php if ($btn_text && $btn_url) : ?>
                    <a href="<?php echo esc_url($btn_url); ?>" class="v-service-intro__btn">
                        <span><?php echo esc_html($btn_text); ?></span>
                        <svg class="v-service-intro__btn-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </a>
                <?php endif; ?>
            </div>

        </div>
    </div>
</div>
