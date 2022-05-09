# JavaScript Internals: Execution Context

- ref
  - https://betterprogramming.pub/javascript-internals-execution-context-bdeee6986b3b

## What is stored in the call stack

### Introduction

In this post, we'll take look at one of the most important and fundamental parts of JavaScript, the execution context. We will define the structure of a context, its lifecycle, and how the execution stack (call stack) is formed.
After that, we will deal with such notorious concepts as hoisting, scope, and closure.

### Execution Context

There are three types of ECMAScript code: global code, function code, and eval code (which is not covered in this article). Every code is evaluated in its own execution context.

Execution context is a concept that describes the environment in which code is executed. In simple words, it's just a set of objects that are created and used by the JavaScript engine at runtime.

Before the JavaScript engine starts executing your script files, the global execution context is created. Every line of code that is not a part of a function body is a global code. Such code is executed inside the global context, which can be only one per program.

Hence it can be said that one execution context can create another execution context, i.e. a function calls another function (or the global context calls a function), and so on. Together these created contexts from the execution stack.

### Execution Stack

The execution stack, which is also known as the call stack, is a last-in-first-ouot(LIFO) data structure. It's created and managed by the JavaScript engine for storing execution contexts at a runtime.

A context which creates (calls) another context is called a caller. A context which is being created is called a callee.

When a caller creates a callee, the caller suspends its execution and passes the control flow the callee. The callee is pushed onto the stack and becomes a running (active) execution context. After the callee's code is executed entirely, it returns control to the caller, and the evaluation of the caller's context proceeds (it may activate other contexts) till its end, and so on.

Execution stack

```js
const firstName = 'John'
const lastName = 'Doe'

function getEmployee(firstName, lastName) {
    const fullName = getFullName()
    const rate = '6$'

    function getFullName() {
        return ${firstName} ${lastName}
    }

    return { fullName, rate }
}

const john = getEmployee(firstName, lastName)

// Global Execution Context, Function Execution Context, Function Execution Context
```

In the example above, the global execution context is created and put onto the stack. Then on each function invocation, the function execution context is created and put onto the stack. After the function is completely executed, its context is removed from the stack.

JavaScript is a single-threaed lanuage. The engine always executes the function that's on the top of the execution stack.

So now we know that in JavaScript there are two main execution context types - global and function. They are created by the JavaScript engine and stored in the execution stack (call stack). Their goal is to describe the environment in which code is executed.

You might be wondering what, exactly, envrionment means.

### Execution Context Structure

First of all, we need to define the structure of the execution context. It can be represented as an object with three properties:

Execution context structure

```js
ExecutionContext = {
    ThisBinding: <this>,
    LexicalEnvironment: { ... },
    VariableEnvironment: { ... },
}
```

Let's figure out what each property means and then discuss the context creation and execution steps.

#### This binding

In the global execution context, `this` holds a reference to the global object. In the browser, it's a `window` object.

`ThisBinding` in global execution context

```js
function global() {
  console.log(this);
}

global(); // Window { ... }
```

In the function exectuion context, the value of `this` depends on how the function is called. If it's called as a method of an object, the value of `this` is set to that object. Otherwise, the value of `this` is set to the global object or `undefined` (in strict mode).

ThisBinding in function execution context

```js
const object = {
  method: function () {
    console.log(this);
  },
};

object.method(); // Object { ... }
```

When using an arrow function, `this` is not bound at all. It just inherits from the paraent execution context (callee).

ThisBinding in Arrow Functions

```js
const object = {
    arrowFnMethod: () => {
        console.log(this) // parent context is global
    }
    methodWithArrowFn: function() {
        const arrowFn = () => console.log(this)
        arrowFn() // parent context is function
    }
}

object.arrowFnMethod() // Window { ... }
object.methodWithArrowFn() // Object { ... }
```

### Lexical environment

The Lexical Environment consists of two entries:

- Environment Record - a structure that maps identifiers to their values within the scope of its associated Lexical Environment. Such records store values of identifiers with `let` or `const` keywords.

- Outer reference - holds a reference to the parent Lexical Environment. It means that the JavaScript engine can look for variable inside the outer environment if they are not found in the current Lexical Environment.

In the global execution context, `outer` reference is set to `null`. In the Environment Record, embedded lanuage entities are available (such as object, array, and so on) as well as global variables, which you define.

Global Execution Context (Lexical Environment)

```js
let number = 10

function addFive(number) {
    const five = 5
    return number + five
}

addFive(number)

// Globla Execution Context
{
    ThisBinding: Window,
    LexicalEnvironement: {
        EnvironmentRecord: {
            // Global entities ...
            number: 10,
            addFive: function { ... },
        },
        Outer: null
    },
    VariableEnvironment: { ... }
}
```

In the function execution context, `outer` reference is set to the parent Lexical Environment. It could be a global or function context, depending on where the function is called. Variable declared by the user inside the function are stored in its Environment Record as well as in `arguments` array-like object.
