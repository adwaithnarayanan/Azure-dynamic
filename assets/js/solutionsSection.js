class Solutions {
  _solutionsTab = document.querySelector('#solutions-tab');
  _solutionsTabItems = document.querySelector('.ul-tab-list');
  _imgDiv = document.querySelector('#img-div');
  _data;

  render(data) {
    this._data = data.tabWindow;

    this._createTab();
    Object.keys(this._data).forEach((key, idx) => {
      if (idx === 0) {
        this._createTabItems(this._data[key]);
      } else return false;
    });

    this._showMoreText(data.solutionsCount);

    this._eventListener();
  }

  _showMoreText(value) {
    document.querySelector('#section-explore').innerHTML = `
      <span class="section-view-all-link-arrow explore-more-icon-parent">
      </span>
      <span class="section-view-all-link-item explore-more-text" >
          View all solutions (${value}+)
      </span>

      `;
  }

  _createTabItems(items) {
    if (
      !this._solutionsTabItems.classList.contains(
        'solutions-content-details-lists'
      )
    ) {
      this._solutionsTabItems.classList.add('solutions-content-details-lists');
    }

    items.tabItems.forEach((item, idx) => {
      const li = document.createElement('li');
      if (idx === 0) {
        li.classList.add('active-tab-item');
        this._showTabImg(item.media);
      }

      li.innerHTML = `
            <div class="solutions-content-details-list">
                <div class="solutions-content-details-text-arrow">
                    <span class="solutions-content-details-text">
                        ${item.heading}
                    </span>
                    <span class="solutions-content-details-arrow">
                    </span>
                </div>
                <div class="solutions-content-details-list-item1 items" >
                    <span class="solutions-content-description-text">
                        ${item.para}
                    </span>
                </div>
                <div class="solutions-content-details-link items">
                    <span class="solutions-content-detail-explore-link">
                        <u>${item.more}</u>
                    </span>
                </div>
                <div class="solution-content-details-image-section items">
                <div class="solutions-content-image">
                    <img src="${item.media}" />
                </div> 
             </div>
            </div>
              
      `;
      this._solutionsTabItems.appendChild(li);
    });

    const liEls = this._solutionsTabItems.querySelectorAll('li');
    let prev = 0;
    let open = false;
    liEls.forEach((liItem, idx) => {
      liItem.addEventListener('click', () => {
        this._removeActiveTabItem(liEls);

        this._showTabImg(items.tabItems[idx].media);

        liItem.classList.add('active-tab-item');

        if (prev === idx && !open) {
          this._removeActiveTabItem(liEls);
          open = true;
        } else open = false;

        // prev variable is used to check the current
        //active tabItem and to close if it is selected twice
        prev = idx;
      });
    });
  }

  _removeActiveTabItem(items) {
    items.forEach((item) => {
      item.classList.remove('active-tab-item');
    });
  }

  _showTabImg(imgSrc) {
    this._imgDiv.innerHTML = '';
    const img = document.createElement('img');
    img.src = imgSrc;
    this._imgDiv.appendChild(img);
    this._imgDiv.style.transform = `translateX(0)`;
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

        this._solutionsTabItems.innerHTML = '';
        this._createTabItems(this._data[item]);
      });
    });

    this._solutionsTab.appendChild(ulElement);
  }

  _removeActiveTab(elements) {
    elements
      .querySelectorAll('li')
      .forEach((el) => el.children[0].classList.remove('active-tab'));
  }

  _eventListener() {
    const ulEl = document.querySelector('.solution-section-slidebar-items');
    const rightBtn = document.querySelector('#solution-right');
    const leftBtn = document.querySelector('#solution-left');

    let content_scroll_width = ulEl.scrollWidth;

    // SCROLL TO RIGHT END
    rightBtn.addEventListener('click', () => {
      ulEl.scrollTo({ left: content_scroll_width });
      leftBtn.classList.remove('hide');
      rightBtn.classList.add('hide');
    });

    // SCROLL TO LEFT END
    leftBtn.addEventListener('click', () => {
      ulEl.scrollTo({ left: 0 });
      rightBtn.classList.remove('hide');
      leftBtn.classList.add('hide');
    });
  }
}

export default new Solutions();
