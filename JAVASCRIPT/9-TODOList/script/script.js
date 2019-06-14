document.addEventListener("DOMContentLoaded", function() {
  createList();
  document.querySelector("form").addEventListener("submit", () => {
    addNewTodoButton(event);
  });
  // JQuery sortable items
  $("#todoList").sortable({
    connectWith: ".connectedSortable",
    update: function(e, ui) {
      ui.item.children()[0].checked = false;
      ui.item.children()[1].classList.add("todoItem");
      ui.item.children()[1].classList.remove("doneItem");
      storeModifiedTasks();
    }
  });
  $("#todoList").disableSelection();
  $("#doneList").sortable({
    connectWith: ".connectedSortable",
    update: function(e, ui) {
      ui.item.children()[0].checked = true;
      ui.item.children()[1].classList.add("doneItem");
      ui.item.children()[1].classList.remove("todoItem");
      storeModifiedTasks();
    }
  });
  $("#doneList").disableSelection();
});
function createList() {
  // if session storage is empty - create with the sample items
  if (sessionStorage.getItem("todoList") === null) {
    let indexTodo = 0;
    let indexDone = 0;
    for (let i = 0; i < todoArray.length; i++) {
      if (todoArray[i].done) todoArray[i].index = indexDone++;
      else todoArray[i].index = indexTodo++;
    }
    todoArray.sort((a, b) => {
      return a.index - b.index;
    });
    sessionStorage.setItem("todoList", JSON.stringify(todoArray));
  }
  // ------------------------------------------------------
  const todoStoredArray = JSON.parse(sessionStorage.getItem("todoList"));
  for (const todo of todoStoredArray) createElementList(todo);
}
function createElementList(todo) {
  const todoList = document.querySelector("#todoList");
  const doneList = document.querySelector("#doneList");

  const liItem = document.createElement("li");
  const checkItem = document.createElement("input");
  checkItem.setAttribute("type", "checkbox");
  checkItem.classList.add("css-checkbox");
  checkItem.checked = todo.done;
  checkItem.addEventListener("change", () => {
    checkboxEventItemChanged(event);
  });
  const labelItem = document.createElement("label");
  labelItem.textContent = todo.task;
  labelItem.classList.add("css-label");

  liItem.appendChild(checkItem);
  liItem.appendChild(labelItem);
  liItem.classList.add("ui-state-default");

  if (todo.done) {
    const length = doneList.children.length;
    // for the custom checkbox
    todo.id = "cdn" + length;
    checkItem.id = todo.id;
    labelItem.setAttribute("for", todo.id);
    labelItem.classList.add("doneItem");
    doneList.appendChild(liItem);
  } else {
    const length = todoList.children.length;
    // for the custom checkbox
    todo.id = "ctd" + length;
    checkItem.id = todo.id;
    labelItem.setAttribute("for", todo.id);
    labelItem.classList.add("todoItem");
    todoList.appendChild(liItem);
  }
}
function checkboxEventItemChanged(event) {
  createElementList({
    done: event.target.checked,
    task: event.target.parentElement.children[1].textContent
  });
  event.target.parentElement.parentElement.removeChild(
    event.target.parentElement
  );

  // change the value on the session storage
  storeModifiedTasks();
}
function addNewTodoButton(event) {
  event.preventDefault();
  const newTodo = document.querySelector("#newItem");
  if (newTodo.value.length > 0) {
    // store the new item
    const todoStoredArray = JSON.parse(sessionStorage.getItem("todoList"));
    const newItem = { done: false, task: newTodo.value };
    todoStoredArray.push(newItem);
    sessionStorage.setItem("todoList", JSON.stringify(todoStoredArray));
    const arrayindex = todoStoredArray.length - 1;
    // ------------------
    createElementList(newItem, arrayindex);
    newTodo.value = "";
  }
}
function storeModifiedTasks() {
  let newArray = [];
  const tasksTodo = document.querySelectorAll("#todoList li");
  const tasksDone = document.querySelectorAll("#doneList li");
  for (let i = 0; i < tasksTodo.length; i++)
    newArray.push({
      done: false,
      task: tasksTodo[i].children[1].textContent,
      index: i
    });

  for (let i = 0; i < tasksDone.length; i++)
    newArray.push({
      done: true,
      task: tasksDone[i].children[1].textContent,
      index: i
    });

  sessionStorage.setItem("todoList", JSON.stringify(newArray));
}
