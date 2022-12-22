/**
 * note
 * 이전 수업과 다르게 이번에는 객체 안에 sum 이라는 메서드를 직접 만들지 않음. 근데 필요는 함.
 * 객체 바깥에 sum 을 만듦.
 * 지금까지 sum 은 객체 안에 있는 this 의 first 와 second 를 더하는 역할을 해옴.
 * 바깥에 있는 지금은 어떻게 쓰면 될까?
 * call 을 쓰면 됨. sum.call();
 * sum.call() 은 sum() 과 같음.
 * 그러면 call 의 역할은?
 * 모든 함수는 call 이라고 하는 메서드를 가지고 있음.
 * 자바스크립트에서는 함수도 객체이기 때문.
 *
 * call 이라는 메서드에 첫 번째 인자로 kim 을 주면,
 * sum 이 갖고 있는 this 는 kim 이 됨.
 * 따라서 sum.call(kim) => 30, sum.call(lee) => 20
 *
 * sum 이라는 함수는 kim 또는 lee 의 멤버가 아니었음.
 * 근데 call 이라는 메서드를 통해서 sum 이 내부적으 사용할 this 를 kim 또는 lee 로 지정했더니
 * sum 이라는 함수가 각 객체의 멤버가 된 것.
 *
 * 같은 원리로
 * sum.call({first: 1, second: 1}) 는 2 가 됨.
 *
 * sum 에 파라미터가 있다면 call 메서드의 두 번째 인자부터 넣으면 됨.
 * sum 을 function sum(prefix: string): string 와 같은 식으로 정의 한다면
 * 다음과 같이 호출하면 됨. sum.call(kim, 'kim')
 *
 * call 은 결국 context 를 바꾸는 명령임.
 */
const kim = {
  name: "kim",
  first: 10,
  second: 20,
};
const lee = {
  name: "lee",
  first: 10,
  second: 10,
};
function sum(prefix: string) {
  return prefix + (this.first + this.second);
}
console.log("sum.call(kim): ", sum.call(kim, "sum of kim: "));
console.log("sum.call(lee): ", sum.call(lee, "sum of lee: "));

export {};
