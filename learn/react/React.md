# React

- lifecycle method

  - 컴포넌트 생성
    - constructor -> componentWillMount -> render -> componentDidMount
      - constructor: 생성자 메서드. 여기서 기본 state 정의.
      - componentWillMount: 컴포넌트가 DOM 위에 만들어지기 전에 실행 됨.
      - render: 렌더링을 담당.
      - componentDidMount: 컴포넌트가 만들어지고 첫 렌더링 후에 실행 됨. 여기서 비동기 작업 처리.
  - 컴포넌트 제거
    - componentWillUnmount
  - prop 변경
    - componentWillReceiveProps ->shouldComponentUpdate -> componentWillUpdate-> render ->componentDidUpdate
  - state 변경
    - shouldComponentUpdate

- docs 를 꼼꼼히 읽을 필요.

  - select

    - side menu 를 구현하기 위해 얼마나 이것 저것 해봤는지.
    - selelct 라는 기능이 있는지 몰랐다.

  - list rendering

    - list rendering 을 jsx 안에서 바로 하지 않고 그 전에 함수로 정의 해서 map 을 통한 리스트를 구현해 두고,
      그것을 jsx 안에서 render 해도 된다.
    - map 이 중첩되는 것 보다 가독성도 좋고 docs 에서도 map 이 중첨됨으로 인해 가독성이 떨어질 경우 그렇게 따로 분리해 구현할 것을 권하고 있다.

  - 애플리케이션이 가지는 각각의 state에 대해서

    - state를 기반으로 렌더링하는 모든 컴포넌트를 찾으세요.
    - 공통 소유 컴포넌트 (common owner component)를 찾으세요. (계층 구조 내에서 특정 state가 있어야 하는 모든 컴포넌트들의 상위에 있는 하나의 컴포넌트).
    - 공통 혹은 더 상위에 있는 컴포넌트가 state를 가져야 합니다.
    - state를 소유할 적절한 컴포넌트를 찾지 못하였다면, state를 소유하는 컴포넌트를 하나 만들어서 공통 오너 컴포넌트의 상위 계층에 추가하세요.

  - 역방향 데이터 흐름 추가하기

    지금까지 우리는 계층 구조 아래로 흐르는 props와 state의 함수로써 앱을 만들었습니다. 이제 다른 방향의 데이터 흐름을 만들어볼 시간입니다. 계층 구조의 하단에 있는 폼 컴포넌트에서 FilterableProductTable의 state를 업데이트할 수 있어야 합니다.

    React는 전통적인 양방향 데이터 바인딩(two-way data binding)과 비교하면 더 많은 타이핑을 필요로 하지만 데이터 흐름을 명시적으로 보이게 만들어서 프로그램이 어떻게 동작하는지 파악할 수 있게 도와줍니다.

    현재 상태에서 input box를 체크하거나 키보드를 타이핑할 경우 React가 입력을 무시하는 것을 확인할 수 있습니다. 이는 input태그의 value속성이 항상 FilterableProductTable에서 전달된 state와 동일하도록 설정했기 때문입니다.

    우리가 원하는 것이 무엇인지를 한번 생각해봅시다. 우리는 사용자가 폼을 변경할 때마다 사용자의 입력을 반영할 수 있도록 state를 업데이트하기를 원합니다. 컴포넌트는 그 자신의 state만 변경할 수 있기 때문에 FilterableProductTable는 SearchBar에 콜백을 넘겨서 state가 업데이트되어야 할 때마다 호출되도록 할 것입니다. 우리는 input에 onChange 이벤트를 사용해서 알림을 받을 수 있습니다. FilterableProductTable에서 전달된 콜백은 setState()를 호출하고 앱이 업데이트될 것입니다.
