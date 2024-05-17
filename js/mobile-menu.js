const mobileToggle = document.querySelector(".mobile-nav-toggle");
const mobileNav = document.querySelector(".navbar__mobile-nav");
const elementsToBlur = document.querySelectorAll(
  ".about, .skills, .portfolio, .contact, .footer"
); // Add all sections or elements you want to blur

const applyBlurEffect = (apply) => {
  elementsToBlur.forEach((element) => {
    if (apply) {
      element.classList.add("blur");
    } else {
      element.classList.remove("blur");
    }
  });
};

mobileToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("navbar__mobile-nav--active");
  applyBlurEffect(mobileNav.classList.contains("navbar__mobile-nav--active"));
});

document.addEventListener("click", (event) => {
  if (
    !mobileNav.contains(event.target) &&
    !mobileToggle.contains(event.target)
  ) {
    if (mobileNav.classList.contains("navbar__mobile-nav--active")) {
      mobileNav.classList.remove("navbar__mobile-nav--active");
      applyBlurEffect(false);
    }
  }
});

mobileNav.addEventListener("click", (event) => {
  if (event.target.closest(".navbar__mobile-nav-item")) {
    mobileNav.classList.remove("navbar__mobile-nav--active");
    applyBlurEffect(false);
  }
});
