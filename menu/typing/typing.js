const dynamic = document.querySelector('#dynamic');

let cursorInterval = setInterval(() => {
  dynamic.classList.toggle('active');
}, 500);

function selectString() {
  const arr = [
    'Learn to HTML',
    'Learn to CSS',
    'Learn to JavaScript',
    'Learn to Python',
  ];

  return arr[Math.floor(Math.random() * arr.length)];
}

function randomString() {
  const str = selectString();
  let strIndex = 1;
  let printInterval = setInterval(() => {
    if (strIndex > str.length) {
      clearInterval(printInterval);
      setTimeout(randomString, 3000);
      return;
    }
    const sub = str.substring(0, strIndex++);
    dynamic.textContent = sub;
  }, 80);
}

randomString();