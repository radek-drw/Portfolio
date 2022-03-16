const hamburger = document.querySelector('.header__menu-hamburger');
const menu = document.querySelector('.header__menu');

hamburger.addEventListener('click', () => {
  menu.style.bottom = '50%'
})