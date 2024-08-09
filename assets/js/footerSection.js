class Footer {
  _footerTopSection = document.querySelector('.footer-top-section');
  _endFooterSection = document.querySelector('.footer-end-section-container');

  _data;

  render(data) {
    this._data = data;

    this._createFooterResources(this._data.footerResource);
    this._createEndFooter(this._data.footer2);
  }

  _createFooterResources(data) {
    const div = document.createElement('div');
    div.classList.add('footer-top-section-container');

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('footer-top-cols-section');

    data.forEach((list) => {
      const ulEl = this._createFooterList(list);

      innerDiv.appendChild(ulEl);
    });

    div.appendChild(innerDiv);
    this._footerTopSection.appendChild(div);
  }

  _createFooterList(lists) {
    const ul = document.createElement('ul');
    ul.classList.add('footer-top-section-col-item');

    lists.forEach((item, idx) => {
      const li = document.createElement('li');

      li.innerHTML = `
        <div class="${
          idx === 0
            ? 'footer-top-section-col-heading'
            : 'footer-top-section-col-box'
        }">
            <span class="${
              idx === 0
                ? 'footer-top-section-col-heading-text'
                : 'footer-top-section-col-text'
            }">
                ${item}
            </span>
        </div>
      `;

      ul.appendChild(li);
    });

    return ul;
  }

  _createEndFooter(data) {
    const div = document.createElement('div');
    div.classList.add('footer-end-section-inner-container');

    const markup = this._createEndFooterLeft(data);

    div.appendChild(markup);
    const footerListMarkup = this._createFooterListMarkup(data.footerList);

    div.appendChild(footerListMarkup);

    this._endFooterSection.appendChild(div);
  }

  _createEndFooterLeft(data) {
    const div = document.createElement('div');
    div.classList.add('footer-end-section-language-privacy-section');

    div.innerHTML = `

                <div class="footer-end-section-language-section bx">
                    <div class="footer-end-section-merge bx">
                      <div class="footer-end-earth-icon bx">
                        <img src="${data.globeIcon}"  />
                      </div>
                      <div class="earth-icon-shade bx"></div>
                    </div>
                    <div class="footer-end-section-language-text bx">
                      ${data.lang}
                    </div>
                  </div>
                  <div class="footer-end-section-privacy-section bx">
                    <span class="footer-end-section-tick-icon bx">
                      <img src="${data.privacyIcon}" alt="" />
                    </span>
                    <span class="footer-end-section-privacy-text bx">
                      ${data.privacyText}
                    </span>
                  </div>
                  <div class="footer-end-section-consumer bx">
                    <span class="footer-end-section-consumer-text bx">
                      ${data.consumer}
                    </span>
                  </div>
    
    `;

    return div;
  }

  _createFooterListMarkup(data) {
    const div = document.createElement('div');
    div.classList.add('footer-end-last-section-container');

    const ul = document.createElement('ul');
    ul.classList.add('footer-end-last-section-items');

    data.forEach((item) => {
      const li = document.createElement('li');

      li.innerHTML = `
        <span class="footer-end-last-section-text bx">
            ${item}
        </span>
      `;

      ul.appendChild(li);
    });

    div.appendChild(ul);

    return div;
  }
}

export default new Footer();
