# 순차 탐색

- 단순하지만 그만큼 확실한 알고리즘이라고 생각한다.
- 하나씩 비교를 해서, 원하는 값을 처리한다는 것. 
가장 효율이 높다고 할 수는 없지만 기반이 되는 지식이라고 생각한다.
- python

```python
def sequential_search(n, a):
  for i in a:
    if n == a[i]:
      return i

  return -1
```

- 해당 하는 여러 값, 중복값을 활용하려는 경우 다음과 같이 list 등의 구조를 활용할 수 있다.

```python
def sequential_search_all(a, n):
  array = []
  list_n = len(n)
  for i in range(0, list_n):
    if a == n[i]:
      array.append(i)
  return array
```

- rust 는 아직 다 완성하지 못했다.
- 해당하지 않을 경우 -1 을 리턴하는데 이 값은 usize 로 표현이 안된다.
isize 로 정의하려니 해당 하는 값이 있을 때의 값은 usize 이기 때문에 에러가 난다.
그래서 지금은 해당 값을 format! 구조로 변환하여 리턴하는 방식을 사용했다.

```rust
fn sequential_search(a: i32, list: Vec<i32>) -> std::string::String {
  let n = list.len();
  for i in 0..n {
    if a == list[i] {
      return format!("{}", i)
    };
  };
  return format!("{}", "-1")
}
```