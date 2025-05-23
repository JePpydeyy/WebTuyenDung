// Banner Slider
const bannerImages = document.querySelectorAll('.banner-wrapper .banner-image');
const bannerIndicators = document.querySelectorAll('.banner-wrapper .indicator');
const bannerBtnLeft = document.querySelector('.banner-wrapper .banner-btn-left');
const bannerBtnRight = document.querySelector('.banner-wrapper .banner-btn-right');
let bannerCurrent = 0;
let bannerTimer;

function showBannerSlide(index) {
    bannerImages.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index - 1 + bannerImages.length) % bannerImages.length) {
            slide.classList.add('prev');
        }
    });
    
    bannerIndicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    bannerCurrent = index;
}

function nextBannerSlide() {
    showBannerSlide((bannerCurrent + 1) % bannerImages.length);
}

function prevBannerSlide() {
    showBannerSlide((bannerCurrent - 1 + bannerImages.length) % bannerImages.length);
}

function startBannerAuto() {
    stopBannerAuto();
    bannerTimer = setInterval(nextBannerSlide, 5000);
}

function stopBannerAuto() {
    clearInterval(bannerTimer);
}

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialIndicators = document.querySelectorAll('.testimonial-section .indicator');
const testimonialBtnLeft = document.querySelector('.testimonial-section .banner-btn-left');
const testimonialBtnRight = document.querySelector('.testimonial-section .banner-btn-right');
let testimonialCurrent = 0;
let testimonialTimer;

function showTestimonialSlide(index) {
    // Hiển thị tất cả các slide trước
    testimonialSlides.forEach(slide => {
        slide.style.display = 'flex';
    });
    
    // Sau đó áp dụng classes active và prev
    testimonialSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index - 1 + testimonialSlides.length) % testimonialSlides.length) {
            slide.classList.add('prev');
        }
    });
    
    testimonialIndicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    testimonialCurrent = index;
}

function nextTestimonialSlide() {
    showTestimonialSlide((testimonialCurrent + 1) % testimonialSlides.length);
}

function prevTestimonialSlide() {
    showTestimonialSlide((testimonialCurrent - 1 + testimonialSlides.length) % testimonialSlides.length);
}

function startTestimonialAuto() {
    stopTestimonialAuto();
    testimonialTimer = setInterval(nextTestimonialSlide, 5000);
}

function stopTestimonialAuto() {
    clearInterval(testimonialTimer);
}

// Khởi tạo tất cả slider khi trang đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo banner slider
    if (bannerImages.length > 0) {
        // Thêm sự kiện cho các nút điều hướng banner
        if (bannerBtnLeft && bannerBtnRight) {
            bannerBtnLeft.addEventListener('click', () => {
                prevBannerSlide();
                stopBannerAuto();
            });
            
            bannerBtnRight.addEventListener('click', () => {
                nextBannerSlide();
                stopBannerAuto();
            });
        }
        
        // Thêm sự kiện cho các indicator của banner
        if (bannerIndicators.length) {
            bannerIndicators.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    showBannerSlide(i);
                    stopBannerAuto();
                });
            });
        }
        
        // Thêm sự kiện hover để dừng/bắt đầu tự động chuyển banner
        const bannerWrapper = document.querySelector('.banner-wrapper');
        if (bannerWrapper) {
            bannerWrapper.addEventListener('mouseenter', stopBannerAuto);
            bannerWrapper.addEventListener('mouseleave', startBannerAuto);
        }
        
        // Khởi tạo banner slide đầu tiên
        showBannerSlide(0);
        startBannerAuto();
    }
    
    // Khởi tạo testimonial slider
    if (testimonialSlides.length > 0) {
        // Thêm sự kiện cho các nút điều hướng testimonial
        if (testimonialBtnLeft && testimonialBtnRight) {
            testimonialBtnLeft.addEventListener('click', () => {
                prevTestimonialSlide();
                stopTestimonialAuto();
            });
            
            testimonialBtnRight.addEventListener('click', () => {
                nextTestimonialSlide();
                stopTestimonialAuto();
            });
        }
        
        // Thêm sự kiện cho các indicator của testimonial
        if (testimonialIndicators.length) {
            testimonialIndicators.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    showTestimonialSlide(i);
                    stopTestimonialAuto();
                });
            });
        }
        
        // Thêm sự kiện hover để dừng/bắt đầu tự động chuyển testimonial
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', stopTestimonialAuto);
            testimonialSlider.addEventListener('mouseleave', startTestimonialAuto);
        }
        
        // Khởi tạo testimonial slide đầu tiên
        showTestimonialSlide(0);
        startTestimonialAuto();
    }
});