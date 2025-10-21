/**
 * /////////////////////////////////////////////////////////////////////////////////
 * Javascript interpreter is single-threaded, but we can make asynchronous programming work by using events, where
 * we delegate certain operations (like network requests, file reading, or timers) to the browser or Node.js runtime.
 *
 * The main thread executes code line-by-line, but when it encounters an asynchronous operation, it doesn't block.
 * Instead, the operation is handled in the background (by the Web APIs in browsers or libuv in Node.js).
 *
 * Once the asynchronous task finishes, a callback (or Promise resolution) is queued in the Event Queue (or Microtask Queue).
 * The Event Loop continuously checks if the call stack is empty, and if it is, it pushes these queued callbacks
 * back onto the call stack for execution.
 *
 * This system allows JavaScript to remain responsive, even while waiting for slow operations like:
 *  - Fetching data from a server (HTTP requests)
 *  - Waiting for a user to click a button
 *  - Reading files or database queries
 *
 * In modern JavaScript, we manage asynchronous behavior mainly through:
 *  - Callbacks: Functions passed to run later.
 *  - Promises: Objects representing future completion of an async operation.
 *  - async/await: Syntactic sugar over Promises that makes async code look synchronous.
 *
 * Why asynchronous is good:
 *  - Prevents blocking the main thread (UI stays smooth and responsive).
 *  - Improves performance by allowing other tasks to continue while waiting.
 *  - Makes applications more efficient in handling I/O-bound operations.
 *  - Enables concurrency: multiple operations can be in progress without using multiple threads.
 *
 * Example:
 *
 * console.log("Start");
 * setTimeout(() => console.log("Async operation complete"), 2000);
 * console.log("End");
 *
 * // Output:
 * // Start
 * // End
 * // Async operation complete
 *
 * The "setTimeout" runs asynchronously — the JS engine schedules it to execute later,
 * allowing the rest of the code to continue executing immediately.
 *
 */

/**
 * /////////////////////////////////////////////////////////////////////////////////
 * In earlier times, if not positioning the js script in good order then the browser will stop compiling the HTML
 * and will switch to the JS script, but if the script is slow then the screen on the client side will be blank
 * unfinished. But now browsers automatically make the JS scripts less prioritized and will continue rendering
 * the HTML while in the background it will slowly start executing the JS script.
 *
 * We can manually, or had to make it by writing 'defer' as an attribute to the script tag. This will make the JS
 * script and the HTML rendering to be executed in PARALLEL.
 * Example: <script src="SCRIPT_PATH" defer></script>
 *
 * With writing the type to the script to be a 'module', will make it implicitly deferred.
 * Example: <script type="module" src="SCRIPT_PATH" ></script>
 *
 * But if we explicitly write 'async' as an attribute to the script tag, then the JS script will be executed in a
 * MORE PARALLEL LIKE PARALLEL than 'defer' with the HTML rendering.
 *
* */


/**
 * /////////////////////////////////////////////////////////////////////////////////
 * But what about general async computing, well we can do it with:
 * - Polling -> a bad idea, but sometimes necessary. Like looping in a while loop until the event is complete
 * - Objects/Methods for async like:
 *
 *      - Callbacks -> When we want to do something after something else finishes;
 *
 *      - Events -> they standardize callbacks using the observer design pattern, We can name the event,
 *          pass object info to pass to the callback. But what if we need to wait to multiple events , then we need
 *          to carefully organize in which order events start and end, like this:
 *
 *          img.addEventListener('load',event => {
 *              img2.addEventListener('load', event => {
 *                  img3.addEventListener('load',init);
 *                  img3.src="http://pictures.com/mine.jpg";
 *                  }
 *              img2.src="http://pictures.com/mine.jpg";
 *              });
 *          img1.src='http://pictures.com/mine.jpg';
 *
 *          doOtherStuff();
 *
 *          We can do this better and with more clarity and control with 'async' and 'await'. Common uses for
 *          'async' and 'await' are fetch and json() when we fetch web content.
 *
 *      - Promises -> helps with representing order of actions and intends to wait.
 *          Problem with passing code as argument, but solution can be to 'wrap in a callback function'.
 *
 *          /////////////////////////////////////////////////////////////////////////////////
 *          We can have PARALLEL Promises when we want to simultaneously fetch multiple stuff and waiting for them
 *          all at the same time. Example:
 *              Promise.all(
 *                  [ loadImage(url1), loadImage(url2), loadImage(url3)] )
 *                  .then( [r1, r2, r3] => {
 *                      img1 = u1;
 *                      img2 = u2;
 *                      img3 = u3;
 *                  })
 *                  .then(init);
 *
 *          /////////////////////////////////////////////////////////////////////////////////
 *          With 'Promise.all' we can track multiple promises running in parallel and wait for every one of them
 *          before continuing to next lines.
 *
 *          We can chain Promises like this: wait(100).then(() => console.log(1)).then(() => console.log(2))
 *
 *
 *          /////////////////////////////////////////////////////////////////////////////////
 *          If we want to handle errors then we can do this: then(f,r)
 *           - f() -> Is called when the promise is FULFILLED
 *           - r() -> Is called when the promise is REJECTED
 *
 *          But we can do this also with .catch()
 *
 *          /////////////////////////////////////////////////////////////////////////////////
 *          With .finally we can provide callback or code that will be executed regardless if the promise is fulfilled
 *          or rejected.
 *
 * Syntax for asynchronous is: async/await
 *
 * Async always returns a promise, so that means all async functions become Promises
 * */

/**
 * /////////////////////////////////////////////////////////////////////////////////
 * Constructing promises
 * We can construct our own promises with function objects like this:
 *
 * function evaluatePromise(resolve, reject) {
 *     function myCallback(result) {
 *         if (isGood(result)) {
 *             resolve(result);
 *         } else {
 *             reject("Error evaluating result");
 *         }
 *     }
 *     return myCallback;
 * }
 *
 * const myPromise = new Promise((resolve, reject) => {
 *     const callback = evaluatePromise(resolve, reject);
 *     // simulate async result
 *     setTimeout(() => callback("someResult"), 1000);
 * });
 *
 *
 * Or the short way By putting all in the promise constructor
 *
 * const myPromise = new Promise((resolve, reject) => {
 *     const result = "someResult"; // or get it asynchronously
 *     isGood(result) ? resolve(result) : reject("Error evaluating result");
 * });
 *
 *
 */

