const todoList = document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");

let todos = [];

function addTodo(name) {
  if (name !== "") {
    let currentId = todos.length;
    let todoItem = { id: currentId, name: name, isDone: false }
    todos.push(todoItem);
    renderTodos();
  }
}

function delTodo(todo){
  todo.remove()
  console.log(todo.id)
  todos.splice(todo.id, 1)
  todos.forEach((element, index) => {
    element.id = index
  })
  renderTodos()
}

function completeTodo(todo){
  let todoItem = todo.parentNode.parentNode;
  let id = Number(todoItem.id);
  console.log(todoItem.id)
  
  if(todos[id].isDone == false){
    todos[id].isDone = true
  } else {
    todos[id].isDone = false
  }

  renderTodos()
}

function renderTodos() {
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
  document.getElementById("todoInp").value = "";
});

window.addEventListener("beforeunload", () => {
  todos.forEach(element => {
    window.localStorage.setItem(`todoItem${element.id}`, element)
  })
})