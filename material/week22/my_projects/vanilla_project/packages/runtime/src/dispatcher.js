export class Dispatcher {
    #subs = new Map()
    #afterHandlers = []

    subscribe(commandName, handler) {
        // Creates an array of subscriptions if they don't exist for a given command name
        if (!this.#subs.has(commandName)) {
            this.#subs.set(commandName, [])
        }

        const handlers = this.#subs.get(commandName)

        // checks whether a handler is registered, if it is then we return a function that does nothing,
        // else we would have returned a function to unregister the handler
        if (handlers.includes(handler)) {
            return () => {
            }
        }

        // registers a handler
        handlers.push(handler)

        // returns a function ro unregister a handler
        return () => {
            const id = handlers.indexOf(handler)
            handlers.splice(id, 1)
        }
    }

    afterEveryCommand(handler) {

        // Registers the handler
        this.#afterHandlers.push(handler)

        // returns a function to unregister a handler
        return () => {
            const id = this.#afterHandlers.indexOf(handler)
            this.#afterHandlers.splice(id, 1)
        }
    }


    dispatch(commandName, payload) {

        // checks whether handlers are registered and calls them
        if (this.#subs.has(commandName)) {
            this.#subs.get(commandName).forEach((handler) => handler(payload))
        } else {
            console.warn(`No handlers for command ${commandName}`)
        }

        // runs the after-command handlers
        this.#afterHandlers.forEach((handler) => handler())
    }
}

// let dispatcher = new Dispatcher()
//
// let handlerFn = (name) => console.log(`Hello ${name}`)
//
// let unsubscribeFn = dispatcher.subscribe("greet",handlerFn)
//
// let afterCommandFn = () => console.log("After command")
//
// dispatcher.afterEveryCommand(afterCommandFn)
//
// dispatcher.dispatch("greet","Ljupce")
//
//
// dispatcher.dispatch("greet","Peter")
// dispatcher.dispatch("bye","Peter")