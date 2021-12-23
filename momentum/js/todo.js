const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('#todo-list');
const TODO_KEY = 'todos';

const toDos = [];

loadTodos();

function loadTodos() {
  const saved = localStorage.getItem(TODO_KEY);
  if (saved === null) return;
  JSON.parse(saved).forEach(element => {
    printTodo(element);
    toDos.push(element);
  });
}

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
}

function printTodo(todo) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');
  
  span.innerText = todo;
  button.innerText = '❌';
  button.addEventListener('click', (event) => {
    const todo = event.target.previousSibling.innerText;
    const index = toDos.indexOf(todo);
    if (index !== -1) {
      toDos.splice(index, 1);
      saveTodos();
    }
    const li = event.target.parentNode;
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(button);

  todoList.appendChild(li);
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const todo = todoInput.value;
  todoInput.value = "";

  toDos.push(todo);
  printTodo(todo);
  saveTodos();
});