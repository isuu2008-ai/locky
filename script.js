(function () {
  const googleFormUrl = "https://forms.gle/vaefeZJ9auDYgCfGA";
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");

  const getHeaderOffset = () => (header ? header.offsetHeight + 14 : 0);

  document.querySelectorAll("[data-google-form-link]").forEach((link) => {
    link.href = googleFormUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  const scrollToTarget = (target) => {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const top = targetElement.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
    window.scrollTo({ top, behavior: "smooth" });
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = anchor.getAttribute("href");
      if (!target || target === "#") return;

      event.preventDefault();
      scrollToTarget(target);

      if (navMenu && navMenu.classList.contains("is-open")) {
        navMenu.classList.remove("is-open");
        navToggle?.setAttribute("aria-expanded", "false");
      }
    });
  });

  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!navMenu || !navToggle || !navMenu.classList.contains("is-open")) return;
    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }
})();
