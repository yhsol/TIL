# 삽입 정렬

- 삽입 정렬:  
   리스트에서 값을 하나씩 빼서 맞는 위치에 삽입

- 계산 복잡도: O(n^2)

  - 그렇지만 배열의 거의 정렬 되어있는 경우, 굉장히 빠르게 연산을 완료한다.
  - 위와 같은 특정한 경우 굉장히 효율이 좋은 알고리즘.

- 문제: list 안에 있는 자료를 순서대로 배열
- 입력: 정렬할 list
- 출력: 순서대로 정렬된 list

- 풀이 흐름:

  - 값을 왼쪽의 배열(로직 상 이미 정렬이 완료된 상태)의 값들과 비교하며,  
    들어갈 위치를 탐색하여 맞는 위치가 있다면 해당 위치로 이동시켜 배열을 완성한다.
  - 배열을 반복하여 위치를 찾는다.
  - 탐색의 범위를 줄여가며 반복하기 위해 바깥 반복문의 변수 i 를 변수 j 에 담는다. (i 부터 출발하여 그 안에서 범위를 줄여가며 탐색하기 위함.)
  - j 번째 위치의 값이 j+1 번째 위치의 값보다 큰 동안 두 위치의 자리를 바꾼다.
  - j 의 값을 하나씩 줄여가며 탐색한다.
  - 포인트는 while 반복 안에서 인덱스를 줄여가면서 비교하고, 위치를 찾는 것!

- 사용 기능:

* python

```python
def insertion_sort(a):
    for i in range(0, len(a)):
        j = i
        while j > 0 and a[j - 1] > a[j]:
            a[j - 1], a[j] = a[j], a[j - 1]
            j -= 1


def insertion_sort_2(a):
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j+1] = a[j]
            j -= 1
            a[j+1] = key


d = [2, 4, 5, 1, 3]
insertion_sort_2(d)
print(d)


```

- ts

```ts
function insertion_sort(a: number[]) {
  for (let i = 0; i < a.length; i++) {
    let j = i;
    while (a[j - 1] > a[j]) {
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      j--;
    }
  }
}

function insertion_sort_2(a: number[]) {
  for (let i = 0; i < a.length; i++) {
    let key = a[i];
    let j = i;
    while (j >= 0 && a[j - 1] > key) {
      a[j] = a[j - 1];
      j--;
      a[j] = key;
    }
  }
}

let d = [2, 4, 5, 1, 3];
insertion_sort_2(d);
console.log(d);
```

- rust

```rust
pub fn run() {
    let mut d = [2, 4, 5, 1, 3];
    insertion_sort_2(&mut d);
    println!("{:?}", d);
}

fn insertion_sort(a: &mut [i64]) {
    for i in 0..a.len() {
        let mut j = i;
        while j > 0 && a[j - 1] > a[j] {
            println!("{}", j);
            a.swap(j - 1, j);
            j -= 1;
        }
    }
}

fn insertion_sort_2(a: &mut [i64]) {
    for i in 1..a.len() {
        let key = a[i];
        let mut j = i;
        // j-1 값이 0 보다는 커야 하므로 j > 0 이 성립한다.
        // 해당 조건을 걸지 않으면 무한 루프에 빠진다.
        // 아직 확실히 이해는 안됨.
        while j > 0 && a[j - 1] > key {
            println!("{}", j);
            a[j] = a[j - 1];
            j -= 1;
            a[j] = key
        }
    }
}


```

- 참고:

  - https://medium.com/@spyr1014/sorting-in-rust-selection-insertion-and-counting-sort-2c4d3575e364
  - 아주 직관적이지는 않은데 근데 또 보다보면 오히려 이해가 쉽기도 하다.

  ```
    fn insertion_sort<T: Ord>(list: &mut [T]) {
    for i in 1..list.len() {
      for j in (1..i + 1).rev() {
        if list[j - 1] <= list[j] { break; }
        list.swap(j - 1, j)
      }
    }
    }
  ```
