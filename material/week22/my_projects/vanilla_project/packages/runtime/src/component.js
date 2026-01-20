import {mountDOM} from "./mount-dom.js";
import {destroyDOM} from "./destroy-dom.js";
import {DOM_TYPES,extractChildren} from "./h.js";
import {patchDom} from "./patch-dom.js";


export function defineComponent({render,state}) {

    class Component {

        #isMounted = false
        #v_dom = null
        #hostEl = null


        constructor(props = {}) {
            this.props = props
            this.state = state ? state(props) : {}
        }

        get elements(){
            if(this.#v_dom == null){
                return []
            }

            if(this.#v_dom.type === DOM_TYPES.FRAGMENT){
                return extractChildren(this.#v_dom).map((child) => child.el)
            }

            return [this.#v_dom.el]
        }

        get firstElement() {
            return this.elements[0]
        }

        get offset() {
            if(this.#v_dom.type === DOM_TYPES.FRAGMENT){
                return Array.from(this.#hostEl.children).indexOf(this.firstElement)
            }

            return 0
        }

        updateState(state){
            this.state = {...this.state,...state}
            this.#patch()
        }

        render() {
            return render.call(this)
        }

        mount(hostEl, index = null) {

            if(this.#isMounted){
                throw new Error("Component is already mounted")
            }

            this.#v_dom = this.render()
            mountDOM(this.#v_dom, hostEl, index)
            this.#hostEl = hostEl

            this.#isMounted = true
        }

        unmount() {

            if (!this.#isMounted) {
                throw new Error('Component is not mounted')
            }

            destroyDOM(this.#v_dom)
            this.#v_dom = null
            this.#hostEl = null

            this.#isMounted = false
        }

        #patch(){
            if (!this.#isMounted) {
                throw new Error('Component is not mounted')
            }

            const v_dom = this.render()
            this.#v_dom = patchDom(this.#v_dom,v_dom,this.#hostEl,this)
        }
    }

    return Component
}