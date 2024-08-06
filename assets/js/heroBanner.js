'use strict';

class HeroBanner {
  _neutralHightlight = document.querySelector('#neutral-highlight');
  _blockHeading = document.querySelector('#block-heading');
  _blockPara = document.querySelector('#block-para');
  _backgroundContainer = document.querySelector('#background');
  _heroBannerBtns = document.querySelectorAll('.hero-banner-btn');

  data;

  banner(data) {
    this.data = data;
    this.render();
    this.setBackground(this.data.background);
  }

  createButton(text, idx) {
    const button = document.createElement('button');
    console.log();
    if (idx === 0) {
      button.classList.add('get-started');
    } else button.classList.add('try-free');

    const spanEl = document.createElement('span');
    spanEl.classList.add('get-started-text');
    spanEl.textContent = text;
    button.appendChild(spanEl);
    this._heroBannerBtns[idx].appendChild(button);
  }

  render() {
    this._neutralHightlight.textContent =
      this.data.neutralHighlight.toUpperCase();
    this._blockHeading.textContent = this.data.blockHeading;
    this._blockPara.textContent = this.data.blockPara;

    // this.createButton(this.data.buttons[0], 0);
    this.data.buttons.forEach((btn, idx) => {
      this.createButton(btn, idx);
    });
  }

  setBackground(background) {
    let element;

    if (background.type === 'video') {
      element = document.createElement('video');

      const sourceEl = document.createElement('source');
      sourceEl.setAttribute('src', background.src);
      sourceEl.setAttribute('type', 'video/mp4');

      element.appendChild(sourceEl);
    } else if (background.type === 'image') {
      element = document.createElement('img');
      element.src = background.src;
    }

    element.classList.add('background-item');

    if (background.attributes && background.attributes[0]) {
      background.attributes.forEach((attrib) => {
        element.setAttribute(attrib, true);
      });
    }

    const item = element.outerHTML;

    this._backgroundContainer.insertAdjacentHTML('afterbegin', item);
  }
}

export default new HeroBanner();
