# [react] controlled, uncontrolled component

input 은 ui 를 구성하면 자주 사용하게 되는 요소이다. input 을 만들다보면 가끔 “uncontorlled” 에 대한 에러메시지를 보게되는데 value 를 넣어주거나 하는 등의 작업을 하면 에러는 사라지지만 늘 명확하게 무엇때문인지 명확하지 않았다.

마침 즐겨 보는 블로그에 [관련 글](https://www.robinwieruch.de/react-controlled-components)이 올라왔길래 정리해둔다.

uncontrolled:input field 가 참조하는 state 가 해당 컴포넌트에 속한것이 아닐때라고 이해하면 쉬울 듯 하다. 예를 들어 아래와 같은 input filed 는 값을 입력하더라도 해당 값을 통해 작업하는 로직이 코드에 없고, ui에 값을 출력하지 않는다.

```jsx
<input type="text" />
```

```jsx
<input type="text" onChange={handleChange} />
```

state 값을 설정하고, change 함수를 연결한다. 이렇게 하고 change 로 변경되는 값을 ui 에 출력하게 하면 값이 잘 출력된다. 그렇지만 해당 컴포넌트는 아직 uncontrolled 컴포넌트이다. 지금의 input field 는 컴포넌트에 명시된 value 가 아닌 input field 내부의 state 값을 track 하기 때문이다.
 여기까지의 작업으로도 충분히 input 의 역할을 하는 것 같지만 controlled 컴포넌트가 필요한 이유는 uncontrolled 컴포넌트의 경우 의도하지 않은 작동(unwanted behavior) 이 생길 수 있기 때문이다. 

그 대신 신뢰가능한 state, props 를 통해 view 를 만들어낼 수 있다. (**UI from one source of truth)**

그렇기에 value 를 컴포넌트 내의 소스코드내에 정의하고, input field 에게도 참조해야할 value 를 명시해주어 controlled 컴포넌트를 만들 수 있다.

```jsx
<input type="text" value={value} onChange={handleChange} />
```

정리하자면 controlled 컴포넌트는 다음과 같이 표현할 수 있을 것 같다.

(props, state) => view.

[https://codesandbox.io/s/late-platform-hfpkr?fontsize=14&hidenavigation=1&theme=dark](https://codesandbox.io/s/late-platform-hfpkr?fontsize=14&hidenavigation=1&theme=dark)

ref:

[[react] controlled, uncontrolled component]()