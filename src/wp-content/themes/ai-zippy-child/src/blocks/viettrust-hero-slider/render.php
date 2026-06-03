<?php

defined('ABSPATH') || exit;

$slides         = $attributes['slides'] ?? [];
$autoplay       = $attributes['autoplay'] ?? true;
$autoplay_speed = $attributes['autoplaySpeed'] ?? 5000;

if (empty($slides)) {
    return;
}

$unique_id = uniqid('v-hero-');
$wrapper_attributes = get_block_wrapper_attributes(['class' => 'v-hero', 'id' => $unique_id]);
?>

<div <?php echo $wrapper_attributes; ?>>
    <div class="v-hero__slides-wrapper">
        <?php foreach ($slides as $index => $slide) : 
            $title = $slide['title'] ?? '';
            $desc = $slide['description'] ?? '';
            $bg_url = $slide['imageUrl'] ?? '';
            $btn_text = $slide['btnText'] ?? '';
            $btn_url = $slide['btnUrl'] ?? '#';
            $opacity = $slide['overlayOpacity'] ?? 40;
            
            $slide_style = '';
            if ($bg_url) {
                $slide_style = 'background-image: url(' . esc_url($bg_url) . ');';
            }
            ?>
            <div class="v-hero__slide <?php echo $index === 0 ? 'active' : ''; ?>" style="<?php echo $slide_style; ?>" data-index="<?php echo $index; ?>">
                <div class="v-hero__overlay" style="background-color: rgba(9, 18, 33, 0.9); opacity: <?php echo esc_attr($opacity / 100); ?>;"></div>
                <div class="v-hero__container">
                    <div class="v-hero__content">
                        <?php if ($title) : ?>
                            <h2 class="v-hero__title"><?php echo wp_kses_post(nl2br($title)); ?></h2>
                        <?php endif; ?>
                        
                        <?php if ($desc) : ?>
                            <p class="v-hero__desc"><?php echo wp_kses_post(nl2br($desc)); ?></p>
                        <?php endif; ?>
                        
                        <?php if ($btn_text) : ?>
                            <div class="v-hero__cta">
                                <a href="<?php echo esc_url($btn_url); ?>" class="v-hero__btn">
                                    <span><?php echo esc_html($btn_text); ?></span>
                                    <svg class="v-hero__btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </a>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>

    <?php if (count($slides) > 1) : ?>
        <!-- Arrows -->
        <button class="v-hero__arrow v-hero__arrow--prev" aria-label="Previous Slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
        </button>
        <button class="v-hero__arrow v-hero__arrow--next" aria-label="Next Slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
        </button>

        <!-- Dots -->
        <div class="v-hero__dots">
            <?php foreach ($slides as $index => $slide) : ?>
                <button class="v-hero__dot <?php echo $index === 0 ? 'active' : ''; ?>" data-slide="<?php echo $index; ?>" aria-label="Go to slide <?php echo $index + 1; ?>"></button>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const heroId = '<?php echo esc_js($unique_id); ?>';
    const heroEl = document.getElementById(heroId);
    if (!heroEl) return;

    const slides = heroEl.querySelectorAll('.v-hero__slide');
    const dots = heroEl.querySelectorAll('.v-hero__dot');
    const prevBtn = heroEl.querySelector('.v-hero__arrow--prev');
    const nextBtn = heroEl.querySelector('.v-hero__arrow--next');
    
    if (slides.length <= 1) return;

    let currentIndex = 0;
    let slideInterval = null;
    const isAutoplay = <?php echo $autoplay ? 'true' : 'false'; ?>;
    const autoplaySpeed = <?php echo (int)$autoplay_speed; ?>;

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        if (dots.length > 0) dots[currentIndex].classList.remove('active');
        
        currentIndex = (index + slides.length) % slides.length;
        
        slides[currentIndex].classList.add('active');
        if (dots.length > 0) dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        if (isAutoplay) {
            stopAutoplay();
            slideInterval = setInterval(nextSlide, autoplaySpeed);
        }
    }

    function stopAutoplay() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            startAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            startAutoplay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
            startAutoplay();
        });
    });

    // Start autoplay on load
    startAutoplay();

    // Pause autoplay on hover
    heroEl.addEventListener('mouseenter', stopAutoplay);
    heroEl.addEventListener('mouseleave', startAutoplay);
});
</script>
