'use strict';

import navbarElements from './navbarElements.js';
import heroBanner from './heroBanner.js';
import stickyNav from './stickyNav.js';
import sectionView from './sectionView.js';
import solutionsSection from './solutionsSection.js';
import productsSection from './productsSection.js';
import resourcesSection from './resourcesSection.js';
import customerSection from './customerSection.js';
import nextStepSection from './nextStepSection.js';
import footerSection from './footerSection.js';

async function init() {
  try {
    const res = await fetch(`data.json`);

    if (!res.ok) throw new Error(err);
    const data = await res.json();

    // Function calls
    navbarElements.navBar(data.nav);
    heroBanner.banner(data.heroBanner);
    stickyNav.render(data.sections);
    sectionView.render(data.sections);
    solutionsSection.render(data.sections.solutions);
    productsSection.render(data.sections.products);
    resourcesSection.render(data.sections.resources);
    customerSection.render(data.sections.customer);
    nextStepSection.render(data.nextStep);
    footerSection.render(data.footer);
    // console.log(data.footer);

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
