'use strict';

// 마우스이벤트객체 - 마우스 좌표
window.addEventListener('load', () => {

});

// EX4-서로 다른 기능의 여러 버튼을 가진 화면에서 이벤트를
window.addEventListener('load', () => {

});

// Ex3-이벤트 버블링 멈추기
window.addEventListener('load', () => {

});

// Ex2-버블링을 이용한 사용자 이벤트 처리하기
window.addEventListener('load', () => {

});

// 연습문제 1-선택된 레코드 삭제하기:event target
window.addEventListener('load', () => {

});

// Ex 1-선택된 이미지 보여주기:event target
window.addEventListener('load', () => {
  const section = document.querySelector('#section1');
  const currentImg = section.querySelector('.current-img');
  const imgs = section.querySelectorAll('.img');

  const onclick = function(event) {
    currentImg.src = event.target.src;
  }

  imgs.forEach((img) => {
    img.addEventListener('click', onclick);
  });

});

