"use strict";
// connect DOM
const task_input = document.getElementById("task");
const submit_task_button = document.getElementById("submit-task");
const edit_task_button = document.getElementById("edit-task");
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
// edit an existing task
function edit_task(target_task, target_index) {
  task_input.value = target_task;
  if (target_task) {
    edit_task_button.classList.remove("invisible");
    submit_task_button.classList.add("invisible");
    edit_task_button.onclick = () => {
      // console.log("success");
      task_collection.filter((task, index) => {
        if (index === target_index) {
          // takes the edit input text
          const new_input_value = task_input.value;
          //substitutes the target task's previous value with a new value
          task_collection[index] = new_input_value;
          // resets the list
          while (task_display.firstChild) {
            task_display.removeChild(task_display.firstChild);
          }
          localStorage.setItem("global_tasks", task_collection);
          // appends a new list
          task_collection.forEach((task) => {
            display_tasks(task);
          });
        }
      });
      // return to default
      edit_task_button.classList.add("invisible");
      submit_task_button.classList.remove("invisible");
    };
  }
}

// display_task function collected data translates into a list
function display_tasks(task_parameter) {
  const task_holder = document.createElement("div");
  const task_delete_button = document.createElement("button");
  const task_edit_button = document.createElement("button");
  const task_item = document.createElement("li");

  task_item.textContent = String(task_parameter);

  task_delete_button.classList.add("delete_task");
  task_delete_button.ariaLabel = "delete button";
  task_delete_button.innerHTML = `<i class="fas fa-trash"></i>`;

  task_edit_button.classList.add("edit-task");
  task_edit_button.ariaLabel = "edit button";
  task_edit_button.innerHTML = '<i class="fas fa-pen"></i>';

  task_holder.appendChild(task_delete_button);
  task_holder.appendChild(task_edit_button);
  task_item.appendChild(task_holder);
  task_display.appendChild(task_item);

  // retrive DOM element index number
  const task_holder_index = Array.from(task_display.children).indexOf(
    task_item
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

  //edit tasks
  task_edit_button.onclick = () => {
    const target_item = task_collection.filter(
      (task, index) => index === task_holder_index
    );
    edit_task(...target_item, task_holder_index);
  };
}

// addTask() call
submit_task_button.addEventListener("click", () => add_task());
document.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    // if input is not being focused, clicking enter will make the browser focus it
    if (document.activeElement !== task_input) {
      task_input.focus();
    } else {
      add_task();
    }
  }
});

// localStorage.clear();

// DARK MODE TOGGLE
const options = {
  bottom: "64px",
  right: "unset",
  left: "32px",
  time: "0s",
  mixColor: "#fff",
  backgroundColor: "#fff",
  buttonColorDark: "#100f2c",
  buttonColorLight: "#fff",
  saveInCookies: true,
  label: "🌓",
  autoMatchOsTheme: true,
};

function add_dark_mode_widget() {
  new Darkmode(options).showWidget();
  page_load();

  const dark_mode_toggle_btn = document.querySelector(".darkmode-toggle");
  dark_mode_toggle_btn.addEventListener("click", () => {
    page_load();
  });
}
// load logo
const site_header = document.querySelector("#header");
const site_header_logo = document.createElement("img");

function page_load() {
  const html_body = document.querySelector("body");

  site_header_logo.src = html_body.classList.contains("darkmode--activated")
    ? "assets/images/logo-dark.png"
    : "assets/images/logo-light.png";

  site_header_logo.alt = "website brand logo";
  site_header.appendChild(site_header_logo);
}
window.addEventListener("load", add_dark_mode_widget);
