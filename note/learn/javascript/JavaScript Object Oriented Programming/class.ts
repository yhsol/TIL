class Person {
  private name: string;
  private first: number;
  private second: number;

  // 객체가 생성될 때, 객체의 초기상태를 지정하기 위한, 객체가 만들어지기 직전에 실행되도록 약속 된 함수. => constructor
  constructor(name: string, first: number, second: number) {
    console.log("constructor");
    this.name = name;
    this.first = first;
    this.second = second;
  }

  sum() {
    return "prototype : " + (this.first + this.second);
  }
}

let kim = new Person("kim", 10, 20);
let lee = new Person("lee", 10, 10);

console.log("kim", kim);
console.log("lee: ", lee);

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());

export {};
