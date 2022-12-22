/**
 * prototype vs proto
 * 물리학자가 아니면서, 양자역학 다큐멘터리를 보고 있다. 정도로 보면 됨.
 * 자주 쓰이거나 꼭 알아야 하는 것은 아님.
 * 너무 많은 힘을 들이지는 않아도 된다는 말.
 * 이걸로 씨름할 시간에 앞에서 배웠던 걸 더 할 것.
 * 앞에 있는 것일 수록 쓸모있는 것. 뒤에 있는 것일 수록 시험에 나오거나 유식한 척 하기 좋은 것.
 * 근데 그게 뭐가 중요한가요. 그쵸? 일을 하는게 중요하죠.
 * 자 그러니까 여러분들 너무 이해 안간다고 심란해 할 필요도 없고 너무 노력 안하셔도 괜찮은 파트입니다.
 * 근데 또 노력을 해야지 이해할 수 있는 친구기도 해요 문제는.ㅎㅎ
 *
 * 함수란 무엇인가?
 * 함수는 생긴것만 보면 statements 같음. 조건문이나 반복문 같은.
 * 근데 사실 객체임.
 * 그래서 var Person = new Function(); 과 같이 표현할 수 있음.
 * 여기서, 자바스크립트의 함수들은 객체이기 때문에 **프로퍼티**를 가질 수 있음.
 *
 * function Person(name: string, first: string, second: string) {
 * this.name = name;
 * this.first = first;
 * this.second = second;
 * }
 * 이렇게 함수를 정의하면 객체이기 때문에 저 함수에 해당되는 Person 이라는 새로운 객체가 생성됨.
 * 그런데 객체가 하나 더 생성됨. Person 의 prototype 객체임.
 * 즉 함수 하나를 정의하면 객체가 2개 생김.
 *
 * Person 이라는 객체에는 prototype 이라고 하는 프로퍼티가 생기고 그 프로퍼티는 Person 의 prototype 객체를 가리킴.
 * 따라서, Person.prototype 이라고 하면 그건 Person 의 prototype 객체를 가리키는 것.
 *
 * Person 의 prototype 객체도 자신이 Person 의 소속이라는 것을 표시하기 위해서 어딘가에 기록해둬야 함.
 * 그러기 위해서 constructor 라고 하는 프로퍼티를 만들고
 * 그 프로퍼티는 Person 을 가리키게 됨.
 * 서로간의 상호 참조를 하고 있는 것임.
 * Person 은 prototype 프로퍼티를 통해서, Person's prototype 은 constructor 라고 하는 프로퍼티를 통해서.
 *
 * Person.prototype.sum = function () {}; 와 같이 정의를 하면
 * 이건 어떤 의미를 갖냐면
 * Person 의 prototype 을 찾아가고, 그건 Person's prototype 객체인데,
 * 거기에 sum 이 없으니까 거기에 함수 정의를 하게 됨.
 * 그러면 이제 객체를 찍어내는 공장인 Person 이라고 하는 constructor function 을 만든 것.
 * 그러면 이 상태에서 객체 생성. var kim = new Person('kim', 10, 20)
 * 그러면 kim 이라는 객체가 생길 것이고 그 김은 다음과 같이 구성 됨.
 *
 * kim {
 *  __proto__
 *  name
 *  first
 *  second
 * }
 *
 * 이 때 __proto__ 가 생성되고, __proto__ 는 Person's prototype 을 가리킴.
 *
 * 그러면 Person.prototype 을 통해서도, kim.__proto__ 를 통해서도 Person's prototype 에 접근하게 되는 것.
 * 비슷한 형태로 lee 라는 객체를 생성해도 마찬가지.
 *
 * 이런 상태에서 kim.name 을 출력하려고 하면,
 * 자바스크립트는 kim 이라고 하는 객체의 name 이라는 프로퍼티가 있는지를 찾아봄.
 * 있음. 그러면 name 이라는 프로퍼티에 저장된 값을 출력함.
 * 혹사니 name 이라고 하는 값이 없다면 __proto__ 가 가리키는 객체에 name 이 있는지를 다시 찾아봄.
 *
 * kim.sum() 을 한다면?
 * kim 이라는 객체에는 sum 이라는 메서드가 없음.
 * 그러면 자바스크립트는 __proto__ 를 통해서 __proto__가 가리키고 있는 Person's prototype 에 sum 이 있는지를 찾아봄.
 * 있음. 그러면 kim 의 __proto__ 를 겨쳐 Person's prototype 의 sum 을 사용함.
 * 만약에, Person's prototype 에도 없다면 Person's prototype 의 __proto__ 를 쫓아서 탐색을 계속 함.
 *
 *
 * 생성자(생성자 함수) 에는 prototype 이, 생성된 쪽 에는 __proto__ 가 생기는 건가?
 * 만약 본인이 언어 설계자 였다면 함수의 prototype 이라는 이름은 __prototypeObject__ 로,
 * 그리고 각각의 객체, 인스턴스에 생성되는 __proto__ 는 __protoLink__ 로 했을 것이라고 하심.
 * 이렇게 이해나는게 좀 더 이해가 된다.
 * 함수에 있는 prototype 객체,
 * 그리고 객체, 인스턴스에 있는 prototype link, chanin 을 제공하는 __proto__.
 *
 * prototype 은 원류.
 * __proto__ 는 그 원류로 부터 흐르고, 그 원류를 쫓아 가는 링크.
 *
 */

function Person(name: string, first: number, second: number) {
  this.name = name;
  this.first = first;
  this.second = second;
}

Person.prototype.sum = function () {
  return this.first + this.second;
};

var kim = new Person("kim", 10, 20);

console.log("kim.name: ", kim.name);

export {};
