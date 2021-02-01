# 09. Prototypes

In the previeous modules, we've covered objects, properties, and mutation.
It's tempting to jump to other topics, but we're not quite done with objects yet!

Here is a small riddle to check our mental model:

```js
let pizza = {};
console.log(pizza.taste); // "pineapple"
```

Ask yourself: is this possible?

We have just created an empty object with `{}`.
We definitely didn't set any properties on it before logging.
So it seems like `pizza.taste` can't point to "pineapple".
We would expect `pizza.taste` to give us `undefined` instead.
(We usually get `undefined` when a property doesn't exist, right?)

And yet, it `is` possible to add some code before these two lines that would cuase `pizza.taste` to be `"pineapple"`!
This may be a contrived example, but it shows that our mental model of the JavaScript universe is incomplete.

In this module, we'll introduce the concept of `prototypes`.
Prototypes explain what happens in this puzzle.
More importantly, prototypes are at the heart of several other JavaScript features.
Occasionally people neglect learning them because they seem too unusual.
However, the core idea is remarkably simple.

## Prototypes

Here's a couple of variables pointing at a couple of objects:

```js
let human = {
  teeth: 32,
};

let gwen = {
  age: 19,
};
```

We can represent them visually in a familiar way:

![human and gwen objects](https://ci3.googleusercontent.com/proxy/iXyGNAN6zLI4dK9cin-ZeEc2REXPAmVQUqxkhROcF6WvGC-luRW3x0NJWZuwPVET6CVwo2jjUieU_pXgZLResGQGwc13G9zFFmFxPi5ndlKoea9huKXPJWc53TIZ90j8ke2ImG3LT5GQf4gQq7YDY4HGgIw7gZwapXNU=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1590534071/just-javascript-email-images/jj09/prop.png)

In this example, `gwen` points at an object without a `teeth` property.
According to the rules we've learned, if we read it we get `undefined`:

```js
console.log(gwen.teeth); // undefined
```

But the story doesn't have to end here. Instead of the default behavior of returning `undefined`, we can instruct JavaScript to _continue searching for our missing property on another object._ We can do it with one line of code:

```js
let human = {
  teeth: 32,
};

let gwen = {
  // We added this line:
  __proto__: human,
  age: 19,
};
```

What is that mysterious `__proto__` property?

It represents the JavaScript concept of a _prototype_.
Any JavaScript object may choose another object as a prototype.
We will discuss what that means in practice very soon.
For now, let's think of it as a special `__proto__` wire:

![`__proto__` wire](https://ci4.googleusercontent.com/proxy/y7xMzi5xqLxisqeWQyAgqmrgPCO31lSl9yTrE8CiBbftUr_90nGiajtzJhdMjnd1YgkB-HxYmzqV0mnZnxQxxoGjaVmnHdnYehko5mgpP7gF25SU9WVTcvnoixN8M9k947ngEw60jhi85L01egtWfWRAWttAXhsRRfcbww=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1590534071/just-javascript-email-images/jj09/proto.png)

Take a mement to verify the diagram matches the code.
We drew it just like we did in the past.
The only new thing is the mysterious `__proto__` wire.

By specifying `__proto__`(also known as our object's _prototype_), we instruct JavaScript to continue looking for missing properties on that object instead.

## Prototypes in Action

Earlier, when we went looking for `gwen.teeth`, we got `undefined` because the `teeth` property deosn't exist on the object that `gwen` points at.

But thanks to that `__proto__: human` line, the answer is different now:

```js
let human = {
  teeth: 32,
};

let gwen = {
  // "Look for other properties here"
  __proto__: human,
  age: 19,
};

console.log(gwen.teeth); // 32
```

Now the sequence of steps looks like this:

![sequence of steps](https://ci6.googleusercontent.com/proxy/cF8H1dhfYFhFwpLLzv2h5AjQzfRBVyFmdOwNdToLZH7eLReTtZwl1Scm9I0Xjx8gP2zIjhhxvUsaD8Eb8N0MejdGTXjB1SbBMyze6A1vx686bXub8PZHx4g_241276opXH3DHZS2LJ2GowkyfgJpHFiULj7tuPvEdZx09cFqJfBo=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1590534270/just-javascript-email-images/jj09/proto_anim.gif)

1. Follow the `gwen` wire. It leads to an object.
2. Does this object have a `teeth` property?

- No.
- **But it has a prototype.** Let's check it our.

3. Does _that_ object have a `teeth` property?

- Yes, it points at `32`.
- Therefore, the result of `gwen.teeth` is `32`.

This is similar to how you might say at work: "I don't knwo, but Alice might know".
With `__proto__`, you instruct JavaScript to "ask another objeect".

To check your understanding so far, write down your answer:

```js
let human = {
  teeth: 32,
};

let gwen = {
  __proto__: human,
  age: 19,
};

console.log(human.age); // ? -> undefined
console.log(gwen.age); // ? -> 19

console.log(human.teeth); // ? -> 32
console.log(gwen.teeth); // ? -> 32

console.log(human.tail); // ? -> undefined
console.log(gwen.tail); // ? -> undefined
```

Now let's check your answers.

The `human` variable points at an object that doesn't have an `age` property, so `human.age` is `undefined`.
The `gwen` variable points at an object that _does_ have an `age` property.
That wire points at `19`, so the value of `gwen.age` is `19`:

```js
console.log(human.age); // undefined
console.log(gwen.age); // 19
```

The `human` variable points at object that has a `teeth` property, so the value of `human.teeth` is `32`.
The `gwen` variable points at an object that doesn't have a `teeth` property.
However, that object has a prototype, which _does_ have a `teeth` property.
This is why the value of `gwen.teeth` is also `32`.

```js
console.log(human.teeth); // 32
console.log(gwen.teeth); // 32
```

Neither of our objects have a `tail` property, so we get `undefined` for both:

```js
console.log(human.tail); // undefined
console.log(gwen.tail); // undefined
```

Note how although the value of `gwen.teeth` is `32`,
it doesn't mean `gwen` has a `teeth` property!
Indeed, in this example, `gwen` does not have a `teeth` property.
But its prototype object - the same one `human` points at - does.

This serves to remind us that `gwen.teeth` is an expression - a question to the JavaScript universe - and JavaScript will follow a sequence of steps to answer it.
Not we know these steps involve looking at the prototype.

## The Prototype Chain

A prototype isn't a special "thing" in JavaSciprt.
A prototype is more like a _relationship_.
An object may point at another object as its prototype.

This naturally leads to a question:
but what if my object's prototype has its own prototype?
And that prototype has its own prototype?
Would that work?

The answer is that this is _exactly_ how it works!

```js
let mammal = {
  brainy: true,
};

let human = {
  __proto__: mammal,
  teeth: 32,
};

let gwen = {
  __proto__: human,
  age: 19,
};

console.log(gwen.brainy); // true
```

We can see that JavaScrippt will search for the property on our object,
then on its prototype,
then on _that_ object's prototype,
and so on.
We would only get `undefined` if we ran out of prototypes and still haven't found our property.

![The Prototype Chain](https://ci3.googleusercontent.com/proxy/vEl_EkPip3Xg-iXJGYKXxbGcNI514BqohsMA3w-95BE6mgv-Yh0CKxrf41XpW9nvH6Mv837aBAdLjKI0nPZGXH8WLQrSBLU_7XEu5xUw3Y7wRHcfgoAuEHtqCnghayinOl94HLU5186U46o36tJffBU_zU3LecLFeJp4IKiT3uPG=s0-d-e1-ft#https://res.cloudinary.com/dg3gyk0gu/image/upload/v1590534071/just-javascript-email-images/jj09/protochain.png)

This is similar to how you might say at work:
"I don't know, but Alice might know".
But then Alice might say "Actually I don't know either,
ask Bob".
Eventually, you will either arrive at the answer or run out of people to ask!

This sequence of objects to "visit" is known as our object's _prototype chain_.
(However, unlike a chain you might wear, prototype chains can't be circular!)
