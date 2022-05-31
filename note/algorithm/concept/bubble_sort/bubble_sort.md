# 버블 정렬

- 버블 정렬:  
   옆에 있는 값과 비교해서 더 작은 값을 앞으로 보내며 완성
  구현은 쉬우나 효율은 떨어짐
  list 를 반복하며 옆의 값보다 작은 값을 가장 앞으로 보내므로,  
  반복이 끝나면 가장 큰 값이 list 의 가장 마지막 값이 됨.
  그 후에 다시 마지막 값을 제외한 list 를 다시 위와 같은 방식으로 반복함.

- 계산 복잡도: O(n^2)

- 문제: list 안에 있는 자료를 순서대로 배열
- 입력: 정렬할 list
- 출력: 순서대로 정렬된 list
- 풀이 흐름1

* 풀이 흐름2

- 사용 기능:

* python

```python
def bubble_sort(a):
    n = len(a)
    for i in range(0, n):
        for j in range(0, n-1-i):
            print(j)
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
    for i in range(0, len(a)):
        print(a[i])


d = [2, 4, 5, 1, 3]
bubble_sort(d)


```

- ts

```ts
function bubble_sort(a: number[]) {
  for (let i = 0; i < a.length - 1; i++) {
    // 반복이 한번 끝나면 그 다음 반복시에는 마지막 값을 비교할 필요가 없기 때문에 (마지막 값은 정렬이 완료된 값.)
    // 반복의 범위를 반복의 횟수에 따라 줄여주면 된다.
    for (let j = 0; j < a.length - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  for (let i = 0; i < a.length; i++) {
    console.log(a[i]);
  }
}

let d = [2, 4, 5, 1, 3];
bubble_sort(d);
```

```rust
pub fn run() {
    let mut d = [2, 4, 5, 1, 3];
    bubble_sort(&mut d)
}

fn bubble_sort(a: &mut [i64]) {
    for i in 0..(a.len() - 1) {
        for j in 0..(a.len() - 1 - i) {
            if a[j] > a[j + 1] {
                a.swap(j, j + 1);
            }
        }
    }
    for i in 0..a.len() {
        println!("{:?}", a[i]);
    }
}


```
