import {withoutNulls} from './utils/arrays.js'

export const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
    COMPONENT: 'component',
}

export function h(tag, props = {}, children = []) {
    const type = typeof tag === 'string' ? DOM_TYPES.ELEMENT : DOM_TYPES.COMPONENT
    return {
        tag,
        props,
        type,
        children: mapTextNodes(withoutNulls(children)),
    }
}

function mapTextNodes(children) {
    return children.map((child) => typeof child === 'string' ? hString(child) : child)
}

export function hString(str) {
    return {type: DOM_TYPES.TEXT, value: str}
}

export function hFragment(vNodes) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes)),
    }
}

export function extractChildren(v_dom){
    if(v_dom.children == null){
        return []
    }

    const children = []

    for(const child of v_dom.children){
        if(child.type === DOM_TYPES.FRAGMENT){
            children.push(...extractChildren(child))
        } else {
            children.push(child)
        }
    }

    return children
}