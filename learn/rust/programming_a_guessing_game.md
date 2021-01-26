# Programming a Guessing Game

Let's jump into Rust by working through a hands-on project together! This chapter introduces you to a fes common Rust concepts by showing you how to use them in a real program. You'll learn about `let`, `match`, methods, associated functions, using external crates, and more! The following chapters will explore these ideas in more dtail. In this chapter, you'll practice the fundamentals.

We'll implement a classic beginner prgramming problem: a guessing game. Here's how it works: the program will generate a random integer between 1 and 100. It will then prompt the player to enter a guess. After a guess is entered, the program will indicate whether the guess is too low or too high. If the guess is correct, the game will print a congratulatory message and exit.

## Setting Up a New Project

To set up a new project, go to the _projects_ directory that you created in Chapter 1 and make a new project using Cargo, like so:

```
cargo new guessing_game
cd guessing_game
```

The first command, `cargo new`, takes the name of the project(`guessing_game`) as the first argument. The second command changes to the new project's directory.

Look at the generated `Cargo.toml` file:

Filename: Cargo.toml

```toml
[package]
name = "guessing_game"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

if the author information that Cargo obtained from your environment is not correct, fix that in the file and save it again.

As you saw in Chapter 1, `cargo new` generates a "Hello, world!" program for you. Check out the _src/main.rs_ file:

Filename: src/main.rs

```rs
fn main() {
    println!("Hello, world!");
}
```

Now let's compile this "Hello, world!" program and run it in the same step using the `cargo run` command:

```
$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished dev [unoptimized + debuginfo] target(s) in 1.50s
     Running `target/debug/guessing_game`
Hello, world!
```

The `run` command comes in handy when you need to rapidly interate on a project, as we'll do in this game, quickly testing each interation before moving on to the next one.

Reopen the _src/main.rs_ file. You'll be writing all the code in this file.

## Processing a Guess

The first part of the guessing game program will ask for user input, process that input, and check that the input is in the expected form. To start, we'll allow the player to input a guess. Enter the code in Listing 2-1 into \_src/main.rs.

```rs
use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {}", guess);
}
```

Listing 2-1: Code that gets a guess from the user and prints it

This code contains a lot of information, so let's go over it line by line.
To obtain user input and then print the result as output, we need to bring the `io` (input/output) library into scope.
The `io` library comes from standard library (which is known as `std`):

```rs
use std::io;
```

By default, Rust brings only a few types into the scope of every program in the _prelude_.
If a type you want to use ins't in the prelude, you have to bring that type into scope explicitly with a `use` statement.
Using the `std::io` library provides you with a number of useful features, including the ability to accept user input.

As you saw in Chapter 1, the `main` function is the entry point into the program:

```rs
fn main() {
```

The `fn` syntax declares a _new_ function, the parentheses, `()`, indicate there are no parameters, and the curly braket, `{`, starts the body of the function.

As you also learned in Chapter 1, println! is a macro that prints a string to the screen:

```rs
println!("Guess the number!");

println!("Please input your guess.");
```

This code is printing a prompt starting what the game is and requesting input from the user.

### Storing Vaues with Variables

Next, we'll create a place to store the user input, like this:

```rs
let mut guess = String::new();
```

Now the program is getting interesting! There’s a lot going on in this little line. Notice that this is a let statement, which is used to create a variable. Here’s another example:

```rs
let foo = bar;
```

This line creates a new variable named `foo` and binds it to the value of the `bar` variable.
In Rust, variables are immutable by default.
We’ll be discussing this concept in detail in the “Variables and Mutability” section in Chapter 3. The following example shows how to use mut before the variable name to make a variable mutable:

```rs
let foo = 5; // immutable
let mut bar = 5; // mutable
```

Let's return to the guessing game program.
You now know that `let mut guess` will introduce a mutable variable named `guess`.
On the other side of the equal sign (`=`) is the value that `guess` is bound to,
which is the result of calling `String::new`,
a function that returns a new instance of a `String`.
`String` is a string type provided by the standard library that is a growable, UTF-8 encoded bit of text.

The `::` syntax in the `::new` ilne indicates that `new` is an _associated function_ of the `String` type.
An associated function is implemented on a type, in this case `String`, rather than of a particular instance of a `String`.
Some languages call this a static method.

This `new` function creates a new, empty string.
You'll find a `new` funciton on many types,
because it's a common name for a function that makes a new value of some kind.

To summarize, the `let mut guess = String::new();` line has created a mutable variable that is currently bound to a new, empty instance of a `String`. Whew!

Recall that we included the input/output funcionality from the standard library with `use std::io;` on the first line of the program.
Now we'll call the `stdin` function from the `io` module:

```rs
io::stdin()
    .read_line(&mut guess)
```

If we hadn't put the `use std::io` line at the beginning of the program, we could have written this function call as `std::io::stdin`.
The `stdin` function returns an instance of `std::io::Stdin`, which is a type that represents a handle to the standard input for your terminal.

The next part of the code, `.read_line(&mut guess)`,
calls the `read_line` method on the standard input handle to get input from the user.
We're alos passing one argument to `read_line`: `&mut guess`.

The job of read_line is to take whatever the user types into standard input and place that into a string, so it takes that string as an argument.
The string arugment needs to be mutable so the method can changes the string's content by adding the use input.

The `&` indicates that this argument is a _reference_,
which gives you a way to let multiple parts of your code access one piece of data without needing to copy that data into memory multiple times.
References are a complex feature, and one of Rust’s major advantages is how safe and easy it is to use references.
You don’t need to know a lot of those details to finish this program. For now, all you need to know is that like variables, references are immutable by default. Hence, you need to write &mut guess rather than &guess to make it mutable. (Chapter 4 will explain references more thoroughly.)

### Handling Potential Failure with the `Result` Type

We’re still working on this line of code. Although we’re now discussing a third line of text, it’s still part of a single logical line of code. The next part is this method:

```rs
        .expect("Failed to read line");
```

When you call a method with the .foo() syntax, it’s often wise to introduce a newline and other whitespace to help break up long lines. We could have written this code as:

```rs
io::stdin().read_line(&mut guess).expect("Failed to read line");
```

However, one long line is difficult to read, so it’s best to divide it. Now let’s discuss what this line does.

As mentioned earlier, `read_line` puts what the user types into the string se're passing it,
but it also returns a value - in this case, an `io:Result`.
Rust has a number of types named `Result` in its standard library:
a generic `Result` as well as sepcific versions for submodules, such as `io::Result`.

The `Result` types are _enumerations_, often referred to as _enums_.
An enumeration is a type that can have a fixed set of values,
and those values are called the enum's _variants_.
Chapter 6 will cover enums in more detail.

For `Result`, the variants are `Ok` or `Err`.
The `Ok` variant indicates the operation was successful,
and inside `Ok` is the successfully generated value.
The `Err` variant means the operation failed,
and `Err` contains information about how or why the operation failed.

The purpose of these `Result` types is to encode error-handling information.
Values of the `Result` type, like values of any type, have methods defined on them.
An instance of `io::Result` has as `expect` method that you can call.
If this instance of `io::Result` is an `Err` value,
`expect` method that you can call.
If this instance of `io::Result` is an `Err` value, `expect` will cause the program to crash and display the message that you passed as an argument to `expect`.
If the read_line method returns an Err, it would likely be the result of an error coming from the underlying operating system.
If this instance of io::Result is an Ok value, expect will take the return value that Ok is holding and return just that value to you so you can use it. In this case, that value is the number of bytes in what the user entered into standard input.

If you don’t call expect, the program will compile, but you’ll get a warning:

```
$ cargo build
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
warning: unused `std::result::Result` that must be used
  --> src/main.rs:10:5
   |
10 |     io::stdin().read_line(&mut guess);
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   |
   = note: `#[warn(unused_must_use)]` on by default
   = note: this `Result` may be an `Err` variant, which should be handled

    Finished dev [unoptimized + debuginfo] target(s) in 0.59s
```

Rust warns that you haven’t used the Result value returned from read_line, indicating that the program hasn’t handled a possible error.

The right way to suppress the warning is to actually write error handling, but because you just want to crash this program when a problem occurs, you can use expect. You’ll learn about recovering from errors in Chapter 9.

### Printing Values with `println!` Placeholders
