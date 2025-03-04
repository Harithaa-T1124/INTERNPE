let tasks = [];

// DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const successMsg = document.getElementById("successMsg");

// On page load, get tasks from localStorage
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

// Add a new task when clicking the Add button
addBtn.addEventListener("click", addTask);

// Also allow pressing 'Enter' key to add a task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

/*
  -----------------
  ADD NEW TASK
  -----------------
*/
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  // Create task object
  const newTask = {
    text: text,
    completed: false
  };

  // Add to array
  tasks.push(newTask);

  // Update localStorage
  saveTasks();

  // Re-render list
  renderTasks();

  // Clear input field
  taskInput.value = "";

  // Show success message
  showSuccessMessage("Todo item Created Successfully. It's happening 🎉");
}

/*
  -----------------
  SHOW SUCCESS MESSAGE
  -----------------
*/
function showSuccessMessage(msg) {
  successMsg.textContent = msg;
  successMsg.style.display = "block";

  // Hide after 2 seconds
  setTimeout(() => {
    successMsg.style.display = "none";
  }, 2000);
}

/*
  -----------------
  RENDER TASKS
  -----------------
*/
function renderTasks() {
  // Clear the current list
  taskList.innerHTML = "";

  // Re-populate
  tasks.forEach((task, index) => {
    // Create the <li>
    const li = document.createElement("li");

    // Task text: add 'completed' class if done
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    if (task.completed) {
      taskSpan.classList.add("completed");
    }

    // Toggle completion on text click
    taskSpan.addEventListener("click", () => toggleComplete(index));

    // Actions container (edit/delete)
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("task-actions");

    // Edit icon
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");
    editIcon.title = "Edit Task";
    editIcon.addEventListener("click", () => editTask(index));

    // Delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteIcon.title = "Delete Task";
    deleteIcon.addEventListener("click", () => deleteTask(index));

    // Append icons to actions container
    actionsDiv.appendChild(editIcon);
    actionsDiv.appendChild(deleteIcon);

    // Append text + actions to li
    li.appendChild(taskSpan);
    li.appendChild(actionsDiv);

    // Finally append li to the list
    taskList.appendChild(li);
  });
}

/*
  -----------------
  TOGGLE COMPLETION
  -----------------
*/
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

/*
  -----------------
  EDIT TASK
  -----------------
*/
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null) {
    const trimmedText = newText.trim();
    if (trimmedText !== "") {
      tasks[index].text = trimmedText;
      saveTasks();
      renderTasks();
    }
  }
}

/*
  -----------------
  DELETE TASK
  -----------------
*/
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

/*
  -----------------
  LOCAL STORAGE
  -----------------
*/
function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("myTasks")) || [];
  tasks = storedTasks;
  renderTasks();
}

