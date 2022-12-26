/**
 * 16.1. 생성자 함수를 통한 상속
 *
 * 상속은 유용한데, 복잡함.
 * 자바스크립트가 유연하다 보니 상속하는 방법도 여러가지.
 *
 * 상속 방법
 * - 객체와 객체가 직접 상속하는 방법
 * - 클래스 또는 컨스트럭터 펑션을 통해서 상속하는 방법
 *
 * 클래스 문법을 이용해서 상속하는게 쉽다. 문제가 생길 가능성도 보다 적다고 생각함.
 *
 * 클래스 이전에 상속하던 방법을 먼저 살펴볼 것. 프로토타입 사용해서.
 * 실제로는 클래스랑 같은 기능이기 때문에 클래스를 쓰면 됨.
 */

class Person {
  constructor(
    public name: string,
    public first: number,
    public second: number
  ) {}

  sum() {
    return this.first + this.second;
  }
}

class PersonPlus extends Person {
  constructor(
    public name: string,
    public first: number,
    public second: number,
    public third: number
  ) {
    super(name, first, second);
  }

  sum() {
    return super.sum() + this.third;
  }

  avg() {
    return (this.first + this.second + this.third) / 3;
  }
}

let kim = new PersonPlus("kim", 10, 20, 30);

console.log("kim", kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg());

export {};
