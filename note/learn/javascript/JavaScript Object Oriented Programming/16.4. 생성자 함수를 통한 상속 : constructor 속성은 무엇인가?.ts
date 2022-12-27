/**
 * 16.4. 생성자 함수를 통한 상속 : constructor 속성은 무엇인가?
 * Person 객체는 prototype 을 통해서 Person's prototype 을 참조함.
 * 다시 역으로, Person's prototype 객체는 constructor 를 통해서 Person 객체를 참조함.
 * 즉 서로가 prototype 과 constructor 를 통해서 상호참조 하고 있는 상태.
 * 그리고 Person 을 통해서 new 를 사용해 새로운 객체를 만들면
 * 그 새로운 객체는 __proto__ 를 통해서 constructor function(여기서는 Person) 의
 * prototype 객체, 즉 Person's prototype 을 가리킴.
 * 그러면 여기서 kim.constructor 라고 하면 뭐가 될까?
 * Person 이 되는거 아닌가?
 * kim 에는 constructor 라고 하는 프로퍼티가 없음. => 그러면 __proto__ 를 타고 탐색
 * => Person's prototype 에서 찾음. => Person's prototype 의 constructor 는 Person. => 정답은 Person.
 * 즉, kim 이라는 객체의 constructor 는 생성자(constructor function) 를 가리킨다.
 *
 * 개발자도구에서,
 * let d = new Date();
 * 시간을 나타내는 객체를 만들어 주는 생성자를 통해서 d 라는 객체를 얻음.
 * 위의 내용을 토대로
 * Date.prototype.constructor === Date => true
 * 라는 것을 알 수 있음.
 * 그러면 d.constructor 는 뭐야?
 * d 는 자체적으로 constructor 정보를 가지고 있지는 않기 때문에
 * __proto__ 를 따라서 constructor function 의 prototype 객체로 가서
 * 거기 있는 constructor 라고 하는 프로퍼티를 통해서 자기를 생성해준 생성자를 알려줌.
 * 이런걸 통해서 예를 들어 d 라는 객체가 있을 때 d.constructor 를 통해서 얘를 누가 만들었는지 알 수 있음.
 *
 * 또한,
 * const d = new Date(); 와 const d2 = new d.constructor(); 는 같다.
 * d.constructor === d2.constructor
 *
 * 그래서, 자바스크립트에서 constructor 라고 하는 프로퍼티는 여러가지 의미로 쓰이는데
 * 그 중의 하나는 어떠한 객체가 누구로부터 만들어졌는지를 알려주는,
 * 주류 객체지향에서는 니 클래스는 뭐야? 라고 물어보는거랑 비슷함.
 * 또한 new d.constructor() 와 같이 constructor function 이 뭔지 몰라도 만들어낼 수 있기도 함.
 *
 */

// constructor function
function Person(name, first, second) {
  this.name = name;
  this.first = first;
  this.second = second;
}
Person.prototype.sum = function () {
  return this.first + this.second;
};

function PersonPlus(name, first, second, third) {
  Person.call(this, name, first, second);
  this.third = third;
}

// PersonPlus.prototype.__proto__ = Person.prototype;
PersonPlus.prototype = Object.create(Person.prototype);
PersonPlus.prototype.constructor = PersonPlus;

PersonPlus.prototype.avg = function () {
  return (this.first + this.second + this.third) / 3;
};

let kim = new PersonPlus("kim", 10, 20, 30);
let lee = new Person("lee", 10, 10);

// console.log("Person: ", Person.toString());
// console.log("Person's prototype: ", Person.prototype);
// console.log("PersonPlus: ", PersonPlus.toString());
// console.log("PersonPlus's prototype: ", PersonPlus.prototype);
// console.log("Kim: ", kim);
console.log("Kim.sum: ", kim.sum());
console.log("Kim.avg: ", kim.avg());
console.log("Kim.constructor: ", kim.constructor);
console.log("lee.constructor: ", lee.constructor);

export {};
