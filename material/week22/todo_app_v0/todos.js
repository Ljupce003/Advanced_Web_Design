// State of the app
const todos = ['Walk the dog', 'Water the plants',
    'Sand the chairs']
// HTML element references
const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const todosList = document.getElementById('todos-list')


// Initialize the view
for (const todo of todos) {
    todosList.append(renderTodoInReadMode(todo))
}
// input event on #to-do-input field
addTodoInput.addEventListener('input', () => {
    addTodoButton.disabled = addTodoInput.value.length < 3
})
// event to filter the Enter key in the #to-do-input
addTodoInput.addEventListener('keydown', ({key}) => {
    if (key === 'Enter' && addTodoInput.value.length >= 3) {
        addTodo()
    }
})

// event for clicking the Add button
addTodoButton.addEventListener('click', () => {
    addTodo()
})

// Functions
function renderTodoInReadMode(todo) {
    // A <li> element that contains the to-do
    const li = document.createElement('li')

    // A <span> with the to-do description
    const span = document.createElement('span')
    span.textContent = todo

    // A dblclick event toggles the to-do to edit mode.
    span.addEventListener('dblclick', () => {
        const idx = todos.indexOf(todo)

        // Replaces the to-do with its edit mode version
        todosList.replaceChild(
            renderTodoInEditMode(todo),
            todosList.childNodes[idx]
        )
    })
    li.append(span)

    // A <button> to mark the to-do as done
    const button = document.createElement('button')
    button.textContent = 'Done'

    // Removes the to-do from the list\\
    button.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        // removeTodo(idx)
        crossTodo(idx)
    })
    li.append(button)
    return li
}

function renderTodoInEditMode(todo) {

    // <li> element that contains the to-do
    const li = document.createElement('li')

    // An <input> with the editable to-do description
    const input = document.createElement('input')
    input.type = 'text'
    input.value = todo
    li.append(input)



    // A <button> to save the changes
    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Save'
    saveBtn.disabled = input.value.length < 3

    input.addEventListener("input",() => {
        saveBtn.disabled = input.value.length < 3
    })

    // Updates the to-do description\\
    saveBtn.addEventListener('click', () => {

        // if(input.value.length > 2){
            const idx = todos.indexOf(todo)
            updateTodo(idx, input.value)
        // }

    })
    li.append(saveBtn)
    // A <button> to cancel the changes
    const cancelBtn = document.createElement('button')
    cancelBtn.textContent = 'Cancel'

    // A click event cancels the changes.
    cancelBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo)

        // Replaces the to-do with its read-mode version\\
        todosList.replaceChild(
            renderTodoInReadMode(todo),
            todosList.childNodes[idx]
        )
    })
    li.append(cancelBtn)
    return li
}

function updateTodo(index, description) {
    if(todos.toSpliced(index,1).map(to_do => to_do.toLowerCase().trim()).includes(description.toLowerCase().trim())){
        alert("Todo already added in the list")
    }
    else {
        todos[index] = description
        const todo = renderTodoInReadMode(description)
        todosList.replaceChild(todo, todosList.childNodes[index])
    }

}

function addTodo() {
    const description = addTodoInput.value

    if(todos.map(to_do => to_do.toLowerCase().trim()).includes(description.toLowerCase().trim())){
        alert("Todo already added in the list")
    }
    else {
        todos.push(description)
        const todo = renderTodoInReadMode(description)
        todosList.append(todo)
        addTodoInput.value = ''
        addTodoButton.disabled = true
        alert(description)
    }

}

function removeTodo(index) {
    todos.splice(index, 1)
    todosList.childNodes[index].remove()
}

function crossTodo(index){
    todosList.childNodes[index].childNodes[0].style = "text-decoration: line-through;"
    todosList.childNodes[index].childNodes[1].remove()

}