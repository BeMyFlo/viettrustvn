<?php
/**
 * Render php for viettrust-solutions-grid block.
 *
 * @package WordPress
 */

defined('ABSPATH') || exit;

$title     = $attributes['title'] ?? __('Giải pháp của chúng tôi', 'ai-zippy-child');
$solutions = $attributes['solutions'] ?? [];

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-solutions-grid',
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="v-solutions-grid__container">
        <?php if ($title) : ?>
            <div class="v-solutions-grid__header">
                <h2 class="v-solutions-grid__title"><?php echo wp_kses_post($title); ?></h2>
            </div>
        <?php endif; ?>

        <?php if (!empty($solutions)) : ?>
            <div class="v-solutions-grid__items">
                <?php foreach ($solutions as $item) : 
                    $sol_title = $item['title'] ?? '';
                    $sol_desc  = $item['description'] ?? '';
                    $sol_img   = $item['imageUrl'] ?? '';
                    ?>
                    <div class="v-solutions-grid__card">
                        <div class="v-solutions-grid__image-wrap">
                            <?php if ($sol_img) : ?>
                                <img src="<?php echo esc_url($sol_img); ?>" alt="<?php echo esc_attr($sol_title); ?>" class="v-solutions-grid__image" loading="lazy" />
                            <?php else : ?>
                                <div class="v-solutions-grid__placeholder-bg"></div>
                            <?php endif; ?>
                        </div>
                        <div class="v-solutions-grid__body">
                            <h3 class="v-solutions-grid__card-title"><?php echo esc_html($sol_title); ?></h3>
                            <p class="v-solutions-grid__card-desc"><?php echo esc_html($sol_desc); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>
