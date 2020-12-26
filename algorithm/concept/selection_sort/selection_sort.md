# 선택 정렬

- 선택 정렬:  
   가장 작은 것을 가장 앞으로 보내며 완성

- 계산 복잡도: O(n^2)  
   아래 풀이에서 반복문 안에서 비교하는 안쪽 반복문의 변수 값 j 를 확인해보면 등차수열의 구조를 갖는다.

- 문제: list 안에 있는 자료를 순서대로 배열
- 입력: 정렬할 list
- 출력: 순서대로 정렬된 list
- 풀이 흐름1

  - list 를 입력받는다.
  - 자료를 정렬해 담을 그릇 result 를 만든다.
  - 입력된 list 에 자료가 있는 동안 반복할 반복문을 작성한다.
  - 최솟값의 위치를 찾을 함수를 작성한다.
  - 위 함수를 통해 찾아낸 위치를 통해 입력된 list 에서 해당 위치의 자료를 pop 한다. (a.pop(min_idx))
  - 해당 값을 result 에 append 한다. (result.append(a.pop(min_idx)))
  - result 를 반환한다.

- 풀이 흐름2

  - array 를 받는다.
  - array 의 최솟값을 찾아 맨 앞으로 정렬한다.
  - 그를 위해 array 의 맨 앞의 값과 나머지 값을 비교하는 반복문을 만든다.
  - 첫번째 값부터 마지막 이전 값까지를 갖는 바깥 반복문과,  
    첫번째 값 이후의 값부터 마지막 값까지를 갖는 안쪽 반복문을 만들어 비교한다.
  - 바깥 반복문이 한번 실행될 때마다 찾는 값을 해당 인덱스 값과 swap 한다.

- 사용 기능:

  - rust 전달 값: 기존에 풀 때 vec 을 썼었고, 굉장히 복잡하다고 느꼈었는데 그냥 array 의 형태로 쓰면 간단히 처리할 수 있었다.

  - swap:

    - python: a, b = b, a
    - js: [a, b] = [b, a]
    - rust: array.swap(idx, idx)

  - 배열을 잘라야 할 경우(백준 알고리즘 정렬 문제 2750):

    - js:
      - shift: 맨 앞의 값을 잘라내고, 해당 값을 리턴한다.  
         array.shift()
      - slice: 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환. 원본 배열은 바뀌지 않는다.

  - python

```python
def find_min_idx(a):
  n = len(a)
  min_idx = 0
  for i in range(0, n):
    if a[min_idx] > a[i]:
      min_idx = i
  return min_idx

def sel_sort(a):
  result = []
  while a:
    min_idx = find_min_idx(a)
    value = a.pop(min_idx)
    result.append(value)
  return result
```

```python
def selection_sort(a) {
  n = len(a)
  for i in range(0, n-1):
    min_idx = 1
    for j in range(i+1, n):
      if a[j] < a[min_idx]:
        min_idx = j
    a[i], a[min_idx] = a[min_idx], a[i]
}

```

- ts

```ts
function selection_sort(a: number[]) {
  let n = a.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;

    for (let j = i + 1; j < n; j++) {
      if (a[j] < a[min_idx]) {
        min_idx = j;
      }
    }

    [a[i], a[min_idx]] = [a[min_idx], a[i]];
  }
}

let d = [2, 4, 5, 1, 3];
selection_sort(d);
```

```rust
pub fn run() {
    let mut d = [2, 4, 5, 1, 3];
    selection_sort(&mut d);
    println!("{:?}", d);
}

fn selection_sort(a: &mut [i64]) {
    let n = a.len();

    for i in 0..(n - 1) {
        let mut min_idx = i;

        for j in (i + 1)..n {
            if a[min_idx] > a[j] {
                min_idx = j
            }
        }
        // swap
        // let temp = a[min_idx];
        // a[min_idx] = a[i];
        // a[i] = temp;
        a.swap(min_idx, i)
    }
}

```
