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

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

// pipe 를 통해서 중복 제거
const total_price = pipe(
  mapCurried((p) => p.price),
  reduceCurried(add)
);

const base_total_price = (predi) => pipe(filterCurried(predi), total_price);

go(
  products,
  base_total_price((p) => p.price < 20000),
  console.log
);

go(
  products,
  base_total_price((p) => p.price >= 20000),
  console.log
);
