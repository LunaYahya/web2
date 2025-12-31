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
const minTaskLength = 5;

function getFilteredTasks() {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "done") return task.done;
    if (filter === "todo") return !task.done;
  });
  return filteredTasks;
}

function renderTasks() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  const filteredTasks = getFilteredTasks();

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
                  <input type="checkbox" onchange="toggleTaskStatus(${index})" class="checkbox" ${
      task.done ? "checked" : ""
    } >
                  <button onclick="editTask(${index})" id="editBtn">
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
  const length_error_message = document.getElementById("length-error-message");
  const duplicate_error_message = document.getElementById(
    "duplicate-error-message"
  );

  if (taskText.length < minTaskLength) {
    length_error_message.style.display = "block";
    return;
  }

  if (taskText.length > 0 && tasks.some((task) => task.text === taskText)) {
    duplicate_error_message.style.display = "block";
    return;
  }

  tasks.push({ text: taskText, done: false });
  input.value = "";
  length_error_message.style.display = "none";
  duplicate_error_message.style.display = "none";
  renderTasks();
}

function initDeleteTask(index) {
  deleteIndex = index;
  openConfirmModal();
}

function openConfirmModal() {
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

function openRenameModal() {
  document.getElementById("renameModal").style.display = "flex";
}

function editTask(index) {
  currentEditIndex = index;
  document.getElementById("renameModal").value = tasks[index].text;
  openRenameModal();
}

function saveEditTask() {
  const newTaskName = document.getElementById("renameInput").value.trim();
  if (newTaskName.length >= minTaskLength) {
    tasks[currentEditIndex].text = newTaskName;
    renderTasks();
    closeRenameModal();
  } else {
    alert("Task must be at least 5 characters long");
  }
}

function closeRenameModal() {
  document.getElementById("renameModal").style.display = "none";
}

function toggleTaskStatus(index) {
  const filteredTasks = getFilteredTasks();
  const selectedTask = filteredTasks[index];
  const taskIndex = tasks.findIndex((task) => task.text === selectedTask.text);

  tasks[taskIndex].done = !tasks[taskIndex].done;
  renderTasks();
}

function confirmDeleteDoneTasks() {
  tasks = tasks.filter((task) => !task.done);
  renderTasks();
}

function deleteAllTasks() {
  tasks = [];
  renderTasks();
}
