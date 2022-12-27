/**
 * 16.5. 생성자 함수를 통한 상속 : constructor 속성 바로잡기
 *
 * PersonPlus.prototype = Object.create(Person.prototype); 를 하면
 * PersonPlus.prototype.__proto__ = Person.prototype; 와는 다르게
 * 새로운 객체로 PersonPlus 의 prototype 을 교체해버림.
 * 그리고 PersonPlus 의 prototype 은 PersonPlus 를 가리키고 있었을 건데
 * 계를 리플레이스 시켜 버리기 때문에 더 이상 PersonPlus's prototype 은 PersonPlus 를 가리키지 않는다.
 * kim.constructor:  [Function: Person] => Person 을 가리킴.
 * 왜? Object.create(Person.prototype); 을 통해서 만들어진 객체는 Person's prototype 을 prototype 으로 하는 객체이기 때문이다.
 * 우리가 원하는건 PersonPlus 가 나오길 바람.
 * 그러면 이렇게 하면 됨. PersonPlus.prototype.constructor = PersonPlus;
 * => kim.constructor:  [Function: PersonPlus]
 *
 * 그런데 PersonPlus.prototype.avg 와 같이 prototype 에 추가한 함수를
 * PersonPlus.prototype.constructor = PersonPlus; 이전에 했었다면
 * 리플레이스되기 때문에 사라짐.
 *
 * 근데 __proto__ 를 사용해서 PersonPlus.prototype.__proto__ = Person.prototype; 이렇게 하면
 * avg 는 정의한 순서에 상관없이 존재함.
 * 왜? __proto__ 를 사용한 방식은 기존에 있었던 객체를 리플레이스 하지 않고,
 * __proto__ 만 바꾸기 때문. 즉 참조, 링크만 변경하는 것.
 * __proto__ 를 쓰면 간단히 해결되긴 하지만 비표준이기 때문에 Object.create 를 쓰는게 바람직 하다.
 * 가치를 어디에 둘것이냐의 문제.
 *
 * constructor 를 통한 상속을 알아봤는데
 * class 구현을 사용하는게 깔끔하긴 함.
 * class 를 사용해도 내부적으로는 지금까지 해왔던 구현을 내부적으로 하고 있음.
 * 그렇기 때문에 class 를 쓰는걸 권장.
 *
 * 그런데 또 한편으로는 prototype 과 __proto__ 의 미묘한 관계.
 * 그게 자바스크립트의 인프라라고해도 과언이 아님.
 * 그래서 요걸 실험하면서 얘를 쓰겠다 보다는 쓸 때는 클래스를 쓰고,
 * 대신에 이걸 이해했다는 것은 자바스크립트의 상당히 중요하고 어려운 부분을 이해하게 됐다는 뜻이긴 함.
 *
 */

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

console.log("kim.constructor: ", kim.constructor);

export {};
