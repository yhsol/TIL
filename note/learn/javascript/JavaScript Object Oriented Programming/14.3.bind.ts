/**
 * bind
 * sum 을 호출할 때마다 this 를 넣어주지 않고
 * 아예 내부적으로 딱 다른것으로 고정시켜 버리는게 bind.
 * bind 의 첫 번째 인자는 함수 내부적으로 this 를 뭘로 쓸꺼냐 하는 것.
 * sum.bind() 를 하면 새로운 함수가 만들어짐.
 * 두 번째 자리부터는 함수가 호출될 때마다 사용 될 인자를 넣을 수 있음.
 * const kimSum = sum.bind(kim, "sum bind kim: ");
 * console.log(kimSum()); //=> sum bind kim: 30
 *
 * sum 은 바뀌지 않고 sum 이 bind 를 한 취지에 맞게 바뀐 새로운 함수가 만들어져서 리턴 되는 것.
 * 즉, 기존 sum 에는 영향을 주지 않음.
 *
 * call 은 실행 할 때읜 context 즉, this 를 바꾼다.
 * bind 는 어떤 함수의 this 의 값을 영구적으로 바꾸는 새로운 함수를 만들어 낸다.
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

const kimSum = sum.bind(kim, "sum bind kim: ");
console.log(kimSum());

export {};
