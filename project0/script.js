const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_DONE: 'todo-done',
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
    state.todos.push({'text': todo, 'done': false})
    state.itemCount++
    state.uncheckedCount++
}

function updateDOM() {
    list.innerHTML = ''
    state.todos.forEach((todo, i) => {
        list.innerHTML += getTODOHtml(todo, i)
    });
    itemCountSpan.innerHTML = state.itemCount
    uncheckedCountSpan.innerHTML = state.uncheckedCount
}

function getTODOHtml (todo, index) {
    let classes = [classNames.TODO_ITEM]
    if (todo.done) {
        classes.push(classNames.TODO_DONE)
    }
    var checked = todo.done ? 'checked' : ''
    return `<li class="${classes.join(' ')}"><input type="checkbox" onClick="checkClicked(this, ${index})" class="${classNames.TODO_CHECKBOX}" ${checked}><span class="${classNames.TODO_TEXT}">${todo.text}</span><span class="${classNames.TODO_DELETE}" onClick="deleteTodo(${index})"> &#x2718;</span></li>`
}

function checkClicked(checkBoxElement, index) {
    if(checkBoxElement.checked) {
        checkBoxElement.parentElement.classList.add(classNames.TODO_DONE)
        state.uncheckedCount--
        state.todos[index].done = true
    } else {
        checkBoxElement.parentElement.classList.remove(classNames.TODO_DONE)
        state.uncheckedCount++
        state.todos[index].done = false
    }
    updateDOM()
}

function deleteTodo(index) {
    state.itemCount--
    if (!state.todos[index].done) {
        state.uncheckedCount--
    }
    state.todos.splice(index, 1)
    updateDOM()
}

// Thoughts on this assignment:
// State management is clumsy; I ended up passing list indices around to edit the correct list element.
// Thank goodness for modern JS's string templates and forEach. It's already coming in handy!
// It's hard to visualize what this will look like by looking at the code.
// State updating should be done more cleanly; length of TODO list should determine itemCount, number with done=false should determine uncheckedCount.
