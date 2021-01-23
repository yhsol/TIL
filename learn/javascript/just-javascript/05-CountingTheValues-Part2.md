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
