document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navList = document.querySelector('.main-nav .nav-list');
    const navLinks = document.querySelectorAll('.main-nav .nav-list a'); 

    
    const toggleMenu = () => {
        burgerMenu.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); 
    };

    burgerMenu.addEventListener('click', toggleMenu);


    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleMenu(); 
            }
        });
    });

    
    const contactModal = document.getElementById('contactModal');
    const openModalButtons = document.querySelectorAll('.btn-contact-modal'); 
    const closeModalButton = document.querySelector('.modal .close-button');

    
    const openModal = () => {
        contactModal.classList.add('show');
        document.body.classList.add('no-scroll'); 
    };

    
    const closeModal = () => {
        contactModal.classList.remove('show');
        document.body.classList.remove('no-scroll'); 
    };

    
    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            openModal();
        });
    });

    
    closeModalButton.addEventListener('click', closeModal);

    
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModal();
        }
    });

    
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    let slideWidth = slides[0].getBoundingClientRect().width;
    let currentSlideIndex = 0;

    
    const createDots = () => {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);

            dot.addEventListener('click', () => {
                moveToSlide(index);
            });
        });
    };

    
    const setSlideWidth = () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        carouselTrack.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
    };

    
    const moveToSlide = (index) => {
        carouselTrack.style.transform = `translateX(-${slideWidth * index}px)`;
        currentSlideIndex = index;
        updateDots();
    };

    
    const updateDots = () => {
        const dots = Array.from(dotsContainer.children);
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlideIndex].classList.add('active');
    };

    
    nextBtn.addEventListener('click', () => {
        let nextIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    });

    
    prevBtn.addEventListener('click', () => {
        let prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });

    
    createDots();
    setSlideWidth(); 
    window.addEventListener('resize', setSlideWidth); 

    
    let autoPlayInterval;
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            nextBtn.click(); 
        }, 5000); 
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    
    startAutoPlay();

    
    carouselTrack.addEventListener('mouseenter', stopAutoPlay);
    carouselTrack.addEventListener('mouseleave', startAutoPlay);
    nextBtn.addEventListener('mouseenter', stopAutoPlay);
    nextBtn.addEventListener('mouseleave', startAutoPlay);
    prevBtn.addEventListener('mouseenter', stopAutoPlay);
    prevBtn.addEventListener('mouseleave', startAutoPlay);


    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

});