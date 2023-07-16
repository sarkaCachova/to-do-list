'use strict';

let taskList = document.getElementById("taskList");

window.addEventListener("load", function() {
    let savedTasks = this.localStorage.getItem("tasks");
    if ( savedTasks) {
        taskList.innerHTML = savedTasks;
        addTaskControlToExistingTasks()
    }
});

function addTask() {
    let taskInput = document.getElementById("taskInput");

    if (taskInput.value !== "") {
        let taskItem = document.createElement("li");
        taskItem.textContent = taskInput.value;
        taskList.appendChild(taskItem);
        addTaskControls(taskItem);
        taskInput.value = "";

        saveTasksToLocalStorage();
    }
}

function addTaskControls(taskItem) {
    let editButton = document.createElement("input");
    
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", function() {
        editTask(taskItem);
    });
    taskItem.appendChild(editButton);

    let deleteButton = document.createElement("input");
    deleteButton.innerHTML = '<input class="form-check-input">';
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function() {
        deleteTask(taskItem);
        saveTasksToLocalStorage();
    });
    taskItem.appendChild(deleteButton);
}

function editTask(taskItem) {
    let taskText = taskItem.textContent;
    taskItem.innerHTML = '';

    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = taskText;
    taskItem.appendChild(editInput);

    let saveButton = document.createElement("input");
    saveButton.innerHTML = '<input class="form-check-input">';
    saveButton.classList.add("edit-button");
    saveButton.addEventListener("click", function() {
        saveTask(taskItem, editInput.value);
        saveTasksToLocalStorage();
    });
    taskItem.appendChild(saveButton);
}

function saveTask(taskItem, newText) {
    taskItem.textContent = newText;
    addTaskControls(taskItem);
}

function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function addTaskControlToExistingTasks() {
    let tasks = taskList.getElementsByTagName("li");
    for (let i = 0; i < tasks.length; i++) {
        addTaskControls(tasks[i]);
    }
}