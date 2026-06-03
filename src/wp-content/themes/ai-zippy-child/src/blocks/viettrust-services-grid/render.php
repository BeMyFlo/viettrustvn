<?php

defined('ABSPATH') || exit;

$title        = $attributes['title'] ?? '';
$subtitle     = $attributes['subtitle'] ?? '';
$sectionBgUrl = $attributes['sectionBgUrl'] ?? '';
$services     = $attributes['services'] ?? [];

if (empty($services)) {
    return;
}

$wrapper_style = '';
if ($sectionBgUrl) {
    $wrapper_style = ' style="background-image: url(' . esc_url($sectionBgUrl) . '); background-size: cover; background-position: center; background-repeat: no-repeat;"';
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-services',
]);
?>

<div <?php echo $wrapper_attributes; ?><?php echo $wrapper_style; ?>>
    <div class="v-services__container">
        <?php if ($title || $subtitle) : ?>
            <div class="v-services__header">
                <?php if ($title) : ?>
                    <h2 class="v-services__title"><?php echo wp_kses_post($title); ?></h2>
                <?php endif; ?>
                
                <?php if ($subtitle) : ?>
                    <p class="v-services__subtitle"><?php echo wp_kses_post($subtitle); ?></p>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <div class="v-services__grid">
            <?php foreach ($services as $index => $service) : 
                $s_title = $service['title'] ?? '';
                $s_desc = $service['description'] ?? '';
                $s_bg = $service['bgImageUrl'] ?? '';
                $s_overlay = $service['overlayColor'] ?? 'rgba(16,43,92,0.85)';
                $s_link = $service['linkUrl'] ?? '#';
                $s_subs = $service['subServices'] ?? [];
                
                $card_style = '';
                if ($s_bg) {
                    $card_style = ' style="background-image: url(' . esc_url($s_bg) . ');"';
                }
                
                $overlay_style = ' style="background-color: ' . esc_attr($s_overlay) . ';"';
                ?>
                <div class="v-services__card"<?php echo $card_style; ?>>
                    <div class="v-services__card-overlay"<?php echo $overlay_style; ?>>
                        <div class="v-services__card-arrow">
                            <svg width="32" height="32" viewBox="0 0 32 32">
                                <circle fill-opacity="0.98" fill="#FFFFFF" cx="16" cy="16" r="16"></circle>
                                <path fill="<?php echo esc_attr($s_overlay); ?>" stroke="<?php echo esc_attr($s_overlay); ?>" d="M13.6782988,15.5990467 L19.6552568,8.6457479 C19.802325,8.47465605 19.802325,8.20051382 19.6552568,8.02942196 C19.5083274,7.85845111 19.2725399,7.85845111 19.1256104,8.02942196 L12.8822517,15.2926382 C12.7352875,15.4635687 12.7352875,15.7378723 12.8822517,15.9088028 L19.1256104,23.1687118 C19.1976537,23.2526847 19.294763,23.2977365 19.3889948,23.2977365 C19.4832613,23.2977365 19.5803706,23.2558307 19.6525526,23.1687118 C19.7994821,22.9977813 19.7994821,22.7234777 19.6525526,22.5525472 L13.6782988,15.5990467 Z" stroke-width="0.8" transform="translate(16.268793, 15.599465) rotate(90) translate(-16.268793, -15.599465)"></path>
                            </svg>
                        </div>
                        
                        <h4 class="v-services__card-title"><?php echo esc_html($s_title); ?></h4>
                        
                        <p class="v-services__card-desc"><?php echo esc_html($s_desc); ?></p>
                        
                        <div class="v-services__card-hover-content">
                            <?php if (!empty($s_subs)) : ?>
                                <div class="v-services__sub-grid">
                                    <?php foreach ($s_subs as $sub) : 
                                        $sub_title = $sub['title'] ?? '';
                                        $sub_icon = $sub['iconUrl'] ?? '';
                                        ?>
                                        <div class="v-services__sub-item">
                                            <?php if ($sub_icon) : ?>
                                                <img class="v-services__sub-icon" src="<?php echo esc_url($sub_icon); ?>" alt="<?php echo esc_attr($sub_title); ?>" loading="lazy" />
                                            <?php endif; ?>
                                            <span class="v-services__sub-title"><?php echo esc_html($sub_title); ?></span>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                            
                            <a class="v-services__explore-link" href="<?php echo esc_url($s_link); ?>">Khám phá</a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>
