// 当文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 客户Logo轮播效果
    const clientLogos = document.querySelectorAll('.client-logo');
    if (clientLogos.length > 0) {
        setInterval(function() {
            const activeIndex = Array.from(clientLogos).findIndex(logo => logo.classList.contains('active'));
            clientLogos[activeIndex].classList.remove('active');
            const nextIndex = (activeIndex + 1) % clientLogos.length;
            clientLogos[nextIndex].classList.add('active');
        }, 3000);
    }

    // 数字增长动画
    const stats = document.querySelectorAll('.stat-details h3');
    
    // 观察元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent.replace(/,/g, ''));
                animateValue(target, 0, value, 2000);
                observer.unobserve(target);
            }
        });
    }, {threshold: 0.5});
    
    // 为每个统计数字添加观察器
    stats.forEach(stat => {
        observer.observe(stat);
    });
    
    // 数字动画函数
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentValue = Math.floor(progress * (end - start) + start);
            obj.textContent = currentValue.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // 平滑滚动到锚点
    const menuLinks = document.querySelectorAll('.main-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}); 