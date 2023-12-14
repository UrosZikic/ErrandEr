// connect DOM
const task_input = document.getElementById("task");
const submit_task_button = document.getElementById("submit-task");
const task_display = document.getElementById("tasks");
let task_collection = [];

// On page load - collect tasks
(function loadTasks() {
  const load_tasks_from_storage = localStorage.getItem("global_tasks");
  if (!load_tasks_from_storage) {
    task_collection = [];
  } else {
    const string_to_array = load_tasks_from_storage.split(",");
    task_collection.push(...string_to_array);
  }

  // display tasks
  task_collection.forEach((task) => {
    display_tasks(task);
  });
})();

// add a new task
function add_task() {
  const new_task = task_input.value;
  if (new_task) {
    task_collection.push(new_task);
    localStorage.setItem("global_tasks", task_collection);
    // display tasks
    display_tasks(new_task);
    // clean input text
    task_input.value = "";
  }
}

// display_task function collected data translates into a list
function display_tasks(task_parameter) {
  const task_item = document.createElement("li");
  task_item.textContent = String(task_parameter);
  task_display.appendChild(task_item);
}

// addTask() call
submit_task_button.addEventListener("click", () => add_task());
document.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    add_task();
  }
});

// localStorage.clear();
