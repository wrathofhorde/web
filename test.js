'use strict';

(function () {
  const buttons = document.querySelectorAll('input');
  console.log(buttons.length);
  buttons.forEach((item) => {
    item.addEventListener('click', ()=>{
      console.log(item.value);
    });
  })
})();

const obj1 = {
  outer: function () {
    console.log(this);
    const innerfunc = function () {
      console.log(this);
    }
    innerfunc();

    const obj2 = {
      innerMethod: innerfunc
    };
    obj2.innerMethod();
  }
};

obj1.outer();

const fn1 = function () {
  console.log(this);
}

const fn2 = () => {
  console.log(this);
}

const obj = {
  a: 1
};

fn1.call(obj);
fn2.call(obj);