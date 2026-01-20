# Tagged Template Functions in JavaScript

This document explains **what tagged template functions are**, **how they are executed**, **what arguments they receive**, **how `this` behaves**, and **why they exist**, using clear rules and concrete examples.

---

## 1. What a Tagged Template Function Is

A tagged template function is a **normal JavaScript function** invoked using **template literal syntax without parentheses**.

```js
tag`Hello ${name}`;
```

This is **not** string interpolation followed by a function call.

Instead, JavaScript calls the function with **pre-structured arguments**.

---

## 2. How JavaScript Interprets Tagged Templates

When you write:

```js
tag`A ${x} B ${y} C`;
```

JavaScript performs the following steps:

1. Evaluates expressions **left to right**:
   - evaluate `x`
   - evaluate `y`
2. Builds an array of **literal string segments**:

```js
["A ", " B ", " C"]
```

3. Calls the function as if written explicitly:

```js
tag(["A ", " B ", " C"], x, y);
```

The strings array is **frozen (immutable)** and may be reused by the engine for performance.

---

## 3. Basic Example

```js
function tag(strings, v1, v2) {
  console.log(strings);
  console.log(v1, v2);
}

const a = 10;
const b = 20;

tag`Sum of ${a} and ${b}`;
```

The function receives:

```js
strings = ["Sum of ", " and ", ""]
v1 = 10
v2 = 20
```

No concatenation happens before the call.

---

## 4. Execution Order

Given:

```js
tag`A ${f()} B ${g()}`;
```

Execution order:

1. `f()` executes
2. `g()` executes
3. `tag(strings, fResult, gResult)` executes

Expressions are **not lazy** and are always evaluated before the tag function body runs.

---

## 5. Why Tagged Templates Exist

Tagged templates allow functions to:

- See **string structure before interpolation**
- Handle values **separately from text**
- Perform escaping, validation, or transformation safely

This enables APIs such as:

- SQL query builders
- HTML escaping
- CSS-in-JS libraries
- Internationalization (i18n)

---

## 6. Practical Example: Safe HTML Escaping

```js
function safeHTML(strings, ...values) {
  let out = "";

  for (let i = 0; i < strings.length; i++) {
    out += strings[i];
    if (i < values.length) {
      out += String(values[i])
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
    }
  }

  return out;
}

safeHTML`<p>${userInput}</p>`;
```

The tag function receives the HTML skeleton and user input separately, preventing injection attacks.

---

## 7. How `this` Behaves in Tagged Template Functions

Tagged template functions follow **normal JavaScript `this` binding rules**.

There are **no special `this` rules** for tagged templates.

---

### 7.1 Plain Function Tag

```js
function tag() {
  console.log(this);
}

tag`test`;
```

Result:
- strict mode → `this === undefined`
- non-strict mode → `this === globalThis`

Equivalent to:

```js
tag();
```

---

### 7.2 Method Tag (Implicit Binding)

```js
const obj = {
  tag(strings) {
    console.log(this === obj);
  }
};

obj.tag`hello`;
```

Here:
- `this === obj`

This is identical to calling `obj.tag()`.

---

### 7.3 Arrow Function as a Tag

```js
const tag = () => {
  console.log(this);
};

tag`hello`;
```

Arrow functions:
- do **not** receive `this` from the call
- capture `this` from surrounding scope at creation time

`call`, `apply`, method syntax, and tagged syntax do not affect arrow `this`.

---

## 8. Raw Strings (`strings.raw`)

Tagged templates expose **raw, unescaped string literals**:

```js
function tag(strings) {
  console.log(strings[0]);      // actual newline
  console.log(strings.raw[0]);  // literal \n
}

tag`Line 1\nLine 2`;
```

This enables building DSLs and parsers that depend on exact source text.

---

## 9. Common Misconceptions

- Tagged templates do **not** auto-concatenate strings
- They are **not macros**
- They do **not** delay execution
- They do **not** change `this` behavior

They are strictly a structured function call.

---

## 10. Final Mental Model

> **A tagged template is a normal function call where JavaScript supplies:**
> - an immutable array of literal string parts
> - each interpolated value as a separate argument

The function decides how (or whether) to combine them.

Once this model is understood, tagged template functions become predictable and powerful rather than mysterious.

