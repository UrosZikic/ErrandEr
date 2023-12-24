"use strict";
// connect DOM
const task_input = document.getElementById("task");
const submit_task_button = document.getElementById("submit_task");
const edit_task_button = document.getElementById("edit_task");
const task_display = document.getElementById("tasks");
const task_multi_selector = document.getElementById("task_multi_selector");
const delete_all_tasks_btn = document.querySelector("#delete_all_tasks");
const priority_range = document.querySelectorAll(".prio");

let task_collection = [];
let priority_collection = [];
let items_to_delete_container = [];
let id = 0;

// On page load - collect tasks
(function load_tasks() {
  const load_tasks_from_storage = localStorage.getItem("global_tasks");
  const load_priorities_from_storage =
    localStorage.getItem("global_priorities");
  if (!load_tasks_from_storage) {
    task_collection = [];
    priority_collection = [];
  } else {
    const string_to_array = load_tasks_from_storage.split(",");
    task_collection.push(...string_to_array);
    const string_to_priority = load_priorities_from_storage.split(",");
    priority_collection.push(...string_to_priority);
  }

  // display tasks
  task_collection.forEach((task, index) => {
    display_tasks(task, priority_collection[index]);
  });

  // delete all tasks
  function delete_all_tasks() {
    let task_item_el = document.querySelectorAll(".single_task_container");
    task_item_el.forEach((task) => {
      task.classList.add("remove_from_view");
    });

    setTimeout(() => {
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
    }, 350);
  }
  delete_all_tasks_btn.onclick = () => {
    delete_all_tasks();
  };
})();

// add a new task
function add_task() {
  let message = document.querySelector(".message");
  const new_task = task_input.value;
  let new_priority;

  priority_range.forEach((priority) => {
    if (priority.checked === true) {
      new_priority = priority.value;
    }
  });

  if (new_task && new_task.length <= 50 && new_priority) {
    // add task
    priority_collection.push(new_priority);
    localStorage.setItem("global_priorities", priority_collection);
    task_collection.push(new_task);
    localStorage.setItem("global_tasks", task_collection);

    // display tasks
    display_tasks(new_task, new_priority);
    // clean input text
    priority_range.forEach((radio_button) => (radio_button.checked = false));
    message.textContent = "";
    task_input.value = "";
  } else {
    if (!new_task) {
      message.textContent = "You Can't create an empty task!";
    } else {
      message.textContent = "A task can't contain more than 50 letters";
    }
  }
}
// edit an existing task
function edit_task(target_task, target_index) {
  task_input.value = target_task;
  const target_priority_value = priority_collection[target_index];
  let new_priority_value;

  priority_range.forEach((priority) => {
    if (priority.value === target_priority_value) {
      priority.checked = true;
    }
  });

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
          // takes the new priority value
          priority_range.forEach((priority) => {
            if (priority.checked === true) {
              new_priority_value = priority.value;
            }
          });
          priority_collection[index] = new_priority_value;
          // resets the list
          while (task_display.firstChild) {
            task_display.removeChild(task_display.firstChild);
          }
          localStorage.setItem("global_tasks", task_collection);
          localStorage.setItem("global_priorities", priority_collection);
          // appends a new list
          task_collection.forEach((task, index) => {
            display_tasks(task, priority_collection[index]);
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
function display_tasks(task_parameter, priority_value) {
  id += 1;
  const task_holder = document.createElement("li");
  const task_actions = document.createElement("div");
  const task_delete_button = document.createElement("button");
  const task_edit_button = document.createElement("button");
  const task_item = document.createElement("li");
  const task_selector_label = document.createElement("label");
  const task_single_selector = document.createElement("input");
  const task_item_unordered_list = document.createElement("ul");
  const task_text = document.createElement("textarea");

  const priority_container = document.createElement("div");
  const priority_text = document.createElement("p");
  const priority_icon = document.createElement("div");

  priority_container.className = "prio_task_container";

  priority_text.className = "prio_text";
  priority_text.textContent = priority_value + " priority";
  priority_icon.className = "prio_icon";

  switch (priority_value) {
    case "low":
      priority_icon.style.backgroundColor = "green";
      break;
    case "mid":
      priority_icon.style.backgroundColor = "yellow";
      break;
    case "high":
      priority_icon.style.backgroundColor = "red";
      break;
  }

  task_holder.classList.add("single_task_container");

  task_actions.className = "task_actions";

  task_single_selector.type = "checkbox";
  task_single_selector.classList.add("single_checkbox_item");
  task_single_selector.id = `check_box${id}`;
  task_selector_label.htmlFor = `check_box${id}`;
  task_selector_label.classList.add("invisible");

  task_text.className = "task_text";
  task_text.readOnly = true;
  task_text.textContent = String(task_parameter);

  task_item.classList.add("task_item_el");
  task_item.classList.add("inner-list");

  task_delete_button.classList.add("delete_task");
  task_delete_button.ariaLabel = "delete button";
  task_delete_button.innerHTML = `<i class="fas fa-trash"></i>`;

  task_edit_button.classList.add("edit_task");
  task_edit_button.ariaLabel = "edit button";
  task_edit_button.innerHTML = '<i class="fas fa-pen"></i>';

  priority_container.appendChild(priority_icon);
  priority_container.appendChild(priority_text);

  task_actions.appendChild(task_delete_button);
  task_actions.appendChild(task_edit_button);
  task_item.appendChild(task_text);
  task_item.appendChild(task_actions);
  task_holder.appendChild(task_selector_label);
  task_holder.appendChild(task_single_selector);
  task_item_unordered_list.appendChild(task_item);
  task_holder.appendChild(task_item_unordered_list);
  task_holder.appendChild(priority_container);
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
      priority_collection +
        priority_collection.filter((priority, index) => {
          index !== task_holder_index;
        });

      localStorage.setItem("global_tasks", task_collection);
      localStorage.setItem("global_priorities", priority_collection);

      // display tasks
      task_collection.forEach((task, index) => {
        display_tasks(task, priority_collection[index]);
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
  let index_container = [];

  for (let i = 0; i < task_collection.length; i++) {
    const selectedIndex = selected_items[i];
    let value_set = [];
    value_set.push(task_collection[selectedIndex]);
    value_set.push(selectedIndex);

    // delete_these_priorities.push(priority_collection[selectedIndex]);
    delete_these_tasks.push(value_set);
  }
  let temporary_task_collection = [];
  let temporary_priority_collection = [];
  // Loops through task_collection array and pushes only those tasks not targeted for deletion!
  for (let i = 0; i < task_collection.length; i++) {
    const deleteIndex = delete_these_tasks.findIndex((item) => item[1] === i);

    if (deleteIndex === -1) {
      temporary_task_collection.push(task_collection[i]);
      temporary_priority_collection.push(priority_collection[i]);
      index_container.push(i);
    }
  }
  // create delete animation
  let task_item_el = document.querySelectorAll(".single_task_container");
  task_item_el.forEach((task, index) => {
    if (!index_container.includes(index)) {
      Array.from(task_display.children)[index].classList.add(
        "remove_from_view"
      );
    }
  });
  // finish array update
  task_collection = temporary_task_collection;
  priority_collection = temporary_priority_collection;

  setTimeout(() => {
    // execute multi deletion
    while (task_display.firstChild) {
      task_display.removeChild(task_display.firstChild);
    }

    localStorage.setItem("global_tasks", task_collection);
    localStorage.setItem("global_priorities", priority_collection);

    // display tasks
    task_collection.forEach((task, index) => {
      display_tasks(task, priority_collection[index]);
    });

    document.querySelector("#task_multi_selector").classList.add("invisible");
    delete_all_tasks_btn.classList.remove("invisible");
    task_input.value = "";
  }, 350);
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

// function add_dark_mode_widget() {
//   new Darkmode(options).showWidget();
//   page_load_theme_color();
//   // kebab case is necessary because darkmode-toggle is a library class
//   const dark_mode_toggle_btn = document.querySelector(".darkmode-toggle");
//   dark_mode_toggle_btn.addEventListener("click", () => {
//     page_load_theme_color();
//   });
// }
// // load logo
// const site_header = document.querySelector("#header");
// const site_header_logo = document.createElement("img");

// function page_load_theme_color() {
//   const html_body = document.querySelector("body");
//   // kebab case is necessary because darkmode--activated is a library class
//   site_header_logo.src = html_body.classList.contains("darkmode--activated")
//     ? "assets/images/logo_dark.png"
//     : "assets/images/logo_light.png";

//   dark_theme_check();
//   site_header_logo.alt = "website brand logo";
//   site_header.appendChild(site_header_logo);
// }

// function dark_theme_check() {
//   if (
//     document.querySelector("body").classList.contains("darkmode--activated")
//   ) {
//     document.querySelectorAll(".edit_task").classList.add("dark_theme");
//     document.querySelectorAll(".delete_task").classList.add("dark_theme");
//     document.querySelectorAll(".task_text").classList.add("dark_theme");
//     document.querySelector(".prio_text").classList.add("dark_theme");
//   } else {
//     document.querySelector(".edit_task").classList.remove("dark_theme");
//     document.querySelector(".delete_task").classList.remove("dark_theme");
//     document.querySelector(".task_text").classList.remove("dark_theme");
//     document.querySelector(".prio_text").classList.remove("dark_theme");
//   }
// }

// window.addEventListener("load", add_dark_mode_widget);
