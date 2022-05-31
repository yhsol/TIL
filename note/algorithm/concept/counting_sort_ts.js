let countingSrot = function (arr, k) {
  let count = [], result = [];

  for (let i = 0; i <= k; i++) { // 크기만큼의 배열을 만든다.
    count[i] = 0;
  }

  for (let j = 0; j < arr.length; j++) { // 숫자의 개수를 세어 저장한다.
    count[arr[j]] += 1;
  }

  for (let i = 0; i < k; i++) { // 누적합을 구한다.
    count[i + 1] += count[i];
  }

  for (let j = 0; j < arr.length; j++) { // 누적합이 가리키는 인덱스를 바탕으로 결과에 숫자를 넣는다.
    console.log(arr[j], count[arr[j]] - 1);
    result[count[arr[j]] - 1] = arr[j];
    count[arr[j]] -= 1;
  }

  return result;
};

countingSrot([2, 2, 1], 2);
console.log("countingSort: ", countingSrot([2, 2, 1], 2));
