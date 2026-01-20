import {mountDOM} from "./mount-dom.js";
import {destroyDOM} from "./destroy-dom.js";
import {DOM_TYPES, extractChildren} from "./h.js";
import {patchDom} from "./patch-dom.js";
import {hasOwnProperty} from "./utils/objects.js";
import equal from 'fast-deep-equal'
import {Dispatcher} from "./dispatcher.js";


export function defineComponent({render, state, ...methods}) {

    class Component {

        #isMounted = false
        #v_dom = null
        #hostEl = null
        #eventHandlers = null
        #parentComponent = null
        #dispatcher = new Dispatcher()
        #subscriptions = []


        constructor(props = {}, eventHandlers = {}, parentComponent = {}) {
            this.props = props
            this.state = state ? state(props) : {}
            this.#eventHandlers = eventHandlers
            this.#parentComponent = parentComponent
        }

        #wireEventHandlers() {
            this.#subscriptions = Object.entries(this.#eventHandlers)
                .map(
                    ([eventName, handler]) => this.#wireEventHandler(eventName, handler)
                )
        }

        #wireEventHandler(eventName, handler) {
            return this.#dispatcher.subscribe(eventName, (payload) => {
                if (this.#parentComponent) {
                    handler.call(this.#parentComponent, payload)
                } else {
                    handler(payload)
                }
            });
        }

        emit(eventName,payload){
            this.#dispatcher.dispatch(eventName,payload)
        }

        get elements() {
            if (this.#v_dom == null) {
                return []
            }

            if (this.#v_dom.type === DOM_TYPES.FRAGMENT) {
                return extractChildren(this.#v_dom).flatMap((child) => {
                    if (child.type === DOM_TYPES.COMPONENT) {
                        return child.component.elements
                    }
                    return [child.el]
                })
            }

            return [this.#v_dom.el]
        }

        get firstElement() {
            return this.elements[0]
        }

        get offset() {
            if (this.#v_dom.type === DOM_TYPES.FRAGMENT) {
                return Array.from(this.#hostEl.children).indexOf(this.firstElement)
            }

            return 0
        }

        updateState(state) {
            this.state = {...this.state, ...state}
            this.#patch()
        }

        updateProps(props) {
            // this.props = {...this.props, ...props}
            const newProps = {...this.props, ...props}
            if (equal(this.props, newProps)) {
                return
            }
            this.props = newProps
            this.#patch()
        }

        render() {
            return render.call(this)
        }

        mount(hostEl, index = null) {

            if (this.#isMounted) {
                throw new Error("Component is already mounted")
            }

            this.#v_dom = this.render()
            mountDOM(this.#v_dom, hostEl, index, this)
            this.#wireEventHandlers()

            this.#hostEl = hostEl
            this.#isMounted = true
        }

        unmount() {

            if (!this.#isMounted) {
                throw new Error('Component is not mounted')
            }

            destroyDOM(this.#v_dom)
            this.#subscriptions.forEach((unsubscribe) => unsubscribe())
            this.#v_dom = null
            this.#hostEl = null

            this.#isMounted = false
            this.#subscriptions = []
        }

        #patch() {
            if (!this.#isMounted) {
                throw new Error('Component is not mounted')
            }

            const v_dom = this.render()
            this.#v_dom = patchDom(this.#v_dom, v_dom, this.#hostEl, this)
        }
    }

    for (const methodName in methods) {
        if (hasOwnProperty(Component, methodName)) {
            throw new Error(`Method ${methodName} already exists in the component`)
        }

        Component.prototype[methodName] = methods[methodName]
    }

    return Component
}