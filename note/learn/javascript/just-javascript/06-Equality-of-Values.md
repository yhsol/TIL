# Equality of Values

## Kinds of Equality

- **Strict Equality**: `a === b` (triple equals).
- **Loose Equality**: `a == b` (double equals).
- **Same Value Equality**: `Object.is(a, b)`.

### Same Value Equality: Object.is(a, b)

In JavaScript, Object.is(a, b) tells us if a and b are the same value:

```js
console.log(Object.is(2, 2)); // true
console.log(Object.is({}, {})); // false
```

### Strict Equality: a === b

```js
console.log(2 === 2); // true
console.log({} === {}); // false
```

#### Same Value Equality vs Strict Equality

## Recap

    -   JavaScript has several kinds of equality. They include __Same Value Equality__, __Strict Equality__, and __Loose Equality__.

    - __Same Value Equality__, or `object.is(a, b)`, matches the concept of the _sameness of values_ that we introduced in the precious module.
        - Understanding this kind of equality helps prevent bugs! You will often need to know when you're dealing with the same value, and when you're dealing with two different values.
        - When we draw a diagram of values and variables, the _same value_ cannot appear twice on it. `Object.is(a, b)` is `true` when variables `a` and `b` point to same value on our diagram.
        - __Same Value Equality__ is the easiest to explain, which is why we started with it. However, it's verbose and a bit annoying to write.

    - In practice, you will use __Strict Equality__, or `a === b`, most often. It is equivalent to the __Same Value Equality__ except for two rare special cases:
        - `NaN === NaN` is `false`, event though they are the same value.
        - `0 === -0` and `-0 === 0` is `true`, but they are different values.

    - You can check whether `x` is `NaN` using `Number.isNaN(x)`.
    - __Loose Equality__ (`==`) is a set of arcane rules and is often avoided.

Finally, you might still be wondering why `size !== size` works as a way to detect when `size` is `NaN`. We said we'd revisit this question at the end of this module. This works because `NaN === NaN` is `false`, as we already learned. So the reverse (`NaN !== NaN`) must be `true`. Since `NaN` is the only value that's not equal to itself, `size !== size` can only mean that `size` is `NaN`.

In fact, ensuring you can detect `NaN` this way was one of the original reasons for making `NaN === NaN` return `false`! This was decided before JavaScript even existed. This is a purely historical anecdote, but interesting nonetheless.
