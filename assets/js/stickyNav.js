class StickyNav {
  _stickyNav = document.querySelector('#sticky-nav-parent');
  _stickyNavItems = document.querySelector('.section-dropdown-menu');
  _stickyDesktopNav = document.querySelector('.section1-ms-min-860-contents');
  _sections = document.querySelectorAll('section');

  _data;

  render(data) {
    this._data = data;

    const firstId = Object.keys(this._data)[0];

    this._displayStickyNav(firstId);

    this._eventListener();
    this._renderDropdown();
    this._renderDesktopDropdown();
    this._getVisibleSection();
  }

  _getVisibleSection() {
    window.addEventListener('scroll', (e) => {
      this._sections.forEach((section, idx) => {
        if (this._isInViewport(section)) {
          this._setActiveSection(section.id);
        }
      });
    });
  }

  _setActiveSection(active) {
    const items = document.querySelectorAll('.section1-ms-min-860-list-text a');
    items.forEach((item) => {
      const index = item.href.indexOf('#') + 1;
      if (active === item.href.slice(index)) {
        console.log(active);
        this._removeActiveClass(items);
        document.querySelector('.section-dropdown-content').textContent =
          this._data[active].title;

        item.parentElement.classList.add('active-section');
      }
    });
  }

  _removeActiveClass(items) {
    items.forEach((item) => {
      item.parentElement.classList.remove('active-section');
    });
  }

  _isInViewport(section) {
    const rect = section.getBoundingClientRect();
    return rect.top < 5 && rect.bottom >= 0;
  }

  _renderDesktopDropdown() {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('section1-ms-min-860-items');

    Object.keys(this._data).forEach((key, idx) => {
      const content = this._data[key].title;

      const li = document.createElement('li');
      li.innerHTML = `
                <span class="section1-ms-min-860-list-text ${
                  idx === 0 ? 'active-section' : ''
                }">
                    <a href="#${key}">${content}</a>
                </span>
      `;
      ulEl.appendChild(li);
    });

    this._stickyDesktopNav.appendChild(ulEl);
  }

  _displayStickyNav(itemId) {
    const navValue = document.querySelector('.section-dropdown-content');
    navValue.innerHTML = this._data[itemId].title;
  }

  _rotateArrow(dropdownActive) {
    if (dropdownActive) {
      document.querySelector(
        '.sticky-nav-arrow'
      ).style.transform = `rotateZ(-180deg)`;
    } else {
      document.querySelector(
        '.sticky-nav-arrow'
      ).style.transform = `rotateZ(0deg)`;
    }
  }

  _renderDropdown() {
    Object.keys(this._data).forEach((key) => {
      const item = document.createElement('li');
      const aTag = document.createElement('a');
      aTag.href = `#${key}`;
      aTag.textContent = this._data[key].title;

      item.appendChild(aTag);
      this._stickyNavItems.appendChild(item);
    });
  }

  _eventListener() {
    // const dropdownActive = false;
    // const _stickyNavArrow = document.querySelector('#sticky-nav-arrow');

    window.addEventListener('click', (e) => {
      if (!e.target.closest('#sticky-nav-parent')) {
        this._stickyNavItems.classList.add('hide');
        this.dropdownActive = false;
        this._rotateArrow(this.dropdownActive);
      }
    });

    this._stickyNav.addEventListener('click', () => {
      this._stickyNavItems.classList.toggle('hide');
      this.dropdownActive = !this.dropdownActive;

      this._rotateArrow(this.dropdownActive);
    });
  }
}

export default new StickyNav();
