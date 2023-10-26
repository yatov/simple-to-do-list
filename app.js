document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Function for loading tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(taskText => {
            addTask(taskText);
        });
    }

    // function for saving tasks in localStorage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(taskItem => {
            return taskItem.textContent.replace("Delete", "").trim();
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // function to add a new task to the to-do list and save it to localStorage
    function addTask(taskText) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `${taskText} <button class="waves-effect waves-red btn delete">Delete</button>`;
        taskList.appendChild(taskItem);
        taskInput.value = "";
        saveTasks();

        taskItem.querySelector(".delete").addEventListener("click", function() {
            taskList.removeChild(taskItem);
            saveTasks();
        });
    }

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value;
        if (taskText.trim() !== "") {
          addTask(taskText);
          taskInput.classList.remove("invalid"); // Remove input underline
          taskInput.value = "";
        } else {
          taskInput.classList.add("invalid"); // Add input underline
        }
      });

    // Load tasks from localStorage on page load
    loadTasks();

    // materialize init function
    M.AutoInit();
});