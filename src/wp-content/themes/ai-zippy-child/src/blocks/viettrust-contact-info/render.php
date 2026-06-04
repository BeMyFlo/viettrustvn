<?php
/**
 * Render php for viettrust-contact-info block.
 *
 * @package WordPress
 */

defined('ABSPATH') || exit;

$directorName  = $attributes['directorName'] ?? 'NGUYỄN PHẠM TUẤN THANH';
$directorTitle = $attributes['directorTitle'] ?? 'DIRECTOR';
$phone         = $attributes['phone'] ?? '0902 440 209';
$email         = $attributes['email'] ?? 'thanh.nguyen@viettrustvn.com';
$website       = $attributes['website'] ?? 'viettrustvn.com';
$qrCodeUrl     = $attributes['qrCodeUrl'] ?? '';
$officeAddress = $attributes['officeAddress'] ?? '';
$mapIframe     = $attributes['mapIframe'] ?? '';

// Fallback for QR Code
if (empty($qrCodeUrl)) {
    $qrCodeUrl = get_stylesheet_directory_uri() . '/assets/zalo-qr.png';
}

// Get custom site logo for the card
$custom_logo_id = get_theme_mod('custom_logo');
$logo_url = '';
if ($custom_logo_id) {
    $logo_url = wp_get_attachment_image_url($custom_logo_id, 'full');
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'v-contact-info',
]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="v-contact-info__container">
        <div class="v-contact-info__grid">
            
            <!-- Cột trái: Tấm danh thiếp kỹ thuật số -->
            <div class="v-contact-info__col-card v-animate fade-in-left">
                <div class="v-contact-card">
                    <div class="v-contact-card__left">
                        <div class="v-contact-card__header">
                            <h3 class="v-contact-card__name"><?php echo esc_html($directorName); ?></h3>
                            <p class="v-contact-card__title"><?php echo esc_html($directorTitle); ?></p>
                        </div>
                        <div class="v-contact-card__details">
                            <a href="tel:<?php echo esc_attr(str_replace(' ', '', $phone)); ?>" class="v-contact-card__item">
                                <span class="v-contact-card__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </span>
                                <span class="v-contact-card__val"><?php echo esc_html($phone); ?></span>
                            </a>
                            <a href="mailto:<?php echo esc_attr($email); ?>" class="v-contact-card__item">
                                <span class="v-contact-card__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </span>
                                <span class="v-contact-card__val"><?php echo esc_html($email); ?></span>
                            </a>
                            <a href="https://<?php echo esc_attr($website); ?>" target="_blank" rel="noopener noreferrer" class="v-contact-card__item">
                                <span class="v-contact-card__icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                </span>
                                <span class="v-contact-card__val"><?php echo esc_html($website); ?></span>
                            </a>
                        </div>
                        <div class="v-contact-card__qr">
                            <?php if ($qrCodeUrl) : ?>
                                <img src="<?php echo esc_url($qrCodeUrl); ?>" alt="Zalo QR" class="v-contact-card__qr-img" />
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="v-contact-card__right">
                        <div class="v-contact-card__brand">
                            <?php if ($logo_url) : ?>
                                <img src="<?php echo esc_url($logo_url); ?>" alt="Viettrust Logo" class="v-contact-card__logo" />
                            <?php else : ?>
                                <span class="v-contact-card__brand-text"><?php bloginfo('name'); ?></span>
                            <?php endif; ?>
                            <p class="v-contact-card__slogan"><?php _e('ĐỐI TÁC TIN CẬY - GIẢI PHÁP HIỆU QUẢ', 'ai-zippy-child'); ?></p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Cột phải: Địa chỉ & Bản đồ -->
            <div class="v-contact-info__col-map v-animate fade-in-right delay-200">
                <div class="v-contact-address">
                    <h3 class="v-contact-address__heading"><?php _e('VĂN PHÒNG ĐẠI DIỆN', 'ai-zippy-child'); ?></h3>
                    <p class="v-contact-address__text"><?php echo esc_html($officeAddress); ?></p>
                </div>
                <div class="v-contact-map-wrap">
                    <?php if ($mapIframe) : ?>
                        <div class="v-contact-map-iframe">
                            <?php 
                            // Allow iframe tag for Google Maps nhúng
                            echo wp_kses($mapIframe, [
                                'iframe' => [
                                    'src'             => true,
                                    'width'           => true,
                                    'height'          => true,
                                    'style'           => true,
                                    'allowfullscreen' => true,
                                    'loading'         => true,
                                    'referrerpolicy'  => true,
                                ]
                            ]); 
                            ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>

        </div>
    </div>
</div>
