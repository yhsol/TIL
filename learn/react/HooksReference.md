# Hooks 를 이해하고 사용하는데 도움이 된 자료

Hooks 를 배우고, 사용하고, 더 공부해가며 느끼는 것은 리액트의 흐름을 다시 정리하고 이해할 필요가 있다는 것이다.
포스팅들에서도, Dan avramov 도 강조하는 부분이고, 그 부분이 어떤 의미인지 이해를 함으로써 앞으로의 활용에 도움이 된다고 생각한다.
나 역시 아직 아주 깊이 이해하고 있지 못하고, 배워가고 있지만 그럼에도 잘 사용하고 있기도 하고,
그런 이해를 높여가려 하고 있다. 그런 과정에서 도움이 되었던 자료들을 정리해 둔다.

- https://reactjs.org/docs/hooks-intro.html
  역시 공식문서를 보는 것은 중요하다.
  핵심은 꼼꼼히 잘 보는 것.
  처음에는 필요한 기능을 보며 사용해보는 것도 좋지만
  어느 정도 이해가 더 필요하다 싶을 때 다시 천천히 읽으면
  이해를 돕는 부분들이 많다.
  특히, Hooks 만 볼까 하다가 기존의 문서들도 다시 훑어보는데
  그러고 나서 보니 리액트 자체에, 그리고 Hooks 에 대한 이해도에 많은 도움이 되었다.

- https://reactjs.org/tutorial/tutorial.html
  이 튜토리얼은 Hooks 를 처음 써볼 때 활용했다.
  튜토리얼은 기존 클래스 컴포넌트로 작성되어있는데
  Hooks 문서를 보며 기존 코드를 함수형 컴포넌트로 전환하며 연습해 볼 수 있다.

- Dav avramov blog (https://overreacted.io/)

  - https://overreacted.io/a-complete-guide-to-useeffect/
  - https://overreacted.io/how-are-function-components-different-from-classes/
  - https://overreacted.io/react-as-a-ui-runtime/
  - https://overreacted.io/making-setinterval-declarative-with-react-hooks/

  리액트 팀의 Dan avramov 가 블로그에 포스팅한 글인데 많은 도움이 된다.
  글이 긴 편이고, 바로 사용가능한 프랙티스를 전달하기 보다는 그 바탕의 이해를 돕는다.
  개인적으로는 영어이기도 하고, 긴 편이라 끝까지 집중해서 읽기 힘들어서 끊어 읽기도 하고 변역을 활용해서 읽었다.
  Hooks 에 대해, 그리고 Hooks 를 활용하고, 리액트 프로젝트의 구조에 대해 생각해 볼 수 있다.

- https://www.robinwieruch.de/react-hooks-fetch-data/

  - Dan avramov 가 hooks 를 사용한 비동기 처리에 대해 이야기하며 언급한 블로그여서 알게되었다.
    설명이 친절하고 자세하다. 따라하기 좋게 잘 구성되어 있어서 실제로 코드를 작성해가며 실제 사용방법을 배워보기 좋다.
    이 포스팅외에도 리액트에서 상태관리에 대한 포스팅이나 리액트, 자바스크립트 전반에 대해 좋은 포스팅이 많다.

- https://wattenberger.com/blog/react-hooks

  - class 컴포넌트와 function 컴포넌트를 비교하여 보여주는 글이다.
    포스팅의 레이아웃이 좋아서 이해를 돕는다.
    Dan avramov 의 A Complete Guide to useEffect 를 읽고 보면 더 이해하기 좋다고 생각한다.

- https://usehooks.com/
  - 위 포스팅의 마지막 쯤 자신에게 도움이 되었던 자료들을 소개할 때 소개된 사이트이다.
    custom hooks 를 사용하기 위한 실용적인 예들이 있어서 좋다.
    여기 예를 사용하는 것도 좋고, 이것을 힌트로 custom hooks 을 만들어 가도 좋을 것 같다.
