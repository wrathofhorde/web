'use strict';
/*
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
*/
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

window.addEventListener('load', ()=> {
  console.log('------ function this ------');
  const obj1 = {
    outer: function () {
      console.log(this);
      // const innerfunc = function () {
      //   console.log(this);
      // }
      const innerfunc = () => {
        console.log(this);
      }
      innerfunc();
  
      const obj2 = {
        innerMethod: innerfunc
      };
      obj2.innerMethod();
    }
  };
  console.log(obj1);  
  obj1.outer();
});

window.addEventListener('load', ()=>{
  console.log('object this');
  const Cat = function (name, age) {
    this.whoAmI = () => {
      console.log(this);
    }
    this.name = name;
    this.age = age;
  }
  const nabi = new Cat('나비', 3) ;
  const choco = new Cat('초코', 1);

  nabi.whoAmI();
  choco.whoAmI();

  const fn = function (x) {
    console.log(this, x);
  }

  fn(1);
  fn.call({a:1, b:2}, 2);
});

window.addEventListener('load', ()=>{
  function printHis() {
    console.log(this);
  }
  function Person(name, gender) {
    this.name = name;
    this.gender = gender;
  }
  function Student(name, gender, school) {
    Person.call(this, name, gender);
    this.school = school;
    this.whoAmI = printHis;
  }
  function Employee(name, gender, company) {
    Person.call(this, name, gender);
    this.company = company;
    this.whoAmI = printHis;
  }

  const by = new Student('보영', 'female', '수미');
  const jy = new Employee('철수', 'male', '구글');

  by.whoAmI();
  jy.whoAmI();
});
