# map, filter, reduce

Data

```js
const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];
```

## map

```js
let names = [];
for (const p of products) {
  names.push(p.name);
}
console.log(names);
//=> ['반팔티', '긴팔티', '핸드폰케이스', '후드티', '바지']

let prices = [];
for (const p of products) {
  prices.push(p.price);
}
console.log(prices);
// => [15000, 20000, 15000, 30000, 25000]
```

위와 같은 경우에 map 함수를 사용할 수 있음.

map 함수 생성

- map 함수는 인자를 받고, 리턴함. 다른 곳에 영향을 주는 일을 직접적으로 하지 않음
- 이터러블/이터레이터 프로토콜을 따르는 iter 를 받음
- 원하는 조건 영역을 추상화함.

  - 함수 사용 (f)
    - 아이템 a를 인자로 받아서 원하는 조건에 해당하는 값을 리턴해주면
      - 그 리턴값을 result 배열에 담음.

- 보조함수를 전달하여 구현
- map 함수는 고차함수이기도 함.
  - 함수를 값으로 다루면서 원하는 시점에 안에서 인자를 적용하는 함수

```js
const map = (f, iter) => {
  let result = [];
  for (const a of iter) {
    result.push(f(a));
  }
  return result;
};

let names = map((p) => p.name, products);
//=> ['반팔티', '긴팔티', '핸드폰케이스', '후드티', '바지']
let prices = map((p) => p.price, products);
//=> [15000, 20000, 15000, 30000, 25000]
```

### 이터러블 프로토콜을 따른 map의 다형성1

map 함수는 이터러블 프로토콜을 따르고 있기 때문에 다형성이 굉장히 높음.

```js
document.querySelectorAll("*").map((el) => el.nodeName);
```

- 작동하지 않음

  - document.querySelectorAll(...).map is not a function
  - 그 이유는 document.querySelectorAll 은 array 를 상속받은 객체가 아니기 때문. 즉 prototype 에 map 함수가 구현되어 있지 않음.

- 앞에서 만든 map 함수는 작동함.

```js
map((el) => el.nodeName, document.querySelectorAll("*"));
```

    - 여기서 작동하는 이유는 document.querySelectorAll 이 이터러블 프로토콜을 따르고 있기 때문.

        ```js
        const it = document.querySelectorAll('*')[Symbol.iterator]()
        console.log(it)
        //=> Array Iterator {}
        console.log(it.next())
        //=> {value: html, done: false}
        console.log(it.next())
        //=> {value: script, done: false}
        console.log(it.next())
        //=> {value: script, done: false}
        ```
    - 즉, 위에서 만든 map 함수는 array 뿐 아니라 이터러블 프로토콜을 따르는 많은 함수들을 사용할 수 있는 것.

        ```js
        function *gen() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
        }
        console.log(map(a => a* a, gen()))
        //=> [1, 4, 9, 16]
        ```

    - 자바스크립트 외부, 즉 Web API 나 헬퍼 함수들이 이터러블 프로토콜을 따르고 있기 때문에 이터러블 프로토콜을 따르는 함수를 사용하는 것은 앞으로 많은 함수들과의 조합성이 좋아진다는 이야기이기도 함.
    - 프로토타입 기반, 클래스 기반으로 어떤 뿌리, 어떤 카테고리 안에 있는 값만 어떤 함수를 사용할 수 있는 기법보다 훨씬 더 유용하고 다형성이 높다고 할 수 있음.

### 이터러블 프로토콜을 따른 map의 다형성2

- Map

```js
const m = new Map();
m.set("a", 10);
m.set("b", 20);
const it = m[Symbol.iterator]();
console.log(it.next());
//=> {value: Array(2), done: false}
console.log(it.next());
//=> {value: Array(2), done: false}

console.log(map(([k, v]) => [k, v * v], m));
//=> [Array(2), Array(2)]
//    0: (2) ['a', 100]
//    1: (2) ['b', 400]
console.log(new Map(map(([k, v]) => [k, v * v], m)));
//=> Map(2) {'a' => 100, 'b' => 400}
```

## filter

- 명령형 코드

```js
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}
```

- filter 함수
  - iter 내부의 값에 대한 다형성은 보조함수를 통해 지원을 해줌
  - 외부의 경우에는 이터러블 프로토콜을 따르는 것을 통해서 다형성을 지원해 줄 수 있음.

```js
// 보조함수 활용하여 로직 운영
const filter = (fn, iter) => {
  let result = [];
  for (const a of iter) {
    if (fn(a)) result.push(a);
  }
  return result;
};

console.log(filter((p) => p.price < 20000, products));
console.log(filter((n) => n % 2, [1, 2, 3, 4]));
// 이터러블 프로토콜을 활용
console.log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
);
```

## reduce

- reduce 는 값을 축약하는 함수
- 이터러블 값을 어떤 하나의 다른 값으로 축약해 나가는 함수

```js
const nums = [1, 2, 3, 4, 5];
// 위와 같은 값들을 다 더해서 하나의 값으로 만들려는 경우

// 명령적으로 작성
// 어떤 특정한 값을 계속해서 순회하면서 하나의 값으로 누적해 나갈 때 사용
let total = 0;
for (const n of nums) {
  total = total + n;
}
console.log(total);

// reduce
const reduce = (fn, acc, iter) => {
  for (const a of iter) {
    acc = fn(acc, a);
  }

  // 함수 외부 세상을 변경하지 않고 리턴함.
  return acc;
};

const add = (a, b) => a + b;
console.log(reduce(add, 0, [1, 2, 3, 4, 5]));
//=> 15
// reduce 의 동작을 풀어보면 아래와 같이 동작하게 되는 원리
console.log(add(add(add(add(add(0, 1), 2), 3), 4), 5));

// 자바스크립트의 reduce 동작
// acc 의 기본값을 제공하지 않아도 알아서 기본값을 설정함
console.log(reduce(add, [1, 2, 3, 4, 5])); // 기본값 0 생략
console.log(reduce(add, 1, [2, 3, 4, 5])); // 제공된 배열의 첫번째 값을 꺼내서 기본값으로 사용함

// 구현한 함수 개선
const reduce = (fn, acc, iter) => {
  // 순서대로 읽기 때문에 기본값이 빠지건데 iter 값 없음으로 판단함.
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = fn(acc, a);
  }

  // 함수 외부 세상을 변경하지 않고 리턴함.
  return acc;
};
```

- reduce 는 보조 함수를 통해서 어떻게 축약할지를 완전히 위임함.

  - 그렇게 때문에 배열과 같은 특정 형태가 아니더라도 보조 함수 정의에 따라 특정 값으로 축야해 나갈 수 있음

  - products

  ```js
  const productions = [
    { name: "반팔티", price: 15000 },
    { name: "긴팔티", price: 20000 },
    { name: "핸드폰케이스", price: 15000 },
    { name: "후드티", price: 30000 },
    { name: "바지", price: 25000 },
  ];

  log(
    reduce((total_price, product) => total_price + prodocut.price, 0, products)
  );
  ```

  - 보조함수를 통해 안쪽에 있는 값에 다형성을 지원함
  - 이터러블을 통해서 외부 값에 대한 다형성 지원

```js
import { filter, map, reduce } from "./mapFilterReduce";

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const prices = map((p) => p.price, products);

const filteredPrices = map(
  (p) => p.price,
  filter((p) => p.price < 20000, products)
);

const add = (a, b) => a + b;
const sumOfFilteredPrices = reduce(
  add,
  map(
    (p) => p.price,
    filter((p) => p.price < 20000, products)
  )
);
```

함수형 프로그래밍에서는 함수들을 중첩하고, 함수를 연속적으로 실행하면서 원하는 값으로 나아감.
