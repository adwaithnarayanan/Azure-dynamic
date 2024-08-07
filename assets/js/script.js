'use strict';

import navbarElements from './navbarElements.js';
import heroBanner from './heroBanner.js';
import stickyNav from './stickyNav.js';
import sectionView from './sectionView.js';

let data;

function controller() {}

async function init() {
  try {
    const res = await fetch(`data.json`);

    if (!res.ok) throw new Error(err);
    data = await res.json();

    // Function calls
    navbarElements.navBar(data.nav);
    heroBanner.banner(data.heroBanner);
    stickyNav.render(data.sections);
    sectionView.render(data.sections);

    // Object.keys(data.sections).forEach((key) => {
    //   // console.log(key, '..', data.sections[key].id);
    // });
    //
  } catch (err) {
    console.log(`${err} 💥💥💥`);
  }
}

// INITIAL CALL
init();
controller();

// JS-> 263 | JSON-> 242 || till 05/08/2024
