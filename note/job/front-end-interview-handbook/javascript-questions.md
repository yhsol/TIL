# Front End Interview Handbook - JavaScript Questions

1.  Explain event delegation

    - 캡처링과 버블링을 활용하여 이벤트 핸들링 패턴인 이벤트 위임 구현 가능
    - 비슷한 방식으로 여러 요소를 다뤄야 할 때 사용
    - 이벤트 위임을 사용하면 요소마다 핸들러를 할당하지 않고, 요소의 공통 조상에 이벤트 핸들러를 단 하나만 할당해도 여러 요소를 한꺼번에 다룰 수 있음
    - 공통 조상에 할당한 핸들러에서 `event.target`을 이요하면 실제 어디서 이벤트가 발생했는지 알 수 있음. 이를 이용해 이벤트를 핸들링
      => 이벤트 위임을 사용해서 테이블의 아이템마자 붙여놓은 onClick 해결
      => 또는 상위에 핸들러를 하나만 달고 `data-action` 을 지정해서 작업해도 될 듯

2.  Explain how `this` works in JavaScript

    - 대부분의 경우 `this`의 값은 함수를 호출한 방법에 의해 결정됨.
    - 실행중에는 할당으로 설정할 수 없고 함수를 호출할 때 마다 다를 수 있음.
    - ES5는 함수를 어떻게 호출했는지 상관하지 않고 `this` 값을 설정할 수 있는 `bind` 메서드를 도입했고, ES2015는 스스로의 `this` 바인딩을 제공하지 않는 화살표 함수를 추가했음. (이는 렉시컬 컨텍스트안의 `this` 값을 유지함)
    - 값
      - 실행 컨텍스트(global, function 또는 eval)의 프로퍼티는 비엄격 모드에서 항상 객체를 참조하며, 엄격 모드에서는 어떠한 값이든 될 수 있음
    - 전역 문맥

      - 전역 실행 문맥(global execution context)에서 `this`는 엄격 모드 여부에 관계 없이 전역 객체를 참조합니다.

    - 함수 문맥

      - 함수 내부에서 `this`의 값은 함수를 호출한 방법에 의해 좌우됨.
      - 단순 호출

        - 다음 예제는 엄격 모드가 아니며 `this`의 값이 호출에 의해 설정되지 않으므로, 기본값으로 브라우저에서는 `window`인 전역 객체를 참조함.

        ```js
        function f1() {
          return this;
        }

        // 브라우저
        f1() === window; // true

        // Node.js
        f1() === global; // true
        ```

        - 반면에 엄격 모드에서 `this` 값은 실행 문맥에 진입하며 설정되는 값을 유지하므로 다음 예시에서 보여지는 것 처럼 `this`는 `undefined`로 남아있습니다.

        ```js
        function f2() {
          "use strict"; // 엄격 모드 참고
          return this;
        }

        f2() === undefined; // true
        ```

    - `this`의 값을 한 문맥에서 다른 문맥으로 넘기려면 다음 예시와 같이 `call()`이나 `apply()`를 사용

    - 화살표 함수

      - 화살표 함수에서 `this`는 자신을 감싼 정적 범위(lexical context). 전역 코드에서는 전역 객체를 가리킴
      - 참고: 화살표 함수를 `call()`, `bind()`, `apply()`를 사용해 호출할 때 `this`의 값을 정해주더라도 무시함. 사용할 매개변수를 정해주는 건 문제 없지만, 첫 번째 매개변수(`thisArg`)는 `null`을 지정해야 함

3.  Explain how prototypal inheritance works

- 모든 JavaScript 객체는 다른 객체에 대한 참조인 `__proto__` 프로퍼티를 가지고 있다.
- 객체의 프로퍼티에 접근할 때, 해당 객체에 해당 프로퍼티가 없으면 JavaScript 엔진은 객체의 `__proto__` 과 `__proto__`의 `__proto__` 등을 보고 프로퍼티 정의가 있을 때까지 찾고, 만약 객체의 프로퍼티에 접근할 때 해당 객체에 해당 프로퍼티가 없으면 프로토타입 체인 중 하나에 있거나 프로토타입 체인의 끝에 도달할 때까지 찾습니다. 이 동작은 고전적인 상속을 흉내내지만, 실제로 상속보다 위임에 가깝습니다.
  What do you think of AMD vs CommonJS?
  Explain why the following doesn't work as an IIFE: function foo(){ }();. What needs to be changed to properly make it an IIFE?
  What's the difference between a variable that is: null, undefined or undeclared? How would you go about checking for any of these states?
  What is a closure, and how/why would you use one?
  Can you describe the main difference between a .forEach loop and a .map() loop and why you would pick one versus the other?
  What's a typical use case for anonymous functions?
  How do you organize your code? (module pattern, classical inheritance?)
  What's the difference between host objects and native objects?
  Difference between: function Person(){}, var person = Person(), and var person = new Person()?
  What's the difference between .call and .apply?
  Explain Function.prototype.bind.
  When would you use document.write()?
  What's the difference between feature detection, feature inference, and using the UA string?
  Explain Ajax in as much detail as possible.
  What are the advantages and disadvantages of using Ajax?
  Explain how JSONP works (and how it's not really Ajax).
  Have you ever used JavaScript templating? If so, what libraries have you used?
  Explain "hoisting".
  Describe event bubbling.
  What's the difference between an "attribute" and a "property"?
  Why is extending built-in JavaScript objects not a good idea?
  Difference between document load event and document DOMContentLoaded event?
  What is the difference between == and ===?
  Explain the same-origin policy with regards to JavaScript.
  Make this work: duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]
  Why is it called a Ternary expression, what does the word "Ternary" indicate?
  What is "use strict";? what are the advantages and disadvantages to using it?
  Create a for loop that iterates up to 100 while outputting "fizz" at multiples of 3, "buzz" at multiples of 5 and "fizzbuzz" at multiples of 3 and 5
  Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?
  Why would you use something like the load event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?
  Explain what a single page app is and how to make one SEO-friendly.
  What is the extent of your experience with Promises and/or their polyfills?
  What are the pros and cons of using Promises instead of callbacks?
  What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?
  What tools and techniques do you use debugging JavaScript code?
  What language constructions do you use for iterating over object properties and array items?
  Explain the difference between mutable and immutable objects.
  Explain the difference between synchronous and asynchronous functions.
  What is event loop? What is the difference between call stack and task queue?
  Explain the differences on the usage of foo between function foo() {} and var foo = function() {}
  What are the differences between variables created using let, var or const?
  What are the differences between ES6 class and ES5 function constructors?
  Can you offer a use case for the new arrow => function syntax? How does this new syntax differ from other functions?
  What advantage is there for using the arrow syntax for a method in a constructor?
  What is the definition of a higher-order function?
  Can you give an example for destructuring an object or an array?
  ES6 Template Literals offer a lot of flexibility in generating strings, can you give an example?
  Can you give an example of a curry function and why this syntax offers an advantage?
  What are the benefits of using spread syntax and how is it different from rest syntax?
  How can you share code between files?
  Why you might want to create static class members?
