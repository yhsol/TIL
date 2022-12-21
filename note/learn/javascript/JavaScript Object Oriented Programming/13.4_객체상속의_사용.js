/**
 * 먼저 kim 이라는 객체를 생성.
 * 동작 확인. ok.
 * lee 라는 객체를 만들려고 보니 sum 을 또 만들기 싫음.
 * 그러면 어떻게 하면 될까? => proto 를 이용.
 * 일단 lee 에서 name, first, second 까지 정의
 * lee 의 __proto__ 를 kim 으로 설정. (kim 을 상속 받음.)
 * lee.sum() => 20 출력. ok.
 * lee 에는 sum 이 없는데 어떻게?
 * => lee.sum() 이 호출되면 lee 라는 객체에 sum 이 있는지 찾아봄.
 * => 하지만 없음. 그러면 자바스크립트는 저 객체의 __proto__ 의 프로퍼티로써 sum 이 있는지를 찾아봄.
 * => 있음. 그러면 여기의 sum 이 실행됨. 이때 sum 내부의 this 는 kim 이 아닌 lee 의 객치임.
 * => 근데 이 때 sum 이 화살표 함수라면 NaN 이 출력 됨. 화살표 함수에서 this 는 undefined.
 * 
 * lee 에서만 추가하고 싶은 기능이 있음. avg 같은 기능.
 * 그런 경우에는 lee 에다가 구현하면 됨.
 * 
 * __proto__ 를 이용해서 상속을 받는 등의 유연함은 편리함을 제공하지만 혼란스럽기도 함.
 * 
 * Object.create 로 바꿔보자.
 */

const kim = {
  name: "kim",
  first: 10,
  second: 20,
  sum: function() {
    return this.first + this.second;
  },
};

// use __proto__
const lee = {
  name: 'lee',
  first: 10,
  second: 10,
  avg: function() {
    return (this.first + this.second ) / 2
  }
};
lee.__proto__ = kim;
console.log("kim sum: use __proto__", kim.sum());
console.log("lee sum: use __proto__", lee.sum());

// use Object.create
// kim 을 prototype object 로 하는 lee 라는 객체를 만들어줘.
const lee_object_create = Object.create(kim);
lee_object_create.name = 'lee';
lee_object_create.first = 10;
lee_object_create.second = 10;
lee_object_create.avg = function() {
  return (this.first + this.second) / 2
}

console.log("kim sum: use Object.create", kim.sum());
console.log("lee sum: use Object.create", lee.sum());