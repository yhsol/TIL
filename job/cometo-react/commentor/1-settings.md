# commentor settings

## commentor 는 좋아하는 영화(다양한 콘텐츠로 확장 가능) 에 자신의 의견을 쉽게 기록해 두기 위한 프로그램 입니다.

- 계획

  - 구글 검색과 같이 간결한 디자인과 직관적인 사용을 위해 단순하지만 강력한 UI 를 고민.
  - 검색을 통해 영화를 찾고, 그것에 의견을 기록 -> 기록한 영화와 의견은 프로필을 통해 아카이브.
  - 추가적으로 인기있는 영화, 최근 개봉 영화등에 대한 정보 제공.
  - 추후 sns 와 같이 소통할 수 있는 플랫폼으로 확장 가능.

- 프로그램 세팅

  - React.js / typescript / redux / styled-components 를 기본 구성으로 함.

  - 함수형 프로그래밍 패러다임을 react 에 적용하기 위한 노력

    - hooks 의 도입으로 시도해 볼 수 있겠다는 생각.
    - 컴포넌트들은 최대한 duck typing 방식을 사용.
    - 필요한 로직, 기능들은 최대한 쪼개서 custom hooks 를 구현해서 사용함.
    - custom hooks 들은 각각의 state 를 갖지 않고 독립적으로 작동할 수 있도록 구현함. 값이 필요한 경우 prosp 를 통해 제공.
    - 단순화한 custom hooks 들을 component 에서 객체 지향에서 추구하는 효율을 이뤄낼 수 있도록 엮으려 노력함.

  - testing

    - 코드의 작성 전 또는 후에 테스팅 코드 작성.
    - 조금 더디더라도 효울적인 테스팅 방법을 배우고 고민하기 위해 노력함.

  - typescript

    - typescript 를 효율적으로 쓰기 위한 고민.
    - 중복되는 타입들은 상속, 제너릭의 효율적인 사용.

  - redux

    - redux 를 효울적으로 사용할 수 있는 hooks 들을 적극 활용.

  - css

    - 기본적으로 styled-components 를 사용.
    - rebass 등을 섞어서 사용 시도.
    - 부분적으로 material-ui 사용.
      - css 라이브러리를 사용해보지 않았기 때문에 궁금했던 것과,
        해당 도구들을 사용함으로써 수월하게 프로토타이핑이 가능 할 것이라는 생각에 사용 시도.

  - api

    - movie api 사용.
    - axios instance 와 hooks 를 조합해서 다양한 api 를 편하게 사용할 수 있는 도구 빌드.
    - 기존의 axios instance 와 dan avramov 의 useEffect 를 사용 예를 조합해서 만들어둔 패턴을 다듬기.

  - code review
    - 스스로 code review & 할 수 있다면 기록.
