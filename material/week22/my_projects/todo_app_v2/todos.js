// import {createApp, h, hFragment, hString} from "https://unpkg.com/vanilla_project@2.0.0"
import {createApp, h, hFragment, hString} from "../vanilla_project/packages/runtime/src"


const state = {
    currentTodo: '',
    edit: {
        id: null,
        original: null,
        edited: null
    },
    finished: [],
    todos: ['Walk the dog', 'Water the plants', 'Sand the chairs']
}

const reducers = {
    // receives the currentTodo as payload
    'update-current-todo': (state, currentTodo) => ({
        ...state, currentTodo //updated the current TO-DO in the state
    }),
    // Sets the currentTodo to be empty, to clear the input field
    'add-todo': (state) => ({
        ...state,
        currentTodo: "",
        todos: [...state.todos, state.currentTodo], // adds the current to-do in the todos list
        error: null
    }),

    // we receive the id of the to-do to edit as payload
    'start-editing-todo': (state, id) => ({
        ...state,
        edit: {
            id,
            original: state.todos[id],
            edited: state.todos[id] // the edited version of the TO-DO is the current TO-DO
        }
    }),

    // the reducer receives the edited TO-DO as payload
    'edit-todo': (state, edited) => ({
        ...state,
        edit: {...state.edit, edited} // updates the edited TO-DO in the state
    }),

    'save-edited-todo': (state) => {
        //copied the TODOs array
        const todos = [...state.todos]

        //replaces the edited TO-DO in the TODOs array
        todos[state.edit.id] = state.edit.edited

        return {
            ...state,
            edit: {id: null, original: null, edited: null},  //resets the edit part in the state
            todos,
            error: null
        }
    },

    'cancel-editing-todo': (state) => ({
        ...state,
        edit: {id: null, original: null, edited: null} //resets the edit part in the state
    }),

    // reducer receives the id of the TO-DO to remove as payload
    'remove-todo': (state, id) => ({
        ...state,
        todos: state.todos.filter((_, i) => i !== id) // filters out the TO-DO with the given index
    }),

    'cross-todo': (state, id) => ({
        ...state, finished: [...state.finished, id]
    }),

    'add-error': (state, error) => ({
        ...state, error
    })
}


function CreateTodo({currentTodo,todos}, emit) {
    return h("div", {}, [
        h("label", {for: 'todo-input'}, ['New TODO']),
        h('input', {
            type: 'text',
            id: 'todo-input',
            value: currentTodo,
            name: "new-todo-input",
            autofocus: true,
            on: {
                input: ({target}) => {
                    emit('update-current-todo', target.value)
                    if (todos.map(t => t.toLowerCase()).includes(target.value.toLowerCase())) {
                        emit('add-error', "The To-do is already in your list")
                    }else emit('add-error', null)
                },
                keydown: ({key}) => {
                    if (key === 'Enter' && currentTodo.length >= 3) {
                        if (todos.map(t => t.toLowerCase()).includes(currentTodo.toLowerCase())) {
                            emit('add-error', "The To-do is already in your list")
                        }
                        else {
                            emit('add-todo')
                        }

                    }
                }
            }
        }),
        h("button", {
            disabled: currentTodo.length < 3,
            on: {
                click: () => {
                    if (todos.map(t => t.toLowerCase()).includes(currentTodo.toLowerCase())) {
                        emit('add-error', "The To-do is already in your list")
                    }
                    else {
                        emit('add-todo')
                    }
                }
            }
        }, ["Add"])
    ]);
}

function TodoItem({todo, i, edit, finished, todos}, emit) {
    const isEditing = edit.id === i

    const isFinished = finished.includes(i)


    return isFinished ? h("li", {}, [
        h("span", {
            style: {
                textDecoration: "line-through"
            },

        }, [todo]),
    ]) : isEditing ? h("li", {}, [
        h('input', {
            value: edit.edited,
            name: "edit-todo-input",
            focus: true,
            on: {
                input: ({target}) => emit("edit-todo", target.value),
                keydown: ({key}) => {
                    if (key === 'Enter' && edit.edited.length >= 3) {
                        if (todos.map(t => t.toLowerCase()).includes(edit.edited.toLowerCase())) {
                            emit('add-error', "The To-do is already in your list")
                        } else {
                            emit('save-edited-todo')
                        }
                    }
                }
            }
        }),
        h("button", {
            disabled: edit.edited.length < 3,
            on: {
                click: () => {
                    if (edit.edited.length >= 3) {
                        if (todos.map(t => t.toLowerCase()).includes(edit.edited.toLowerCase())) {
                            emit('add-error', "The To-do is already in your list")
                        } else {
                            emit('save-edited-todo')
                        }
                    }
                }
            }
        }, ["Save"]),
        h("button", {
            on: {
                click: () => emit('cancel-editing-todo')
            }
        }, ["Cancel"])
    ]) : h("li", {}, [
        h("span", {
            style: {
                textDecoration: isFinished ? "line-through" : ""
            },
            on: {
                dblclick: () => emit('start-editing-todo', i)
            }
        }, [todo]),
        h("button", {
            on: {
                click: () => emit('cross-todo', i)
            }
        }, ["Done"])
    ])
}

function TodoList({todos, edit, finished}, emit) {
    return h("ul", {}, todos.map((todo, i) => TodoItem({todo, i, edit, finished, todos}, emit)));
}

function ErrorParagraph(state, emit) {
    return h('p', {
        style: {color: 'red'}
    }, state.error ? [state.error] : [null]);
}

function App(state, emit) {
    return hFragment([
        h("h1", {}, ['My TODOs']),
        ErrorParagraph(state, emit),
        CreateTodo(state, emit),
        TodoList(state, emit)
    ])
}

let app = createApp({state, reducers, view: App})

app.mount(document.body)