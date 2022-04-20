# JavaScript Interview

1. Understand the JS functions well

- first class citizens
- can be assigned to a variable, passed around as an argument to another function, returned from another
- hoisting

2. Unerstand bind, apply and call

- call
- apply
    - If you know call, you know apply and vice versa.
- bind
    - binding 을 해서 변수에 넣어놓고 쓸 때는 그냥 binding 이 된 채로 사용하게 되는 면에서 
        apollo hooks 사용할 때 초기에 variables 넣어두고 호출 시점에는 변수가 지정되어 있다고 가정하고 쓰는거랑 비슷
        오, 근데 그렇게 되면 그게 중간에(데이터가 변경 됐을 때) variables 가 변하긴 하나보네 bind 된 값도 계속 변하는 건가
        테스트: bind 한 값은 초기에 넣은 변수 그대로 읽음. 즉, 중간에 bind 했던 값이 변경되더라도, 기존 값이 그래도 참조되어 사용됨.
        값이 변경될 경우에는 bind 도 다시 해줘야하는 건가?

3. Understand JavaScript scope well (Closures as well)

- Global scope
- Local Scope/function scope
- Block scope(introduced in ES6)
- Closures
    - JavaScript closure is a function that returns another function.
        - 설명은 currying 에 가까워 보이는데, 이렇게 해도 설명이 되는 건가?
          기존에 이해하기로는, 위의 설명은 currying 이라고 생각했었고,
          클로져는 함수 외부의 값을 참조하는 함수라고 생각했었다.
          사실 클로져와 커링이 유사한 부분이 있어서 겹치는 설명도 가능하다고는 생각.
          다시 정리 필요 할 듯
          - 다시 추가된 설명
            - A closure is a function that returns another function and wraps data.
            - The internal function defined can access the variables defined in the parent function.
