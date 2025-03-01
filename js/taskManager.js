const taskList = document.getElementById("taskList");
const progressCircle = document.querySelector(".progress-ring__circle");
const progressText = document.getElementById("progressText");
const totalLength = 2 * Math.PI * 50;
progressCircle.style.strokeDasharray = totalLength;

let tasks = [];

function renderTasks(taskData) {
  tasks = taskData;
  taskList.innerHTML = "";

  let completedTasks = 0;

  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index);
    taskList.appendChild(taskElement);
    if (task.done) completedTasks++;
  });

  updateProgress(completedTasks, tasks.length);
  saveTasks(tasks);
}

function createTaskElement(task, index) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.setAttribute("data-index", index);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;
  checkbox.dataset.index = index;

  const textSpan = document.createElement("span");
  textSpan.textContent = task.text;

  const deleteBtn = document.createElement("i");
  deleteBtn.className = "delete-btn ti ti-trash";
  deleteBtn.setAttribute("data-index", index);

  li.append(checkbox, textSpan, deleteBtn);
  return li;
}

function addTask(text) {
  tasks.push({ text, done: false });
  renderTasks(tasks);
}

function toggleTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].done = !tasks[index].done;
    renderTasks(tasks);
  }
}

function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    renderTasks(tasks);
  }
}

function updateProgress(completed, total) {
  const percent = total ? (completed / total) * 100 : 0;
  progressCircle.style.strokeDashoffset = totalLength * (1 - percent / 100);
  progressText.innerText = `${Math.round(percent)}%`;
}
