'use strict';

const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerBtn = document.querySelectorAll('.hamburger-btn');
const catlogBtn = document.querySelector('.catlog-btn');
const catelogItems = document.querySelector('.catelog-items');
const contextualMenuEl = document.querySelector('.contextualmenu-items');
const menuItems = document.querySelector('.menu-items');
const searchBtn = document.querySelector('#search-btn');
const goBackBtn = document.querySelector('.go-back');
const searchDesktop = document.querySelector('#search-desktop');
const cancelBtn = document.querySelector('.cancel-btn');

let data;

// FUNCTIONS
function hideRemainingItem(items) {
  items.forEach((item) => item.classList.toggle('hide'));
}

function createListItem(item) {
  const li = document.createElement('li');
  li.innerHTML = item;

  return li;
}

function showMenuItems(e) {
  // console.log();
  const value = e.target
    .closest('li')
    .querySelector('.contextualmenu-item')
    .textContent.toLowerCase();

  // console.log(value);

  console.log(data.nav.value.toString());
}

function capitalization(text) {
  return text[0].toUpperCase() + text.slice(1);
}

function createContextualMenu(items) {
  for (let i = items.length - 1; i >= 0; i--) {
    // const menuItem = document.createElement('li');
    // const spanEl = document.createElement('span');
    // spanEl.classList.add('contextualmenu-item');
    // spanEl.textContent = `${items[i][0].toUpperCase() + items[i].slice(1)}`;
    // const spanEl2 = document.createElement('span');
    // spanEl2.classList.add('down-arrow');
    // menuItem.appendChild(spanEl);
    // menuItem.appendChild(spanEl2);

    const menuItem = `
      <li>
        <span class="contextualmenu-item">${capitalization(items[i])} </span>
        <span class="down-arrow"> </span>
      </li>
    `;

    // console.log(menuItem);

    // contextualMenuEl.appendChild('afterbegin', menuItem);

    contextualMenuEl.insertAdjacentHTML('afterbegin', menuItem);
  }

  // Add eventListener for contextual menu list items
  contextualMenuEl.querySelectorAll('li').forEach((item) => {
    item.addEventListener('click', showMenuItems);
  });

  console.log();
}

function screenChange() {
  if (window.innerWidth >= 1434) {
    contextualMenuEl.querySelector('#contextual-more').classList.add('hide');
  } else {
    contextualMenuEl.querySelector('#contextual-more').classList.remove('hide');
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1434) {
      contextualMenuEl.querySelector('#contextual-more').classList.add('hide');
    } else {
      contextualMenuEl
        .querySelector('#contextual-more')
        .classList.remove('hide');
    }
  });
}

function createMenuItems(items) {
  let content;
  items.forEach((item, idx) => {
    if (idx === items.length - 1) {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.classList.add('sign-in');
      btn.innerText = item;

      li.appendChild(btn);
      content = li;
    } else if (idx === items.length - 2) {
      const li = document.createElement('li');
      const btn = document.createElement('button');

      btn.classList.add('tryazure');
      btn.innerText = item;
      li.appendChild(btn);
      content = li;
    } else {
      content = createListItem(item);
    }
    menuItems.appendChild(content);
  });
}

const navBar = (nav) => {
  const brandLogo = document.querySelectorAll('#brand-logo');
  brandLogo.forEach((item) => {
    item.innerHTML = ` <img src="${nav.microsoftIcon}" alt="Logo" />`;
  });
  createContextualMenu(nav.contextualMenu);
  createMenuItems(nav.navMenu);
};

async function getData() {
  const res = await fetch('data.json');
  data = await res.json();

  navBar(data.nav);
}

getData();
screenChange();

// EVENT LISTENERS
catlogBtn.addEventListener('click', () => {
  catlogBtn
    .querySelector('.below-header-down-arrow')
    .classList.toggle('rotate');

  if (catelogItems.childElementCount > 1) {
    catelogItems.querySelectorAll('li').forEach((li, idx) => {
      if (idx > 0) li.remove();
    });
    catelogItems.classList.add('hide');
  } else {
    catelogItems.classList.remove('hide');

    const items = data.nav.contextualMenu.concat(data.nav.navMenu);

    items.forEach((item) => catelogItems.appendChild(createListItem(item)));
  }
});

hamburgerBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    hideRemainingItem(hamburgerBtn);

    if (hamburgerMenu.childElementCount !== 0) {
      hamburgerMenu.classList.add('hide');
      hamburgerMenu.querySelectorAll('li').forEach((li) => {
        li.remove();
      });
    } else {
      hamburgerMenu.classList.remove('hide');

      data.nav.hamburgerItems.forEach((item) => {
        hamburgerMenu.appendChild(createListItem(item));
      });
    }
  });
});

searchBtn.addEventListener('click', () => {
  searchBtn.classList.add('active');
  goBackBtn.classList.remove('hide');
});

goBackBtn.addEventListener('click', () => {
  searchBtn.classList.remove('active');
  goBackBtn.classList.add('hide');
});

searchDesktop.addEventListener('click', (e) => {
  if (e.target.classList.contains('cancel-btn')) {
    e.target.parentNode.classList.remove('active');
    if (window.innerWidth >= 1400) {
      searchDesktop
        .querySelector('.header-ms-min-1400-search-text')
        .classList.remove('hide');
    }
  } else if (e.target.id !== 'search') {
    e.target.parentNode.classList.add('active');
    console.log(1234);
    console.log(e.target.id);
    if (window.innerWidth >= 1400) {
      searchDesktop
        .querySelector('.header-ms-min-1400-search-text')
        .classList.add('hide');
    }
  }
});

// const res = async () => {
//   await fetch('data.json').then((response) => response.json());
// };
