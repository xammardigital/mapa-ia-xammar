document.addEventListener("DOMContentLoaded", () => {
    // Registre dels plugins de GSAP
    gsap.registerPlugin(ScrollTrigger);

    // 1. Animacions Intro (Hero)
    const tlHero = gsap.timeline();
    tlHero.from(".badge", { y: -30, opacity: 0, duration: 0.8, ease: "back.out(1.5)" })
          .from(".hero-title", { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.4")
          .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".scroll-indicator", { opacity: 0, duration: 1.2 }, "-=0.3");

    // Fons interactiu (Nodos i partícules del Hero)
    const nodesContainer = document.getElementById('nodes-container');
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    for (let i = 0; i < 25; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        
        // Mida aleatòria entre 4 i 12px
        const size = Math.random() * 8 + 4;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        
        // Posició inicial aleatòria
        const posX = Math.random() * vw;
        const posY = Math.random() * vh * 1.5; // Pot baixar una mica
        node.style.left = `${posX}px`;
        node.style.top = `${posY}px`;

        nodesContainer.appendChild(node);

        // Animació flotant constant
        gsap.to(node, {
            x: `random(-150, 150)`,
            y: `random(-150, 150)`,
            duration: `random(10, 25)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            opacity: `random(0.1, 0.7)`
        });
    }

    // 2. Animacions "Timeline" al fer scroll
    const timelineItems = gsap.utils.toArray('.timeline-item');
    timelineItems.forEach((item) => {
        // Marca circular d'esquerra a dreta
        gsap.from(item.querySelector('.timeline-marker'), {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
                trigger: item,
                start: "top 85%", // Dispara quan dalt arriba al 85% de la pantalla
            }
        });

        // Contingut entra difuminat des de la dreta
        gsap.from(item.querySelector('.timeline-content'), {
            x: 60,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
            }
        });
    });

    // 3. Targetes de projeccions futures
    gsap.fromTo(".future-card",
        { y: 80, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".future-section",
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Re-calcula el ScrollTrigger un cop es carreguin les fonts (evita targetes invisibles)
    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

    // 4. Barres de Progressió DeepMind
    const progressFills = gsap.utils.toArray('.progress-fill');
    
    // Configura un ScrollTrigger únic per la secció
    ScrollTrigger.create({
        trigger: ".performance-section",
        start: "top 70%",
        onEnter: () => {
            progressFills.forEach((fill, index) => {
                const targetWidth = fill.getAttribute('data-target');
                fill.style.width = '0%'; // Força reset
                gsap.to(fill, {
                    width: targetWidth,
                    duration: 1.5,
                    ease: "power3.inOut",
                    delay: index * 0.15 // Efecte cascada
                });
            });
        }
    });

    // 5. Animació del CTA Final
    gsap.from(".cta-box", {
        scale: 0.95,
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%"
        }
    });
});
