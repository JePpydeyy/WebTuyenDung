// Banner Carousel
const images = document.querySelectorAll('.banner-image');
const indicators = document.querySelectorAll('.indicator');
const btnLeft = document.querySelector('.banner-btn-left');
const btnRight = document.querySelector('.banner-btn-right');
let current = 0;
let timer;

function showSlide(index) {
    images.forEach((img, i) => {
        img.classList.remove('active', 'prev');
        if (i === index) {
            img.classList.add('active');
        } else if (i === (index - 1 + images.length) % images.length) {
            img.classList.add('prev');
        }
        if (indicators[i]) {
            indicators[i].classList.toggle('active', i === index);
        }
    });
    current = index;
}

function nextSlide() {
    showSlide((current + 1) % images.length);
}

function prevSlide() {
    showSlide((current - 1 + images.length) % images.length);
}

function startAuto() {
    stopAuto(); // Đảm bảo chỉ có một timer
    timer = setInterval(nextSlide, 3000);
}

function stopAuto() {
    clearInterval(timer);
}

if (btnLeft && btnRight) {
    btnLeft.onclick = () => { prevSlide(); stopAuto(); };
    btnRight.onclick = () => { nextSlide(); stopAuto(); };
}
if (indicators.length) {
    indicators.forEach((dot, i) => {
        dot.onclick = () => { showSlide(i); stopAuto(); };
    });
}

// Tạm dừng auto khi hover và tiếp tục khi rời chuột
const bannerWrapper = document.querySelector('.banner-wrapper');
if (bannerWrapper) {
    bannerWrapper.addEventListener('mouseenter', stopAuto);
    bannerWrapper.addEventListener('mouseleave', startAuto);
}

showSlide(0);
startAuto();

// Posts Grid và Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    if (!document.querySelector('.nav-toggle')) {
        const header = document.querySelector('header');
        const navToggle = document.createElement('div');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(navToggle);
    }
    
    const nav = document.querySelector('nav');
    const navToggle = document.querySelector('.nav-toggle');
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('open');
        nav.classList.toggle('open');
    });
    
    document.addEventListener('click', function(event) {
        if (!header.contains(event.target) && nav.classList.contains('open')) {
            navToggle.classList.remove('open');
            nav.classList.remove('open');
        }
    });
    
    // Posts Grid Logic
    const updateGridDisplay = function() {
        document.querySelectorAll('.posts-grid').forEach(grid => {
            const items = grid.querySelectorAll('.grid-item');
            const btn = grid.querySelector('.view-more-btn');
            
            if (window.innerWidth <= 767) {
                // Mobile: Hiển thị 3 mục đầu, ẩn các mục còn lại
                items.forEach((item, index) => {
                    item.style.display = index > 2 ? 'none' : '';
                });
                btn.style.display = items.length > 3 ? 'block' : 'none';
            } else {
                // Desktop: Hiển thị 6 mục đầu, ẩn các mục còn lại
                items.forEach((item, index) => {
                    item.style.display = index >= 6 ? 'none' : '';
                    item.classList.toggle('hidden', index >= 6);
                });
                btn.style.display = items.length > 6 ? 'block' : 'none';
            }
            
            btn.addEventListener('click', () => {
                items.forEach(item => {
                    item.style.display = '';
                    item.classList.remove('hidden');
                });
                btn.style.display = 'none';
            }, { once: true }); // Chỉ thêm sự kiện một lần
        });
    };
    
    // Chạy ban đầu và khi thay đổi kích thước
    updateGridDisplay();
    window.addEventListener('resize', updateGridDisplay);
});
