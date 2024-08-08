class Resources {
  _resourcesTab = document.querySelector('#resources-tab');
  _itemContainer = document.querySelector('#resource-content');
  _resourcesGlobalEl = document.querySelector('#resources-global');

  _data;

  render(data) {
    this._data = data.tabWindow;

    this._createTab();
    this._setSectionBackground(data.background);

    Object.keys(this._data).forEach((key, idx) => {
      if (idx === 0) {
        this._createItemContainer(this._data[key]);
      }
    });

    this._createResourcesGlobal(data.resourcesGlobal);
  }

  _createResourcesGlobal(data) {
    this._resourcesGlobalEl.style.backgroundImage = `url(${data.background})`;

    const div = document.createElement('div');
    div.classList.add('resources-global-section-inner-contents');

    div.innerHTML = `
    <div class="resources-global-section-heading">
        <span class="resources-global-heading-text">
            ${data.heading}
        </span>
    </div>
    <div class="resources-global-section-description bx">
        <span class="resources-global-description-text bx">
            ${data.para}
        </span>
    </div>
    <div class="resources-global-section-button bx">
        <button>${data.button}</button>
    </div>
    
    `;

    this._resourcesGlobalEl.appendChild(div);
  }

  _setSectionBackground(media) {
    document.querySelector(
      '.resources-section-container'
    ).style.backgroundImage = `url(${media})`;
  }

  _createItemContainer(item) {
    const div = document.createElement('div');
    div.classList.add('resources-content-inner-section');

    div.innerHTML = `
        <div class="resources-text-contents">
            <span class="resources-content-main-text bx">
                ${item.blockHeading}
            </span>
            <div class="resources-explore-more-link marble-explore-more-area bx" >
                <span class="explore-more-icon-parent"> </span>
                <span class="section-view-all-link-item explore-more-text" >
                    ${item.more}
                </span>
            </div>
        </div>
        <div class="resource-image">
            <div class="resources-content-image-section">
                <img src="${item.media}"
                alt="" />
            </div>
        </div>
    `;

    this._itemContainer.appendChild(div);
  }

  _createTab() {
    const ulElement = document.createElement('ul');
    ulElement.classList.add('resources-section-slidebar-list-items');

    Object.keys(this._data).forEach((item, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="resources-slidebar-item bx ${
          idx === 0 ? 'active-resource' : ''
        }">
            <span class="resources-slidebar-text">
                ${this._data[item].tabTitle}
            </span>
        </div>
      `;

      ulElement.appendChild(li);

      li.addEventListener('click', () => {
        this._removeActiveTab(ulElement);
        li.children[0].classList.add('active-resource');
      });
    });

    this._resourcesTab.appendChild(ulElement);
  }

  _removeActiveTab(elements) {
    elements
      .querySelectorAll('li')
      .forEach((el) => el.children[0].classList.remove('active-resource'));
  }
}

export default new Resources();
