function reduceComponent() {
  const arr = [1, 2, 3, 4, 5];

  /**
   * previousValue: 이전 콜백의 반환값
   * currentValue: 배열 요소의 값
   * currentIndex: 인덱스
   * array: 메소드를 호출한 배열, 즉 this
   */

  // 합산
  const sum = arr.reduce((previousValue, currentValue, currentIndex, self) => {
    // console.log(
    //   previousValue + "+" + currentValue + "=" + (previousValue + currentValue)
    // );
    return previousValue + currentValue;
  });

  //   console.log("sum: ", sum);

  const max = arr.reduce((prev, curr) => {
    return prev > curr ? prev : curr;
  });

  //   console.log(max);

  // 초기값 전달
  const sumWithInitialValue = [1, 2, 3, 4, 5].reduce((prev, curr) => {
    // console.log(`sumWithInitialValue: ${prev} + ${curr} = ${prev + curr}`);
    return prev + curr;
  }, 5);

  //   console.log("sumWithInitialValue: ", sumWithInitialValue);

  const products = [
    { id: 1, price: 100 },
    { id: 2, price: 200 },
    { id: 3, price: 300 },
  ];

  const priceSum = products.reduce((prev, curr) => {
    // console.log(prev.price, curr.price);
    return prev + curr.price;
  }, 0);

  //   console.log(priceSum);
  const sumWithEmptyArray = [].reduce((prev, curr) => {
    console.log(prev, curr);
    return prev + curr;
  }, 0);

  console.log(sumWithEmptyArray);
}

function someComponent() {
  let res = [2, 5, 8, 1, 4].some(function (item) {
    return item > 10;
  });
  console.log("res: ", res);

  res = [12, 5, 8, 1, 4].some(function (item) {
    return item > 10;
  });
  console.log("res: ", res);

  res = ["apple", "banana", "mango"].some(function (item) {
    return item === "banana";
  });
  console.log("res: ", res);
}

function everyComponent() {
  let res = [21, 15, 89, 1, 44].every(function (item) {
    return item > 10;
  });
  console.log(res);

  res = [21, 15, 89, 100, 44].every(function (item) {
    return item > 10;
  });
  console.log(res);
}

function myFindComponent() {
  const users = [
    { id: 1, name: "Lee" },
    { id: 2, name: "Kim" },
    { id: 2, name: "Choi" },
    { id: 3, name: "Park" },
  ];

  Array.prototype.myFind = function (predicate) {
    if (!predicate || {}.toString.call(predicate) !== "[object Function]") {
      throw new TypeError(predicate + " is not a function.");
    }

    for (let i = 0, len = this.length; i < len; i++) {
      if (predicate(this[i], i, this)) return this[i];
    }
  };

  const result = users.myFind(function (item, index, array) {
    console.log(
      //   `[${index}]: ${JSON.stringify(item)} of [${JSON.stringify(array)}]`
      item.id === 2,
      item.name
    );
    return item.id === 2;
  });

  console.log(result);
}

function findIndexComponent() {
  const users = [
    { id: 1, name: "Lee" },
    { id: 2, name: "Kim" },
    { id: 2, name: "Choi" },
    { id: 3, name: "Park" },
  ];

  function predicate(key, value) {
    return function (item) {
      return item[key] === value;
    };
  }

  let index = users.findIndex(predicate("id", 2));
  console.log(index);

  index = users.findIndex(predicate("name", "Park"));
  console.log(index);
}

findIndexComponent();
