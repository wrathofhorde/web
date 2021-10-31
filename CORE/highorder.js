'use strict';

/* 
 * 고차 함수 함수를 매개 변수로 받거나 함수를 리턴하는 함수
 */
window.addEventListener('load', () => {
  // 분모, 분자, 자릿수를 순차적으로 입력받음
  const decimalCalculator = denominator => numerator => decimalPoint => {
  const num = numerator / denominator;
  return num.toFixed(decimalPoint);
}

/*
 * 고차함수를 호출하여 계속 사용할 수 있는 함수가 리턴된다는 것이 강점
 * 분모가 3인 divideByThree 함수, 부분 적용 함수임
 * 분자만 바뀐다현 재활용하여 사용할 수 있음
 */
const divideByThree = decimalCalculator(3);
/*
 * divideByThree()의 다음 입력값인 분자를 입력받고 devideTenByThree에 저장
 * 소수점 자릿수만 입력받아 재사용 가능, 부분 적용함수
 */ 
const devideTenByThree = divideByThree(10);

// 부분적용 함수로 devideTenByThree()를 재활용...
console.log(devideTenByThree(3));
console.log(devideTenByThree(1));
console.log(devideTenByThree(2));

console.log(decimalCalculator(3)(10)(3));
});

window.addEventListener('load', () => {
  const dogs = [
    {
        name : 'max',
        weight : 10,
        species : 'jindo',
        region : 'jindo',
        color : 'white'
    },
    {
        name : 'cola',
        weight : 20,
        species : 'ddongdog',
        region : 'jeonju',
        color : 'white'
    },
    {
        name : 'cider',
        weight : 15,
        species : 'mix',
        region : 'seoul',
        color : 'brown'
    },
    {
        name : 'wooyu',
        weight : 25,
        species : 'chiwawa',
        region : 'pyeongyang',
        color : 'black'
    },
  ];

  function getDogNames (dogs, filterFunc) {
    return dogs
    .filter(filterFunc)
    .map(dog => dog['name'])
}
const identity = field => value => dog => dog[field] === value;
const colorCheck = identity('color');
const regionCheck = identity('region');

console.log(getDogNames(dogs, colorCheck('brown')));
console.log(getDogNames(dogs, colorCheck('white')));
console.log(getDogNames(dogs, regionCheck('seoul')));
});