const PRODUCTS = [
  { name: "반팔티", price: 15000, quantity: 1, is_selected: true },
  { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
  { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: true },
  { name: "후드티", price: 30000, quantity: 4, is_selected: false },
  { name: "바지", price: 25000, quantity: 5, is_selected: false },
];

const log = console.log;

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const mapCurried = curry(map);

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const filterCurried = curry(filter);

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const reduceCurried = curry(reduce);

const add = (a, b) => a + b;

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

const go = (...args) => reduce((a, f) => f(a), args);

// pipe 를 통해서 중복 제거
// const total_price = pipe(
//   mapCurried((p) => p.price),
//   reduceCurried(add)
// );

// const base_total_price = (predi) => pipe(filterCurried(predi), total_price);

// go(
//   PRODUCTS,
//   base_total_price((p) => p.price < 20000)
//   // console.log
// );

// go(
//   PRODUCTS,
//   base_total_price((p) => p.price >= 20000)
//   // console.log
// );

// 5 총 수량, 총 가격

const sum = (f, iter) => go(iter, mapCurried(f), reduceCurried(add));
const sumCurried = curry(sum);

// 총 수량
const total_quantity = pipe(
  mapCurried((p) => p.quantity),
  reduceCurried(add)
);

const total_quantity_with_sum = (products) => sum((p) => p.quantity, products);

const total_quantity_with_sum_curried = sumCurried((p) => p.quantity);

// 총 가겨
const total_price = pipe(
  mapCurried((p) => p.price * p.quantity),
  reduceCurried(add)
);

const total_price_with_sum = (products) =>
  sum((p) => p.price * p.quantity, products);

const total_price_with_sum_curried = sumCurried((p) => p.price * p.quantity);

log(total_quantity_with_sum_curried(PRODUCTS));
log(total_price_with_sum_curried(PRODUCTS));

// HTML로 출력하기

document.querySelector("#cart").innerHTML = `
  <table>
    <tr>
      <th></th>
      <th>name</th>
      <th>price</th>
      <th>amount</th>
      <th>total price</th>
    </tr>
    ${go(
      PRODUCTS,
      // mapCurried(
      // (p) => `
      // <tr>
      // <td>${p.name}</td>
      // <td>${p.price}</td>
      // <td><input type="number" value="${p.quantity}"></td>
      // <td>${p.price * p.quantity}</td>
      // </tr>
      // `
      // ),
      // reduceCurried(add) // map 이 배열로 반환하기 때문에 html 위에 ``` 같은게 남음. 그렇기 때문에 reduce 를 통해서 하나로 합쳐줘야 함.
      sumCurried(
        // 위의 함수를 sum 으로 대체도 가능. map 하고 reduce(add) 하는 구조이기 때문. => 다형성
        (p) => `
      <tr>
          <td><input type="checkbox" ${p.is_selected ? "checked" : ""}></td>
          <td>${p.name}</td>
          <td>${p.price}</td>
          <td><input type="number" value="${p.quantity}"></td>
          <td>${p.price * p.quantity}</td>
        </tr>
      `
      )
    )}
    <tr>
      <td colspan="2">total_amount</td>
      <td>${total_quantity_with_sum_curried(
        filterCurried((p) => p.is_selected, PRODUCTS)
      )}</td>
      <td>${total_price_with_sum_curried(
        filterCurried((p) => p.is_selected, PRODUCTS)
      )}</td>
    </tr>
  </table>
`;
