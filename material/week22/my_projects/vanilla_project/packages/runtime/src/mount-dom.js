import {DOM_TYPES} from "./h.js";
import {setAttributes} from './attributes.js'
import {addEventListeners} from './events.js'

export function mountDOM(v_dom, parentEl, index) {
    switch (v_dom.type) {
        case DOM_TYPES.TEXT: { // Mounts a text vnode
            createTextNode(v_dom, parentEl, index)
            break
        }
        case DOM_TYPES.ELEMENT: { // Mounts a element vnode
            createElementNode(v_dom, parentEl, index)
            break
        }
        case DOM_TYPES.FRAGMENT: { // Mounts a fragment vnode
            createFragmentNodes(v_dom, parentEl, index)
            break
        }
        default: {
            throw new Error(`Can't mount DOM of type: ${v_dom.type}`)
        }
    }
}


function createTextNode(v_dom, parentEl, index) {
    const {value} = v_dom
    const textNode = document.createTextNode(value) // Creates text no
    v_dom.el = textNode // Saves a reference
    // parentEl.append(textNode) // Appends to the parent element
    insert(textNode, parentEl, index)
}

function createFragmentNodes(v_dom, parentEl, index) {
    const {children} = v_dom
    v_dom.el = parentEl // Saves a reference to the parent element
    // Append each child to the parent element
    children.forEach((child, i) => mountDOM(child, parentEl, index ? index + i : null))
}

function createElementNode(v_dom, parentEl, index) {
    const {tag, props, children} = v_dom

    // Creates element node
    const element = document.createElement(tag)

    // Adds attributes and event listeners
    addProps(element, props, v_dom)
    v_dom.el = element
    children.forEach((child) => mountDOM(child, element))
    // parentEl.append(element)
    insert(element, parentEl, index)

    if (props.focus && props.focus === true) {
        // console.log("element focused")
        // console.log(element)
        element.focus()
        element.select()
    }
}

function addProps(el, props, v_dom) {

    // Splits listeners from attributes
    const {on: events, ...attrs} = props

    // Adds event listeners
    v_dom.listeners = addEventListeners(events, el)

    // Sets attributes
    setAttributes(el, attrs)
}

function insert(el, parentEl, index) {

    // if the index is null then we simply append

    if (index == null) {
        parentEl.append(el)
        return
    }

    if (index < 0) {
        throw new Error(`Index must be positive,got ${index}`)
    }

    const children = parentEl.childNodes

    if (index >= children.length) {
        parentEl.append(el)
    } else {
        parentEl.insertBefore(el, children[index])
    }

}
