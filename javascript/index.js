const navBar = document.querySelector('#navbar');
const navMenu = document.querySelector('.navbar__menu');
const toggle = document.querySelector('.navbar__toggle-btn');
const contactBtn = document.querySelector('.home__contact');
const homeContainer = document.querySelector('.home__container');

const homeContainerHeight = homeContainer.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  homeContainer.style.opacity = 1 - window.scrollY / homeContainerHeight;
});

// toggle nav menu
toggle.addEventListener('click', () => {
  if (navMenu.style.display === 'none') {
    navMenu.style.display = 'flex';
  } else {
    navMenu.style.display = 'none';
  }
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
  scrollIntoView(link);
});

contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
