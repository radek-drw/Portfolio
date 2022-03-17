const burgerMenu = document.querySelector('.header__menu-hamburger');
const headerMenu = document.querySelector('.header__menu');
const header = document.querySelector('.header');
const blurryBg = document.querySelector('.header__blurry-bg');

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('open');
  headerMenu.classList.toggle('show');
  blurryBg.classList.toggle('blur');
});

// Click blur background (when menu is open) to hide menu, change burger icon and remove blur
blurryBg.addEventListener('click', () => {
  burgerMenu.classList.remove('open');
  headerMenu.classList.remove('show');
  blurryBg.classList.remove('blur');
})