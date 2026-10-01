/* =========================================
   ZAHRA FUTURE - MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       PRELOADER
    ===================================== */

    const preloader = document.querySelector(".preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 700);

    });


    /* =====================================
       HEADER SCROLL
    ===================================== */

    const header = document.getElementById("header");

    function handleHeader() {

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("open");
        document.body.classList.toggle("no-scroll");

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("open");
            document.body.classList.remove("no-scroll");

        });

    });


    /* =====================================
       ACTIVE NAV LINK
    ===================================== */

    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${current}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================
       COUNTER ANIMATION
    ===================================== */

    const counters = document.querySelectorAll(".counter");

    let counterStarted = false;

    function startCounters() {

        if (counterStarted) return;

        const statsSection = document.querySelector(".stats");

        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {

            counterStarted = true;

            counters.forEach(counter => {

                const target = Number(counter.dataset.target);

                let current = 0;

                const duration = 1600;

                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const progress =
                        Math.min((currentTime - startTime) / duration, 1);

                    const ease =
                        1 - Math.pow(1 - progress, 3);

                    current = Math.floor(target * ease);

                    counter.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }

                }

                requestAnimationFrame(updateCounter);

            });

        }

    }

    window.addEventListener("scroll", startCounters);

    startCounters();


    /* =====================================
       GALLERY FILTER
    ===================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.getAttribute("data-filter");

            galleryItems.forEach(item => {

                const category =
                    item.getAttribute("data-category");

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.classList.remove("hide");

                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    }, 30);

                } else {

                    item.style.opacity = "0";
                    item.style.transform = "scale(.85)";

                    setTimeout(() => {
                        item.classList.add("hide");
                    }, 300);

                }

            });

        });

    });


    /* =====================================
       SMOOTH SCROLL
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (targetId === "#") return;

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                10;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================
       GALLERY IMAGE LIGHTBOX
    ===================================== */

    const galleryImages =
        document.querySelectorAll(".gallery-item img");

    galleryImages.forEach(image => {

        image.parentElement.addEventListener("click", () => {

            const lightbox =
                document.createElement("div");

            lightbox.className = "lightbox";

            lightbox.innerHTML = `
                <div class="lightbox-close">
                    <i class="fa-solid fa-xmark"></i>
                </div>

                <img src="${image.src}" alt="${image.alt}">
            `;

            document.body.appendChild(lightbox);

            setTimeout(() => {
                lightbox.classList.add("active");
            }, 10);

            lightbox.addEventListener("click", event => {

                if (
                    event.target === lightbox ||
                    event.target.closest(".lightbox-close")
                ) {

                    lightbox.classList.remove("active");

                    setTimeout(() => {
                        lightbox.remove();
                    }, 300);

                }

            });

        });

    });


    /* =====================================
       PHONE BUTTON ANIMATION
    ===================================== */

    const phoneButtons =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );

    phoneButtons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            const icon =
                button.querySelector("i");

            if (icon) {

                icon.classList.add("fa-shake");

            }

        });

        button.addEventListener("mouseleave", () => {

            const icon =
                button.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-shake");

            }

        });

    });


    /* =====================================
       PARALLAX HERO SHAPES
    ===================================== */

    const shapes =
        document.querySelectorAll(".hero-shapes .shape");

    window.addEventListener("mousemove", event => {

        const x =
            (event.clientX / window.innerWidth - .5);

        const y =
            (event.clientY / window.innerHeight - .5);

        shapes.forEach((shape, index) => {

            const speed = (index + 1) * 8;

            shape.style.transform =
                `translate(${x * speed}px, ${y * speed}px)`;

        });

    });


    /* =====================================
       YEAR
    ===================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =====================================
       ADD LIGHTBOX CSS
    ===================================== */

    const lightboxStyle =
        document.createElement("style");

    lightboxStyle.textContent = `

        .lightbox {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,.9);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
            opacity: 0;
            visibility: hidden;
            transition: .3s;
        }

        .lightbox.active {
            opacity: 1;
            visibility: visible;
        }

        .lightbox img {
            max-width: 90%;
            max-height: 85vh;
            object-fit: contain;
            border-radius: 15px;
            transform: scale(.8);
            transition: .4s;
        }

        .lightbox.active img {
            transform: scale(1);
        }

        .lightbox-close {
            position: absolute;
            top: 25px;
            left: 25px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: white;
            color: #111;
            display: grid;
            place-items: center;
            cursor: pointer;
            font-size: 20px;
        }

        @media(max-width:600px) {

            .lightbox {
                padding: 15px;
            }

            .lightbox img {
                max-width: 100%;
            }

        }

    `;

    document.head.appendChild(lightboxStyle);


    /* =====================================
       TYPING EFFECT
    ===================================== */

    const heroTitle =
        document.querySelector(".hero h1");

    if (heroTitle) {

        heroTitle.style.opacity = "0";

        setTimeout(() => {

            heroTitle.style.opacity = "1";

        }, 300);

    }


    /* =====================================
       PREVENT IMAGE DRAGGING
    ===================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("dragstart", event => {
            event.preventDefault();
        });

    });

});