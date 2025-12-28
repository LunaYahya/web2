let tasks = [
  { text: "Luna yahia task", done: false },
  {
    text: "new task",
    done: false,
  },
];

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
}
