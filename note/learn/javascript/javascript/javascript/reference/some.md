Array.prototype.some()

- 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트합니다.
- callback이 어떤 배열 요소라도 대해 참인(truthy) 값을 반환하는 경우 true, 그 외엔 false.

```jsx
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```

- some은 callback이 참(불린으로 변환했을 때 true가 되는 값)을 반환하는 요소를 찾을 때까지 배열에 있는 각 요소에 대해 한 번씩 callback 함수를 실행합니다. 해당하는 요소를 발견한 경우 some은 즉시 true를 반환합니다. 그렇지 않으면, 즉 모든 값에서 거짓을 반환하면 false를 반환합니다. 할당한 값이 있는 배열의 인덱스에서만 callback을 호출합니다. 삭제했거나 값을 할당한 적이 없는 인덱스에서는 호출하지 않습니다.

- 배열의 요소 테스트

  - 다음 예제는 배열 내 요소 중 하나라도 10보다 큰지 판별합니다.

  ```jsx
  function isBiggerThan10(element, index, array) {
    return element > 10;
  }
  [2, 5, 8, 1, 4].some(isBiggerThan10); // false
  [12, 5, 8, 1, 4].some(isBiggerThan10); // true
  ```

  - 화살표 함수를 사용한 배열의 요소 테스트

    - 화살표 함수는 같은 테스트에 대해 더 짧은 구문을 제공합니다.

    ```jsx
    [2, 5, 8, 1, 4].some((elem) => elem > 10); // false
    [12, 5, 8, 1, 4].some((elem) => elem > 10); // true
    ```
