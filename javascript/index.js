const navBar = document.querySelector('#navbar');
const navMenu = document.querySelector('.navbar__menu');
const toggle = document.querySelector('.navbar__toggle-btn');

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
  console.log(event.target.dataset.link);
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
});
