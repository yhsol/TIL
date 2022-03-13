# [React] Hooks의 순서 의존

Hooks 는 조건문에서 사용할 수 없다. 왜 사용하면 안될까?

Hooks 는 컴포넌트에서 여러번 선언해서 사용할 수 있다. 이것은 고유한 추상화를 만들고, 구성할 수 있는 커스텀 훅 등의 사용에 필수적이다.

한 컴포넌트내에 여러번 선언하여 사용할 수 있다면 각 선언을 구분할 필요가 있다.

React 에서는 각 구분에 호출 인덱스를 활용한다. ‘순서’ 가 유니크한 구별값이 되는 것이다.

이러한 구별값이 필요한 경우에 문자열을 사용하기도 한다. ‘react-query’ 나 ‘recoil’ 의 경우에도 문자열을 구분자로 사용한다. 그렇지만 문자열을 구분자로 사용할 경우 이름 충돌 등 문제의 여지가 있다.

그렇기 때문에 리액트 팀은 호출 인덱스에 의존하여 각 Hooks 를 관리하는 것.

Dan Abramov 는 [Why Do React Hooks Rely on Call Order?](https://overreacted.io/why-do-hooks-rely-on-call-order/) 에서 유니크한 값으로 호출 인덱스를 사용한 이유를 설명하고, 제안되었던 다른 대안들과 그 대안에 대한 설명을 상세히 하고있다.

위 글을 읽다보면 왜 조건문에서 Hooks 를 사용할 수 없는지, 왜 Conditional 이면 안되는지 이해가 된다. 구분자가 흐트러지게 되므로 데이터 역시 흐트러질 수 있기 때문이다.

이에 대해서는 [이 글](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e) 이 도움이 된다.
