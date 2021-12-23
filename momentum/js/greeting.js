const USERNAME_KEY = 'username';
const HIDDEN_CLASSNAME = 'hidden';

const loginForm = document.querySelector('#input-form');
const loginInput = loginForm.querySelector('input');
const greeting = document.querySelector('#greeting');
const savedUsername = localStorage.getItem(USERNAME_KEY);

function printGreeting(username) {
  greeting.innerText = `Hello, ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit', (e) => {
    const username = loginInput.value;

    e.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem(USERNAME_KEY, username);
    printGreeting(username);
  });
} else {
  printGreeting(savedUsername);
}
