const mobileToggle = document.querySelector(".navbar__mobile-nav-toggle");
const mobileNav = document.querySelector(".navbar__mobile-nav");

const elementsToBlur = document.querySelectorAll(
  ".navbar__name, .about, .skills, .portfolio, .contact, .footer"
);

const toggleLines = Array.from(mobileToggle.querySelectorAll(".toggle__line"));

const applyBlurEffect = (apply) => {
  elementsToBlur.forEach((element) => {
    element.classList.toggle("blur", apply);
  });
};

// Function to toggle the active state of the mobile navigation and its elements
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

// Add click event listener to the document to close mobile nav if clicked outside
document.addEventListener("click", (e) => {
  if (
    !mobileNav.contains(e.target) && // Check if the click is outside the mobile nav
    !mobileToggle.contains(e.target) // Check if the click is outside the toggle button
  ) {
    if (mobileNav.classList.contains("navbar__mobile-nav--active")) {
      toggleNavActiveState(false);
    }
  }
});

// Add click event listener to the mobile nav to close it when an item is clicked
mobileNav.addEventListener("click", (event) => {
  if (event.target.closest(".navbar__mobile-nav-item")) {
    toggleNavActiveState(false);
  }
});
