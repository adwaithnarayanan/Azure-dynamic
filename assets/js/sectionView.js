class SectionView {
  _sectionTitle = document.querySelectorAll('.section-main-heading');
  _sectionBlockHeading = document.querySelectorAll('.section-sub-heading');
  _featuredMarbleEl = document.querySelector('#featured-marbles');

  _data;

  _createFeaturedCard(data) {
    const div = document.createElement('div');
    div.classList.add('marble');
    const innerMarble = document.createElement('div');
    innerMarble.classList.add('inner-marble');

    innerMarble.innerHTML = `
        <div class="marble-image bx">
            <img src="${data.media}"  />
        </div>
        <div class="marble-text-contents mtc1 bx">
            <div class="marble-text-items bx">
            <div class="marble-heading bx">
                <span class="marble-heading-text bx">
                ${data.title}
                </span>
            </div>
            <div class="marble-description bx">
                <span class="marble-description-text bx">
                ${data.para}
                </span>
            </div>
            </div>
            <div class="marble-explore-more-area">
            <span class="explore-more-icon-parent">
            </span>
            <span class="explore-more-text bx">
                ${data.more}
            </span>
            </div>
        </div>
    `;

    div.appendChild(innerMarble);

    this._featuredMarbleEl.appendChild(div);
  }

  _createSectionMarkup(item, idx) {
    const spanTitle = document.createElement('span');
    spanTitle.classList.add('section-main-text');
    spanTitle.textContent = item.title.toUpperCase();

    this._sectionTitle[idx].appendChild(spanTitle);

    const spanBlockHeading = document.createElement('span');
    spanBlockHeading.classList.add('section-sub-text');
    spanBlockHeading.textContent = item.blockHeading;

    this._sectionBlockHeading[idx].appendChild(spanBlockHeading);

    if (idx === 0) {
      item.cards.forEach((el) => {
        this._createFeaturedCard(el);
      });
    }
  }

  render(data) {
    this._data = data;

    Object.keys(this._data).forEach((key, idx) => {
      this._createSectionMarkup(this._data[key], idx);
    });
  }
}

export default new SectionView();
