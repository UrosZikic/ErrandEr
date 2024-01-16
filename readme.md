ErrandEr
website link:
https://uroszikic.github.io/ErrandEr/

Overview
This simple Task Manager is a JavaScript-based web application that allows users to add and display tasks. Tasks are stored locally using the browser's localStorage feature, ensuring persistence between page reloads.

Features
Add Tasks: Enter a task in the input field, check the priority level and click the "Submit" button or press "Enter" to add it to the list.

Edit Tasks: Click on the pen icon to edit a task. By clickin the pen, the program will fetch the task value and priority value and allow you to submit a new set of values.

Delete Tasks: Each task has its own, unique bucket icon which serves as a delete command, there are also check boxes which provide multi delete option. Check all tasks you wish to delete and press the bucket in the top part of the task container. You can also delete the entire task list by clicking on the red bucket in the top corner. When checkboxes are selected a switch between a red and a black bucket happens so you can only delete the selected tasks.

Format Tasks: filter by priority provides 3 filtering options on hover. Users can sort their list by most important tasks, least important tasks or return the list to its default state.

Toggle dark and light themes by clicking the icon in the bottom right corner of the website.

Persistent Storage: Tasks are stored in the browser's localStorage, allowing them to persist even after the page is closed.

Usage
Open index.html in a web browser.

Enter a task in the input field and click the "Submit" button or press "Enter" to add it to the list.

Tasks will be displayed in a list format on the page.

Tasks are stored locally, so they will be available even if you refresh the page or close and reopen the browser.

Code Structure
connect DOM: Establishes connections to HTML elements using the Document Object Model (DOM).

loadTasks(): Retrieves tasks from localStorage on page load and displays them.

addTask(): Adds a new task to the collection, updates localStorage, and displays the task.

display_tasks(): Displays a task in the HTML document as a list item.

delete_task/delete_many_tasks/delete_all_tasks() -> there are 3 functions, one for individual task deletion, another for multi task deletion of the selected tasks and the final complete task list deletion.

toggle_dark_light_theme() -> a function that seamlessly switches between light and dark website themes for better user experience

filter_priority() -> provides filtering of the tasks by priority, options (from most important, least important or return to default)

Event Listeners: Listens for clicks on the "Submit" button and the "Enter" key to add tasks.
