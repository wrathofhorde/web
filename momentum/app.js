const h1 = document.querySelector('.title');

h1.addEventListener('mouseenter', () => {
  h1.classList.toggle('active');
});