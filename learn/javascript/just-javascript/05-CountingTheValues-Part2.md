# 05. Counting the Values (Part 2)

Without further ado, let's resume our tour of the JavaScript universe!

![JavaScript universe](https://ci6.googleusercontent.com/proxy/9i-0lFOHGYuszByBOXzyB4fdb1NJTpjQ4wZuWBe8jMg6RpOBz-K4SyiigEGmZhGSIncy2biFTOL0XuFTOXImXxzln4AkWNvdD2MyV1I0W5VfxD1iwGQmPUD5TEanWZsznXioMSVVg9CVAh-hb_1gu_DyT1qi-BUjULhZSRQl2voff8mpaIof_mn2=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1581381920/just-javascript-email-images/jj04/celestialspheres-v2.png)

In the previous module, we've looked at Undefined, Null, Booleans, and Numbers, We will now continue counting values - starting with BigInts.

## BigInts

![BigInts](https://ci3.googleusercontent.com/proxy/Y1UUkcUUgw57E2ckDmVckPvU9KNSHUYNOHaooia2Qpf6mxFSfrWYBcQmUjz7NcQZ7_gs7KB_nNxHVqgASj1ve9Cy_x2CFEXLplfnJBCwM_7x-75xZfxRb-Q7NyLhTSV7UzcS09e2SK8k3Tgt1yu6Ys1NqvyuYDkiO9OOn9BhtIgn=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1580773481/just-javascript-email-images/jj05/bigints-v2.png)

BigInts were only recently added to JavaScript, so you won't see them used widely yet. If you use an older browser, they won't work. Regular numbers can't represent large with precision, so BigInts fill that gap (literally):

```js
let alot = 9007199254740991n; // Notice n at the end
console.log(alot + 1n); // 9007199254740992n
console.log(alot + 2n); // 9007199254740993n
console.log(alot + 3n); // 9007199254740994n
console.log(alot + 4n); // 9007199254740995n
console.log(alot + 5n); // 9007199254740996n
```

No funny business with the rounding! This is greate for financial calculations. where precision is especially important. Keep in mind that nothing is free. Operations with _truly_ huge numbers may thake time and resources.

How many BigInts are there in our universe? The specification says they have an _arbitary precision._ This means that **in our JavaScript universe, there is an infinite number of BigInts - one for each integer in math.**

Yeah...

If this sounds strange, consider that you're already comfortable with the idea of there being infinite integers in math. (If you're not, give it a few moments!) It's not much of a leap then from a "math universe" to a "JavaScript universe".

(_And from there, we can go straight to the Pepsi Universe._)

Of course, in practice, we can't fit all the possible BigInts inside the computer memory. If we tried, at some point it would crash or freeze. But conceptually, Count von Count could be busy counting BigInts for eternity and never stop.

## Strings

![Strings](https://ci4.googleusercontent.com/proxy/wapvr31gaBv6zdKGsf_B5PTW9VBS5lXYDcXz5FfPr1PYZvN5adg8Uvow_HJoMXF929RH8LJLSv3eb2WM1mMEXpRsUKcQFKAGLej0XNUHUq2ElcSQ0msQwyGVpY9R_Xsawa8tJnlI3tItMFp65E9XOnXtPj-1L-IeZA3bVJown9r1=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1580773483/just-javascript-email-images/jj05/strings-v2.png)

Strings represent text in JavaScript. There are three ways to write strings(single quotes, double quotes, and backticks), but the result is the same:

```js
console.log(typeof "こんにちは"); // "string"
console.log(typeof "こんにちは"); // "string"
console.log(typeof `こんにちは`); // "string"
```

An empty string is a string, too:

### Strings Aren't Objects

All strings have a few build-in properties.

```js
let cat = "Cheshire";
console.log(cat.length); // 8
console.log(cat[0]); // "C"
console.log(cat[1]); // "h"
```

This doesn't mean that strings are objects! String properties are special and don't behave the way object properties do. For example, you can't assign anyting to cat[0]. Strings are primitives, and all primitives are immutable.

### A Value for Every Conceivable String

**In our universe, there is a distinct value for every conceivable string.** Yes, this includes your grandmother's maiden name, the fanfic you published ten years ago under an alias, and the script of Matrix 5 which hasn't been written yet.

Of course, all possible strings can't literally fit inside a computer memory chip. But _the idea_ of every possible string can fit inside your head. Our JavaScript universe is a model for humans, not for computers!

This might prompt a quistion. Does this code create a string?

```js
// Try it in your console
let answer = promt("Enter your name");
console.log(answer); // ?
```

Or does it merely _summon_ a string that already exists in our universe?

The answer to this question depends on whether we're studying JavaScript "from the outside" or "from the insed"

_Outside_ our mental model, the answer depends on a specific implementation. Whether a string is represented as a single block of memory, multiple blocks, or a rope, is up to the JavaScript engien.

But _inside_ our mental model, this quesion doesn't mean anything. We can't set up an experiment to say whether strings "get created" or "get summoned" withing our JavaScript universe.

To keep our mental model simple, we will say that **all conceivable string values already exist from the beginning - one value for every distinct string.**

## Symbols

Symbols are a relatively recent addition to the language.

```js
let alohomora = Symbol();
console.log(typeof alohomora); // "symbol"
```

It's hard to explain their purpose and behavior without diving deeper into objects and properties, so for now we're going to skip them. Sorry, symbols!

![Symbols comming soon](https://ci5.googleusercontent.com/proxy/z4Tv8hWnbgdm8IAdrbhU4F7BP_AXzPmoobjwH4Ifjqj5kA_sog_YH9PtTrBmmtm1NOSLHHhxJooH4HFCzI7DCuo6mEGt1lOWqaHLR71CZMtsykt3D5jC5s41RBGi_E3YCmxG9613LT0jJGedVIltPuh8Xi-yxYhDFtYeRWbGHkbP7rgzNA=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1580435620/just-javascript-email-images/jj04/sym-comingsoon.png)

## Objects

![Objects](https://ci5.googleusercontent.com/proxy/1b0TIjv2cIAbPBlsQN8YqYbIZKFLTJ-1WtHJQ1o5R07ejrJp6gSSL1fayyR_z-p-TWNhPW2wU7jmnRvQ-VK3KEszJXG8q956sm2gG1TRtVa-uXMLGgQluQX_D7t9DhSv8mvfFbJI1iZClBmZx-sCi0PKMBm4qCqPEQh8m-qR=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1580435620/just-javascript-email-images/jj04/objects.png)

At last, we got to objects!

This includes arrays, RegExps, and other non-primitive values:

```js
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof new Date()); // "object"
console.log(typeof /\d+/); // "object"
console.log(typeof Math); // "object"
```

Unlike everything before, objects are _not_ primitive values. This also means that by default, they're mutable. We can access their properties with . or []:

```js
let rapper = { name: "Malicous" };
rapper.name = "Malice"; // Dot notation
rapper["name"] = "No Malice"; // Bracket notation
```

We haven't talked about properties in detail yet, so your mental model about them might be fuzzy. We will return to properties in a futer module.

## Making Our Own Objects

There is one thing in particular that makes Count von Count excited about objects. **We can make more of thme! We can make our own objects.**

In our mental model, all of the primitive values we've discussed - `null`, `undefined`, `booleans`, `numbers`, and `strings` - have "always existed". We can't "make" a new string or a new number, we can only "summon" taht value:

```js
let sisters = 3;
let musketeers = 3;
```

![summon values](https://ci5.googleusercontent.com/proxy/Tu_qdNFTz76HndJraInvsjmMWG1_a-NqF_7mQHlHs2RphPvQx4LimksqnWXtDhnqCgShp6k8UNos9sHZAczcv5PKDxw48ZoXEiqDmBoeimmz_mS1axt1bBYOdDjXUg0XE4eu6L2kOBkEsjfZss7htR4-T1Wd-XL9KmsOntlpLA=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1580435620/just-javascript-email-images/jj04/3sisters.png)

What makes objects different is that we can create more of them. **Every time we use the {} object literal, we _create_ a brand new object value:**

```js
let shrek = {};
let donkey = {};
```

![create a brand new object](https://ci3.googleusercontent.com/proxy/TVux66FFW5-Sks5Cw7RmPpMhGnqmRq91Q0mWQnQOxtAdiOWlcj7dlqdrpHzw5HrltAbWEzD94joUfj-mExARrOU_qV_-SXQhsuL7ZZlBzbHCKw9F6JShJmaQCQVTrwYDTGVCdAxc9AZ5BeFXvfRO8a0s8mcz3K1NGHyIG64WcAHlLIE=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1580435620/just-javascript-email-images/jj04/shrek-donkey.png)

The same goes for arrays, dates, and any other objects. For example, the [] array literal _creates_ a new array value - a value that never existed before.

## Do Ojbects Disappear?

You might wonder: do objects ever disappear, or do they hang around forever? JavaSCript is desinged in a way that we can't tell one way or the ohter from inside our code. For example, we can't _destroy_ an object:

```js
let junk = {};
junk = null; // Doesn't necessarily destroy an object
```

Instead, JavaScript is a garbage-collected language.

This means that although we can't destroy an object, it _might_ eventually "disappear" if there is no way to reach it by following the wires from our code.

![garbage collection](https://ci4.googleusercontent.com/proxy/usQyvn7y0DhgWTb4SZngu2TnMPvdLwme7PUX3ugz7or38vXJgvPjMj7W8bcLkJbBIyW_nW5JEoyUYYLU63lOpSQyE4VGUI3-9iXOVXEMlqrdOvIEzeRpz8_NBrwlkbQnoiKWulGQVT6XwOrJtKcIxpW3kyxMfPBx7FfCdDgFXIdtrsiXTekxAPzfT3RSeQ=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1580435620/just-javascript-email-images/jj04/garbagecollection-optim.gif)

JavaScript doesn't offer guarantees about _when_ garbage collection happens.

Unless you're trying to figure out why an app is using too much memory, you don't need to think about garbage collection too often. I only mention it here so that you know that we can create objects - but we cannot destroy them.

_In my universe, objects and fuctions float closest to my code. This reminds me that I can manipulate them and even make more of them._

## Functions

![Functions](https://ci3.googleusercontent.com/proxy/XlGjTrbi_uFz6abWzHWwOdPrkt_faQhUQ_c8nnxlpYnr_oziFkQGkZzaxz7Uwk5Wie7oggHi4RH0aF0BBKchOHD0pBl28lqurzzwpA3PVZPPgxt4020Sg5x87buOgjVf_jf2aSJZO76enUN4N5qYWhL4fiEev35j7pPhw6OTPBA=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1580435620/just-javascript-email-images/jj04/functions.png)

It is particularly strange to think about functions as values that are separate from my code. After all, they _are_ my code. Or are they not?

## Functions Are Values

We defined functions so that we can call them later and run the code inside them. However, to really understand functions in JavaScript, we need to forget about _why_ thye're useful for a second. Instead, we will think about functions as yet another kind of value: a number, an object, a function.

To understand functions, we will compare them to numbers and objects.

First, consider this `for` loop that runs `console.log(2)` seven times:

```js
for (let i = 0; i < 7; i++) {
  console.log(2);
}
```

**How many different values does it pass to console.log?** To answer this, let's recall what 2 means when we write it down. It is a number literal. A literal is an expression - a question to our universe. There is only one value for every number in our universe, so it "answers" our question by "summoning" the same value for the number 2 every tiem. **So the answer is one value.** We will see the log seven times - but we are passing the same value in each call.

Now let's briefly revisit objects.

Here is another `for` loop that runs console.log({}) seven times:

```js
for (let i = 0; i < 7; i++) {
  console.log({});
}
```

**How many different values does it pass to console.log now?** Here, too, {} is a literal - except it's an _object literal_. As we just learned, the JavaScript universe doesn't "anser" an object literal by summoning anything. Instead, it _creates_ a new object value - which will be the result of the {} object literal. **So the code above creates and logs seven completely distinct object values.**

Let that sink in.

Now let's have a look at functions.

```js
for (let i = 0; i < 7; i++) {
  console.log(function () {});
}
```

**How many different values does this code pass to console.log?**

The answer is seven.

**Every time we execute a line of code that contains a function expression, a brand new function value appears in our universe.**

![create each brand new function in loop](https://ci5.googleusercontent.com/proxy/87cTNXQ_gYgXJGOk_NRLhvoWnCIlU1KoUSHek-zugOcfnwIjpE9lzIXQQ1FCIyeJ1FOwHVp89Yxoa2VoCc2x18oKP5TldDszgvu9qh1MZrc-vYXwEO4WI7MSRTPjJh0V49CfOaRBKOUn4zP8yGiZXvGjRinkqlO2fRlxZZs7rk9y7zpK-Q7PTClqRnHrVjgL3w=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1581382911/just-javascript-email-images/jj05/function-creation-optim-v2.gif)

Here, too, `function() {}` is an expression. Like any expression, a function expression is a "question" to our JavaScript universe - **which answers us by** _creating_ **a new function value every time we ask.** This is very similar to how {} creates a new object value when it executes. Functions are like objects!

Technically, `functions` _are_ `objects` in JavaScript. We'll keep treating them as a separate fundamental type because they have unique capabilities compared to regular objects. But, generally speaking, if you can do something to an object, you can also do that to a function too. They are very special objects.

## Calling a Function

What does this code print?

```js
let countDwarves = function () {
  return 7;
};
let dwarves = countDwarves;
console.log(dwarves);
```

You might think thath it prints 7, expecially if you're not looking very closely.

Now check this snippet in the console! The exact thing it prints depends on the browser, but you will see the _function itself_ instead of the number 7 there.

If you follow our mental model, this behavior should make sense:

1. First, we created a new function value with a `function() { }` expression, and pointed the `countDwarves` variable at this value.
2. Next, we pointed the `dwarves` variable at the value that `countDwarves` is pointing to - which is the same function value.
3. Finally, we logged the value that `dwarves` is currently pointing to.

_At no point, did we call our function!_

As a result, both `countDwarves` and `dwarves` point at the same value, which happens to be a function. See, _functions_ are _valeus_. We can point variables to them, just like we can do with numbers or objects.

**Of course, if we want to _call_ a function, we can do that too:**

```js
let countDwarves = function () {
  return 7;
};
let dwarves = countDwarves(); // () is a function call
console.log(dwarves);
```

Note that neither the `let` declaration nor the = assignment have anything to do with our function call. It's () that performs the function call - and it alone!

**Adding () changes the meaning of our code:**

    - `let dwarves` = `countDwarves` means "Point `dwarves` towards the value that `coutnDwarves` is pointing to."
    - `let dwarves` = `countDwarves()` means "Point `dwarves` towards the value __returned by__ the function that `countDwarves` is pointing to."

In fact, `countDwarves()` is also an expression. It's called a _Call expression_. To "answer" a call expression, JavaScript runs the code inside our function, and hands us the returned value as the result (in this expample, it's 7).

We'll look at function calls in more detail in the future modules.

## Recap

That was quite a journey! Over the last two modules, we have looked at every value type in JavaScript. Let's join Count von Count in recapping how many values there are of each type, starting with the different primitive types:

![Primitive Values](https://ci5.googleusercontent.com/proxy/OpDF_n4IzMZMGG0gj1xtL8ycGfBB3PfOhJE7INCJ6wcA3hvhdoAml4O8Bx2kact7Po--V9xj6-w3A6ZSFyqWhPAz3EgQCtY0v1VpLjxlMxZsnqWzMyDFpMM8u3x97b-acJ1B4cd3gu0k64dqIaOZ7UsOyggnepzMG4P6G-nZcJqi3-oX3hDe=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1581383593/just-javascript-email-images/jj05/primitives-pt2-2.png)

- **Undefined**: Only one value, `undefined`.
- **Null**: ONly one value, `null`.
- **Booleans**: Two values: `true` and `false`.
- **Numbers**: One value for each floating point math number.
- **BigInts**: One value for every conceivable integer.
- **Strings**: One value for every concevible string.
- **Symbols**: We skipped Symbols for now, but we'll get tot them someday!

The types below are special because they let us _make our own values_:

![Non Primitive Values](https://ci6.googleusercontent.com/proxy/ZDaTj94_bDsNc5k1DAlMZkvTGsBmPaQPgMbhAzuRS5mjQKxQ4HkZzDdTdcOJ5Ctr_cRNBpKVMP2oKpH-x1vUxUiVcL6lYl8vLstxfdX8N2ud-tC8RXoC9Q_zRoxn4o1R8ApfmN01RY_PHbXRhe002iH1TCBevXzsG6v_6xOMg8M=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1580435620/just-javascript-email-images/jj04/summary-2.png)

- **Objects**: One value for every object literal we execute.
- **Function**: One value for every function expression we execute.

It was fun to visit the different "celestial spheres" of JavaScript. Now that we've counted all the values, we've also learned what makes them _distinct_ from one another. \__For example, writing `2` or `"hello"` always "summons" the same number or a string value. But writing `{}` or `function() {}` always \_creates_ a brand new, different value. This idea is crucial to understanding equality in JavaScript, which will be the topic of the next module.
