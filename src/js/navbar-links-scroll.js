document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    const nav = document.querySelector(".navbar");
    // Get the height of the navigation bar to offset the scroll position
    const topOffset = nav.offsetHeight;

    // Scroll to the target element smoothly, offsetting by the navigation bar's height
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - topOffset,
      behavior: "smooth",
    });
  });
});
