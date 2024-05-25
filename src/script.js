const todoList = document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");

let todos = [];
let numIds = 0;

// Renderização inicial
if(window.localStorage.length > 0) {
  renderTodos();
}

function addTodo(name) {
  if (name !== "") {
    let currentId = numIds++;
    let todoItem = { id: currentId, name: name, isDone: false }
    todos.push(todoItem);

    saveTodos();
    renderTodos();
  }
}

function delTodo(todo) {
  // Acha o item e remove do array
  let deleteIndex = todos.find(d => {
    d.id = todo.id;
  });
  todos.splice(deleteIndex);

  todo.remove(); // Remove o item do html
  localStorage.removeItem(`todoItem${todo.id}`);
  
  saveTodos();
  renderTodos();
}

function completeTodo(todo) {
  let todoItem = todo.parentNode.parentNode;

  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id == todoItem.id) {
      todos[i].isDone = !todos[i].isDone;
    }
  }
  
  saveTodos();
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

// Salva os itens no localStorage
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

// Carrega os itens do localStorage
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