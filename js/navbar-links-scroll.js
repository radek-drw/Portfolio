document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    const nav = document.querySelector(".navbar");
    const topOffset = nav.offsetHeight;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - topOffset,
      behavior: "smooth",
    });
  });
});
