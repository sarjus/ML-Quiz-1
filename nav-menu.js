const navRoot = document.querySelector(".site-nav");
const navToggle = document.querySelector(".nav-toggle");

if (navRoot && navToggle) {
  const navLinks = navRoot.querySelector(".nav-links");

  const closeMenu = () => {
    navRoot.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    navRoot.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  };

  navToggle.addEventListener("click", () => {
    if (navRoot.classList.contains("is-open")) {
      closeMenu();
      return;
    }

    openMenu();
  });

  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}
