const Person = require('./Person');
/**
 * Class Student, which extends Abstract class Person - and must implement specific methods, defined in Person's constructor.
 * @class Student
 * @property name - string
 * @property age - number
 * @property school - string
 */
class Student extends Person {
  constructor (name, age, school) {
    super(name, age);
    this.school = school;
  }

  /**
   * @method learn - it is mandatory method defined in abstract class Person, which also acts like Interface.
   */
  learn () {
    console.log('Student:' + this.name + ' can learn!');
  }
}

module.exports = Student;
