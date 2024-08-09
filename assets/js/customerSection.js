class Customers {
  _customerMarbles = document.querySelector('.customer-section-inner-marbles');
  _tabContainer = document.querySelector('.customer-marble-selector-container');

  _data;
  _currentSlide = 0;

  render(data) {
    this._data = data.tabWindow;

    Object.keys(this._data).forEach((key, idx) => {
      this._createCard(this._data[key]);
      this._createTabItem(this._data[key], idx);
    });
  }

  _createCard(data) {
    const marble = document.createElement('div');
    marble.setAttribute('id', data.id);
    marble.classList.add('marble');

    const products = this._createProductMarkup(data.products);

    marble.innerHTML = `

    <div class="inner-marble bx">
        <div class="marble-image bx">
            <img src="${data.media}" alt="${data.id}" />
        </div>
        <div class="marble-text-contents bx">
            <div class="marble-text-contents-inner-section">
                <div class="customer-marble-logo bx">
                    <img  src="${data.cardLogo}" alt="${data.id}" />
                </div>
                <div class="customer-marble-heading bx">
                    <span class="customer-marble-heading-text bx">
                        ${data.para}
                    </span>
                </div>
            </div>
            <div class="customer-marble-end-section">
                <div class="customer-marble-end-section-heading bx">
                    <span class="customer-marble-end-heading-text">
                        Products
                    </span>
                </div>
            ${products.outerHTML}
            <div class="customer-marble-end-section-button">
                <div class="customer-marble-end-button">
                    <button>${data.button}</button>
                </div>
            </div>
            </div>
        </div>
        </div>
        

    `;

    this._customerMarbles.appendChild(marble);

    this._customerMarbles.addEventListener('scroll', () => {
      const marbles = this._customerMarbles.querySelectorAll('.marble');
      marbles.forEach((marble) => {
        if (this._isInViewport(marble)) {
          this._setActiveMarble(marble.id);
        }
      });
    });
  }

  _createTabItem(data, idx) {
    const aTag = document.createElement('a');
    aTag.href = `#${data.id}`;
    aTag.classList.add('customer-marble-selector-box');
    if (idx === 0) aTag.classList.add('customer-active');

    aTag.innerHTML = `
        <div class="customer-marble-selector">
            <div class="customer-marble-selector-logo">
                <img src="${data.cardLogo}" alt="${data.id}" />
            </div>
        </div>
    `;

    this._tabContainer.appendChild(aTag);
    aTag.addEventListener('click', () => {
      this._removeActiveTab(this._tabContainer.querySelectorAll('a'));
      aTag.classList.add('customer-active');
    });
  }

  _createProductMarkup(products) {
    const productsContainer = document.createElement('div');
    productsContainer.classList.add('customer-marble-end-section-links');

    products.forEach((item) => {
      const markup = `
        <div class="customer-marble-end-link">
            <span class="customer-marble-link-icon">
                <img src="${item.icon}"  />
            </span>
            <span class="customer-marble-link">
                <u>${item.label}</u>
            </span>
        </div>
        `;

      productsContainer.insertAdjacentHTML('beforeend', markup);
    });

    return productsContainer;
  }

  _removeActiveTab(elements) {
    elements.forEach((el) => {
      el.classList.remove('customer-active');
    });
  }

  _setActiveMarble(active) {
    const items = this._tabContainer.querySelectorAll('a');

    items.forEach((item) => {
      const index = item.href.indexOf('#') + 1;
      if (active === item.href.slice(index)) {
        this._removeActiveTab(items);
        item.classList.add('customer-active');
      }
    });
  }

  _isInViewport(marble) {
    const rect = marble.getBoundingClientRect();
    return rect.x >= 0 && rect.right <= rect.width + 200;
  }
}

export default new Customers();
