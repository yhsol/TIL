/**
 * 16.3. 생성자 함수를 통한 상속 : 부모와 연결하기
 * call 을 통해서 super 와 비슷한 동작을 하더라도 부모와 실제로 연결된 것은 아님.
 * 예를 들어 sum 같은 함수는 상속되지 않은 상태. //=> kim.sum is not a function
 *
 * 현재의 상태
 * Person 은 prototype 을 가지고 있고
 * Person's prototype 은 constructor, sum 을 가지고 있음.
 * PersonPlus 는 prototype 을 가지고 있고
 * PersonPlus's prototype 은 constructor, avg, __proto__ 를 가지고 있음.
 * 여기서 PersonPlus 를 new 연산자를 통해 kim 이라는 객체를 만듦.
 * kim 은 __proto__, name, first, second, third 를 가짐.
 * kim 의 __proto__ 는 자신은 생성한 생성자의 prototype 이 가리키는 객체를 가리킴.
 * 그 객체는 PersonPlus's prototype.
 * 이 상태에서 kim.avg() 를 호출하면?
 * kim 에 avg 가 있나? 없음. => __proto__ 를 따라서 탐색. => PersonPlus's prototype 객체에 있는지 확인 => 있음. => 실행
 * kim.sum() 을 호출하면?
 * kim 에 없음. => __proto__ 를 따라서 탐색. => PersonPlus's prototype 확인 => 없음. => 없다고 판단. 에러 발생 시킴.
 *
 * 이러한 상태에서 PersonPlus's prototype 에서 sum 을 못찾았을 때, Person's prototype 에 있는 sum 으로 연결하고 싶다.
 * 그러면 PersonPlus's prototype 의 __proto__ 가 Person's prototype 을 가리키면 됨.
 *
 * PersonPlus.prototype.__proto__ = Person.prototype;
 * kim.sum() => 30 출력.
 * 근데 __proto__ 는 표준이 아님. 그래서 ts 에서 안됨.
 * 그래서 대신에 Object.create() 를 사용함.
 * PersonPlus.prototype = Object.create(Person.prototype);
 * 이렇게 하면 PersonPlus.prototype.__proto__ = Person.prototype; 의 역할을 하긴 함.
 * 근데 하자가 있음.
 * Object.create 는 새로 객체를 생성하기 때문에 이전에 정의한 prototype 이 바뀜.
 * 예로, avg 를 먼저 prototype 에 정의하고, Object.create 를 하면 avg 가 사라짐.
 * 또한, console.log("Kim.constructor: ", kim.constructor); 을 해보면
 * Kim.constructor:  [Function: Person] 가 나옴.
 * 이 말은 kim 이 Person 의 constructor function 이다 라는 뜻.
 * kim 의 constructor function 이 Person 입니다. 라고 알려주는 것.
 * 근데 우리가 원한건 그게 아님. kim 의 constructor function 은 PersonPlus 이어야 함.
 * 그걸 위해서 PersonPlus.prototype.constructor = PersonPlus; 를 해줘야 함.
 * => Kim.constructor:  [Function: PersonPlus]
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

function PersonPlus(
  name,
  first,
  second,
  third
) {
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

export {}