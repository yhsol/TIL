/**
 * 16.2. 생성자 함수를 통한 상속 : 부모 생성자 실행
 * constructor inheritance
 */

// constructor function
function Person(name: string, first: number, second: number) {
  this.name = name;
  this.first = first;
  this.second = second;
}
Person.prototype.sum = function () {
  return this.first + this.second;
};

function PersonPlus(
  name: string,
  first: number,
  second: number,
  third: number
) {
  // Person(name, first, second) 로는 안됨. this가 바뀌기 때문에.
  // Person 함수를 통해서 초기화 하고 사용하고 싶은 this를 넘겨줘야 함.
  // call 을 통해서 PersonPlus 라고 하는 생성자가 new 호출이 될 때 만들어지는 객체인 this 를 인자로 줌.
  // 그 외에는 PersonPlus 추가적으로 필요한 작업(third) 만 해주면 됨.
  // 즉, 여기서 Person.call(this, name, first, second) 은 클래스를 사용할 때의 super(name, first, second) 와 같은 역할을 함.
  // 결국 this 가 중요함. 문맥, 맥락을 결정함.
  Person.call(this, name, first, second);
  this.third = third;
}
PersonPlus.prototype.avg = function () {
  return (this.first + this.second + this.third) / 3;
};

let kim = new PersonPlus("kim", 10, 20, 30);

console.log("kim", kim);
console.log("kim.sum(): ", kim.sum());
console.log("kim.avg(): ", kim.avg());

export {};
