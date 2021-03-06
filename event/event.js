'use strict';

// 마우스이벤트객체 - 상대좌표 이용
window.addEventListener('load', () => {
  const section = document.querySelector('#section9');
  const container = section.querySelector('.container');
  const boxes = section.querySelectorAll('.box');
  const offset = {x:0, y:0};
  
  let mouseDown = false;
  let current = null;
  const top = container.offsetTop;
  const left = container.offsetLeft;

  console.log(top);
  console.log(left);

  boxes.forEach((box) => {
    box.addEventListener('mousedown', function(e) {
      mouseDown = true;
      current = box;
      offset.x = e.offsetX;
      offset.y = e.offsetY;
    });

    box.addEventListener('mouseup', function(e) {
      mouseDown = false;
    });
  });

  container.addEventListener('mousemove', function(e) {
    if (mouseDown === false) return;

    current.style.left = `${e.pageX - offset.x - left}px`;
    current.style.top = `${e.pageY - offset.y - top}px`;
  });
});

// 마우스이벤트객체 - 여러게 박스 드레그로 이동
window.addEventListener('load', () => {
  const section = document.querySelector('#section8');
  const container = section.querySelector('.container');
  const boxes = section.querySelectorAll('.box');
  const offset = {x:0, y:0};
  
  let mouseDown = false;
  let current = null;

  boxes.forEach((box) => {
    box.addEventListener('mousedown', function(e) {
      mouseDown = true;
      current = box;
      offset.x = e.offsetX;
      offset.y = e.offsetY;
    });

    box.addEventListener('mouseup', function(e) {
      mouseDown = false;
    });
  });

  container.addEventListener('mousemove', function(e) {
    if (mouseDown === false) return;

    current.style.left = `${e.pageX - offset.x}px`;
    current.style.top = `${e.pageY - offset.y}px`;
  });
});

// 마우스이벤트객체 - 드레그로 이동
window.addEventListener('load', () => {
  const section = document.querySelector('#section7');
  const container = section.querySelector('.container');
  const box = section.querySelector('.box');
  let mouseDown = false;
  const offset = {x:0, y:0};

  box.addEventListener('mousedown', function(e) {
    mouseDown = true;
    offset.x = e.offsetX;
    offset.y = e.offsetY;
  });

  container.addEventListener('mousemove', function(e) {
    if (mouseDown === false) return;

    box.style.left = `${e.pageX - offset.x}px`;
    box.style.top = `${e.pageY - offset.y}px`;
  });

  box.addEventListener('mouseup', function(e) {
    mouseDown = false;
  });
});

// 마우스이벤트객체 - 마우스 좌표
window.addEventListener('load', () => {
  const section = document.querySelector('#section6');
  const container = section.querySelector('.container');
  const box = section.querySelector('.box');

  container.onclick = function(e) {
    box.style.left = `${e.pageX}px`;
    box.style.top = `${e.pageY}px`;
  };
});

// EX-5 Trigger
window.addEventListener('load', () => {
  const section = document.querySelector('#section5');
  const fileButton = section.querySelector('.file-button');
  const triggerButton = section.querySelector('.file-trigger-button');

  triggerButton.onclick = function() {
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    fileButton.dispatchEvent(event);
  };
});

// EX4-서로 다른 기능의 여러 버튼을 가진 화면에서 이벤트를
window.addEventListener('load', () => {
  const section = document.querySelector('#section4');
  const tbody = section.querySelector('tbody');
  
  tbody.addEventListener('click', (event) => {
    const target = event.target;

    if (target.nodeName !== 'INPUT' && target.nodeName !== 'A') return;

    if (target.nodeName === 'A') {
      event.preventDefault();
    }

    const list = target.classList;

    if (list.contains('sel-button')) {
      let tr = target.parentElement;
      while (tr.nodeName !== 'TR') {
        tr = tr.parentElement;
      }
      tr.style.background = 'yellow';
    } 
    else if (list.contains('edit-button')) {
      console.log('edit');
    }
    else if (list.contains('del-button')) {
      console.log('del');
    }
  });
});

// Ex3-이벤트 버블링 멈추기
window.addEventListener('load', () => {
  const section = document.querySelector('#section3');
  const imgList = section.querySelector('.img-list');
  const addButton = section.querySelector('.add-button');
  const currentImg = section.querySelector('.current-img');

  imgList.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'IMG') return;
    currentImg.src = event.target.src;
  });

  addButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const img = document.createElement('img');
    img.src = 'images/img1.jpg';
    currentImg.insertAdjacentElement('afterend', img);
  });
});

// Ex2-버블링을 이용한 사용자 이벤트 처리하기
window.addEventListener('load', () => {
  const section = document.querySelector('#section2');
  const currentImg = section.querySelector('.current-img');
  const imgList = section.querySelector('.img-list');

  imgList.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'IMG') return;
    currentImg.src = event.target.src;
  });

});

// 연습문제 1-선택된 레코드 삭제하기:event target
window.addEventListener('load', () => {
  const section = document.querySelector('#section1-1');
  const tbody = section.querySelector('tbody');
  const buttons = tbody.querySelectorAll('input');

  const onclick = (event) => {
    console.log(event.target.parentNode.parentNode);
    tbody.removeChild(event.target.parentNode.parentNode);
  }

  buttons.forEach((item) => {
    item.addEventListener('click', onclick);
  });
});

// Ex 1-선택된 이미지 보여주기:event target
window.addEventListener('load', () => {
  const section = document.querySelector('#section1');
  const currentImg = section.querySelector('.current-img');
  const imgs = section.querySelectorAll('.img');

  const onclick = function(event) {
    // console.log(event.target);
    currentImg.src = event.target.src;
  }

  imgs.forEach((img) => {
    img.addEventListener('click', onclick);
  });

});

