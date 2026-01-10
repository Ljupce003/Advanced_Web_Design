function withoutNulls(arr) {
    return arr.filter((item) => item != null)
}

const DOM_TYPES = {
    TEXT: 'text',
    ELEMENT: 'element',
    FRAGMENT: 'fragment',
};
function h(tag, props = {}, children = []) {
    return {
        tag,
        props,
        children: mapTextNodes(withoutNulls(children)),
        type: DOM_TYPES.ELEMENT,
    }
}
function mapTextNodes(children) {
    return children.map((child) => typeof child === 'string' ? hString(child) : child)
}
function hString(str) {
    return {type: DOM_TYPES.TEXT, value: str}
}
function hFragment(vNodes) {
    return {
        type: DOM_TYPES.FRAGMENT,
        children: mapTextNodes(withoutNulls(vNodes)),
    }
}

function addEventListener(eventName, handler, el) {
    el.addEventListener(eventName, handler);
    return handler
}
function addEventListeners(listeners = {}, el) {
    const addedListeners = {};
    Object.entries(listeners).forEach(([eventName, handler]) => {
        const listener = addEventListener(eventName, handler, el);
        addedListeners[eventName] = listener;
    });
    return addedListeners
}
function removeEventListeners(listeners = {}, el) {
    Object.entries(listeners).forEach(([eventName, handler]) => {
        el.removeEventListener(eventName, handler);
    });
}

function destroyDOM(v_dom) {
    const {type} = v_dom;
    switch (type) {
        case DOM_TYPES.TEXT: {
            removeTextNode(v_dom);
            break
        }
        case DOM_TYPES.ELEMENT: {
            removeElementNode(v_dom);
            break
        }
        case DOM_TYPES.FRAGMENT: {
            removeFragmentNodes(v_dom);
            break
        }
        default: {
            throw new Error(`Can't destroy DOM of type: ${type}`)
        }
    }
    delete v_dom.el;
}
function removeTextNode(v_dom) {
    const {el} = v_dom;
    el.remove();
}
function removeElementNode(v_dom) {
    const {el, children, listeners} = v_dom;
    el.remove();
    children.forEach(destroyDOM);
    if (listeners) {
        removeEventListeners(listeners, el);
        delete v_dom.listeners;
    }
}
function removeFragmentNodes(v_dom) {
    const { children } = v_dom;
    children.forEach(destroyDOM);
}

function setAttributes(el, attrs) {
    const {class: className, style, ...otherAttrs} = attrs;
    if (className) {
        setClass(el, className);
    }
    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
            setStyle(el, prop, value);
        });
    }
    for (const [name, value] of Object.entries(otherAttrs)) {
        setAttribute(el, name, value);
    }
}
function setClass(el, className) {
    el.className = '';
    if (typeof className === 'string') {
        el.className = className;
    }
    if (Array.isArray(className)) {
        el.classList.add(...className);
    }
}
function setStyle(el, name, value) {
    el.style[name] = value;
}
function setAttribute(el, name, value) {
    if (value == null) {
        removeAttribute(el, name);
    } else if (name.startsWith('data-')) {
        el.setAttribute(name, value);
    } else {
        el[name] = value;
    }
}
function removeAttribute(el, name) {
    el[name] = null;
    el.removeAttribute(name);
}

function mountDOM(v_dom, parentEl) {
    switch (v_dom.type) {
        case DOM_TYPES.TEXT: {
            createTextNode(v_dom, parentEl);
            break
        }
        case DOM_TYPES.ELEMENT: {
            createElementNode(v_dom, parentEl);
            break
        }
        case DOM_TYPES.FRAGMENT: {
            createFragmentNodes(v_dom, parentEl);
            break
        }
        default: {
            throw new Error(`Can't mount DOM of type: ${v_dom.type}`)
        }
    }
}
function createTextNode(v_dom, parentEl) {
    const { value } = v_dom;
    const textNode = document.createTextNode(value);
    v_dom.el = textNode;
    parentEl.append(textNode);
}
function createFragmentNodes(v_dom, parentEl) {
    const {children} = v_dom;
    v_dom.el = parentEl;
    children.forEach((child) => mountDOM(child, parentEl));
}
function createElementNode(v_dom, parentEl) {
    const { tag, props, children } = v_dom;
    const element = document.createElement(tag);
    addProps(element, props, v_dom);
    v_dom.el = element;
    children.forEach((child) => mountDOM(child, element));
    parentEl.append(element);
}
function addProps(el, props, v_dom) {
    const { on: events, ...attrs } = props;
    v_dom.listeners = addEventListeners(events, el);
    setAttributes(el, attrs);
}

class Dispatcher {
    #subs = new Map()
    #afterHandlers = []
    subscribe(commandName, handler) {
        if (!this.#subs.has(commandName)) {
            this.#subs.set(commandName, []);
        }
        const handlers = this.#subs.get(commandName);
        if (handlers.includes(handler)) {
            return () => {
            }
        }
        handlers.push(handler);
        return () => {
            const id = handlers.indexOf(handler);
            handlers.splice(id, 1);
        }
    }
    afterEveryCommand(handler) {
        this.#afterHandlers.push(handler);
        return () => {
            const id = this.#afterHandlers.indexOf(handler);
            this.#afterHandlers.splice(id, 1);
        }
    }
    dispatch(commandName, payload) {
        if (this.#subs.has(commandName)) {
            this.#subs.get(commandName).forEach((handler) => handler(payload));
        } else {
            console.warn(`No handlers for command ${commandName}`);
        }
        this.#afterHandlers.forEach((handler) => handler());
    }
}

function createApp({state, view, reducers = {}}) {
    let parentEl = null;
    let v_dom = null;
    const dispatcher = new Dispatcher();
    const subscriptions = [dispatcher.afterEveryCommand(renderApp)];
    function emit(eventName, payload) {
        dispatcher.dispatch(eventName, payload);
    }
    for (const actionName in reducers) {
        const reducer = reducers[actionName];
        const subs = dispatcher.subscribe(actionName, (payload) => {
            state = reducer(state, payload);
        });
        subscriptions.push(subs);
    }
    function renderApp() {
        console.log("App rendered");
        if (v_dom) {
            destroyDOM(v_dom);
        }
        v_dom = view(state, emit);
        mountDOM(v_dom, parentEl);
    }
    return {
        mount(_parentEl) {
            parentEl = _parentEl;
            renderApp();
        },
        unmount() {
            destroyDOM(v_dom);
            v_dom = null;
            subscriptions.forEach((unsubscribe) => unsubscribe());
        }
    }
}

export { createApp, h, hFragment, hString };
