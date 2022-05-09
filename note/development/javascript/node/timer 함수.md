- timer 함수들은 id 를 반환하고, 그렇기에 timeout, interval, timeout2 에는 해당 id 들이 담기게 된다. 해당 id 를 clear 함수에 넣어서 timer 함수를 취소한다.

```rust
const timeout = setTimeout(() => {
  console.log("1.5초 후 실행");
}, 1500);

const interval = setInterval(() => {
  console.log("1초마다 실행");
}, 1000);

const timeout2 = setTimeout(() => {
  console.log("실행되지 않습니다");
}, 3000);

setTimeout(() => {
  // timer 함수들은 id 를 반환하고, 그렇기에 timeout, interval, timeout2 에는 해당 id 들이 담기게 된다.
  // 해당 id 를 clear 함수에 넣어서 timer 함수를 취소한다.
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);
```
