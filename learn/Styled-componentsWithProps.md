# styled-components && typescript 환경에서 props 사용하기

- styled-components 의 좋은 기능 중 하나는 props 를 통한 제어기능이다.
  그런데 이 기능이 자바스크립트에서는 바로 사용가능하지만, 타입스크립트에서는 해당 props 를 지정해줘야 한다.

- 가장 기본적인 사용 방법이고, props 를 통한 제어가 굉장히 많은 것이 아니라면 이정도를 사용해도 좋다고 생각하는 코드는 다음과 같다.

```
  ${(props: { fontsize?: boolean }) =>
    props.fontsize &&
    css`
      font-size: 14px;
    `}
```

- 자주 사용해야 하는 props 들이 있다면 styled.d.ts 과 같은 파일을 만들어서 사용할 props 들의 types 를 지정한 뒤,
  사용할 때 가져와서 사용하는 방법도 있겠다.
