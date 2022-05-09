// You have a closure when a function accesses variables defined outside of it.

let users = ["Alice", "Dan", "Jessica"];
let query = "A";
let user = users.filter((user) => user.startsWith(query));

// Notice how user => user.startsWith(query) is itself a function. It uses the query variable. But the query variable is defined outside of that function. That’s a closure.

function liveADay() {
  let food = "cheese";

  function eat() {
    console.log(food + " is good");
  }

  eat();
}

liveADay();

// We say that there is a closure when a function (such as eat) reads or writes a variable (such as food) that is declared outside of it (such as in liveADay).
// 함수 (예 : eat)가 외부에서 선언 된 변수 (예 : food)를 읽거나 쓸 때 (예 : liveADay에서) 클로저가 있다고 말합니다.
// 함수가 외부에서 선언 된 변수를 읽거나 쓸 때 클로저가 있다고 말합니다.

let users2 = ["Alice", "Dan", "Jessica"];
// 1. The query variable is declared outside
let query2 = "A";
let user2 = users2.filter(function (user2) {
  // 2. We are in a nested function
  // 3. And we read the query variable (which is delcared outside!)
  return user2.startsWith(query2);
});

// 함수가 외부에서 선언 된 변수에 액세스 할 때마다 이를 클로저라고 합니다.

// The fact that a function may read and write variables outside means that
// these variables will "survive" for as long as the nested function may be called

function liveADay2() {
  let food = "cheese";

  function eat() {
    console.log(food + " is good");
  }

  // Call eat after five seconds
  setTimeout(eat, 5000);
}

liveADay2();

// liveADay2 함수가 실행되면 lcoal variable 인 food 는 disappears 할 것 같지만 그렇지 않음.
// liveADay2 5초 후에 eat 함수를 실행하는데,
// eat 함수는 food (local variable) 를 읽고 있음.
// 그렇기 때문에 자바스크립트 엔진은 food variable 을 eat 함수가 호출 될 때까지 사용가능하게 유지해야 함.
// liveADay2 함수의 호출이 끝났음에도 중첩되어 있는 eat 함수가 호출될 수 있는 한 liveADay2 내부의 변수는 계속 유지됨.
// 자바스크립트가 알아서 이러한 작업을 수행함.

// Rust 도 closure 를 지원하는데,
// closure 를 위한 구문과 함수가 따로 있음.
// 클로져는 엔진에게 함수 호출 후에도 외부 변수 (called "the environment") 를 유지하도록 요청할 수 있는데,
// 이는 자바스크립트에서는 허용되지만 low-level languages 에서는 성능 이슈가 될 수 있음.
