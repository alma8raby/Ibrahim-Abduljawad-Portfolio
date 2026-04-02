const body = document.body;
const themeToggle = document.querySelector("[data-theme-toggle]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu-panel]");
const navLinks = document.querySelectorAll(".nav-links a");
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const revealTargets = document.querySelectorAll(".section-heading, .panel, .hero-copy, .hero-aside");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const applyTheme = (theme) => {
    body.dataset.theme = theme;
};

const getPreferredTheme = () => {
    const storedTheme = localStorage.getItem("theme-preference");

    if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme;
    }

    return mediaQuery.matches ? "dark" : "light";
};

const syncThemePreference = () => {
    applyTheme(getPreferredTheme());
};

const closeMenu = () => {
    if (!menuToggle || !menuPanel) {
        return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuPanel.classList.remove("is-open");
};

const toggleMenu = () => {
    if (!menuToggle || !menuPanel) {
        return;
    }

    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    const nextState = String(!isOpen);

    menuToggle.setAttribute("aria-expanded", nextState);
    menuToggle.setAttribute("aria-label", !isOpen ? "Close menu" : "Open menu");
    menuPanel.classList.toggle("is-open", !isOpen);
};

syncThemePreference();

themeToggle?.addEventListener("click", () => {
    const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme-preference", nextTheme);
    applyTheme(nextTheme);
});

menuToggle?.addEventListener("click", toggleMenu);

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

mediaQuery.addEventListener("change", () => {
    if (!localStorage.getItem("theme-preference")) {
        syncThemePreference();
    }
});

if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
    revealTargets.forEach((target) => {
        target.setAttribute("data-reveal", "");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealTargets.forEach((target) => {
        revealObserver.observe(target);
    });
}
