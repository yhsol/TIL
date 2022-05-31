# a closure

ref: https://whatthefork.is/closure

클로져는 'invisible' 한 컨셉이라 헷갈림.

객체나, 변수, 함수를 쓸 때는 의도적으로 사용하게 됨.
이렇게 생각할 것임. "여기에 변수가 필요해," 그러면 코드에 추가할 것.

클로져는 다름.
사람들은 클로져를 쓰는지도 모르게 많이 썼을 것.
그렇기 때문에 클로져는 새로운 컨셉을 이해하는 것이라기보다는
하고있던 일을 '인식' 하는 것에 가까울 것.

클로져는 간단히 말해, 자신의 바깥의 변수에 접근하는 함수를 말한다고 할 수 있음.
예를 들어, 아래 코드는 클로져를 포함하고 있음.

```jsx
let users = ["Alice", "Dan", "Jessica"];
let query = "A";
let user = users.filter((user) => user.startsWith(query));
```

`user => user.startsWith(query)` 가 어떻게 함수인지 주목하자.(아마도 어떻게 작동하는지? 에 대한 얘기일 듯?)

이것은 `query` 라는 변수를 사용함.
그런데 `query` 는 함수 바깥에 선언되어 있음.
이것이 바로 클로져다.

## Step1: 함수는 바깥의 변수에 접근할 수 있음

클로져를 이해하기 위해, 어느정도 변수와 함수에 익숙해질 필요가 있음.
예제에서, `eat`이라는 함수 안에 `food` 라는 변수를 선언한다.

```js
function eat() {
  let food = "cheese";
  console.log(food + " is good");
}

eat(); // Logs 'cheese is good'
```

그런데, 우리가 나중에 `food` 변수를 `eat` 함수 바깥에서 변경하고 싶다면?
이것을 위해, 우리는 `food` 변수를 함수 바깥 상위 레벨로 이동할 수 있음.

```js
let food = "cheese"; // We moved it outside

function eat() {
  console.log(food + "is good");
}
```

이렇게 옮김으로써 `food` 를 '바깥에서' 원할 때 언제는 변경할 수 있음.

```js
eat(); // Logs 'cheese is good'
food = "pizza";
eat(); // Logs 'pizza is good'
food = "sushi";
eat(); // Logs 'sushi is good'
```

다르게 말하면,
`food`변수는 더 이상 `eat` 함수의 local 이 아니지만,
`eat` 함수가 접근하는데에도 문제가 없음.
함수는 바깥의 변수에 접근할 수 있음.

## Step1: 함수 호출에서 코드 래핑

어떤 코드가 있다고 가정하자.
무슨 코드인지는 상관 없음.
그 코드를 두번 실행한다고 생각해보자.
한가지 방법은 복사-붙여넣기 하는 것.
다른 방법은 반복하는 것.
세번째 방법은 함수로 감싸는 것.
함수를 사용하는것은 굉장한 유연성을 줌.
왜냐면 함수를 몇번이고 실행할 수 있고, 언제든 실행할 수 있기때문.
그리고 프로그램 어디에서든!

사실, 우리는 새로운 함수를 한번만 실행할 수도 있음. 원한다면.

기존의 코드(실행을 그대로 선언한 코드)와 함수로 선언한 코드가 어떻게 동일한지 확인.

다시 말해, 만약 우리가 어떤 코드 조각을 가진다면, 그것을 함수로 감싸고, 그 함수를 정확히 한번만 호출하면, 우리는 코드의 동작을 변경하지 않게 됨.
