# clean-code-javascript

[qkraudghgh/clean-code-javascript-ko](https://github.com/qkraudghgh/clean-code-javascript-ko)

`이 글은 소프트웨어 방법론에 관한 책들 중 Robert C. Martin's의 책인 Clean Code에 있는 내용을 JavaScript 언어에 적용시켜 적은 글 입니다. 이 글은 단순히 Style Guide가 아니라 JavaScript로 코드를 작성할때 읽기 쉽고, 재사용 가능하며 리팩토링 가능하게끔 작성하도록 도와줍니다.`

위의 설명대로 해당 글은 클린코드를 자바스크립트에 적용시켜 참고할 수 있도록 작성되어있다. 전에도 봤었지만 새삼 코드의 크기가 커지고 협업을 하며 보다 여러가지 의미에서 효율적이 코드를 생각해보게 되면서 참고할 만한 부분을 찾아보게 되었다.

여기서 소개하고 있는 내용들은 지키고 있는 것도 있고, 아닌 것도 있다. 동의가 되는 것도 있고, 아닌 것도 있으며, 이해가 되는 것도 있고, 아닌 것도 있다. 현재 시점에 나에게 도움이 되는 내용들을 짧게 기록해두려고 한다.

- [문맥상 필요없는 것들을 쓰지 마세요](https://github.com/qkraudghgh/clean-code-javascript-ko#%EB%AC%B8%EB%A7%A5%EC%83%81-%ED%95%84%EC%9A%94%EC%97%86%EB%8A%94-%EA%B2%83%EB%93%A4%EC%9D%84-%EC%93%B0%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94)

  - 어찌보면 당연한 것인데 조금 더 명시적이고자 하는 의도로 부연해서 붙이고 싶은 생각이 들 때가 있다. 역시 참는게 좋겠다.

- [함수 인자는 2개 이하가 이상적입니다](https://github.com/qkraudghgh/clean-code-javascript-ko#%ED%95%A8%EC%88%98-%EC%9D%B8%EC%9E%90%EB%8A%94-2%EA%B0%9C-%EC%9D%B4%ED%95%98%EA%B0%80-%EC%9D%B4%EC%83%81%EC%A0%81%EC%9E%85%EB%8B%88%EB%8B%A4)

  - 2개 이하가 이상적이지만 그보다 많을 경우도 존재한다. 그럴 경우에 글에서 소개하듯이 되도록 비구조화 구문을 사용하는 것이 좋다고 생각한다. 타입스크립트 사용시에도 보다 효과적으로 인텔리센스의 도움을 받을 수 있다.

- [매개변수로 플래그를 사용하지 마세요](https://github.com/qkraudghgh/clean-code-javascript-ko#%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98%EB%A1%9C-%ED%94%8C%EB%9E%98%EA%B7%B8%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80-%EB%A7%88%EC%84%B8%EC%9A%94)
  - 플래그를 통해 함수의 동작을 분기하는 것은 편리하기도 하고, 언뜻 잘 묶여있는 듯한 느낌도 주지만 함수 자체를 나눌 수 있다면 보다 명확해 질 것이라고 생각한다.
