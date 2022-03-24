const burgerMenu = document.querySelector('.menu__hamburger');
const headerMenu = document.querySelector('.menu');
const blurryBg = document.querySelector('.header__blurry-bg');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('menu__hamburger--open');
  headerMenu.classList.toggle('menu--show');
  blurryBg.classList.toggle('blur');
});

// Click blur background (when menu is open) to hide menu, change burger icon and remove blur
blurryBg.addEventListener('click', () => {
  burgerMenu.classList.remove('menu__hamburger--open');
  headerMenu.classList.remove('menu--show');
  blurryBg.classList.remove('blur');
})