const container = document.querySelector('.image-container');
const startButton = document.querySelector('.start-button');
const gameText = document.querySelector('.game-text');
const playTime = document.querySelector('.play-time');
const dataIndex = 'data-index';

let timeCount = null;
let timeForPlaying = 0;

function startGame() {
  const timeForStart = 3000;
  let tiles = createImageTiles();

  timeForPlaying = 0;
  clearInterval(timeCount);
  container.innerHTML = '';
  gameText.style.display = 'none';

  tiles.forEach(value => container.appendChild(value));
  setTimeout(() => {
    container.innerHTML = '';
    shuffle(tiles).forEach(value => container.appendChild(value));

    timeCount = setInterval(() => {
      ++timeForPlaying;
      playTime.innerHTML = `${timeForPlaying}`;
    }, 1000);
  }, timeForStart);
}

function createImageTiles() {
  const rowCount = 4;
  const columnCount = 4;
  const tileCount = 16;
  let array = [];
  
  Array(tileCount).fill().forEach((value, index) => {
    const li = document.createElement('li');
    li.setAttribute(dataIndex, index);
    li.setAttribute('draggable', 'true');
    li.classList.add(`list${index}`);
    li.style.width = '100px';
    li.style.height = '100px';
    li.style.backgroundPositionX = `${(index % columnCount * (-100))}px`;
    li.style.backgroundPositionY = `${Math.floor(index / rowCount) * (-100)}px`;
    array.push(li);
  });

  return array;
}

function shuffle(array) {
  const size = array.length;

  for (let i = 0; i < size; ++i) {
    const rand = Math.floor(Math.random() * size);
    [array[i], array[rand]] = [array[rand], array[i]];
  }

  return array;
}

function checkStatus() {
  const list = [...container.childNodes];
  const unmatched = list.filter((child, index) => {
    return parseInt(child.getAttribute(dataIndex)) !== index;
  });
  
  if (unmatched.length !== 0) return;

  clearInterval(timeCount);
  gameText.style.display = 'block';
}

/*------------------  event  ------------------*/
const dragged = {
  obj: null,
  className: null,
  index: null
};

container.addEventListener('dragstart', e => {
  const obj = e.target;
  dragged.obj = obj;
  dragged.className = obj.className;
  dragged.index = [...obj.parentNode.childNodes].indexOf(e.target);
});

container.addEventListener('dragover', e => {
  e.preventDefault();
});

container.addEventListener('drop', e => {
  e.preventDefault();
  const obj = e.target;
  if (obj === dragged.obj) {
    // console.log('same obj');
    return;
  }
  const parent = e.target.parentNode;
  const lis = parent.childNodes;
  const index = [...lis].indexOf(obj);
  const clonedSrc = lis[dragged.index].cloneNode(true);
  const clonedDst = lis[index].cloneNode(true);

  parent.replaceChild(clonedSrc, lis[index]);
  parent.replaceChild(clonedDst, lis[dragged.index]);

  checkStatus();
});

startButton.addEventListener('click', () => {
  startGame();
})