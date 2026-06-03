<?php

defined('ABSPATH') || exit;

$stats = $attributes['stats'] ?? [];

if (empty($stats)) {
    return;
}

$wrapper_attributes = get_block_wrapper_attributes(['class' => 'v-stats']);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="v-stats__container">
        <div class="v-stats__grid">
            <?php foreach ($stats as $index => $item) : 
                $number = $item['number'] ?? '';
                $label_vi = $item['labelVi'] ?? '';
                $label_en = $item['labelEn'] ?? '';
                $icon_url = $item['iconUrl'] ?? '';
                ?>
                <div class="v-stats__col">
                    <div class="v-stats__icon-wrap">
                        <?php if ($icon_url) : ?>
                            <img class="v-stats__icon" src="<?php echo esc_url($icon_url); ?>" alt="<?php echo esc_attr($label_vi); ?>" loading="lazy" />
                        <?php else : ?>
                            <svg class="v-stats__icon-fallback" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        <?php endif; ?>
                    </div>
                    
                    <div class="v-stats__content">
                        <?php if ($number) : ?>
                            <div class="v-stats__number"><?php echo esc_html($number); ?></div>
                        <?php endif; ?>
                        
                        <?php if ($label_vi) : ?>
                            <div class="v-stats__label-vi"><?php echo esc_html($label_vi); ?></div>
                        <?php endif; ?>
                        
                        <?php if ($label_en) : ?>
                            <div class="v-stats__label-en"><?php echo esc_html($label_en); ?></div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>
