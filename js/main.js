document.addEventListener("DOMContentLoaded", async function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");
  const saveBtn = document.getElementById("saveToDevice");

  let tasks = await loadTasks();
  renderTasks(tasks);

  function handleAddTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    addTask(taskText);
    taskInput.value = "";
  }

  addTaskBtn.addEventListener("click", handleAddTask);
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  });

  taskList.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("delete-btn")) {
      const taskIndex = target.getAttribute("data-index"); 
      deleteTask(Number(taskIndex)); 
      return;
    }
  

    if (target.tagName === "INPUT" && target.type === "checkbox") {
        toggleTask(Number(target.dataset.index));
    }
});

 

  saveBtn.addEventListener("click", () => saveTasksToFile(tasks));
});
