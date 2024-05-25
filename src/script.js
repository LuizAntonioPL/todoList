const todoList = document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");

let todos = [];
let numIds = 0;

if(window.localStorage.length > 0){
  renderTodos();
}

function addTodo(name) {
  if (name !== "") {
    let currentId = numIds++;
    let todoItem = { id: currentId, name: name, isDone: false }
    todos.push(todoItem);

    saveTodos()
    renderTodos();
  }
}

function delTodo(todo) {
  // Loopa pelo array de todos, 
  // encontra o item a ser completado,
  // deleta o item do array.
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id = todo.id) {
      todos.splice(i);
    }
  }

  localStorage.removeItem(`todoItem${todo.id}`);
  todo.remove(); // remove o item do html
  
  saveTodos()
  renderTodos();
}

function completeTodo(todo) {
  let todoItem = todo.parentNode.parentNode;

  // Loopa pelo array de todos, 
  // encontra o item a ser completado,
  // muda a variável.
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id == todoItem.id) {
      todos[i].isDone = !todos[i].isDone;
    }
  }
  
  saveTodos()
  renderTodos();
}

function renderTodos() {
  loadTodos();
  todoList.innerHTML = "";

  todos.forEach((element) => {
      todoList.innerHTML += `
        <div class="${(element.isDone ? "doneItem" : "todoItem")}" id=${element.id}>
          <div class="todoHeader">
            <input type="checkbox" id="selectTodo" onchange="completeTodo(this)" ${(element.isDone ? "checked" : "")}/>
            <p id="todoName">${element.name}</p>
          </div>
          <button id="delButton" onclick="delTodo(this.parentNode)">x</button>
        </div>
      `;
  });
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(e.target.todoInp.value);
  e.target.todoInp.value = "";
});

function saveTodos() {
  todos.forEach(element => {
    let item = localStorage.getItem(`todoItem${element.id}`);
    if (element !== item) {
      let jsonItem = JSON.stringify(element);
      localStorage.setItem(`todoItem${element.id}`, jsonItem);
      localStorage.setItem(`numIds`, numIds);
    }
  })
}

function loadTodos() {
  todos = [];
  numIds = localStorage.getItem(`numIds`);

  for(let i = 0; i < numIds; i++){
    let item = localStorage.getItem(`todoItem${i}`);
    
    if (item !== null) {
      todos.push(JSON.parse(item));
    }
  }
}