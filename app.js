document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el, index) => {
        // Add a slight stagger to elements with the 'stagger' class based on their DOM position
        if(el.classList.contains('stagger')) {
            el.style.transitionDelay = `${(index % 3) * 0.2}s`;
        }
        observer.observe(el);
    });

    // Parallax effect for massive text and some visuals
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Navigation background toggle
        const nav = document.querySelector('.main-nav');
        if (scrolled > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Massive outline text moving opposite to scroll
        const outlineText = document.querySelector('.outline-text');
        if(outlineText) {
            outlineText.style.transform = `translateX(${5 - (scrolled * 0.05)}vw)`;
        }

        // Slight parallax for hero text
        const heroTitle = document.querySelector('.title-txintxarri');
        if (heroTitle) {
            heroTitle.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Mobile Menu Logic
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const mainNav = document.querySelector('.main-nav');
    const bgVideo = document.getElementById('bg-video');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpening = !navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('menu-open');

            // Pause/resume background video
            if (bgVideo) {
                if (isOpening) {
                    bgVideo.pause();
                } else {
                    bgVideo.play();
                }
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            mainNav.classList.remove('menu-open');

            // Resume video when menu closes
            if (bgVideo) bgVideo.play();
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Loop teaser video only up to 20 seconds
    const teaserVideo = document.getElementById('teaser-video');
    if (teaserVideo) {
        teaserVideo.addEventListener('timeupdate', () => {
            if (teaserVideo.currentTime >= 20) {
                teaserVideo.currentTime = 0;
                teaserVideo.play();
            }
        });
    }

    // Translations
    const translations = {
        eu: {
            navAbout: "Biografia",
            navServices: "Zer Eskaintzen Dugu",
            navRec: "Grabazioak",
            navContact: "Kontaktua",
            heroSubtitle: "KALEAK DARDARAN JARTZEN",
            heroCta: "KONTAKTATU!",
            marquee1: "MUSIKA ONENA",
            marquee2: "GIRO BIKAINA",
            marquee3: "FESTA GORRIA",
            marquee4: "KALEKO ERREGEAK",
            aboutTitle: "MUSIKA<br><span class=\"highlight\">KALEAN</span>",
            aboutP1: "Gu <strong class=\"brand-name\">tXINtXARRI tXARANGA</strong> gara, 15 gazteez osatutako musikari taldea.",
            aboutP2: "Gure udal-herrian, hau da, Irunen, musika ikasketak egiten genituela ezagutu genuen elkar. Txikitatik daramagu gure musika besteekin partekatzen bai bakarlari eta bai talde gisa. 2025eko abuztuan gure txaranga sortzeko proiektua martxan jartzeko asmoarekin entseguak hasi eta abenduan gure lehen emanaldia eskaintzeko aukera suertatu zitzaigun. Handik aurrera Euskal Herriko kaleak zein plazak gure musikarekin alaitzen jarraitu ditugu.",
            aboutP3: "Gaur egun, prest gaude hiri, herri eta auzoetako festetan parte hartzeko beste ospakizun askotaz gain. Errepertorio anitza da gure ezaugarrietako bat, txarangek normalean jo izan dituzten abestiak gaur egungo musikarekin nahasten batitugu, adin guztietako jendeak goza dezan.",
            banner1: "ZURE HERRIAN.",
            banner2: "ZURE FESTAN.",
            promoTitle: "ESTUDIOKO GRABAZIO BERRIAK!",
            promoDesc: "Sartu gure YouTube kanalera eta entzun estudioan grabatu berri ditugun abestiak. Kalitate gorena, energia bera!",
            promoCtaPre: "IKUSI",
            promoTracks: "ABESTIAK",
            footerTitle: "KONTAKTUA<span class=\"text-gold\">!</span>",
            footerDesc: "Deitu eta eraman txintxarriren magia zure ekitaldira."
        },
        es: {
            navAbout: "BIOGRAFIA",
            navServices: "Qué Ofrecemos",
            navRec: "Grabaciones",
            navContact: "Contacto",
            heroSubtitle: "HACIENDO TEMBLAR LAS CALLES",
            heroCta: "¡CONT<span class='fake-accent'>A</span>CTANOS!",
            marquee1: "LA MEJOR MUSICA",
            marquee2: "AMBIENTE INCREIBLE",
            marquee3: "PURA FIESTA",
            marquee4: "LOS REYES DE LA CALLE",
            aboutTitle: "MUSICA<br><span class=\"highlight\">EN LA CALLE</span>",
            aboutP1: "Somos <strong class=\"brand-name\">tXINtXARRI tXARANGA</strong>, un grupo de 15 jóvenes músicos.",
            aboutP2: "Nos conocimos realizando nuestros estudios musicales en nuestra ciudad, Irun. Llevamos desde pequeños compartiendo nuestra música con los demás, tanto como solistas como en grupo. En agosto de 2025 comenzamos los ensayos con la intención de poner en marcha el proyecto de nuestra propia txaranga, y en diciembre surgió la oportunidad de ofrecer nuestra primera actuación. Desde entonces, seguimos alegrando con nuestra música tanto las calles como las plazas de Euskal Herria.",
            aboutP3: "Hoy en día, estamos preparados para participar en las fiestas de ciudades, pueblos y barrios, además de en muchas otras celebraciones. Un repertorio variado es una de nuestras características, ya que mezclamos las canciones que las txarangas suelen tocar habitualmente con música actual, para que gente de todas las edades pueda disfrutar.",
            banner1: "EN TU PUEBLO.",
            banner2: "EN TU FIESTA.",
            promoTitle: "¡NUEVAS GRABACIONES!",
            promoDesc: "Entra en nuestro canal de YouTube y escucha los temas que acabamos de grabar en el estudio. ¡Máxima calidad, la misma energía!",
            promoCtaPre: "VER EN",
            promoTracks: "CANCIONES",
            footerTitle: "¡CONTACTO<span class=\"text-gold\">!</span>",
            footerDesc: "Llama y lleva la magia de txintxarri a tu evento."
        }
    };

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            // Update active state
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Translate all data-i18n elements
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });
        });
    });

    // Interactive Grid Banner
    const banner = document.querySelector('#interactive-banner');
    if (banner) {
        const cellSize = 40;
        let rows = 4; // Banner height approx 150px
        
        const initGrid = () => {
            banner.innerHTML = '';
            const cols = Math.floor(window.innerWidth / cellSize) + 2; 
            const totalDots = cols * rows;
            
            const musicIcons = ['♪', '♫', '♬', '♭', '♮', '♯'];
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.className = 'grid-dot';
                dot.innerText = musicIcons[Math.floor(Math.random() * musicIcons.length)];
                banner.appendChild(dot);
            }
        };
        
        initGrid();
        window.addEventListener('resize', initGrid);
        
        banner.addEventListener('mousemove', (e) => {
            const rect = banner.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const dots = banner.querySelectorAll('.grid-dot');
            dots.forEach((dot, index) => {
                const dotRect = dot.getBoundingClientRect();
                const dotX = dotRect.left - rect.left + dotRect.width / 2;
                const dotY = dotRect.top - rect.top + dotRect.height / 2;
                
                const dist = Math.sqrt(Math.pow(mouseX - dotX, 2) + Math.pow(mouseY - dotY, 2));
                const maxDist = 150;
                
                if (dist < maxDist) {
                    const scale = 1 + (maxDist - dist) / 40; 
                    const isOrange = index % 3 === 0; 
                    const color = isOrange ? 'var(--orange)' : 'var(--blue)';
                    
                    // Push dots away slightly to create a ripple effect
                    const pushX = (dotX - mouseX) / 10;
                    const pushY = (dotY - mouseY) / 10;
                    
                    dot.style.transform = `scale(${scale}) translate(${pushX}px, ${pushY}px)`;
                    dot.style.color = color;
                    dot.style.textShadow = `0 0 15px ${color}`;
                    dot.style.opacity = 1;
                } else {
                    dot.style.transform = 'scale(1) translate(0, 0)';
                    dot.style.color = 'rgba(0, 0, 0, 0.1)';
                    dot.style.textShadow = 'none';
                    dot.style.opacity = 0.5;
                }
            });
        });
        
        banner.addEventListener('mouseleave', () => {
            const dots = banner.querySelectorAll('.grid-dot');
            dots.forEach(dot => {
                dot.style.transform = 'scale(1) translate(0, 0)';
                dot.style.color = 'rgba(0, 0, 0, 0.1)';
                dot.style.textShadow = 'none';
                dot.style.opacity = 0.5;
            });
        });
    }
});
