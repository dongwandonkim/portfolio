const navBar = document.querySelector('#navbar');
const navMenu = document.querySelector('.navbar__menu');
const toggle = document.querySelector('.navbar__toggle-btn');
const contactBtn = document.querySelector('.home__contact');
const homeContainer = document.querySelector('.home__container');
const scrollTopBtn = document.querySelector('.scrollToTop');

const doc = document.documentElement;
const w = window;
let prevScroll = w.scrollY || doc.scrollTop;
let curScroll;
let direction = 0;
let prevDirection = 0;

const homeContainerHeight = homeContainer.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY < 60) {
    navBar.classList.remove('hide');
  }
  // //fadeout .home__container
  // homeContainer.style.opacity = 1 - window.scrollY / homeContainerHeight;
  //for navbar animation when scrolling
  checkScroll();
});

// toggle nav menu for small screen
toggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open'); //unable scroll Body
});

//show navbar on scroll up & hide on scroll down
const navbarHeight = navBar.getBoundingClientRect().height;
const checkScroll = () => {
  /*
   ** Find the direction of scroll
   ** 0 - initial, 1 - up, 2 - down
   */
  curScroll = w.scrollY || doc.scrollTop;
  if (curScroll > prevScroll) {
    //scrolled up
    direction = 2;
  } else if (curScroll < prevScroll) {
    //scrolled down
    direction = 1;
  }

  if (direction !== prevDirection) {
    toggleHeader(direction, curScroll);
  }

  prevScroll = curScroll;
};

const toggleHeader = (direction, curScroll) => {
  if (direction === 2 && curScroll > navbarHeight) {
    navBar.classList.add('hide');
    prevDirection = direction;
  } else if (direction === 1) {
    navBar.classList.remove('hide');
    prevDirection = direction;
  }
};

//scroll to section
navMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }
  navMenu.classList.remove('open');

  document.body.classList.remove('menu-open');
  scrollIntoView(link);
});

contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

const sectionIds = ['#home', '#projects', '#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});
