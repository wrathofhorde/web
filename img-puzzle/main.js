const container = document.querySelector('.image-container');
const startButton = document.querySelector('.start-button');
const gameText = document.querySelector('.game-text');
const playTime = document.querySelector('.play-time');

const tileCount = 16;
const rowCount = 4;
const columnCount = 4;

Array(tileCount).fill().forEach((value, index) => {
  const li = document.createElement('li');
  li.style.width = '100px';
  li.style.height = '100px';
  li.style.backgroundPositionX = `${(index % columnCount * (-100))}px`;
  li.style.backgroundPositionY = `${Math.floor(index / rowCount) * (-100)}px`;
  // console.log(`${li.style.backgroundPositionX}, ${li.style.backgroundPositionY}`);
  container.appendChild(li);
});