
/**
 * Abstract class, which acts also like Interface - all classes which extends this class must implement specific methods.
 * @class Person
 * @property name - string
 * @property age - number
 */
class Person {
  constructor (name, age) {
    if (this.constructor === Person) {
      throw new Error('Person is Abstract class and cannot be instantiated!');
    }
    if (typeof this['learn'] !== 'function') {
      throw new Error('Person acts like interface - place implement method "learn"!');
    }
    if (typeof this['eat'] !== 'function') {
      throw new Error('Person acts like interface - place implement method "learn"!');
    }
    this.name = name;
    this.age = age;
  }
  walk () {
    console.log(this.name);
  }
}

module.exports = Person;
