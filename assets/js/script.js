'use strict';

import navbarElements from './navbarElements.js';
import heroBanner from './heroBanner.js';

let data;

async function init() {
  try {
    const res = await fetch(`data.json`);

    if (!res.ok) throw new Error(err);
    data = await res.json();

    // Call Functions
    navbarElements.navBar(data.nav);
    heroBanner.banner(data.heroBanner);
    //
  } catch (err) {
    console.log(`${err} 💥💥💥`);
  }
}

// INITIAL CALL
init();

// JS-> 263 | JSON-> 242 || till 05/08/2024
