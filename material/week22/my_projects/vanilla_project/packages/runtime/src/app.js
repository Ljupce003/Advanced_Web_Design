import {destroyDOM} from "./destroy-dom.js";
import {mountDOM} from "./mount-dom.js";
import {h} from "./h";


// creates the application object
export function createApp(RootComponent, props = {}) {
    let parentEl = null
    let isMounted = false
    let v_dom = null

    function reset() {
        parentEl = null
        isMounted = false
        v_dom = null
    }

    // returns a closure instance that will have methods for mount and unmount
    return {
        mount(_parentEl) {

            if (isMounted) {
                throw new Error("The application is already mounted");
            }

            parentEl = _parentEl
            v_dom = h(RootComponent, props)
            mountDOM(v_dom, parentEl)
            isMounted = true

            // renderApp()
        },
        unmount() {
            destroyDOM(v_dom)
            v_dom = null
            destroyDOM(v_dom)

            reset()
        }
    }
}