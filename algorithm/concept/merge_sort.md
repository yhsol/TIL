# 병합 정렬

- 병합 정렬:  
   리스트를 반씩나누며 작은 수(조각)부터 큰 수(조각)으로 정렬하고 합하는 방법  
   divide and conquer

  - 리스트를 가장 작은 단위까지 반씩 나눈다.
  - 나눠진 조각들을 정렬
  - 정렬된 조각을 다시 2의 배수의 크기만큼씩 다시 정렬하며 합친다.

  - 리스트를 계속해서 반으로 나누고, 합치기 때문에 재귀의 구조를 사용한다.

  - 나누고, 정렬하여 합칠 때 하나의 배열(결과배열)에 순서대로 삽입한다.
  - 이때 각 과정에서 배열을 공유할 수 있도록 전역변수로 선언한다.

  - a = [1, 2], b =[3, 4]
    와 같이 있을 때, 각 조각의 앞자리 즉 index 0의 값(가장 앞의 값)을 비교한다.
    그 중 작은 값을 결과배열에 삽입하고, 옮겨진 배열(위의 경우 a)의 index 를 다음 자리로 옮기고(+1), 결과배열의 index 도 다음배열로 옮긴다(+1).

* 계산 복잡도: O(n log n)

  - 나눠진 조각들을 정렬할 때는 각 조각들이 정렬되어있다는 전제를 할 수 있으므로 N 으로 계산.
  - 정렬할 크기가 증가하는 폭은 log N.
  - 따라서 계산 복잡도는 O(n log n).
  - O(n log n) 을 보장함.

- 문제: list 안에 있는 자료를 순서대로 배열
- 입력: 정렬할 list
- 출력: 순서대로 정렬된 list

* learn:
  - rust
    - array[..index]: 배열의 슬라이스. python 의 array[:index] 와 비슷하다.
    - array 에 값 추가 또는 삭제: 안된다. 값의 추가 또는 삭제를 하려면 vec 의 형태로 바꿔줘야한다.
    - copy_from_slice:

```rust
let src = [1, 2, 3, 4];
let mut dst = [0, 0];

// Because the slices have to be the same length,
// we slice the source slice from four elements
// to two. It will panic if we don't do this.
dst.copy_from_slice(&src[2..]);

assert_eq!(src, [1, 2, 3, 4]);
assert_eq!(dst, [3, 4]);
```

    배열을 복사해서 담는다.
    간편하지만 주의해야할 사항들이 있음. [copy_from_slice](https://doc.rust-lang.org/std/primitive.slice.html#method.copy_from_slice)

- python1

```python

def merge_sort(a):
    n = len(a)
    # 종료 조건
    # 배열의 크기가 1 이하이면 정렬할 필요가 없음
    if n <= 1:
        return a

    # 반으로 나눈 몫을 사용
    mid = n // 2
    # mid 값을 기준으로 두 조각으로 자료를 복사해 리스트를 만듬
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    result = []

    # 양쪽 조각의 모두 값이 있는 동안 비교 진행
    while left and right:
        if left[0] < right[0]:
            result.append(left.pop(0))
        else:
            result.append(right.pop(0))

    # 한쪽의 정렬이 완료된 경우 다른 조각의 나머지 값을 그대로 배열에 삽입
    while left:
        result.append(left.pop(0))
    while right:
        result.append(right.pop(0))

    return result


d = [2, 4, 5, 1, 3]
print(merge_sort(d))



```

- python2

```python
def merge_sort_2(a):
    n = len(a)
    if n <= 1:
        return

    mid = n // 2
    left = a[:mid]
    right = a[mid:]
    merge_sort_2(left)
    merge_sort_2(right)
    i_left = 0
    i_right = 0
    i_a = 0

    # 각 조각에 값이 남아있는 동안
    while i_left < len(left) and i_right < len(right):
        # 각 조각의 앞자리 값을 비교해 작은 값을 결과 배열에 삽입
        # 이동이 있었던 조각의 index 를 다음 자리로 옮기고,
        # 결과 배열의 index 도 다음 자리로 옮긴다.

        if left[i_left] < right[i_right]:
            a[i_a] = left[i_left]
            i_left += 1
        else:
            a[i_a] = right[i_right]
            i_right += 1

        i_a += 1

    while i_left < len(left):
        a[i_a] = left[i_left]
        i_left += 1
        i_a += 1
    while i_right < len(right):
        a[i_a] = right[i_right]
        i_right += 1
        i_a += 1


d = [2, 4, 5, 1, 3]
merge_sort_2(d)
print(d)


```

- ts1

```ts
const sorted: number[] = [];

const merge = function (a: number[], m: number, middle: number, n: number) {
  let i = m;
  let j = middle + 1;
  let k = m;

  // 각 조각의 처음부터 중간까지, 중간에서 끝까지의 범위를 탐색
  // 작은 순서대로 배열에 삽입
  // 인덱스 i 를 갖는 조각과 j 를 갖는 조각을 비교
  // i 를 갖는쪽이 작다면 배열에 i 를 인덱스로 갖는 값을 삽입
  // 그리고 인덱스 i 는 그 다음값을 나타내기 위해 +1
  // 반대의 경우 j 에 마찬가지로 수행
  // 수행이 끝나면 k 위치 자리 역시 +1

  // 범위내에서 작업이 끝난뒤에 남아있는 원소들을 배열에 삽입
  // i 는 middle 까지 남아있는 값 삽입
  // j 는 n 까지 남아있는 값 삽입

  // 정렬된 배열을 실제 배열에 반영
  while (i <= middle && j <= n) {
    if (a[i] <= a[j]) {
      sorted[k] = a[i];
      i++;
    } else {
      sorted[k] = a[j];
      j++;
    }
    k++;
  }

  // i 가 middle 보다 크다는 것은 i 의 정렬이 끝났음을 의미.
  if (i > middle) {
    for (let t = j; t <= n; t++) {
      sorted[k] = a[t];
      k++;
    }
  } else {
    for (let t = i; t <= middle; t++) {
      sorted[k] = a[t];
      k++;
    }
  }

  for (let t = m; t <= n; t++) {
    a[t] = sorted[t];
  }
};

const merge_sort = function (a: number[], m: number, n: number) {
  // 배열의 크기가 1 이상일 때
  if (m < n) {
    // 반으로 나누고,
    let middle = Math.floor((m + n) / 2);
    merge_sort(a, m, middle);
    merge_sort(a, middle + 1, n);
    // 합친다.
    merge(a, m, middle, n);
  }
};

let d = [2, 4, 5, 1, 3, 6, 7, 8];
merge_sort(d, 0, d.length - 1);
console.log(d);
for (let i = 0; i < d.length; i++) {
  console.log(d[i]);
}
```

- ts2

```ts
const merge = function (left: number[], right: number[]) {
  let result: number[] = [];
  while (left.length && right.length) {
    // 각 조각의 맨 앞 값을 비교해 작은 값을 배열에 삽입
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  // 한쪽 조각이 다 정렬된 뒤에 남아있는 다른 조각의 값들을 배열에 삽입
  // 각 조각은 각각 정렬이 완료된 상태이므로 그대로 담는다.
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
};

const merge_sort = function (a: number[]): any {
  if (a.length < 2) return a;
  let middle = Math.floor(a.length / 2);
  let left = a.slice(0, middle);
  let right = a.slice(middle, a.length);
  return merge(merge_sort(left), merge_sort(right));
};

let d = [2, 4, 5, 1, 3, 6, 7, 8];
console.log(merge_sort(d));
```

- rust

```rust
pub fn run() {
    let mut d = [2, 4, 5, 1, 3];
    merge_sort(&mut d);
    println!("{:?}", d);
}

fn merge_sort(a: &mut [i32]) {
    // 배열의 길이
    let n = a.len();
    // 배열의 길이가 1보다 작다면 그대로 return
    if n <= 1 {
        return;
    };

    // 중간값: 배열을 반으로 나눈 값
    let mid = n / 2; // 여기서 floor 와 같은 동작이 필요함
                     // let left = &mut a[..mid];
                     // let right = &mut a[mid..];
                     // 배열의 처음부터 중간값까지, 중간값부터 끝까지의 slice 를 재귀 호출
    merge_sort(&mut a[..mid]);
    merge_sort(&mut a[mid..]);

    // 결괏값 배열은 추가가 가능하도록 vec 로 변환
    let mut results = a.to_vec();

    // 두 조각, 즉 왼쪽의 조각과 오른쪽의 조각, 둘을 합해서 담을 결괏값 배열
    merge(&a[..mid], &a[mid..], &mut results[..]);

    // a 즉 기존 배열에 결괏값 배열을 복사해서 담는다.
    a.copy_from_slice(&results);
}

fn merge(left: &[i32], right: &[i32], results: &mut [i32]) {
    // 각 배열의 맨 앞.
    let mut i_left = 0;
    let mut i_right = 0;
    let mut i_a = 0;

    // 즉 두 조각에 값이 존재할 때.
    while i_left < left.len() && i_right < right.len() {
        // 왼쪽의 현재 index 값이 더 작다면 왼쪽값을 결괏값의 현재 index 에 담고,
        // 왼쪽 배열과 결괏값 배열의 index 를 한칸 옮긴다.
        if left[i_left] < right[i_right] {
            results[i_a] = left[i_left];
            i_a += 1;
            i_left += 1;
        // 오른쪽의 현재 index 값이 더 작다면 오른쪽값을 결괏값의 현재 index 에 담고,
        // 오른쪽 배열과 결괏값 배열의 index 를 한칸 옮긴다.
        } else {
            results[i_a] = right[i_right];
            i_a += 1;
            i_right += 1;
        };
    }

    // 위의 while 문을 통과했을 때, 즉 둘 중 한쪽의 정렬이 끝났을 때.
    // 양 쪽의 조각은 정렬이 다 된 상태이므로 그대로 결괏값 배열에 담는다.
    // while 을 이용해 하니씩 담아도 되고,
    // if 을 이용해 각 배열의 나머지 부분을 그대로 담아도 된다.
    // 왼쪽의 조각이 남았을 경우.
    // while i_left < left.len() {
    //     results[i_a] = left[i_left];
    //     i_left += 1;
    //     i_a += 1;
    // }
    if i_left < left.len() {
        results[i_a..].copy_from_slice(&left[i_left..]);
    }
    // 오른쪽의 조각이 남았을 경우.
    // while i_right < right.len() {
    //     results[i_a] = right[i_right];
    //     i_right += 1;
    //     i_a += 1;
    // }
    if i_right < right.len() {
        results[i_a..].copy_from_slice(&right[i_right..])
    }
}

```
