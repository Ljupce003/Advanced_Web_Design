import {defineComponent} from "../vanilla_project/packages/runtime/src/component.js";
import {h, hFragment} from "../vanilla_project/packages/runtime/src";


let ap = hFragment([
    h("h1", {}, ["Important news!"]),
    h("p", {}, ["I made myself coffee."]),
    h("button", {on: {click: () => alert("Good for you")}}, ["Say congrats"])
])

const MyComponent = defineComponent({
    render() {
        return hFragment([
            h('p', {}, [`Count: ${this.state.count}`]),
            h(
                'button',
                {
                    on: {
                        click: () => {
                            console.log(this)
                            this.updateState({count: this.state.count + 1})
                        },
                    },
                },
                ['Increment'],
            ),
        ])
    },
    state() {
        return {
            count: 0
        }
    }
})


const compObj = new MyComponent()
compObj.mount(document.body)

const width = window.innerWidth
const height = window.innerHeight
const FlyingButton = defineComponent({
    render() {
        const {x, y, height, width} = this.state

        return h("button", {
            id: "buttonF",
            on: {
                click: () => {
                    this.updateState({
                        x: parseInt(Math.random() * width+""),
                        y: parseInt(Math.random() * height+""),
                    })
                }
            },
            style: {
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
            }
        }, ['Move'])

    },
    state({width,height}){
        return {
            width,
            height,
            x: parseInt(Math.random() * width+ ""),
            y: parseInt(Math.random() * height + ""),
        }
    }
})


const flyButonEl = new FlyingButton({width,height})
flyButonEl.mount(document.body)

