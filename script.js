
const taskList = document.getElementById('taskList');
const deleteAllBtn = document.getElementById('deleteAll');
const deleteDoneBtn = document.getElementById('deleteDone');


deleteAllBtn.addEventListener('click', () => {
  taskList.innerHTML = ''; 
});


deleteDoneBtn.addEventListener('click', () => {
  const tasks = taskList.querySelectorAll('li');
  tasks.forEach(task => {
    const checkbox = task.querySelector('.taskCheckbox');
    if (checkbox.checked) {
      task.remove(); 
    }
  });
});
