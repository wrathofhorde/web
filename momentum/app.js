const loginForm = document.querySelector('#input-form');
const loginInput = loginForm.querySelector('input');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(loginInput.value);
  loginInput.value = "";
});

