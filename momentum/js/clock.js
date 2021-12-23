const clock = document.querySelector('#clock');

function showClock() {
  const date = new Date();
  let [hh, mm, ss] = [
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'), 
    String(date.getSeconds()).padStart(2, '0')
  ];
  clock.innerText = `${hh}:${mm}:${ss}`;
}

showClock();
setInterval(showClock, 1000);