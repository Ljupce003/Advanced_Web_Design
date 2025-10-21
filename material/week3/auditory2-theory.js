/**
 * /////////////////////////////////////////////////////////////////////////////////
 * OOP - Object-Oriented Programming
 * A way to organize code around objects that represent real-world entities.
 * Each object bundles its data(properties) and behavior(methods) together.
 * Helps us write cleaner, reusable, and easier-to-understand code.
 *
 * Fundamental principles are:
 *  - Encapsulation ->
 *  - Inheritance ->
 *  - Polymorphism ->
 *  - Abstraction ->
 *
 *  Why OOP in JavaScript?
 *  Helps to manage larger apps with many related objects. Encourages reusability through class-based structures.
 *  Makes code modulare and maintainable.
 *
 *      class Person {
 *           constructor(name) {
 *               this.name = name;
 *           }
 *
 *           greet() {
 *               console.log(`Hello, I'm ${this.name}`);
 *           }
 *      }
 *
 *      const p1 = new Person("John");
 *      p1.greet();
 *
 * /////////////////////////////////////////////////////////////////////////////////
 * Methods in classes
 * They are functions defined inside a class. The keyword 'function' isn't needed when defined inside a class.
 *
 * Methods are shared between all objects of that class.
 *
* */


/**
 * /////////////////////////////////////////////////////////////////////////////////
 * 'this' keyword
 *
 * It refers to the current object created from the class. Used to access the object's own properties and methods.
 * Becomes very important when using multiple objects.
* */

/**
 * /////////////////////////////////////////////////////////////////////////////////
 * Class inheritance:
 * Inheritance lets one class extend another. It uses the 'extends' keyword
 *
 * Use 'super()' to call the parent class constructor.
 *
 * class Person {
 *      constructor(name) {
 *          this.name = name;
 *      }
 *
 *      greet() {
 *          console.log(`Hello, I'm ${this.name}`);
 *      }
 * }
 *
 * class Teacher extends Person {
 *      constructor(name, subject) {
 *          super(name);
 *          this.subject = subject;
 *      }
 *
 *      teach() {
 *          console.log(`${this.name} is teaching ${this.subject}`);
 *      }
 * }
 *
 * const t1 = new Teacher("Peter", "Advanced Web Design");
 * t1.greet();
 * t1.teach();
 *
* */

/**
 * /////////////////////////////////////////////////////////////////////////////////
 * Getters and setters
 *
 * get - allows access to a property's computed value
 * set - controls how a property is changed.
 *
 *
 * class Teacher extends Person {
 *      constructor(name, subject) {
 *          super(name);
 *          this._subject = subject;
 *      }
 *
 *      get subject() {
 *          return this._subject.toUpperCase();
 *      }
 *
 *      set subject(newSubject) {
 *          if (newSubject) this._subject = newSubject;
 *      }
 * }
 *
 * const t3 = new Teacher("Marko", "Web Design");
 * console.log(t3.subject);
 * t3.subject = "Frontend Development";
 * console.log(t3.subject)
* */


/**
 * /////////////////////////////////////////////////////////////////////////////////
 * Private Fields
 * They start with # . Can be accessed only inside the class. Useful for protecting internal data.
 *
 * class Person {
 *      #age = 0; // private
 *
 *      constructor(name, age) {
 *          this.name = name;
 *          this.#age = age;
 *      }
 *
 *      getAge() {
 *          return this.#age;
 *      }
 *
 *      birthday() {
 *          this.#age++;
 *          console.log(`${this.name} is now ${this.#age} years old.`);
 *      }
 *
 *      toString() {
 *          return `Teacher: ${this.name}, Subject: ${this.subject}`;
 *      }
 * }
 *
 * const p5 = new Person("Jane", 25);
 * p5.birthday();
 *
 * console.log(p5.toString());
 * console.log(`${p5}`);
* */