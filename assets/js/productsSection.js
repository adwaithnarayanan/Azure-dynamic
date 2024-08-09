class Products {
  _productsTab = document.querySelector('#products-tab');
  _promoCardContainer = document.querySelector('#promocard-box');
  _marbleContainer = document.querySelector('#products-marble');

  _data;
  render(data) {
    this._data = data.tabWindow;

    this._createTab();
    Object.keys(this._data).forEach((key, idx) => {
      if (idx === 0) {
        this._createPromoCard(this._data[key].promoCard);
        this._createMarbleItems(this._data[key]);
      } else return false;
    });

    this._showMoreText(data.productsCount);
    this._createGartnerMarble(data.gartnerMarble);

    this._eventListener();
  }

  _createGartnerMarble(item) {
    document.querySelector('.gartner-marble').innerHTML = `
      <div class="gartner-marble-content-area">
        <div class="gartner-marble-text-area">
          <div class="gartner-marble-text">
            <div class="gartner-marble-heading-area">
              <span class="gartner-marble-heading">
                ${item.heading}
              </span>
            </div>
            <div class="gartner-marble-inner-text-area">
              <div class="gartner-marble-description-area">
                <span class="gartner-marble-description">
                  ${item.para}
                </span>
              </div>
              <div class="gartner-marble-button">
                <button>${item.button}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="gartner-marble-image-section">
          <img
            src="${item.media}"
            alt=""
          />
        </div>
      </div>
    `;
  }

  _showMoreText(value) {
    document.querySelector('#products-explore').innerHTML = `
     <span class="section-view-all-link-arrow explore-more-icon-parent"></span>
      <span class="section-view-all-link-item explore-more-text">
        See all products (${value}+)
      </span>
    `;
  }

  _createMarbleItems(items) {
    const div = document.createElement('div');
    div.classList.add('products-content-inner-marble-section');

    items.tabItems.forEach((item) => {
      const marble = document.createElement('div');
      marble.classList.add('marble');

      marble.innerHTML = `
        <div class="inner-marble bx">
          <div class="marble-text-contents bx">
            <div class="marble-text-items bx">
              <div class="marble-icon bx">
                <img
                  src="${item.media}"
                  alt="${item.heading.split(' ').join('')}"
                />
              </div>
              <div class="marble-heading bx">
                <span class="marble-heading-text bx">
                  ${item.heading}
                </span>
              </div>
              <div class="marble-description bx">
                <span class="marble-description-text bx">
                  ${item.para}
                </span>
              </div>
              <div class="solutions-content-details-link">
                <span
                  class="solutions-content-detail-explore-link"
                >
                  <u>${item.more ? item.more : 'Explore the product'}</u>
                </span>
              </div>
            </div>
          </div>
        </div>
      `;

      div.appendChild(marble);
    });

    this._marbleContainer.appendChild(div);
  }

  _createPromoCard(item) {
    const card = ` 
        <div class="products-content-phi-box bx" style="
                                        background-image: url(${item.media});
                                      ">
            <div class="products-content-phi-inner-box bx">
                <div class="products-content-phi-text-area bx">
                <span class="products-phi-box-heading bx">
                    ${item.cardHeading}
                </span>
                <span class="products-phi-box-description bx">
                    ${item.para}
                </span>
                <span class="products-phi-box-button bx">
                    <button class="products-phi-explore-button bx">
                    ${item.button ? item.button : 'Explore the product'}
                    </button>
                </span>
                </div>
            </div>
        </div>
    `;

    // this._promoCardContainer.appendChild(card);
    this._promoCardContainer.insertAdjacentHTML('afterbegin', card);
  }

  _createTab() {
    const ulElement = document.createElement('ul');
    ulElement.classList.add('solution-section-slidebar-list-items');

    Object.keys(this._data).forEach((item, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `
            <div class="solution-slidebar-item ${
              idx === 0 ? 'active-tab' : ''
            }">
                <span class="solution-slidebar-text">
                    ${this._data[item].tabTitle}
                </span>
            </div>
        `;
      ulElement.appendChild(li);

      li.addEventListener('click', () => {
        this._removeActiveTab(ulElement);
        li.children[0].classList.add('active-tab');

        this._promoCardContainer.innerHTML = '';
        this._marbleContainer.innerHTML = '';

        this._createPromoCard(this._data[item].promoCard);
        this._createMarbleItems(this._data[item]);
      });
    });

    this._productsTab.appendChild(ulElement);
  }

  _removeActiveTab(elements) {
    elements
      .querySelectorAll('li')
      .forEach((el) => el.children[0].classList.remove('active-tab'));
  }

  _eventListener() {
    const slider = document.querySelector('.product-section-slidebar-items');
    const rightBtn = document.querySelector('#products-right');
    const leftBtn = document.querySelector('#products-left');

    let content_scroll_width = slider.scrollWidth;

    rightBtn.addEventListener('click', () => {
      slider.scrollTo({ left: content_scroll_width, behavior: 'smooth' });
      leftBtn.classList.remove('hide');
      rightBtn.classList.add('hide');
    });

    leftBtn.addEventListener('click', () => {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
      rightBtn.classList.remove('hide');
      leftBtn.classList.add('hide');
    });
  }
}

export default new Products();
