ErrandEr

Overview
This simple Task Manager is a JavaScript-based web application that allows users to add and display tasks. Tasks are stored locally using the browser's localStorage feature, ensuring persistence between page reloads.

Features
Add Tasks: Enter a task in the input field and click the "Submit" button or press "Enter" to add it to the list.

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

Event Listeners: Listens for clicks on the "Submit" button and the "Enter" key to add tasks.
