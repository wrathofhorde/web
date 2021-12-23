const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('#todo-list');


function deleteTodo(params) {
  
}
function printTodo(todo) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');
  
  span.innerText = todo;
  button.innerText = '❌';
  button.addEventListener('click', (e) => {
    const li = e.target.parentNode;
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(button);

  todoList.appendChild(li);
}
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todo = todoInput.value;
  todoInput.value = "";
  printTodo(todo);
});