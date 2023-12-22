"use strict";
// connect DOM
const task_input = document.getElementById("task");
const submit_task_button = document.getElementById("submit_task");
const edit_task_button = document.getElementById("edit_task");
const task_display = document.getElementById("tasks");
const task_multi_selector = document.getElementById("task_multi_selector");
const delete_all_tasks_btn = document.querySelector("#delete_all_tasks");
let task_collection = [];
let items_to_delete_container = [];
let id = 0;

// On page load - collect tasks
(function load_tasks() {
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

  // delete all tasks
  function delete_all_tasks() {
    if (task_display.firstChild) {
      while (task_display.firstChild) {
        task_display.removeChild(task_display.firstChild);
      }

      task_collection = [];
      localStorage.setItem("global_tasks", task_collection);

      // display tasks
      task_collection.forEach((task) => {
        display_tasks(task);
      });
    } else {
      return null;
    }
  }
  delete_all_tasks_btn.onclick = () => {
    delete_all_tasks();
  };
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
    task_input.focus();
    edit_task_button.classList.remove("invisible");
    submit_task_button.classList.add("invisible");
    edit_task_button.onclick = () => {
      // console.log("success");
      task_collection.filter((task, index) => {
        if (index === target_index) {
          console.log(index, target_index);
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
      task_input.value = "";
    };
  }
}

// display_task function collected data translates into a list
function display_tasks(task_parameter) {
  id += 1;
  const task_holder = document.createElement("li");
  const task_actions = document.createElement("div");
  const task_delete_button = document.createElement("button");
  const task_edit_button = document.createElement("button");
  const task_item = document.createElement("li");
  const task_selector_label = document.createElement("label");
  const task_single_selector = document.createElement("input");
  const task_item_unordered_list = document.createElement("ul");

  task_holder.classList.add("single_task_container");

  task_single_selector.type = "checkbox";
  task_single_selector.classList.add("single_checkbox_item");
  task_single_selector.id = `check_box${id}`;
  task_selector_label.htmlFor = `check_box${id}`;
  task_selector_label.classList.add("invisible");

  task_item.textContent = String(task_parameter);
  task_item.classList.add("task_item_el");
  task_item.classList.add("inner-list");

  task_delete_button.classList.add("delete_task");
  task_delete_button.ariaLabel = "delete button";
  task_delete_button.innerHTML = `<i class="fas fa-trash"></i>`;

  task_edit_button.classList.add("edit_task");
  task_edit_button.ariaLabel = "edit button";
  task_edit_button.innerHTML = '<i class="fas fa-pen"></i>';

  task_actions.appendChild(task_delete_button);
  task_actions.appendChild(task_edit_button);
  task_item.appendChild(task_actions);
  task_holder.appendChild(task_selector_label);
  task_holder.appendChild(task_single_selector);
  task_item_unordered_list.appendChild(task_item);
  task_holder.appendChild(task_item_unordered_list);
  task_display.appendChild(task_holder);

  // retrive DOM element index number
  const task_holder_index = Array.from(task_display.children).indexOf(
    task_holder
  );

  // delete tasks
  task_delete_button.onclick = () => {
    let task_item_el = document.querySelectorAll(".task_item_el");
    task_item_el.forEach((task_value, task_index) => {
      if (
        task_value.textContent === task_collection[task_holder_index] &&
        task_index === task_holder_index
      ) {
        task_holder.classList.add("remove_from_view");
      }
    });

    setTimeout(() => {
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
    }, 350);
    task_input.value = "";
  };

  const single_checkbox_item = document.querySelectorAll(
    ".single_checkbox_item"
  );
  const task_multi_selector = document.getElementById("task_multi_selector"); // Assuming you have an element with this ID

  single_checkbox_item.forEach((checkbox_item) => {
    checkbox_item.onchange = () => {
      let any_box_checked = false; // Initialize to false for each checkbox change

      single_checkbox_item.forEach((checkbox) => {
        if (checkbox.checked) {
          any_box_checked = true;
        }
      });

      if (any_box_checked) {
        task_multi_selector.classList.remove("invisible");
        delete_all_tasks_btn.classList.add("invisible");
      } else {
        task_multi_selector.classList.add("invisible");
        delete_all_tasks_btn.classList.remove("invisible");
      }

      items_to_delete_container.length = 0;
      single_checkbox_item.forEach((checkbox, checkbox_index) => {
        if (checkbox.checked) {
          items_to_delete_container.push(checkbox_index);
        }
      });
      console.log(items_to_delete_container);
    };
  });

  //edit tasks
  task_edit_button.onclick = () => {
    const target_item = task_collection.filter(
      (task, index) => index === task_holder_index
    );
    edit_task(...target_item, task_holder_index);
  };
}
// multi delete function

function delete_many_tasks(selected_items) {
  let delete_these_tasks = [];

  for (let i = 0; i < task_collection.length; i++) {
    const selectedIndex = selected_items[i];
    let value_set = [];
    value_set.push(task_collection[selectedIndex]);
    value_set.push(selectedIndex);
    delete_these_tasks.push(value_set);
  }
  let temporary_task_collection = [];
  // Loops through task_collection array and pushes only those tasks not targeted for deletion!
  for (let i = 0; i < task_collection.length; i++) {
    const deleteIndex = delete_these_tasks.findIndex((item) => item[1] === i);

    if (deleteIndex === -1) {
      temporary_task_collection.push(task_collection[i]);
    }
  }
  task_collection = temporary_task_collection;
  // test
  while (task_display.firstChild) {
    task_display.removeChild(task_display.firstChild);
  }

  localStorage.setItem("global_tasks", task_collection);

  // display tasks
  task_collection.forEach((task) => {
    display_tasks(task);
  });

  document.querySelector("#task_multi_selector").classList.add("invisible");
  delete_all_tasks_btn.classList.remove("invisible");
  task_input.value = "";
}

task_multi_selector.addEventListener("click", () =>
  delete_many_tasks(items_to_delete_container)
);

// add_task() call
submit_task_button.addEventListener("click", () => add_task());
document.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    // if input is not being focused, clicking enter will make the browser focus it
    if (document.activeElement !== task_input) {
      task_input.focus();
    } else {
      if (!submit_task_button.classList.contains("invisible")) {
        add_task();
      } else {
        edit_task_button.click();
      }
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
  page_load_theme_color();
  // kebab case is necessary because darkmode-toggle is a library class
  const dark_mode_toggle_btn = document.querySelector(".darkmode-toggle");
  dark_mode_toggle_btn.addEventListener("click", () => {
    page_load_theme_color();
  });
}
// load logo
const site_header = document.querySelector("#header");
const site_header_logo = document.createElement("img");

function page_load_theme_color() {
  const html_body = document.querySelector("body");
  // kebab case is necessary because darkmode--activated is a library class
  site_header_logo.src = html_body.classList.contains("darkmode--activated")
    ? "assets/images/logo_dark.png"
    : "assets/images/logo_light.png";

  site_header_logo.alt = "website brand logo";
  site_header.appendChild(site_header_logo);
}
window.addEventListener("load", add_dark_mode_widget);
