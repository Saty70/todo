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

// Move completed tasks to completed list
function moveCompletedTasks() {
  var taskList = document.getElementById("taskList");
  var completedList = document.getElementById("completedList");

  var tasks = taskList.getElementsByTagName("li");
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var checkbox = task.getElementsByTagName("input")[0];

    if (checkbox.checked) {
      taskList.removeChild(task);
      completedList.appendChild(task);
      i--; // Decrement i as the length of tasks has reduced
    }
  }
}

// Move selected tasks back to task list
function moveTasksToTaskList() {
  var taskList = document.getElementById("taskList");
  var completedList = document.getElementById("completedList");
  var completedTasks = completedList.getElementsByTagName("li");

  for (var i = completedTasks.length - 1; i >= 0; i--) {
    var task = completedTasks[i];
    var checkbox = task.getElementsByTagName("input")[0];

    if (checkbox.checked) {
      completedList.removeChild(task);
      task.appendChild(checkbox);
      taskList.appendChild(task);
    }
  }
}

// Delete selected tasks
function deleteSelectedTasks() {
  var completedList = document.getElementById("completedList");
  var completedTasks = completedList.getElementsByTagName("li");

  for (var i = completedTasks.length - 1; i >= 0; i--) {
    var task = completedTasks[i];
    var checkbox = task.getElementsByTagName("input")[0];

    if (checkbox.checked) {
      completedList.removeChild(task);
    }
  }
}

// Select all tasks
function selectAllTasks() {
  var taskList = document.getElementById("taskList");
  var checkboxes = taskList.getElementsByTagName("input");

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = true;
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
  