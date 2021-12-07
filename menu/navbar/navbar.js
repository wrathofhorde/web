
(function toggle() {
  const toggleBtn = document.querySelector('.nav-toogle');
  const navMenu = document.querySelector('.nav-menu');
  const navSite = document.querySelector('.nav-site');

  toggleBtn.addEventListener('click', e => {
    navMenu.classList.toggle('active');
    navSite.classList.toggle('active');
  });
})();


