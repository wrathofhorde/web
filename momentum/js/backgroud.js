const images = ["0.jpg", "1.jpg", "2.jpg"];
const chosemImage = images[Math.floor(Math.random() * images.length)];
const imagename = `img/${chosemImage}`;

const img = document.createElement('img');
img.setAttribute('src', imagename);
document.body.appendChild(img);