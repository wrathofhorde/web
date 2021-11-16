"use strict";
import BLOCKS from "./blocks.js"

let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const movingItem = {
  type: "elLeft",
  direction: 0,
  top: 0,
  left: 3,
};

window.addEventListener('load', () => {
  const GAME_ROWS = 20;
  const GAME_COLS = 10;
  tempMovingItem = {...movingItem};

  const playground = document.querySelector('.playground > ul');
  
  (function createBlocks() {
    for (let i = 0; i < GAME_ROWS; ++i) {
      const li = document.createElement('li');
      const ul = document.createElement('ul');
  
      for (let j = 0; j < GAME_COLS; ++j) {
        const matrix = document.createElement('li');
        ul.prepend(matrix);
      }
      li.prepend(ul);
      playground.prepend(li);
    }
    generateNewBlock();
  })();
});

document.addEventListener('keydown', e => {
  switch (e.code) {
    case 'ArrowLeft':
      moveBlock('left', -1);
      break;
    case 'ArrowRight':
      moveBlock('left', 1);
      break;
    case 'ArrowDown':
      moveBlock('top', 1);
      break;
    case 'ArrowUp':
      rotateBlock();
      break;
    default:
      break;
  }

  function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
  }
  function rotateBlock() {
    ++tempMovingItem.direction;
    tempMovingItem.direction %= 4;
    renderBlocks();
  }
});

function renderBlocks(moveType = '') {
  const [moving, seized] = ['moving', 'seized'];
  const {type, direction, top, left} = tempMovingItem;
  const playground = document.querySelector('.playground > ul');
  const movingBlocks = document.querySelectorAll(`.${moving}`);

  movingBlocks.forEach(block => {
    block.classList.remove(type, moving);
  });

  BLOCKS[type][direction].some(block => {
    const [x, y] = [block[0] + left, block[1] + top];
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, moving);
    } else {
      tempMovingItem = {...movingItem};
      setTimeout(() => {
        renderBlocks();
        if (moveType === 'top') {
          seizeBlock();
        }
      }, 0);
      return true;
    }
  });

  movingItem.top = top;
  movingItem.left = left;
  movingItem.direction = direction;

  function checkEmpty(target) {
    if (!target || target.classList.contains(seized)) return false;
    return true;
  }

  function seizeBlock() {
    const movingBlocks = document.querySelectorAll(`.${moving}`);
    movingBlocks.forEach(block => {
      block.classList.remove(moving);
      block.classList.add(seized);
    });
    generateNewBlock();
  }
}

function generateNewBlock() {
  const [ORG_TOP, ORG_LEFT, ORG_DIR] = [0, 3, 0];
  const entries = Object.entries(BLOCKS);
  const rand = Math.floor(Math.random() * entries.length);
  movingItem.type = entries[rand][0];
  movingItem.top = ORG_TOP;
  movingItem.left = ORG_LEFT;
  movingItem.direction = ORG_DIR;
  tempMovingItem = {...movingItem};
  renderBlocks();
}