'use strict';

window.addEventListener('load', ()=> {
  function copyObjectDeep(target) {
    let result = {};

    if (typeof target === 'object' && target !== null) {
      for (let prop in target) {
        result[prop] = copyObjectDeep(target[prop]);
      }
    } else {
      result = target;
    }
    return result;
  }

  let obj = {
    a: 1,
    b: {
      c: null,
      d: [1, 2]
    }
  };
  let clone = copyObjectDeep(obj);
  obj.a = 2;
  console.log(obj);
  console.log(clone);

  function hoisting(x) {
    console.log(x);
    var x;
    console.log(x);
    var x = 2;
    console.log(x);
  }
  hoisting(1);

  function a() {
    console.log(b);
    var b = 'bbb';
    console.log(b);
    function b() {}
    console.log(b);
  }
  a();
});

window.addEventListener('load', () => {
  var a = 1;
  var outer = function() {
    var b = 2;
    var inner = function() {
      console.log(b);
    }
    inner();
  }
  outer();
});