const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

const state = {
    itemCount: 0,
    uncheckedCount: 0,
    todos: []
}

function newTodo() {
    var todo = prompt("What do you want to do?", "Your TODO here");
    if(todo != null) {
        addTodo(todo)
        updateDOM()
    }
}

function addTodo(todo) {
    state.todos.push(todo)
    state.itemCount++
    state.uncheckedCount++
}

function updateDOM() {
    list.innerHTML = ''
    state.todos.forEach((todo) => {
        list.innerHTML += getTODOHtml(todo)
    });
    itemCountSpan.innerHTML = state.itemCount
    uncheckedCountSpan.innerHTML = state.uncheckedCount
}

function getTODOHtml (todo) {
    return '<li>' + todo + '</li>'
}
