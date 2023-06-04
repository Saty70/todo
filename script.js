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
