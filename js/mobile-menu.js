const mobileToggle = document.querySelector(".navbar__mobile-nav-toggle");
const mobileNav = document.querySelector(".navbar__mobile-nav");
const elementsToBlur = document.querySelectorAll(
  ".navbar__name, .about, .skills, .portfolio, .contact, .footer"
); // Add all sections or elements you want to blur

const toggleLines = Array.from(mobileToggle.querySelectorAll(".toggle__line"));

const applyBlurEffect = (apply) => {
  elementsToBlur.forEach((element) => {
    element.classList.toggle("blur", apply);
  });
};

const toggleNavActiveState = (isActive) => {
  mobileNav.classList.toggle("navbar__mobile-nav--active", isActive);
  mobileToggle.classList.toggle("navbar__mobile-nav-toggle--active", isActive);
  toggleLines.forEach((line) => {
    ["top", "middle", "bottom"].forEach((position) => {
      if (line.classList.contains(`toggle__line-${position}`)) {
        line.classList.toggle(`toggle__line-${position}--active`, isActive);
      }
    });
  });
  applyBlurEffect(isActive);
};

mobileToggle.addEventListener("click", () => {
  const isActive = !mobileNav.classList.contains("navbar__mobile-nav--active");
  toggleNavActiveState(isActive);
});

document.addEventListener("click", (event) => {
  if (
    !mobileNav.contains(event.target) &&
    !mobileToggle.contains(event.target)
  ) {
    if (mobileNav.classList.contains("navbar__mobile-nav--active")) {
      toggleNavActiveState(false);
    }
  }
});

mobileNav.addEventListener("click", (event) => {
  if (event.target.closest(".navbar__mobile-nav-item")) {
    toggleNavActiveState(false);
  }
});
