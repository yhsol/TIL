import { filter, map, reduce } from "./mapFilterReduce";

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const prices = map((p) => p.price, products);

const filteredPrices = map(
  (p) => p.price,
  filter((p) => p.price < 20000, products)
);

const add = (a, b) => a + b;
const sumOfFilteredPrices = reduce(
  add,
  map(
    (p) => p.price,
    filter((p) => p.price < 20000, products)
  )
);
