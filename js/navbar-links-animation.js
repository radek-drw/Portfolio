const nav = $(".navbar");
const line = $("<div />").addClass("navbar--line");

line.appendTo(nav);

const active = nav.find(".navbar__main-nav-item--active");
let pos = 0;
let wid = 0;

if (active.length) {
  pos = active.position().left;
  wid = active.width();
  // Set initial position and width of the line
  line.css({
    left: pos,
    width: wid,
  });
}

nav.find(".navbar__main-nav-item a").click(function (e) {
  e.preventDefault();
  // Check if the clicked item is not already active and animation is not in progress
  if (
    !$(this).parent().hasClass("navbar__main-nav-item--active") &&
    !nav.hasClass("animate")
  ) {
    nav.addClass("animate");

    const _this = $(this);

    nav
      .find(".navbar__main-nav-item")
      .removeClass("navbar__main-nav-item--active");

    const position = _this.parent().position();
    const width = _this.parent().width();

    // Check direction of animation based on position of clicked item
    if (position.left >= pos) {
      line.animate(
        {
          width: position.left - pos + width,
        },
        300,
        function () {
          line.animate(
            {
              width: width,
              left: position.left,
            },
            150,
            function () {
              nav.removeClass("animate");
            }
          );
          _this.parent().addClass("navbar__main-nav-item--active");
        }
      );
    } else {
      line.animate(
        {
          left: position.left,
          width: pos - position.left + wid,
        },
        300,
        function () {
          line.animate(
            {
              width: width,
            },
            150,
            function () {
              nav.removeClass("animate");
            }
          );
          _this.parent().addClass("navbar__main-nav-item--active");
        }
      );
    }

    pos = position.left;
    wid = width;
  }
});
