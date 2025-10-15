/**
 * /////////////////////////////////////////////////////////////////////////////////
 * Variadic Functions:
 *
 * Function that accepts infinite number of arguments.
 * We can use the 'Rest Parameters syntax' to enable such function behaviour
 *
 * ex: ...args
 *
 * function sum(...numbers){
 *     let total = 0;
 *     for(let num of numbers){
 *         total+= num
 *     }
 *     return total
 * }
 * */


/**
 * /////////////////////////////////////////////////////////////////////////////////
 * Classes in JS
 *
 * ---- We can define then as such:
 *
 *  class Person {
 *
 *      constructor(name,surname){
 *          this.name = name;
 *          this.surname = surname;
 *      }
 *  }
 *
 *  let david = new Person(
 *    "David",
 *    "Karger"
 * );
 *
 * ---- We can extend classes as subclasses:
 *
 *  class Student extends Person {
 *      constructor(name,surname,index){
 *          super(name,surname)
 *          this.index = index
 *      }
 *  }
 *
 * ---- We can add private attributes or methods with '#'
 *
 *  class Citizen{
 *      #SSN = "xxx-xxx-xxx"
 *
 *      #setSSN(newSSN){
 *          #SSN = newSSN
 *      }
 *      getSSN(){
 *          return #SSN;
 *      }
 *  }
 *
 * ---- We can define custom elements with 'customElements' variable:
 *  customElements.define("citizen",Citizen)
 * */



/**
 * Class Accessors
 *
 * ---- We can define Getters and Setters for attributes
 *
 * let nick = {
 *     name: "Nick",
 *     birthday: new Date("2000-09-09T14:25"),
 *     get age() {
 *         const millisecond_in_year = 365 * 24 * 60 * 60 * 1000
 *         return (new Date() - this.birthday) / millisecond_in_year
 *     }
 * }
 *
 * console.log(nick.age);
 *
 * nick.age = 30; Will not work,
 *
 * nick.birthday = new Date("1992-04-01T13:00");
 * console.log(nick.age)  Now because the birthday was changed, the age will be different as well
 *
 * !!!! if we had Setter then we can set the age
 *
 * let nick = {
 *     name: "Nick",
 *     birthday: new Date("2000-09-09T14:25"),
 *     get age() {
 *         const millisecond_in_year = 365 * 24 * 60 * 60 * 1000
 *         return (new Date() - this.birthday) / millisecond_in_year
 *     },
 *     set age(a){
 *        const millisecond_in_year = 365 * 24 * 60 * 60 * 1000
 *        this.birthday = new Date((Date.now() - millisecond_in_year * a));
 *     }
 * }
 *
 * */



/**
 * /////////////////////////////////////////////////////////////////////////////////
 * Modularity with modules
 *
 * Break complicated system into many small components, minimize interaction between those components, and focus
 * on each component individually
 *
 * JS Modules
 * - blob of code with its own namespace(names defined there are only visible there, unless exported)
 * 'export' - to allow visibility elsewhere
 * 'import' -  to include names from elsewhere
 *
 * Examples:
 * <script type="module">                                - import file as module
 * export const obj = 'square'                           - make 'obj' visible for import
 * export {obj, draw ...}                                - export names defined elsewhere in file
 * import { obj, draw} from './modules/square.js';       - bring these names into my namespace
 * import { obj as square} from './modules/square.js';   - import 'obj', but call it 'square' in my namespace
 *
 * Any name can be exported---from let, function, const
 * Renaming using as lets you avoid name conflicts between modules
 * Each module is only executed once, even if imported many times
 *
 * */