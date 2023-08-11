// Add task
function addTask(event) {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");

  if (taskInput.value !== "") {
    var task = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    var taskText = document.createTextNode(taskInput.value);

    task.appendChild(checkbox);
    task.appendChild(taskText);
    taskList.appendChild(task);

    taskInput.value = "";
  }
}

// Move completed tasks to completed list without inverting order
function moveCompletedTasks() {
  var taskList = document.getElementById("taskList");
  var completedList = document.getElementById("completedList");
  var tasks = taskList.getElementsByTagName("li");

  for (var i = tasks.length - 1; i >= 0; i--) {
    var task = tasks[i];
    var checkbox = task.querySelector("input[type='checkbox']");

    if (checkbox.checked) {
      taskList.removeChild(task);
      completedList.appendChild(task);
    }
  }
  resetCheckboxes(taskList);
}

// Move selected tasks back to task list without inverting order
function moveTasksToTaskList() {
  var taskList = document.getElementById("taskList");
  var completedList = document.getElementById("completedList");
  var completedTasks = completedList.getElementsByTagName("li");

  for (var i = completedTasks.length - 1; i >= 0; i--) {
    var task = completedTasks[i];
    var checkbox = task.querySelector("input[type='checkbox']");

    if (checkbox.checked) {
      completedList.removeChild(task);
      taskList.appendChild(task);
    }
  }
  resetCheckboxes(completedList);
}

// Delete selected tasks
function deleteSelectedTasks() {
  var completedList = document.getElementById("completedList");
  var completedTasks = completedList.getElementsByTagName("li");

  for (var i = completedTasks.length - 1; i >= 0; i--) {
    var task = completedTasks[i];
    var checkbox = task.querySelector("input[type='checkbox']");

    if (checkbox.checked) {
      completedList.removeChild(task);
    }
  }
}

// Select all tasks
function selectAllTasks() {
  var taskList = document.getElementById("taskList");
  var checkboxes = taskList.getElementsByTagName("input");

  for (var checkbox of checkboxes) {
    checkbox.checked = true;
  }
}

function resetCheckboxes(container) {
  var checkboxes = container.getElementsByTagName("input");

  for (var checkbox of checkboxes) {
    checkbox.checked = false;
  }
}

// Bind keydown event to the input field
var taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

// Bind click event to the Add button
var addButton = document.getElementById("addButton");
addButton.addEventListener("click", addTask);

// Bind click event to the submit button
var submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", moveCompletedTasks);

// Bind click event to the delete button
var deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", deleteSelectedTasks);

// Bind click event to the move button
var moveButton = document.getElementById("moveButton");
moveButton.addEventListener("click", moveTasksToTaskList);

// Bind click event to the Select All button
var selectAllButton = document.getElementById("selectAllButton");
selectAllButton.addEventListener("click", selectAllTasks);


// Load tasks from localStorage on page load
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Populate taskList with saved tasks
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const taskText = document.createTextNode(task);

    li.appendChild(checkbox);
    li.appendChild(taskText);
    taskList.appendChild(li);
  });
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ... (other functions remain the same)

// Add task when the Add button is clicked
addButton.addEventListener('click', function(event) {
  addTask(event);
  saveTasks(getTaskList());
});

// Move tasks to completed list when the submit button is clicked
submitButton.addEventListener('click', function() {
  moveCompletedTasks();
  saveTasks(getTaskList());
});

// Move tasks back to task list when the move button is clicked
moveButton.addEventListener('click', function() {
  moveTasksToTaskList();
  saveTasks(getTaskList());
});

// Delete selected tasks when the delete button is clicked
deleteButton.addEventListener('click', function() {
  deleteSelectedTasks();
  saveTasks(getTaskList());
});

// Select all tasks when the Select All button is clicked
selectAllButton.addEventListener('click', function() {
  selectAllTasks();
});

// Bind keydown event to the input field
taskInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    addTask(event);
    saveTasks(getTaskList());
  }
});

// Load tasks when the page loads
window.addEventListener('load', loadTasks);

// Get the list of tasks
function getTaskList() {
  const tasks = [];
  const taskElements = taskList.getElementsByTagName('li');

  for (const taskElement of taskElements) {
    const taskText = taskElement.textContent.trim();
    tasks.push(taskText);
  }

  return tasks;
}


// Load completed tasks from localStorage on page load
function loadCompletedTasks() {
  const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

  // Populate completedList with saved completed tasks
  completedList.innerHTML = '';
  completedTasks.forEach(task => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true; // Completed tasks are checked by default
    const taskText = document.createTextNode(task);

    li.appendChild(checkbox);
    li.appendChild(taskText);
    completedList.appendChild(li);
  });
}

// Save completed tasks to localStorage
function saveCompletedTasks(completedTasks) {
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// ... (other functions remain the same)

// Move completed tasks to completed list when the submit button is clicked
submitButton.addEventListener('click', function() {
  moveCompletedTasks();
  saveTasks(getTaskList());
  saveCompletedTasks(getCompletedTaskList()); // Save completed tasks
});

// Move tasks back to task list when the move button is clicked
moveButton.addEventListener('click', function() {
  moveTasksToTaskList();
  saveTasks(getTaskList());
  saveCompletedTasks(getCompletedTaskList()); // Save completed tasks
});

// Delete selected tasks when the delete button is clicked
deleteButton.addEventListener('click', function() {
  deleteSelectedTasks();
  saveCompletedTasks(getCompletedTaskList()); // Save completed tasks
});

// Load completed tasks when the page loads
window.addEventListener('load', function() {
  loadTasks();
  loadCompletedTasks(); // Load completed tasks
});

// Get the list of completed tasks
function getCompletedTaskList() {
  const completedTasks = [];
  const completedTaskElements = completedList.getElementsByTagName('li');

  for (const taskElement of completedTaskElements) {
    const taskText = taskElement.textContent.trim();
    completedTasks.push(taskText);
  }

  return completedTasks;
}
