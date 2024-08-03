'use strict';

async function getData() {
  const res = await fetch('data.json');
  const data = await res.json();

  console.log(data);
}

getData();

// const res = async () => {
//   await fetch('data.json').then((response) => response.json());
// };
