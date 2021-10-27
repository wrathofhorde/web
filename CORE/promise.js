'use strict';

window.addEventListener('load', () => {
  new Promise((resolve) => {
    let name = "커피";
    console.log(name);
  
    setTimeout(() => {
      resolve(name);
    }, 2000);
  }).then((prevValue) => {
    console.log(`${prevValue} readly`);
  });
});

window.addEventListener('load', () => {
  const outer = () => {
    let a = 1;
    const inner = () => {
      console.log(++a);
    }
    return inner;
  }

  const fn = outer();
  fn();
  fn();
});