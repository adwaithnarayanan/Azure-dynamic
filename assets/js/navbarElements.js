'use strict';

class NavbarElements {
  _hamburgerMenu = document.querySelector('.hamburger-menu');
  _hamburgerBtn = document.querySelectorAll('.hamburger-btn');
  _catlogBtn = document.querySelector('.catlog-btn');
  _catelogItems = document.querySelector('.catelog-items');
  _contextualMenuEl = document.querySelector('.contextualmenu-items');
  _menuItems = document.querySelector('.menu-items');
  _searchBtn = document.querySelector('#search-btn');
  _goBackBtn = document.querySelector('.go-back');
  _searchDesktop = document.querySelector('#search-desktop');
  _cancelBtn = document.querySelector('.cancel-btn');

  data;

  // constructor(data) {
  //   this.data = data;
  // }

  navBar = (nav) => {
    this.data = nav;
    const brandLogo = document.querySelectorAll('#brand-logo');
    brandLogo.forEach((item) => {
      item.innerHTML = ` <img src="${nav.microsoftIcon}" alt="Logo" />`;
    });
    this.createContextualMenu(nav.contextualMenu);
    this.createMenuItems(nav.navMenu);
    this.eventListeners();
    this.screenChange();
  };

  // FUNCTIONS
  hideRemainingItem(items) {
    items.forEach((item) => item.classList.toggle('hide'));
  }

  createListItem(item) {
    const li = document.createElement('li');
    li.innerHTML = item;

    return li;
  }

  createDropdownList(list) {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('dropdown-items');

    list.forEach((li) => {
      ulEl.appendChild(this.createListItem(li));
    });

    return ulEl;
  }

  calculatePosition(leftPosition, objectWidth) {
    const vw = window.innerWidth;

    const rightGap = (vw * 10) / 100;

    if (vw - objectWidth - leftPosition <= rightGap) {
      leftPosition = leftPosition - 150;
      objectWidth = (objectWidth * 95) / 100;

      if (objectWidth + leftPosition >= vw) {
        leftPosition -= 20;
        objectWidth = (objectWidth * 83) / 100;
      }
      return { leftPosition, objectWidth };
    }
    return { leftPosition, objectWidth };
  }

  showMenuItems(e) {
    if (document.querySelector('.dropdown-body')) {
      document.querySelector('.dropdown-body').remove();
    }
    const value = e.target
      .closest('li')
      .querySelector('.contextualmenu-item')
      .textContent.toLowerCase()
      .trim();

    const parentPosition = e.target.closest('li').getBoundingClientRect().x;

    const divEl = document.createElement('div');

    divEl.classList.add('dropdown-contextualmenu');

    if (Array.isArray(this.data[value][0])) {
      this.data[value].forEach((val) => {
        const liItem = this.createDropdownList(val);
        liItem.querySelector('li').classList.add('list-heading');
        divEl.appendChild(liItem);
      });
    } else divEl.appendChild(this.createDropdownList(this.data[value]));

    const dropdownBody = document.createElement('div');
    dropdownBody.classList.add('dropdown-body');

    dropdownBody.appendChild(divEl);

    dropdownBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('dropdown-body')) {
        dropdownBody.remove();
      }
    });

    document.querySelector('#dropdown-container').appendChild(dropdownBody);
    const { leftPosition, objectWidth } = this.calculatePosition(
      parentPosition,
      divEl.getBoundingClientRect().width
    );

    divEl.style.left = `${leftPosition}px`;
    divEl.style.width = `${objectWidth}px`;
  }

  capitalization(text) {
    return text[0].toUpperCase() + text.slice(1);
  }

  createContextualMenu(items) {
    for (let i = items.length - 1; i >= 0; i--) {
      const menuItem = `
      <li>
        <span class="contextualmenu-item" data-value="${i}">${this.capitalization(
        items[i]
      )} </span>
        <span class="down-arrow"> </span>
      </li>
    `;

      this._contextualMenuEl.insertAdjacentHTML('afterbegin', menuItem);
    }

    this._contextualMenuEl.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', (e) => {
        this.showMenuItems(e);
      });
    });
  }

  screenChange() {
    if (window.innerWidth >= 1434) {
      // this._contextualMenuEl
      document.querySelector('#contextual-more').classList.add('hide');
    } else {
      this._contextualMenuEl
        .querySelector('#contextual-more')
        .classList.remove('hide');
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1434) {
        this._contextualMenuEl
          .querySelector('#contextual-more')
          .classList.add('hide');
      } else {
        this._contextualMenuEl
          .querySelector('#contextual-more')
          .classList.remove('hide');
      }
    });
  }

  createMenuItems(items) {
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
        content = this.createListItem(item);
      }
      this._menuItems.appendChild(content);
    });
  }

  eventListeners() {
    // EVENT LISTENERS
    this._catlogBtn.addEventListener('click', () => {
      this._catlogBtn
        .querySelector('.below-header-down-arrow')
        .classList.toggle('rotate');

      if (this._catelogItems.childElementCount > 1) {
        this._catelogItems.querySelectorAll('li').forEach((li, idx) => {
          if (idx > 0) li.remove();
        });
        this._catelogItems.classList.add('hide');
      } else {
        this._catelogItems.classList.remove('hide');

        const items = this.data.contextualMenu.concat(this.data.navMenu);

        items.forEach((item) =>
          this._catelogItems.appendChild(this.createListItem(item))
        );
      }
    });

    this._hamburgerBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.hideRemainingItem(this._hamburgerBtn);

        if (this._hamburgerMenu.childElementCount !== 0) {
          this._hamburgerMenu.classList.add('hide');
          this._hamburgerMenu.querySelectorAll('li').forEach((li) => {
            li.remove();
          });
        } else {
          this._hamburgerMenu.classList.remove('hide');

          this.data.hamburgerItems.forEach((item) => {
            this._hamburgerMenu.appendChild(this.createListItem(item));
          });
        }
      });
    });

    this._searchBtn.addEventListener('click', () => {
      this._searchBtn.classList.add('active');
      this._goBackBtn.classList.remove('hide');
    });

    this._goBackBtn.addEventListener('click', () => {
      this._searchBtn.classList.remove('active');
      this._goBackBtn.classList.add('hide');
    });

    this._searchDesktop.addEventListener('click', (e) => {
      if (e.target.classList.contains('cancel-btn')) {
        e.target.parentNode.classList.remove('active');
        if (window.innerWidth >= 1400) {
          searchDesktop
            .querySelector('.header-ms-min-1400-search-text')
            .classList.remove('hide');
        }
      } else if (e.target.id !== 'search') {
        e.target.parentNode.classList.add('active');
        if (window.innerWidth >= 1400) {
          searchDesktop
            .querySelector('.header-ms-min-1400-search-text')
            .classList.add('hide');
        }
      }
    });
  }
}

export default new NavbarElements();
