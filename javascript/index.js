const navBar = document.querySelector('#navbar');
const navMenu = document.querySelector('.navbar__menu');
const toggle = document.querySelector('.navbar__toggle-btn');
const contactBtn = document.querySelector('.home__contact');
const homeContainer = document.querySelector('.home__container');

// fadeout .home__container
const homeContainerHeight = homeContainer.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  homeContainer.style.opacity = 1 - window.scrollY / homeContainerHeight;
});

//scroll to top
const scrollTopBtn = document.querySelector('.scrollToTop');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeContainerHeight / 2) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
  scrollTopBtn.addEventListener('click', scrollToTop);
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// toggle nav menu for small screen
toggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

//sticky navbar
const navbarHeight = navBar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  //console.log(`getbound = ${abc}`);
  if (window.scrollY > navbarHeight) {
    navBar.classList.add('navbar--dark');
  } else {
    navBar.classList.remove('navbar--dark');
  }
});

//scroll to section
navMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }
  navMenu.classList.remove('open');
  scrollIntoView(link);
});

contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
