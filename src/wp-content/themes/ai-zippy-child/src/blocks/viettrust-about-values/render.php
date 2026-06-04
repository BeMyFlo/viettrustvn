<?php
/**
 * Render php for viettrust-about-values block.
 *
 * @package WordPress
 */

defined('ABSPATH') || exit;

$title = $attributes['title'] ?? __('Sứ mệnh - Tầm nhìn - Giá trị cốt lõi', 'ai-zippy-child');
$items = $attributes['items'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-about-values',
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="v-about-values__container">
        <?php if ($title) : ?>
            <div class="v-about-values__header v-animate fade-in-up">
                <h2 class="v-about-values__title"><?php echo wp_kses_post($title); ?></h2>
            </div>
        <?php endif; ?>

        <?php if (!empty($items)) : ?>
            <div class="v-about-values__items">
                <?php foreach ($items as $index => $item) : 
                    $item_title = $item['title'] ?? '';
                    $item_desc  = $item['description'] ?? '';
                    $item_img   = $item['imageUrl'] ?? '';
                    $delay_class = 'delay-' . min(($index + 1) * 100, 1000);
                    ?>
                    <div class="v-about-values__card v-animate fade-in-up <?php echo $delay_class; ?>">
                        <div class="v-about-values__icon-wrap">
                            <?php if ($item_img) : ?>
                                <img src="<?php echo esc_url($item_img); ?>" alt="<?php echo esc_attr($item_title); ?>" class="v-about-values__icon" loading="lazy" />
                            <?php endif; ?>
                        </div>
                        <div class="v-about-values__body">
                            <h3 class="v-about-values__card-title"><?php echo esc_html($item_title); ?></h3>
                            <p class="v-about-values__card-desc"><?php echo esc_html($item_desc); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>
