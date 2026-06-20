const todoList = document.querySelector("#todoList");
const form = document.querySelector("#form");
const input = document.querySelector("#input");


const getTodos = () => {
  fetch("https://apib.vercel.app/todo")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      todoList.innerHTML = "";

      data.todo.forEach((todo) => {
        todoList.innerHTML += `
          <div style="margin-bottom:10px;">
            <h3>${todo.title}</h3>

            <button onclick="editTodo(${todo.id})">
              Edit
            </button>

            <button onclick="deleteTodo(${todo.id})">
              Delete
            </button>

            <hr>
          </div>
        `;
      });
    })
    .catch((err) => console.log(err));
};


getTodos();


form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!input.value.trim()) {
    alert("Please enter a todo");
    return;
  }

  fetch("https://apib.vercel.app/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      input.value = "";

      getTodos();
    })
    .catch((err) => console.log(err));
});


const deleteTodo = (id) => {
  fetch(`https://apib.vercel.app/todo/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      getTodos();
    })
    .catch((err) => console.log(err));
};


const editTodo = (id) => {
  const newTitle = prompt("Enter new title");

  if (!newTitle) return;

  fetch(`https://apib.vercel.app/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      getTodos();
    })
    .catch((err) => console.log(err));
};