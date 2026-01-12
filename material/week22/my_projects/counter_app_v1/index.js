import {DOM_TYPES, h, hFragment, hString} from "../vanilla_project/packages/runtime/src/h.js"
import {mountDOM} from "../vanilla_project/packages/runtime/src/mount-dom.js";
import {destroyDOM} from "../vanilla_project/packages/runtime/src/destroy-dom.js";
import {createApp} from "../vanilla_project/packages/runtime/src/app.js"


// console.log('This will soon be a frontend framework!')

const login = () => console.log("THe login function is clicked")

// const v_tree = h('form', { class: 'login-form', action: 'login' }, [
//     h('input', { type: 'text', name: 'user' }),
//     h('input', { type: 'password', name: 'pass' }),
//     "Peter",
//     h('button', { on: { click: login } }, ['Log in'])
// ])
//
// console.log(v_tree)


const todos = ['Walk the dog', 'Water the plants', 'Sand the chairs']

function TodosList(todos) {
    return h('ul', {}, todos.map((todo) => h('li', {}, [todo])))
}

// console.log(JSON.stringify(TodosList(todos), null, 2))


function CreateTodo(state = null) {
    return h("div", {}, [
        h('label', {for: "todo-input"}, ["New TODO"]),
        h('input', {type: "text", id: "todo-input"}),
        h('input', {disabled: true, id: "add-todo-btn"}, ["Add"]),
    ]);
}

function App(state) {
    return hFragment([
        h('h1', {}, ['My TODOs']),
        CreateTodo(state),
        TodoList(state)
    ])
}

function TodoList(state) {
    return h('ul', {},
        state.todos.map((todo, i) => TodoItem(todo, i, state.editingIds))
    )
}


// idxInList is the index of this to-do item in the list of todos.
// editingIds is a Set of indexes of todos that are being edited.
function TodoItem(todo, idxInList, editingIds) {
    const isEditing = editingIds.includes(idxInList)
    return h('li', {},
        isEditing ? TodoInEditMode(todo, idxInList) : TodoInReadMode(todo, idxInList)
    )
}

function TodoInEditMode(todo, idxInList) {
    return [
        h("input", {type: "text", value: todo}, [todo]),
        h("button", {disabled: todo.length < 3}, ["Save"]),
        h("button", {}, ["Cancel"]),
    ];
}

function TodoInReadMode(todo, idxInList) {
    return [
        h("span", {}, [todo]),
        h("button", {}, ["Done"]),
    ];
}

// let state_v = {todos: todos, editingIds: []}
//
// console.log(JSON.stringify(App(state_v), null, 2))

// const v_dom = h('section', {}, [
//     h('h1', {}, ['My Blog']),
//     h('p', {}, ['Welcome to my blog!'])
// ])
// mountDOM(v_dom, document.body)

const v_dom1 = hFragment([
    h("h1", {class: "title"}, ["My Counter"]),
    h("div", {
            class: "container",
            style: {
                display: "flex",
                justifyContent: "space-around",
                width: "auto"
            }
        },
        [
            h("button", {}, ["decrement"]),
            h("span", {}, ["0"]),
            h("button", {}, ["increment"])
        ])
])

// mountDOM(v_dom1, document.body)
//
//
//
// setTimeout(() => {
//     destroyDOM(v_dom1)
//     console.log("Virtual DOM destroyed")
// },2500)




function CounterApp(state, emit) {

    return hFragment([
        h("h1", {class: "title"}, ["My Counter"]),
        h("div", {
                class: "container",
                style: {
                    display: "flex",
                    justifyContent: "space-around",
                    width: "auto"
                }
            },
            [
                h("button", {on: {click: () => emit('decrement', 1)}}, ["decrement"]),
                h("span", {}, [hString(String(state))]),
                h("button", {on: {click: () => emit('increment', 1)}}, ["increment"])
            ])
    ])
}

const app = createApp({
        state: 0,
        view: CounterApp,
        reducers: {
            increment: (state, amount) => state + amount,
            decrement: (state, amount) => state - amount,
        }
    }
)

app.mount(document.body)
