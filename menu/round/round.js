const display = document.querySelector('.display');
const addBtn = display.querySelector('.button');
const dspValue = display.querySelector('.value');
const quizText = document.querySelector('.quiz-text');
const quizP = document.querySelector('.quiz-p');


addBtn.addEventListener('click', e => {
  const num = parseInt(dspValue.innerHTML) + 1;
  dspValue.innerHTML = num;
});

const section = document.querySelector('section');
section.querySelector('#jsBtn').addEventListener('click', btnClick);
section.querySelector('#pyBtn').addEventListener('click', btnClick);
section.querySelector('#cBtn').addEventListener('click', btnClick);;

function btnClick(e) {
  const lang = this.className;
  quizText.innerHTML = lang;
  const str = quizP.innerHTML;
  const sep = str.lastIndexOf(' ', str.length - 5);
  const preStr = str.substring(0, sep);
  const pos = str.lastIndexOf('입');
  const postStr = str.substring(pos, str.length);
  quizP.innerHTML = `${preStr} ${lang}${postStr}`;
}