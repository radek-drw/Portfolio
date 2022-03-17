const hamburgerMenu = document.querySelector('.header__menu-hamburger');
const headerMenu = document.querySelector('.header__menu');
const header = document.querySelector('.header');
const blurryBg = document.querySelector('.header__blurry-bg');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('open');
  headerMenu.classList.toggle('show');
  blurryBg.classList.toggle('blur')
});