# ES6에서의 순회와 이터러블:이터레이터 프로토콜

## 기존과 달라진 ES6에서의 리스트 순회

- for i++
- for of

- 이전

```js
const list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
  console.log(list[i]);
}

// 유사배열
const str = "abc";
for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
}
```

- ES6

```js
const list = [1, 2, 3];
for (const a of list) {
  console.log(a);
}

const str = "abc";
for (const a of str) {
  console.log(a);
}
```

- 어떻게 순회하는지 명령적으로 기술(ES5) 하기 보다는 보다 선언적으로(ES6) 순회할 수 있음
- 이것은 '보다 간결해졌다' 는 것 이상의 의미가 있는데, 그것은 다음 수업에서...

## Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜

- Array, Set, Map 모두 for..of 문으로 순회 가능

```js
// Array
const arr = [1, 2, 3];
for (const a of arr) console.log(a);
//=> 1
//=> 2
//=> 3

// Set
const set = new Set([1, 2, 3]);
for (const a of set) console.log(a);
//=> 1
//=> 2
//=> 3

// Map
const map = new Map(["a", 1], ["b", 2], ["c", 3]);
for (const a of map) console.log(a);
//=> ['a', 1]
//=> ['b', 2]
//=> ['c', 3]
```

- for..of 문이 ES5 와 같이 index 를 기반으로 순회하는 기능을 감춰둔 것일까? 그렇진 않음.

  - Array 는 arr[0] 과 같이 순회할 수 있지만 Set 은 set[0] 과 같이 순회할 수 없음. Map 도 Set 과 같이 순회 안됨.
  - 즉 for..of 문이 index 를 키값으로 하여 조회하며 순회하는 것이 아님을 보여줌

- for..of 문은 어떻게 추상화 되어있는지, 어떤 규약을 통해서 동작하는지?
  - Symbol.iterator
    - Symbol 은 ES6 에서 추가됨.
      - 어떤 객체의 키로 사용될 수 있음
      - `console.log(arr[Symbol.iterator]);` => `values() { [native code] }`
      - `arr[Symbol.iterator] = null;` 과 같이 `null`로 비워버리면 for..of 문은 작동하지 않음. ('Uncaught TypeError: arr is not iterable at ...')
      - for..of 문과 Symbol.interator 에 담겨있는 함수가 연관이 있을 수 있다는 생각을 할 수 있음.
      - Set 과 Map 도 같음

### 이터러블/이터레이터 프로토콜

- Array, Set, Map 은 자바스크립트 내장객체로서 이터러블/이터레이터 프로토콜을 따르고 있음
- **이터러블**: 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
  - 그래서 위에서 `arr[Symbol.iterator] = null;` 과 같이 지웠을 때 "arr is not iterable ..." 이라는 에러가 나는 것.
- **이터레이터**: { value, done } 객체를 리턴하는 next() 를 가진 값. next 를 호출하면 { vlaue, done } 객체를 리턴함.

  ```js
  let iterator = arr[Symbol.iterator]();
  iterator.next();
  //=> {value: 1, done: false}
  iterator.next();
  //=> {value: 2, done: false}
  iterator.next();
  //=> {value: 3, done: false}
  iterator.next();
  //=> {value: undefined, done: true}
  ```

  - **이터러블/이터레이터 프로토콜**: 이터러블을 for..of, 전개 연산자 등과 함께 동작하도록한 규약

  - Array(Set 과 Map 도 마찬가지) 가 이터러블이고, Array 는 Symbol.iterator 를 통해서 이터레이터를 리턴하기 때문에 for..of 문과 함께 잘 동작하는 이터러블 객체고, 그렇게 해서 for..of 로 순회할 수 있기 때문에 이터러블/이터레이터 프로토콜을 따른다고 할 수 있음.

  ```js
  const arr = [1, 2, 3];
  let iter1 = arr[Symbol.iterator];
  iter1.next();
  iter1.next();
  for (const a of iter1) console.log(a);
  //=> 3
  // 앞선 next 호출들로 인해 현재 iter1 의 next() 의 리턴값은 {value: 3, done: false}. value 인 3을 출력. 다음 next() 는 {value: undefined, done: true} 를 리턴. done 이 true 이면 for..of 문을 빠져나옴.
  ```

  - Map 같은 경우에 `keys()` 라는 메서드를 가지고 있음

    - `values()`, `entries()` 도 있음.
      - `values()` 는 value 만 뽑아줌
      - `entries()` 는 key 와 value 를 뽑아줌

    ```js
    map.keys();
    //=> MapIterator {"a", "b", "c"}

    var a = map.keys();

    a.next();
    //=> {value: "a", done: false}
    a.next();
    //=> {value: "b", done: false}
    a.next();
    //=> {value: "c", done: false}
    ```

    - 그렇다는 것은 `map.keys()` 를 이용해서 순회할 수도 있음을 의미

      ```js
      for (const a of map.keys()) console.log(a);
      //=> "a"
      //=> "b"
      //=> "c"
      ```
