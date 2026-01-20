import {DOM_TYPES} from "./h.js";
import {removeEventListeners} from "./events.js";


export function destroyDOM(v_dom) {
    const {type} = v_dom
    switch (type) {
        case DOM_TYPES.TEXT: {
            removeTextNode(v_dom)
            break
        }
        case DOM_TYPES.ELEMENT: {
            removeElementNode(v_dom)
            break
        }
        case DOM_TYPES.FRAGMENT: {
            removeFragmentNodes(v_dom)
            break
        }

        case DOM_TYPES.COMPONENT: {
            v_dom.component.unmount()
            break
        }
        default: {
            throw new Error(`Can't destroy DOM of type: ${type}`)
        }
    }
    delete v_dom.el
}


function removeTextNode(v_dom) {
    const {el} = v_dom
    el.remove()
}

function removeElementNode(v_dom) {
    const {el, children, listeners} = v_dom
    el.remove()
    children.forEach(destroyDOM)
    if (listeners) {
        removeEventListeners(listeners, el)
        delete v_dom.listeners
    }
}

function removeFragmentNodes(v_dom) {
    const { children } = v_dom
    children.forEach(destroyDOM)
}