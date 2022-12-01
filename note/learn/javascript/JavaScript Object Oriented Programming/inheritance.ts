class Person {
  public name: string;
  public first: number;
  public second: number;

  // 객체가 생성될 때, 객체의 초기상태를 지정하기 위한, 객체가 만들어지기 직전에 실행되도록 약속 된 함수. => constructor
  constructor(name: string, first: number, second: number) {
    console.log("constructor");
    this.name = name;
    this.first = first;
    this.second = second;
  }

  sum() {
    return this.first + this.second;
  }
}

// extends: 상속, 확장, 부분집합
// super: 부모의 생성자를 호출
class PersonPlus extends Person {
  private third: number;

  // Person 에 없는 third 를 받고 싶은 경우.
  // super 를 호출해서 공통 부분을 받음.
  constructor(name, first, second, thrid) {
    super(name, first, second);
    this.third = thrid;
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
