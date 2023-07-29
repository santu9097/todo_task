const todoForm = document.querySelector("form");
const todoList = document.querySelector(".todo-list");

const createTodoElement = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  if (todo.completed) {
    todoDiv.classList.add("complete");
  }

  const newTodo = document.createElement("li");
  newTodo.textContent = todo.title;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);

  // Complete Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  return todoDiv;
};

let todoListArr = [];

// {
//     title: 'jntjg'
// }

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("todo")) {
    todoListArr = JSON.parse(localStorage.getItem("todo"));
  } else {
    localStorage.setItem("todo", JSON.stringify(todoListArr));
  }

  todoListArr.forEach((todo) => {
    //create todo
    const todoDiv = createTodoElement(todo);
    todoList.appendChild(todoDiv);
  });
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = todoForm.todo.value;

  const todoDiv = createTodoElement({ title: title, completed: false });
  todoListArr.push({ title: title, completed: false });
  localStorage.setItem("todo", JSON.stringify(todoListArr));
  todoList.appendChild(todoDiv);
  todoForm.todo.value = "";
  // console.log(todoDiv);
});

todoList.addEventListener("click", (e) => {
  // console.log(e.target);
  const item = e.target;

  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    // console.log(todo);
    if (!todo.classList.contains("complete")) {
      todoListArr = todoListArr.map((todoElement) => {
        if (todoElement.title !== todo.textContent) {
          return todoElement;
        } else {
          return {
            title: todoElement.title,
            completed: true
          };
        }
      });

      localStorage.setItem("todo", JSON.stringify(todoListArr));
      todo.classList.add("complete");
    } else {
      todoListArr = todoListArr.map((todoElement) => {
        if (todoElement.title !== todo.textContent) {
          return todoElement;
        } else {
          return {
            title: todoElement.title,
            completed: false
          };
        }
      });

      localStorage.setItem("todo", JSON.stringify(todoListArr));
      todo.classList.remove("complete");
    }
  }

  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", (e) => {
      todoListArr = todoListArr.filter((td) => {
        return td.title !== todo.textContent;
      });

      localStorage.setItem("todo", JSON.stringify(todoListArr));

      todo.remove();
    });
  }
});

// localStorage

// localStorage.setItem("name", "Aditya");

// console.log(localStorage.getItem("friend"));

// localStorage.setItem("friend", "Bob");
// localStorage.setItem

// let arr = [122, 23, 32];
// console.log(arr);
// localStorage.setItem("arr", JSON.stringify(arr));

// console.log(JSON.parse(localStorage.getItem("arr"))[1]);

const completeFilterBtn = document.querySelector(".complete-filter");

completeFilterBtn.addEventListener("click", (e) => {
  const todos = todoList.children;
  // console.log(todos);
  for (let i = 0; i < todos.length; i++) {
    if (!todos[i].classList.contains("complete")) {
      todos[i].style.display = "none";
    } else todos[i].style.display = "";
  }
});

//display-not-completed-filter
const notCompleteFilterBtn = document.querySelector(".not-complete-filter");
notCompleteFilterBtn.addEventListener("click", (e) => {
  const todos = todoList.children;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].classList.contains("complete")) {
      todos[i].style.display = "none";
    } else todos[i].style.display = "";
  }
});

//display-all-filter
const allFilterBtn = document.querySelector(".all-filter");
allFilterBtn.addEventListener("click", () => {
  const todos = todoList.children;
  for (let i = 0; i < todos.length; i++) {
    todos[i].style.display = "";
  }
});
