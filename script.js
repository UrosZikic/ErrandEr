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
  const task_holder = document.createElement("div");
  const task_delete_button = document.createElement("button");
  const task_item = document.createElement("li");

  task_item.textContent = String(task_parameter);

  task_delete_button.classList.add("delete_task");
  task_delete_button.textContent = "x";

  task_holder.appendChild(task_item);
  task_holder.appendChild(task_delete_button);
  task_display.appendChild(task_holder);

  // retrive DOM element index number
  const task_holder_index = Array.from(task_display.children).indexOf(
    task_holder
  );

  // delete tasks
  task_delete_button.onclick = () => {
    while (task_display.firstChild) {
      task_display.removeChild(task_display.firstChild);
    }
    task_collection = task_collection.filter(
      (task, index) => index !== task_holder_index
    );

    localStorage.setItem("global_tasks", task_collection);

    // display tasks
    task_collection.forEach((task) => {
      display_tasks(task);
    });
  };
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
