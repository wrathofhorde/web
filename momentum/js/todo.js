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

function printTodo(todoObj) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');
  
  li.id = todoObj.id;
  span.innerText = todoObj.text;
  button.innerText = '❌';
  button.addEventListener('click', (event) => {
    const li = event.target.parentNode;
    const index = toDos.findIndex(todo => todo.id === parseInt(li.id));
    if (index !== -1) {
      toDos.splice(index, 1);
      saveTodos();
    }

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
  const todoObj = {
    text: todo,
    id: Date.now(),
  };

  toDos.push(todoObj);
  printTodo(todoObj);
  saveTodos();
});