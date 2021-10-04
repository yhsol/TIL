# To `panic!` or Not to `panic!`

So how do you decide when you should call `panic!` and when you should return `Result`?
When code panics, there's no way to recover.
You could call `panic!` for any error situation,
whether there's a possible way to recover or not,  
but then you're making the decision on behalf of the code calling your code that a situation is unrecoverable.
When you choose to return a `Result` value,
you give the calling code
options reather than making the decision for it.
The calling code could choose to attempt to recover in a way that's appropriate for its situation,
or it could decide that an `Err` value in this case is unrecoverable,
so it can call `panic!` and turn your recoverable error into an unrecoverable one.
Therefor, returning `Result` is a good default choice when you're defining a function that might fail.

In rare situations,
it's more appropriate to write code that panics instead of returning a `Result`.
Let's explore why it's appropriate to panic in examples,
prototype code, and tests. Then we'll discuss situations in which the compiler can't tell that failure is impossible,
but you as a human can. The chapter will conclude with some general guidlines on how to decide whether to panic in library code.

## Examples, Prototype Code, and Tests

When you're writing an example to illustrate some concept, having robust error-handling code in the example as well can make the example less clear.
In examples, it's understood that a call to a method like `unwrap` that could panic is meant as a placeholder
for the way
you'd want your application to handle errors, which can differ based on what the rest of your code is doing.

Similarly, the `unwrap` and `expect` methods are very handy
when prototyping,
before you're ready to decide how to handle errors.
They leave clear markers in your code for when you're ready
to make your program more robust.

If a method call fails in a test,
you'd want the whole test to fail,
even if that method isn't the functionality under test.
Because `panic!` is how a test is marked as a failure,
calling `unwrap` or `expect` is exactly what should happen.

## Cases in Which You Have More Information Than the Compiler

It would also be appropriate to call `unwrap` when you have some other logic that ensures the `Result` will have an `Ok` value,
but the logic isn't something the compiler understands.
You'll still have a `Result` value that you need to handle:
whatever operation you're calling
still has the possibility of failing in general,
enven though it's logically impossible in your particular situation.
If you can ensure by manuaaly inspecting
the code that you'll never have an `Err` vairant,
It's perfectly acceptable to call `unwrap`.
Here's an example:

```rs
    use std::net::IpAddr;

    let home: IpAddr = "127.0.0.1".parse().unwrap();
```

We're creating an `IpAddr` instance by parsing a hardcoded string.
We can see that `127.0.0.1` is a valid IP address,
so it's acceptable to use `unwrap` here.
However, having a hardcoded, valid string doesn't change the return type of the `parse` method:
we still get a `Result` value,
and the compiler will still make us handle the `Result` as if the `Err` variant is a possibility because the compiler isn't smart enough to see that this string is always a valid IP address. If the IP address string came from a user rather than being hardcoded into the program and therefore _did_ have a possibility of failure, we’d definitely want to handle the Result in a more robust way instead.

## Guidelines for Error Handling

It’s advisable to have your code panic when it’s possible that your code could end up in a bad state. In this context, a _bad_ state is when some assumption, guarantee, contract, or invariant has been broken, such as when invalid values, contradictory values, or missing values are passed to your code—plus one or more of the following:

- The bad state is not something that's _expected_ to happen occasionally.
- Your code after this point needs to rely on not being in this bad state.
- There's not a good way to encode this information in the types you use.

If someone calls your code and passes in values
that don't make sence,
the best choice might be to call `panic!` and alert
the person using your library to the bug in their code so they can fix it
during development.
Similarly, `panic!` is often appropriate if you're calling external code that is out of your control and it returns an invalid state that you have no way of fixing.

However, when failure is expected,
it's more appropriate to return a `Result` than to make a `panic!` call.
Examples include a parser being given malformed data or an HTTP request
returning a status that indicates you have hit a rate limit.
In these cases,
returing a `Result` indicates that failure is an expected possibility
that the calling code must decide how to handle.

When your code performs operations on values,
your code should verify the values are valid
first and panic if the values aren't valid.
This is mostly for safety reasons:
attempting to operate on invalid data can expose your code
to vulerabilities.
This is the main reason the standard library will call `panic!` if you attempt an out-of-bounds memory access: trying to access memory that doesn't belong to the current data structure is only guaranteed if the inputs meet particular requirements.
Panicking whhen the contract is violated makes sense because a contract violation always indicates a caller-side bug and it's not a kind of error
you want the calling code to have to explicitly handle.
In fact, there's no reasonable way for calling code to recover;
the calling _programmers_ need to fix the code.
Contracts for a function, especially when a violation will cause a panic,
should be explained in the API documentation for the function.

However, having lots of error checks in all of your functions would be verbose and annoying.
Fortunately, you can use Rust’s type system (and thus the type checking the compiler does) to do many of the checks for you. If your function has a particular type as a parameter, you can proceed with your code’s logic knowing that the compiler has already ensured you have a valid value. For example, if you have a type rather than an `Option`, your program expects to have _something_ rather than _nothing_. Your code then doesn’t have to handle two cases for the `Some` and `None` variants: it will only have one case for definitely having a value. Code trying to pass nothing to your function won’t even compile, so your function doesn’t have to check for that case at runtime. Another example is using an unsigned integer type such as `u32`, which ensures the parameter is never negative.

## Creating Custom Types for Validation
