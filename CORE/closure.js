'use strict';

const CreateCar = function () {
  let fuel = Math.ceil(Math.random() * 10 + 10);
  let power = Math.ceil(Math.random() * 2);
  let move = 0;

  return {
    get move() {
      return move;
    },
    run: () => {
      const km = Math.ceil(Math.random() * 4);
      const wastedFuel = km / power;
      
      if (fuel < wastedFuel) {
        console.log('이동불가');
        return;
      }
      fuel -= wastedFuel;
      move += km;
      console.log(`${km} 이동, ${fuel.toFixed(1)} 남음, 총이동거리: ${move}`);
    },
    status: ()=> {
      console.log(`fuel:${fuel}, power:${power}`);
    }
  };
}

const c1 = new CreateCar();
c1.status();

for (let i = 0; i < 10; ++i) {
  c1.run();
}