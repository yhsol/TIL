# Why Do React Hooks Rely on Call Order?

- Hooks의 큰그림
  - Hooks 는 고유한 추상화를 만들고 구성할 수 있는 functional mixins 과 같습니다.

```js
const [name, setName] = useState("Mary"); // State variable 1
const [surName, setSurname] = useState("Poppins"); // State variable 2
const [width, setWidth] = useState(window.innerWidth); // State variable 3
```

구조 분해 할당을 통한 `name` 변수는 React 로 전달되지 않음.
대신에, React는 `name`을 "첫 번째 상태 변수"로 취급함. `surName` 은 "두 번째 상태 변수" 와 같은 방식으로 처리가 이어짐.
각 변수의 호출 인덱스는 리렌더링 사이에서 안정적인 아이덴티티를 제공함.
(참고)[https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e]

표면적으로 봤을 때, 콜 인덱스에 의존하는 것은 잘못되어보임.
직감은 유용한 신호이지만 오해의 소지가 있습니다. 특히 해결하려는 문제를 완전히 내면화하지 않은 경우 더욱 그렇습니다.

대안들과 결함

1. 사용자 정의 Hooks를 추출할 수 없음

   - 컴포넌트에서 Hooks 를 여러번 호출하는 것을 막을 경우
     - 커스텀 Hooks 를 사용할 수 없게 됨.
     - But! 여러개의 `useState()` 호출을 지원하는 요점은 컴포넌트에서 stateful logic(state + effects)를 로컬 state 와 effects 에 독립적으로 추출할 수 있도록 하는 것.
     - 구성 요소당 하나의 `useState()` 호출만 허용하면 위의 기능을 잃게 됨.

2. 이름 충돌
   - 또 다른 제안은 고유한 식별자 키 인수(예: 문자열)를 제공하자는 것.
   - 이것은 호출 인덱스에 대한 의존을 피하려고 하지만 또 다른 문제인 이름 충돌이 발생함.
   - 이 제안을 사용하면 상태 변수에 대해 중복 이름이 발생할 수 있고, 이를 사용하는 컴포넌트를 손상시킬 위험이 있음. 변경에 최적화되지 않은 API의 예임. 요구 사항의 변경에 매우 취약함.
   - 실제 Hook 제안은 호출 순서에 의존하여 이 문제를 해결함. 두 Hooks가 이름 상태 변수를 사용하더라도 서로 격리됨. 모든 `useState()` 호출은 자체 "memory cell"을 가져옴.
