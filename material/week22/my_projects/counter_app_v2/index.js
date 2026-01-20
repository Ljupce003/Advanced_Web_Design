// import {defineComponent} from "../vanilla_project/packages/runtime/src/component.js";
// import {h, hFragment} from "../vanilla_project/packages/runtime/src";
import {h, hFragment,defineComponent} from "https://unpkg.com/vanilla_project@3.0.0"


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
                            // console.log(this)
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


//Exercise 9.3
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
                        x: parseInt(Math.random() * width + ""),
                        y: parseInt(Math.random() * height + ""),
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
    state({width, height}) {
        return {
            width,
            height,
            x: parseInt(Math.random() * width + ""),
            y: parseInt(Math.random() * height + ""),
        }
    }
})


const flyButonEl = new FlyingButton({width, height})
// flyButonEl.mount(document.body)


//Exercise 10.1

const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

async function fetchRandomCocktail() {
    const response = await fetch(url)
    const data = await response.json()

    return data.drinks[0]
}

const RandomCocktail = defineComponent({
    render() {

        const { isLoading, cocktail } = this.state

        if (isLoading) {
            return hFragment([
                h('h1', {}, ['Random Cocktail']),
                h('p', {}, ['Loading...']),
            ])
        }

        if (!cocktail) {
            return hFragment([
                h('h1', {}, ['Random Cocktail']),
                h('button', { on: { click: this.fetchRandom } }, [
                    'Get a cocktail',
                ]),
            ])
        }

        const { strDrink, strDrinkThumb, strInstructions } = cocktail

        return hFragment([
            h('h1', {}, [strDrink]),
            h('p', {}, [strInstructions]),
            h('img', {
                src: strDrinkThumb,
                alt: strDrink,
                style: { width: '300px', height: '300px' },
            }),
            h(
                'button',
                {
                    on: { click: () => this.fetchRandom() },
                    style: { display: 'block', margin: '1em auto' },
                },
                ['Get another cocktail']
            ),
        ])
    },

    async fetchRandom() {
        this.updateState({isLoading: true})

        console.log(this.state)
        // let response = await fetchRandomCocktail()
        let data = await fetchRandomCocktail()

        this.updateState({
            isLoading: false,
            cocktail: {...data}
        })

        console.log(this.state)
    }
})

// const randCocktailEl = new RandomCocktail({isLoading: true, cocktail: null})
// randCocktailEl.mount(document.body)


//Exercise 11.1

const List = defineComponent({
    render(){
        const {items} = this.props
        return h("ul",{},items.map(item => h(ListItem,{ item })))
    }
})

const ListItem = defineComponent({
    render(){
        const {item} = this.props
        return h("li",{},[item])
    }
})

const items = ['foo', 'bar', 'baz']
const list = new List({ items })
list.mount(document.body)


