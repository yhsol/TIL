function Person(name: string, first: number, second: number) {
  this.name = name;
  this.first = first;
  this.second = second;
}

Person.prototype.sum = function () {
  return "prototype : " + (this.first + this.second);
};

let kim = new Person("kim", 10, 20);
kim.sum = function () {
  return "this : " + (this.first + this.second);
};

let lee = new Person("lee", 10, 10);

console.log("kim: ", kim);
console.log("lee: ", lee);
// kim:  Person { name: "kim", first: 10, second: 20, sum: [Function] }
// lee:  Person { name: "lee", first: 10, second: 10 }

console.log("kim.sum(): ", kim.sum());
console.log("lee.sum(): ", lee.sum());
// kim.sum():  this : 30
// lee.sum():  prototype : 20

export {};
