import {destroyDOM} from "./destroy-dom.js";
import {mountDOM} from "./mount-dom.js";
import {Dispatcher} from "./dispatcher.js";


// creates the application object
export function createApp({state, view, reducers = {}}) {
    let parentEl = null
    let v_dom = null
    let isMounted = false

    const dispatcher = new Dispatcher()
    // rerenders the application after every command
    const subscriptions = [dispatcher.afterEveryCommand(renderApp)]

    // function that will simplify calling the dispatcher's dispatch method
    function emit(eventName, payload) {
        dispatcher.dispatch(eventName, payload)
    }

    // iterates the reducers and adds them as commands for the dispatcher to respond to
    for (const actionName in reducers) {
        const reducer = reducers[actionName]

        const subs = dispatcher.subscribe(actionName, (payload) => {
            // updates the state calling the reducer function
            state = reducer(state, payload)
        })

        // adds each command subscription to the subscriptions array
        subscriptions.push(subs)
    }

    // function that mounts and renders the virtual-dom
    function renderApp() {
        console.log("App rendered")
        // if a previous view exists, it unmounts it
        if (v_dom) {
            destroyDOM(v_dom)
        }

        v_dom = view(state, emit)
        // mounts the new view
        mountDOM(v_dom, parentEl)
    }

    // returns a closure instance that will have methods for mount and unmount
    return {
        mount(_parentEl) {

            if (isMounted) {
                throw new Error("The application is already mounted");
            }

            parentEl = _parentEl
            v_dom = view(v_dom, emit)
            mountDOM(v_dom, parentEl)
            isMounted = true

            // renderApp()
        },
        unmount() {
            destroyDOM(v_dom)
            v_dom = null
            subscriptions.forEach((unsubscribe) => unsubscribe())

            isMounted = false
        }
    }
}