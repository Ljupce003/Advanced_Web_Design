/**
 * /////////////////////////////////////////////////////////////////////////////////
* DOM - Document object model - is the tree in which order and hierarchy our elements are positioned
* and located on our page. The root is the 'document'
* */


/**
 * /////////////////////////////////////////////////////////////////////////////////
* In the DOM environment we have global variables and objects such as:
* window: {
  innerHeight:  height of window in pixels,
  close: function () {
   closes window if invoked },
  …
  document: {  object representing document
      title:  title of document
      location:  url of document
      head:   HTMLElement representing head,
      body:  HTMLElement representing body
      …
 }
}
*/

/**
 * /////////////////////////////////////////////////////////////////////////////////
 * We can query and get to specific elements by locating it and fetching it.
 * We can use:
 * - $(selector) = Returns the first element matching the css selector;
 * - $$(selector) = Returns an array of all elements(Nodes) that match the css selector;
 * - document.querySelector(selector) = Returns the first element matching the css selector;
 * - document.querySelectorAll(selector) = Returns a NodeList of all elements that match the css selector;
 * - document.getElementById(id) - Returns the element with the specified ID;
 * - document.getElementsByTagName(tagName) - Returns a live HTMLCollection of elements with the given tag name,
 *                                      “Live” means it updates automatically if new elements are added;
 * - document.getElementsByTagNameNS(namespace, tagName) - Same as above but supports namespaces (mainly for SVG/XML);
 * - document.getElementsByName(name) - Returns elements with a specific name attribute;
 * - document.getElementsByClassName(className) - Returns a live HTMLCollection of elements with the specified class name;
 *
 * NodeList - can contain any type of node, not just elements.For example: text nodes,
 *   comment nodes, and element nodes. Supports 'forEach' natively.
 *  But if you use something like childNodes, you’ll see non-element nodes too.
 *
 * HTMLCollection - contains only element nodes (HTML elements), no text or comment nodes. HTMLCollections are live,
 *  meaning that If the DOM changes, the collection updates automatically. Doesn't support 'forEach' natively.
 *  So you need conversion to array, ex:
 *      const divs = document.getElementsByTagName("div");
 *      Array.from(divs).forEach(el => console.log(el)); // ✅ works
 *
 * We can remove elements from the DOM with .remove() . Example; blueButton.remove()
 * Removed elements are automatically collected by the garbage collector(automatically releases memory addresses
 *  when it sees that an object is no longer referenced anywhere else)
* */

/**
 * /////////////////////////////////////////////////////////////////////////////////
 * DOM Traversal
 *
 * Nodes
 * element.parentNode
 * element.childNodes
 * element.firstChild
 * element.lastChild
 * element.nextSibling
 * element.previousSibling
 *
 * Elements
 * element.parentElement
 * element.children
 * element.firstElementChild
 * element.lastElementChild
 * element.nextElementSibling
 * element.previousElementSibling
* */


/**
 * /////////////////////////////////////////////////////////////////////////////////
 * DOM Events
 *
 * We can attach event listeners on elements with .addEventListener()
 * example: element.addEventListener("click", function(e){
 *              console.log(e.currentTarget === this) / True
 *              console.log(this.className) / logs the classname of element
 *          }
 *
 * We have a lot of events, you can see them at:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events
 *
 * We can also remove event listeners from elements. But we need to make sure we provide the same function when
 * we added the listener. Store the function reference somewhere. Example:
 *
 *      let handler = evt => evt.target.textContent = "😊";
 *      button.addEventListener("click", handler);
 *      button.removeEventListener("click", handler);
 *
 * */

/**
 * /////////////////////////////////////////////////////////////////////////////////
 * Separation of concerns
 * We need to separate: styling,design, computation.
 * CSS - styling,
 * html- design
 * JS - computation
 *
 * Avoid manipulating CSS properties from JS
 * If you're applying static styles, just toggle a class
 * If the styles are dynamic, set CSS variables
 * Set CSS variables to pure data, not CSS values like "10px" or "50%"
 * */

/**
 * Event Coalescing
 * Events are not fired for each pixel movement of the mouse, that is too much.
 * Instead, mouse moves are coalesced into a single event in queue, same with scrolling.
* */

/**
 * Event bubbling - When an event occurs on a element, it bubbles up to its parent, then the parent's parent...
 * all the way up to 'document'
 *
 * HTML:
 *      <div id="outer">
 *        <div id="inner">
 *          <button id="btn">Click Me</button>
 *        </div>
 *      </div>
 *
 * JS:
 * outer.addEventListener("click", () => console.log("outer clicked"));
 * inner.addEventListener("click", () => console.log("inner clicked"));
 * btn.addEventListener("click", () => console.log("button clicked"));
 *
 * Console Output:
 * button clicked
 * inner clicked
 * outer clicked
 *
 *  - Difference between event.target vs event.currentTarget
 * event.target → the original element that triggered the event.
 * event.currentTarget → the element on which the event listener is currently running
 *
 * event.currentTarget does not “prevent bubbling”. It just refers to the element the listener is bound to.
 * To stop bubbling use 'event.stopPropagation();'



 * Event Capturing - Event capturing is the opposite direction of bubbling.
 *      Capturing phase: from document → down to target
 *      Bubbling phase: from target → up to document
 *
 * JS:
 * outer.addEventListener("click", () => console.log("outer capturing"), true);
 * inner.addEventListener("click", () => console.log("inner capturing"), true);
 * btn.addEventListener("click", () => console.log("button capturing"), true);
 *
 * Console Output:
 * outer capturing
 * inner capturing
 * button capturing



 * Event Delegation - technique where instead of adding event listeners to many child elements, you add a single
 *   listener to their parent, and detect which child triggered the event using event.target
 *
 * HTML:
 *  <ul id="list">
 *   <li>Apple</li>
 *   <li>Banana</li>
 *   <li>Cherry</li>
 * </ul>
 *
 *
 * JS:
 * list.addEventListener("click", e => {
 *   if (e.target.tagName === "LI") {
 *     console.log("Clicked on:", e.target.textContent);
 *   }
 * });
 *
 * ---- Notes ----
 * This works because of event bubbling:
 *  The click event originates on the <li>.It bubbles up to the <ul>.You handle it there.
 *
 * ✨ Benefits of event delegation:
 * Fewer event listeners → more efficient.Works for dynamically added elements. Cleaner code.
 *
 * */

/**
 * We can change the default actions of events*/

/**
 * - Synthetic(artificially triggered) Events
 *
 * name.addEventListener("input", evt => {
 *    console.log(evt.target.value);
 * });
 *
 * name.value = "Lea"; This will not trigger the event, but we can manually trigger it.
 *
 * let evt = new InputEvent("input");
 * name.dispatchEvent(evt);    THis will dispatch/trigger the event
 *



 * - Custom Events
 * let evt = new CustomEvent("item_added", {
 *    detail: {index: 2}
 * });
 * list.dispatchEvent(evt);



 * - Custom Events on Custom Objects
 *
 *        class GithubAPI extends EventTarget {
 *          constructor() {
 *              super();
 *          }
 *          login() {
 *              // ...
 *              let evt = new CustomEvent("login",{
 *                      detail: { name: "Lea" }
 *                      }
 *              );
 *              this.dispatchEvent(evt);
 *          }
 *       }
 *       let gitHub = new GithubAPI();
 *       gitHub.addEventListener("login", evt => {
 *          greeting.textContent = `Hi ${evt.detail.name}!`; // display user info
 *       });
 *
* */

