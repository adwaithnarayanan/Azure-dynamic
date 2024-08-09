class NextStepSection {
  _sectionContainer = document.querySelector('#next-step-section');

  _data;

  render(data) {
    this._data = data;

    this._renderMarkup();

    this._changeBackground();
    window.addEventListener('resize', this._changeBackground);
  }

  _renderMarkup() {
    const cards = this._createCards(this._data.cards);

    const div = document.createElement('div');
    div.classList.add('marble-section-container');

    div.innerHTML = `
    <div class="marble-section-inner-container bx">
        <div class="marble-section-contents bx">
            <div class="section-sub-heading bx">
                <span class="section-sub-text bx"> ${this._data.sectionHeading} </span>
            </div>

            <div class="marble-section-marble-area bx">
              ${cards.outerHTML}
            </div>

        </div>
    </div>  
    `;

    this._sectionContainer.appendChild(div);
  }

  _createCards(cards) {
    const div = document.createElement('div');
    div.classList.add('marble-section-marbles');

    cards.forEach((card) => {
      const marble = document.createElement('div');
      marble.classList.add('marble');

      marble.innerHTML = `
      
        <div class="inner-marble bx">
            <div class="marble-text-contents bx">
                <div class="marble-text-items bx">
                    <div class="marble-heading bx">
                        <span class="marble-heading-text bx">
                            ${card.cardTitle}
                        </span>
                    </div>
                    <div class="marble-description bx">
                        <span class="marble-description-text bx">
                            ${card.cardPara}
                        </span>
                    </div>
                </div>
                <div class="marble-explore-more-area bx">
                    <span class="explore-more-icon-parent">
                    </span>
                <span class="explore-more-text bx">
                        ${card.more}
                    </span>
                </div>
            </div>
        </div>
      
      `;

      div.appendChild(marble);
    });
    return div;
  }

  _changeBackground() {
    if (window.innerWidth >= 860) {
      this._sectionContainer.style.backgroundImage = `url(${this._data.backgroundDesktop})`;
    } else
      this._sectionContainer.style.backgroundImage = `url(${this._data.backgroundMobile})`;
  }
}

export default new NextStepSection();
