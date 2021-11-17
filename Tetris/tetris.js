"use strict";
import BLOCKS from "./blocks.js"

let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;
const playground = document.querySelector('.playground > ul');

const movingItem = {
  type: "elLeft",
  direction: 0,
  top: 0,
  left: 3,
};

window.addEventListener('load', () => {
  document.querySelector('.game-text > button').addEventListener('click', () => {
    init();
  });
  init();
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
    case 'Space':
      dropBlock();
      break;
    default:
      break;
  }
  function rotateBlock() {
    ++tempMovingItem.direction;
    tempMovingItem.direction %= 4;
    renderBlocks();
  }
  function dropBlock() {
    const DROP_TIME = 10;
    clearInterval(downInterval);
    downInterval = setInterval(() => {
      moveBlock('top', 1);
    }, DROP_TIME);
  }
});

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

function renderBlocks(moveType = '') {
  const [moving, seized] = ['moving', 'seized'];
  const {type, direction, top, left} = tempMovingItem;
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
      if (moveType === 'retry') {
        clearInterval(downInterval);
        showEndMessage();
      }
      setTimeout(() => {
        renderBlocks('retry');
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

  function showEndMessage() {
    const text = document.querySelector('.game-text');
    text.style.display = 'flex';
  }

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
    checkMatched();
  }

  function checkMatched() {
    const hor = playground.childNodes;
    hor.forEach(elem => {
      let matched = true;
      elem.children[0].childNodes.forEach(li => {
        if (!li.classList.contains(seized)) {
          matched = false;
        }
      });
      if (matched) {
        elem.remove();
        prependNewLine();
        ++score;
        document.querySelector('.score').innerHTML = score;
      }
    });

    generateNewBlock();
  }
}

function generateNewBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, duration);

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

function prependNewLine() {
  const GAME_COLS = 10;
  const li = document.createElement('li');
  const ul = document.createElement('ul');

  for (let j = 0; j < GAME_COLS; ++j) {
    const matrix = document.createElement('li');
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

function init() {
  const GAME_ROWS = 20;
  tempMovingItem = {...movingItem};

  playground.innerHTML = "";

  for (let i = 0; i < GAME_ROWS; ++i) {
    prependNewLine();
  }
  generateNewBlock();

  const text = document.querySelector('.game-text');
  text.style.display = 'none';
}