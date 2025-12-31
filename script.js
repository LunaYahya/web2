let tasks = [
  { text: "Luna yahia task", done: false },
  {
    text: "new task",
    done: false,
  },
];

let filter = "all";
let currentEditIndex = null;
let deleteIndex = null;

function renderTasks() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "done") return task.done;
    if (filter === "todo") return !task.done;
  });

  if (filter === "done" && filteredTasks.length === 0) {
    list.innerHTML = `<div class="no-tasks">No tasks.</div>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    const item = document.createElement("div");
    item.className = "todo-item";
    item.innerHTML = `
              <div>
                  <span class="${task.done ? "done" : ""}">${task.text}</span>
              </div>
              <div>
                  <input type="checkbox" class="checkbox" ${
                    task.done ? "checked" : ""
                  } >
                  <button  >
                      <i class="fa-regular fa-pen-to-square" style="color: #FFD43B;"></i>
                  </button>
                  <button onclick="initDeleteTask(${index})">
                      <i class="fas fa-trash-alt"></i>  
                  </button>
              </div>
          `;
    list.appendChild(item);
  });
}

renderTasks();

function addTask() {
  const input = document.getElementById("todoInput");
  const taskText = input.value.trim();
  const errorMessage = document.getElementById("error-message");

  if (taskText.length < 5) {
    errorMessage.style.display = "block";
    return;
  }

  tasks.push({ text: taskText, done: false });
  input.value = "";
  errorMessage.style.display = "none";
  renderTasks();
}

function initDeleteTask(index) {
  deleteIndex = index;
  openModal();
}

function openModal() {
  const modal = document.getElementById("confirmModal");
  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("confirmModal");
  modal.style.display = "none";
}

function confirmDeleteTask() {
  if (deleteIndex !== null) {
    tasks.splice(deleteIndex, 1);
    renderTasks();
    deleteIndex = null;
  }
  closeModal();
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}
