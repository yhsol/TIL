// Boolean
let isDone: boolean = false;

// Number
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// String
let color: string = "blue";
color = "red";

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.
I'll be ${age + 1} years old next month.`;

let sentence2: string =
  "Hello, my name is " +
  fullName +
  ".\n.\n" +
  "I'll be " +
  (age + 1) +
  " years old next month.";

// Array
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number];
x = ["hello", 19]; // success
x = [10, "hello"]; // error

console.log(x[0].substring(1));
console.log(x[1].substring(1)); // error
x[3] = "world"; // error
console.log(x[5].toString());

// Enum
enum Color {
  Red,
  Green,
  Blule,
}
let c: Color = Color.Green;
enum ColorStartsOne {
  Red = 1,
  Green,
  Blue,
}
let cStartsOne: ColorStartsOne = ColorStartsOne.Green;
enum ColorSetManually {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let cSetManually: ColorSetManually = ColorSetManually.Green;

enum ColorFindByValue {
  Red = 1,
  Green,
  Blue,
}
let colorName: string = ColorFindByValue[2];
console.log(colorName); // print 'Green'.

// Any
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;

let notSureButProbablyNumber: any = 4;
notSureButProbablyNumber.ifItExists(); // success
notSureButProbablyNumber.toFixed(); // success

let prettySure: Object = 4;
prettySure.toFixed(); // error

let listAny: any[] = [1, true, "free"];
listAny[1] = 100;

// Void
function warnUser(): void {
  console.log("This is my warning message");
}

let unusable: void = undefined;
unusable = null;

// Null and Undefined
let u: undefined = undefined;
let n: null = null;

// Never
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error("Something failed");
}

function infiniteLoop(): never {
  while (true) {}
}

// Object
declare function create(o: object | null): void;

create({ prop: 0 }); // success
create(null); // success

create(42); // error
create("string"); // error
create(false); // error
create(undefined); // error

// Type assertions
let someValue: any = "this is a string";
let strLength: number (<string>someValue).length;

let someValueAs: any = "this is a string";
let setLengthAs: number = (someValueAs as string).length