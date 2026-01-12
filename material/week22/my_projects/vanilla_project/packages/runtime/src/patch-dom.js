import {areNodesEqual} from "./nodes-equal.js";
import {destroyDOM} from "./destroy-dom.js";
import {mountDOM} from "./mount-dom.js";
import {DOM_TYPES, extractChildren} from "./h.js";
import {objectsDiff} from "./utils/objects.js";
import {removeAttribute, removeStyle, setAttribute, setStyle} from "./attributes.js";
import {ARRAY_DIFF_OP, arraysDiff, arraysDiffSequence} from "./utils/arrays.js";
import {isNotBlankOrEmptyString} from './utils/strings.js'
import {addEventListener} from "./events.js";




export function patchDom(oldV_dom, newV_dom, parentEl) {
    if (!areNodesEqual(oldV_dom, newV_dom)) {
        const index = findIndexInParent(parentEl, oldV_dom.el)
        destroyDOM(oldV_dom)
        mountDOM(newV_dom, parentEl, index)

        return newV_dom
    }

    newV_dom.el = oldV_dom.el

    switch (newV_dom.type) {
        case DOM_TYPES.TEXT: {
            patchText(oldV_dom, newV_dom)
            return newV_dom
        }
        case DOM_TYPES.ELEMENT: {
            patchElement(oldV_dom, newV_dom)
            break
        }

    }

    patchChildren(oldV_dom,newV_dom)

    return newV_dom
}

function findIndexInParent(parentEl, el) {
    const index = Array.from(parentEl.childNodes).indexOf(el)
    if (index < 0) {
        return null
    }

    return index
}

function patchText(oldV_dom, newV_dom) {

    const el = oldV_dom.el

    const {value: oldText} = oldV_dom
    const {value: newText} = newV_dom

    if (oldText !== newText) {
        el.nodeValue = newText
    }
}




function patchElement(oldV_dom, newV_dom) {

    const el = oldV_dom.el

    const {
        class: oldClass,
        style: oldStyle,
        on: oldEvents,
        ...oldAttrs
    } = oldV_dom.props

    const {
        class: newClass,
        style: newStyle,
        on: newEvents,
        ...newAttrs
    } = newV_dom.props

    const {listeners: oldListeners} = oldV_dom

    patchAttrs(el, oldAttrs, newAttrs)
    patchClasses(el, oldClass, newClass)
    patchStyles(el, oldStyle, newStyle)

    newV_dom.listeners = patchEvents(el, oldListeners, oldEvents, newEvents)


}


function patchAttrs(el, oldAttrs, newAttrs) {

    const {added, removed, updated} = objectsDiff(oldAttrs, newAttrs)

    for (const attr of removed) {
        removeAttribute(el, attr)
    }

    for (const attr of added.concat(updated)) {
        setAttribute(el, attr, newAttrs[attr])
    }
}

function patchClasses(el, oldClass, newClass) {

    const oldClasses = toClassList(oldClass)
    const newClasses = toClassList(newClass)

    const {added, removed} = arraysDiff(oldClasses, newClasses)

    if (removed.length > 0) {
        el.classList.remove(...removed)
    }

    if (added.length > 0) {
        el.classList.add(...added)
    }
}

function toClassList(classes = '') {
    return Array.isArray(classes) ?
        classes.filter(isNotBlankOrEmptyString) :
        classes.split("/(\s+)/").filter(isNotBlankOrEmptyString)
}

function patchStyles(el, oldStyle = {}, newStyle = {}) {
    const {added,removed,updated} = objectsDiff(oldStyle,newStyle)

    for (const style of removed){
        removeStyle(el,style)
    }

    for(const style of added.concat(updated)){
        setStyle(el,style,newStyle[style])
    }
}


function patchEvents(el, oldListeners = {}, oldEvents = {}, newEvents = {}) {

    const {removed, added, updated} = objectsDiff(oldEvents,newEvents)

    for(const eventName of removed.concat(updated)){
        el.removeEventListener(eventName,oldListeners[eventName])
    }

    const addedListeners = {}

    for(const eventName of added.concat(updated)){
        const listener = addEventListener(eventName,newEvents[eventName],el)

        addedListeners[eventName] = listener
    }

    return addedListeners

}


function patchChildren(oldV_dom, newV_dom) {
    const oldChildren = extractChildren(oldV_dom)
    const newChildren = extractChildren(newV_dom)

    const parentEl = oldV_dom.el

    const diffSeq = arraysDiffSequence(oldChildren,newChildren,areNodesEqual)


    for(const operation of diffSeq){
        const {originalIndex, index, item} = operation

        switch (operation.op) {
            case ARRAY_DIFF_OP.ADD: {
                mountDOM(item,parentEl,index)
                break
            }
            case ARRAY_DIFF_OP.REMOVE: {
                destroyDOM(item)
                break
            }
            case ARRAY_DIFF_OP.MOVE: {
                const oldChild = oldChildren[originalIndex]
                const newChild = newChildren[index]
                const el = oldChild.el
                const elAtTargetIndex = parentEl.childNodes[index]

                parentEl.insertBefore(el,elAtTargetIndex)
                patchDom(oldChild,newChild,parentEl)

                break
            }

            case ARRAY_DIFF_OP.NOOP: {
                patchDom(oldChildren[originalIndex],newChildren[index],parentEl)
                break
            }


        }
    }
}