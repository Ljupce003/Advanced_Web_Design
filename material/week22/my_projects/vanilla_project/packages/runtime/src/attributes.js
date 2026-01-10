

export function setAttributes(el, attrs) {
    // Split the attributes
    const {class: className, style, ...otherAttrs} = attrs
    // Set the class attributes
    if (className) {
        setClass(el, className)
    }
    // Sets the style attributes
    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
            setStyle(el, prop, value)
        })
    }
    // Set all the other attributes
    for (const [name, value] of Object.entries(otherAttrs)) {
        setAttribute(el, name, value)
    }
}

function setClass(el, className) {
    // Clear the class attribute
    el.className = ''
    // Sets the class attribute as a string
    if (typeof className === 'string') {
        el.className = className
    }
    // Sets the class attribute as an array
    if (Array.isArray(className)) {
        el.classList.add(...className)
    }
}

export function setStyle(el, name, value) {
    el.style[name] = value
}

export function removeStyle(el, name) {
    el.style[name] = null
}

export function setAttribute(el, name, value) {
    if (value == null) {
        removeAttribute(el, name)
    } else if (name.startsWith('data-')) {
        el.setAttribute(name, value)
    } else {
        el[name] = value
    }
}

export function removeAttribute(el, name) {
    el[name] = null
    el.removeAttribute(name)
}