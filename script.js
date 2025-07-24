document.addEventListener('DOMContentLoaded', () => {
    // ==================== 1. GESTION DU MENU BURGER ====================
    const burgerMenu = document.querySelector('.burger-menu');
    const navList = document.querySelector('.main-nav .nav-list');
    const navLinks = document.querySelectorAll('.main-nav .nav-list a'); // Tous les liens de navigation

    // Fonction pour basculer la visibilité du menu
    const toggleMenu = () => {
        burgerMenu.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Empêche le défilement du corps quand le menu est ouvert
    };

    burgerMenu.addEventListener('click', toggleMenu);

    // Ferme le menu lorsque l'on clique sur un lien (utile pour le responsive)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleMenu(); // Ferme le menu si ouvert
            }
        });
    });

    // ==================== 2. GESTION DE LA MODALE DE CONTACT ====================
    const contactModal = document.getElementById('contactModal');
    const openModalButtons = document.querySelectorAll('.btn-contact-modal'); // Boutons qui ouvrent la modale
    const closeModalButton = document.querySelector('.modal .close-button');

    // Fonction pour ouvrir la modale
    const openModal = () => {
        contactModal.classList.add('show');
        document.body.classList.add('no-scroll'); // Empêche le défilement du corps
    };

    // Fonction pour fermer la modale
    const closeModal = () => {
        contactModal.classList.remove('show');
        document.body.classList.remove('no-scroll'); // Permet le défilement du corps
    };

    // Attacher les événements aux boutons d'ouverture
    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du lien/bouton
            openModal();
        });
    });

    // Attacher l'événement au bouton de fermeture
    closeModalButton.addEventListener('click', closeModal);

    // Fermer la modale si l'utilisateur clique en dehors du contenu de la modale
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModal();
        }
    });

    // ==================== 3. GESTION DU CARROUSEL D'IMAGES ====================
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    let slideWidth = slides[0].getBoundingClientRect().width;
    let currentSlideIndex = 0;

    // Créer les indicateurs (dots)
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

    // Mettre à jour la largeur des slides (utile en cas de redimensionnement)
    const setSlideWidth = () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        carouselTrack.style.transform = `translateX(-${slideWidth * currentSlideIndex}px)`;
    };

    // Déplacer le carrousel vers une slide spécifique
    const moveToSlide = (index) => {
        carouselTrack.style.transform = `translateX(-${slideWidth * index}px)`;
        currentSlideIndex = index;
        updateDots();
    };

    // Mettre à jour l'état actif des dots
    const updateDots = () => {
        const dots = Array.from(dotsContainer.children);
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlideIndex].classList.add('active');
    };

    // Gérer le clic sur le bouton 'Suivant'
    nextBtn.addEventListener('click', () => {
        let nextIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    });

    // Gérer le clic sur le bouton 'Précédent'
    prevBtn.addEventListener('click', () => {
        let prevIndex = (currentSlideIndex - 1 + slides.length) % slides.length; // Assure que l'index reste positif
        moveToSlide(prevIndex);
    });

    // Initialisation du carrousel
    createDots();
    setSlideWidth(); // Définir la largeur initiale
    window.addEventListener('resize', setSlideWidth); // Ajuster la largeur si la fenêtre est redimensionnée

    // Optionnel: Auto-play du carrousel
    let autoPlayInterval;
    const startAutoPlay = () => {
        autoPlayInterval = setInterval(() => {
            nextBtn.click(); // Simule un clic sur le bouton suivant
        }, 5000); // Change de slide toutes les 5 secondes
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // Démarrer l'auto-play au chargement
    startAutoPlay();

    // Arrêter l'auto-play au survol et redémarrer après
    carouselTrack.addEventListener('mouseenter', stopAutoPlay);
    carouselTrack.addEventListener('mouseleave', startAutoPlay);
    nextBtn.addEventListener('mouseenter', stopAutoPlay);
    nextBtn.addEventListener('mouseleave', startAutoPlay);
    prevBtn.addEventListener('mouseenter', stopAutoPlay);
    prevBtn.addEventListener('mouseleave', startAutoPlay);


    // ==================== 4. ANIMATIONS AU SCROLL (Reveal au défilement) ====================
    // Nous allons utiliser l'Intersection Observer API pour une performance optimale
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // La viewport comme racine
        rootMargin: '0px',
        threshold: 0.2 // L'élément devient visible à 20% de sa hauteur
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Cesser d'observer une fois l'animation déclenchée
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Appliquer la classe fade-in à certaines sections ou éléments pour l'animation
    // Tu devras ajouter la classe 'fade-in' manuellement dans ton HTML aux éléments que tu veux animer.
    // Par exemple:
    // <h3 class="fade-in">Nos Espaces de Travail</h3>
    // <div class="space-card fade-in">...</div>
    // ou mieux, au conteneur de la section ou des cartes pour animer tout le bloc.

});