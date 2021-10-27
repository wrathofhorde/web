'use strict';

window.addEventListener('load', () => {
  let count = 0;

  const id = setInterval(() => {
    console.log(count);
    ++count;
    if (count === 5) {
      clearInterval(id);
    }
  }, 500);
});

window.addEventListener('load', () => {
  const obj = {
    values: [1, 2, 3],
    logValue: function (i, j) {
      console.log(this, i, j);
    }
  };
  obj.logValue(1, 2);

  [1, 2, 3].forEach(obj.logValue);
});