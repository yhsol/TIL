# 퀵 정렬

- 퀵 정렬:  
   리스트를 기준값을 바탕으로 분할하여 정렬

  - 기준값을 기준으로 분할 한 뒤에
  - 기준값보다 왼쪽의 리스트 중에 기준값보다 큰 값을 만나기 전까지 +1 을 하며 탐색 진행
  - 기준값보다 오른쪽의 리스트 중에 기준값보다 작은 값을 만나기 전까지 -1 을하며 탐색 진행
  - 왼쪽 탐색 중 기준값보다 큰 값을 만나면 hold.
  - 오른쪽 탐색 중 기준값보다 작은 값을 만나면 hold.
  - 이때 왼쪽의 인덱스가 오른쪽의 인덱스보다 크지 않다면 (엇갈리지 않았다면)
  - 두 값을 서로 swap.
  - 엇갈렸다면 기준값과 작은값을 swap.
  - 그렇게 기준값과의 swap 이 발생하면 이때 기준값과 swap 된 작은 값의 위치가 새로운 기준값이 되어 범위가 다시 설정되며,
  - 그 범위를 다시 분할 정렬.
  - 이런식으로 뭔가 이해가 되는 듯 하기는 한데
  - 아주 정확히 작동하는 원리가 지금은 와닿지가 않는다.
  - 틈틈이 다시 확인해보면서 봐야할 듯. (https://ko.wikipedia.org/wiki/%ED%80%B5_%EC%A0%95%EB%A0%AC)

- 계산 복잡도: O(n log n) or O(n^2)

  - 상수에 가까운 효율
  - 하지만 이미 정렬이 되어 있는 경우 O(n^2) 가 되는데,
    정렬이 되어 있다면 분할 할 곳을 찾을 수 없어 분할 정렬의 장점을 쓸 수 없다.

    - 이러한 경우에 대한 개선방법

      - (퀵 정렬) [https://ko.wikipedia.org/wiki/%ED%80%B5_%EC%A0%95%EB%A0%AC] 중 개선된 피벗 선택
      - (퀵 정렬(Quick Sort)과 최악의 경우(O(N^2))를 방지하기 위한 방법들) [https://m.blog.naver.com/PostView.nhn?blogId=ljy9378&logNo=221508655059&proxyReferer=https:%2F%2Fwww.google.com%2F]

      - 배열의 랜덤화
        - 정렬이 되어있을때가 문제이므로 배열의 정렬을 랜덤화해서 다시 퀵정렬의 장점을 사용할 수 있도록 함.
      - 랜덤 pivot 선택
        - 정렬이 (거의) 이루어진 상태에서 가장 작은 수 또는 가장 큰 수를 pivot 으로 뽑았을 때 전체 배열을 계속해서 탐색해야 하는것이 문제이므로,  
          pivot 자체를 랜덤화해서 가장 작은 수 또는 가장 큰 수를 피해서 뽑을 수 있도록 함.
      - median of three pivot
        - 배열에서 3가지 원소를 두고 그 중간값을 pivot 값으로 사용한다. 위의 이유와 비슷하다고 이해된다.

- 문제: list 안에 있는 자료를 순서대로 배열
- 입력: 정렬할 list
- 출력: 순서대로 정렬된 list

- 풀이 흐름:

  - 기준점을 바탕으로 분할하고, 분할 된 리스트를 다시 분할 정렬하는 구조.
  - 재귀를 사용하게 된다.
  - 그러므로 종료조건을 작성한다.
  - 기준값, 오른쪽으로 탐색해 갈 변수(start), 왼쪽으로 탐색해 갈 변수(end)를 정의한다.
  - start 와 end 가 엇갈리기 전까지 반복하는 반복문을 만든다.
    - start 탐색에서 찾은 기준값보다 큰 값과, end 탐색에서 찾은 기준값보다 작은 값의 위치를 바꾼다.
  - start 와 end 가 엇갈릴 경우, 해당 값(엇갈리는 위치)과 기준값의 위치를 바꾼다.
  - start 와 end 를 바탕으로 하는 재귀 함수 두개를 호출한다.

- 보다보니 알 것 같기도 하기는 한데 어렵다. 일단 재귀라는 개념은 늘 쓸때마다 아리송한 기분이 든다. 그래서 쉽게 재귀라는 카드를 쓰지 못하는데  
  이에대한 개념을 한번 정리해야 할 필요가 있을 것 같기도 하다.

- 사용 기능:

* python

```python
def quick_sort_py(a, left, right):
    if (left >= right):
        return

    key = left
    i = left + 1
    j = right

    while (i <= j):
        while (i <= right and a[i] < a[key]):
            i += 1
        while (j > left and a[j] >= a[key]):
            j -= 1
        if (i > j):
            a[j], a[key] = a[key], a[j]
        else:
            a[i], a[j] = a[j], a[i]

    quick_sort_py(a, left, j - 1)
    quick_sort_py(a, j + 1, right)


d = [2, 9, 6, 4, 5, 7, 10, 1, 3, 8]
quick_sort_py(d, 0, len(d) - 1)
print(d)


```

- ts

```ts
function quick_sort(a: number[], start: number, end: number) {
  // 종료 조건
  if (start >= end) {
    return;
  }

  let key = start;
  let i = start + 1;
  let j = end;
  let temp;

  while (i <= j) {
    while (i <= end && a[i] <= a[key]) {
      i++;
    }
    while (j > start && a[j] >= a[key]) {
      j--;
    }
    if (i > j) {
      [a[j], a[key]] = [a[key], a[j]];
    } else {
      [a[i], a[j]] = [a[j], a[i]];
    }
  }
  console.log("a: ", a);
  console.log("start: ", start);
  console.log("i: ", i);
  console.log("j: ", j);
  quick_sort(a, start, j - 1);
  quick_sort(a, j + 1, end);
}

let d = [2, 9, 6, 4, 5, 7, 10, 1, 3, 8];
quick_sort(d, 0, d.length - 1);
console.log(d);
```

- ts 다른 풀이

```ts
let partion = function (
  a: number[],
  left: number,
  right: number,
  pivotIdx: number
) {
  let temp;
  let pivot = a[pivotIdx];
  // 왼쪽의 인덱스가 오른쪽 인덱스보다 크지는 않을 때까지.
  // 즉, 엇갈리기 전까지 반복.
  while (left <= right) {
    // 왼쪽값이 pivot 값보다 작은 동안에는 +1 씩 움직이며 다음값을 탐색.
    while (a[left] < pivot) {
      left++;
    }
    // 오른쪽값이 pivot 값보다 큰 동안에는 -1 씩 움직이며 다음값을 탐색.
    while (a[right] > pivot) {
      right--;
    }
    // 위의 두 while 문을 지나서 (두 while 문에 해당하지 않을 때)
    // left, right 가 엇갈리지 않았다면 두 값을 swap.
    if (left <= right) {
      temp = a[left];
      a[left] = a[right];
      a[right] = temp;
      left++;
      right--;
    }
  }
  // 위으 반복문을 다 통과했다는 것은 left, right 가 엇갈렸다는 것.
  // 이 때는 엇갈린 위치와 pivot 값을 swap.
  temp = a[left];
  a[left] = a[pivotIdx];
  a[pivotIdx] = temp;
  return left;
};

let quickSort = function (a: number[], left?: number, right?: number) {
  if (!left) left = 0;
  if (!right) right = a.length - 1;
  let pivotIdx = right;
  pivotIdx = partion(a, left, right - 1, pivotIdx);
  if (left < pivotIdx - 1) {
    // pivotIdx 보다 왼쪽값을 계속해서 quickSort
    quickSort(a, left, pivotIdx - 1);
  }
  if (pivotIdx + 1 < right) {
    // pivotIdx 보다 오른쪽값을 계속해서 quickSort
    quickSort(a, pivotIdx + 1, right);
  }
  // 양쪽을 계속해서 정렬하다가 pivotIdx 의 위치까지 도달했을 때, 정렬 완료.
  return a;
};

let d = [2, 4, 6, 8, 9, 7, 3, 5, 1, 10];
quickSort(d);
console.log(d);
```

- rust

```rust

pub fn run() {
    let mut d = [2, 4, 5, 8, 9, 1, 7, 10, 6, 3];
    let n = d.len() - 1;
    quick_sort_rs(&mut d, 0, n);
    println!("{:?}", d);
}

// 이때 함수의 return 값을 명시하지 않는데, 이렇게해도 rust 에서 해당 값을 파악하는데, 이럴 때 명시하려면 어떻게 하는지 확인해봐도 하겠다.
fn quick_sort_rs(a: &mut [i64], start: usize, end: usize) {
    if start >= end {
        return;
    }

    let key = start;
    let mut i = start + 1;
    let mut j = end;

    while i <= j {
        while a[i] < a[key] && i <= end {
            i += 1;
        }
        while a[key] <= a[j] && j > start {
            j -= 1;
        }
        println!("values of i: {}, j: {}, key: {}", a[i], a[j], a[key]);
        if i > j {
            println!("it change key!");
            a.swap(key, j)
        } else {
            println!("it change index!");
            a.swap(i, j)
        }
        println!("{:?}", a);
    }

    quick_sort_rs(a, start, j - 1);
    quick_sort_rs(a, j + 1, end);
}


```
