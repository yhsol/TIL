# React Fiber

참고

- [https://immigration9.github.io/react/2021/05/29/react-fiber-architecture.html](https://immigration9.github.io/react/2021/05/29/react-fiber-architecture.html)
- [https://simsimjae.tistory.com/472?category=384814](https://simsimjae.tistory.com/472?category=384814)
- [https://simsimjae.tistory.com/473](https://simsimjae.tistory.com/473)

### **Introduction**

React core 알고리즘 재구성.

Fiber의 목적은 animation, layout, gesture와 같은 여역들에 있어서 React의 적합성을 확보하기 위함. 주요 주제는 점증적 렌더링(incremental rendering)으로, 렌더링 작업을 chunk 단위로 나눈 뒤 여러 프레임에 수행하는 것을 의미함.

이와 더불어 새로운 업데이트가 들어올 때 기존의 작업을 멈추거나, 정지하거나, 재사용하는 기능들을 포함함. 이 외에도 다른 종류의 업데이트에 우선순위를 부여하거나, 새로운 동시성 모드를 위한 초기 작업들이 포함됨.

### 사전 필요 항목

더 읽기 전에 아래 리소스들에 충분히 익숙해지길 추천한다.

[React Components, Elements, and Instances](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html): “Component”는 지나치게 다양하게 사용되는 단어다. 이런 용어에 대한 확고한 이해는 매우 중요하다.

[Reconciliation](https://facebook.github.io/react/docs/reconciliation.html): React 재조정 알고리즘에 대한 고레벨 수준의 설명

[React Basic Theoretical Concepts](https://github.com/reactjs/react-basic): React의 개념적 모델에 대한 설명. 처음 읽을 때는 몇가지 항목들이 이해가 가지 않을 수 있다. 괜찮다, 읽으면 읽을 수록 이해가 된다.

[React Design Principles](https://facebook.github.io/react/contributing/design-principles.html): 특히 스케쥴링 항목에 대해 집중해볼 것.

### React Fiber

리액트의 코어 알고리즘을 재구현한 것. 리액트의 렌더링은 애니메이션에서 불안한 모습을 보였음.

리액트로 애니메이션을 구현하면 리액트 내부적으로 작동하고 있는 렌더링 알고리즘이 추가로 돌기 때문에 퍼포먼스 이슈가 있었음.

리액트의 Fiber는 이런 문제를 해결해줌.

incremental rendering이라고 불리는 이 방식은 하나의 큰 렌더링 작업을 여러개의 작은 렌더링 작업으로 나누어서 실행함. 이런 방식으로 리액트의 렌더링 알고리즘이 자바스크립트의 메인 쓰레드를 전부 차지하지 못하게 막아줌.

원래 기존의 리액트 reconciliation은 재귀적으로 동작하기 때문에 중간에 멈출수가 없었음. 그래서 이 reconciliation 작업이 오래걸리면 16ms 내에 프레임을 찍어내지 못해서 화면이 끊기는 현상이 발생.

Fiber는 async reconciliation 임. browser가 idel한 상태가 되었을 때 잘게 나눠진 렌더링 작업을 조금씩 실행하는 구조. 브라우저의 requestIdleCallback이라는 API를 사용함.

### 리액트의 렌더링 로직, reconciliation

리액트 컴포넌트가 화면에 렌더링 되는 과정

1. 리액트의 JSX가 React.createElement로 바벨에 의해 트랜스파일링됨.
2. React.createElement함수 호출에 의해 리액트 엘리먼트 트리가 반환됨.
3. React의 reconciliation 알고리즘에 의해 리액트 엘리먼트 트리를 재귀적으로 순회하면서 이전 트리와 현재 트리의 변경사항을 비교한 다음 변경된 부분만 실제 DOM에 반영함 (Virtual-DOM)

![https://blog.kakaocdn.net/dn/bnWwD4/btqGexjfADe/GWh2KY6PKrn3QPr7dXWlk1/img.gif](https://blog.kakaocdn.net/dn/bnWwD4/btqGexjfADe/GWh2KY6PKrn3QPr7dXWlk1/img.gif)

![https://blog.kakaocdn.net/dn/rJmXg/btqGdLWNC9q/tJ0w8uPOaztVyqyIkck80k/img.gif](https://blog.kakaocdn.net/dn/rJmXg/btqGdLWNC9q/tJ0w8uPOaztVyqyIkck80k/img.gif)

위 그림에서 애니메이션이 끊기는 이유는 싱글스레드인 자바스크립트 엔진이 삼각형 내부에 있는 수많은 숫자들을 업데이트하느라 애니메이션을 실행시키지 못했기 때문임. Fiber는 렌더링을 잘게 나누어 브라우저가 Idle한 상태일 때 조금씩이지만 렌더링을 꾸준히 하기 때문에 16ms마다 프레임이 찍힐 수 있게 해줌. 그래서 화면이 끊기지 않는 것.

### 기존 reconciliation의 약점과 React Fiber의 등장 배경

이런 알고리즘은 애니메이션에 약함

1. UI에서는 모든 변경사항을 즉시 반영할 필요가 없음.
2. 데이터에 의한 UI변경보다 애니메이션에 의한 UI변경이 더 우선순위가 높음.

v16 이전의 리액트는 이런 부분을 잘 처리하지 못했음.

이전버전의 리액트에서 reconciliation이 재귀적으로 일어난다고했다. 재귀적이라는 말은 중간에 함수 호출을 끊을 수 없다는 것. 무조건 리액트 엘리먼트를 전부 다 순회할 때까지 자바스크립트 엔진을 독차지하게 된다.

근데 만약에 이런 상황에 애니메이션이 비동기로 동작하고 있다면? 애니메이션이 제때 실행되지 못해서 프레임이 누락됨. 16ms내에 프레임 하나를 찍어내야 화면이 부드럽게 보임. 실제로는 브라우저의 다른 추가 작업들 때문에 10ms내에 프레임을 찍어야내야 함.

컴포넌트는 props 혹은 state 가 변경되면 리렌더링 됨. 리렌더링이 될 때마다 위에 적은 3가지 과정이 계속해서 반복됨. 리액트에게 화면을 렌더링하기까지 매 순간 주어지는 시간은 10ms 이다. 이 시간 내에 프레임을 찍어야한다.

따라서, 트리를 전부 순회할때까지 멈추지 않는 기존의 reconciliation 방식은 변경될 필요가 있었음. 그래서 등장한 것이 Fiber.

### React Fiber의 등장

Fiber를 한마디로 얘기하면 다음과 같다.

- 자체 가상 스택을 사용하는 작업 단위

React Fiber가 등장하면서 스택을 재 구현했음. 하난의 Fiber는 하나의 가상 스택 프레임을 차지하는 작업의 단위. 기존의 엔진에 구현된 스택에서는 스택 프레임에 있는 실행 컨텍스트를 멈췄다가 다시 재개하고 이런 작업을 할 수 없었음. 위 문제를 해결하려면 스택을 재 구현해야 했음.

재귀는 멈출 수 없기에 Fiber는 재귀 대신 연결리스트를 사용함. 작업이 끝나면 그 다음 작업을 링크를 타고 가서 하면 되는 것.

React의 Element와 React Fiber Node는 1:1로 대응됨. 하나의 엘리먼트를 렌더링하는 것을 하나의 작은 단위인 Fiber로 맵핑시킨것.

### 두 종류의 Fiber

current fiber, in progress fiber 두 종류가 있는데 현재 피버는 이미 렌더링 된 것을 나타내고 진행 중인 fiber는 현재 스택 프레임을 차지하며 렌더링이 진행중이 fiber를 나타낸다.
