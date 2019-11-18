# Writing Resilient Components 요약

## Dan Abramov 의 Writing Resilient Components 글의 번역을 요약.

- Lint 를 실제 목적을 잘 확인하면서 씁시다. 그것이 정말 도움이 되는지 확인하고, 도움이 된다면 사용하고, 도움이 아닌 방해가 된다면 제거.
- 유연한 컴포넌트 작성하기
  - 데이터 흐름을 중단해서는 안 됩니다
    - props 사용:
      - props 를 가져오고, 그대로 사용해야 함.
      - props 를 가져오고 그것을 복사해 state 로 둔 뒤 사용할 수 있지만
        그렇게 되면 그 이후 업데이트를 무시하게 됨.
      - 의도적으로 그렇게 사용하는 것이 아니라면 props 를 가져오고 그대로 사용.
      - props 를 계산(여러 작업)을 한 뒤에 사용해야 할 경우, props 를 state 에 복사해서 사용하는 경우가 많다.
        이 경우에도, 이 값과 계산을 render 내에서 하면 된다.
        - 여기서 더 최적화를 하고 싶을 경우 useMemo 를 사용하면 된다.
          useMemo 를 사용하여 입력이 변하기 전에는 다시 계산하지 않는다.
    - 부수효과
      - api 사용
        - 흐름을 끊지 않아야 함. 그리고 일관성을 정적으로 분석할 수 있는 useEffect 사용.

```
function SearchResults({ query }) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    function fetchResults() {
      const url = getFetchUrl();
      // 데이터 가져오기 실행...
    }
    function getFetchUrl() {
      return (
        'http://myapi/results?query' + query +        '&page=' + currentPage      );
    }
    fetchResults();
  }, [currentPage, query]); // ✅ 변경시에 다시 가져오기
  // ...
}
```

        - 컴포넌트를 클래스로 작성하든지 함수로 작성하든지에 관계 없이, 모든 props와 state 변경을 반영하는 것이 중요합니다.
        - useEffect API는 일관성을 위해 기존의 것을 뒤엎었습니다. 처음에는 좀 어색하게 느껴지지만, 결과적으로 여러분의 컴포넌트는 변화에 더 탄력적이 됩니다. 그리고 “종속성”이 명시적이기 때문에, lint 규칙을 이용해 부수효과의 일관성을 검증할 수 있습니다. 버그를 잡기 위해 linter를 사용할 수 있는거죠!
    - 최적화
        - hooks 의 기본적인 기능들을 잘 사용하는 것이 좋다.
        - 그 정도로도 충분히 잘 작동할 것이며, 더 추가하거나 다른 기능을 만들어 사용할 경우 그 기능들을 잘 확인하며 사용해야 한다.

- 언제나 렌더링 할 준비가 되어 있어야 합니다
  - React 컴포넌트는 여러분이 시간의 흐름에 대해 크게 걱정하지 않고도 렌더링 코드를 작성하도록 해줍니다. 여러분이 특정한 시점에 UI가 어때야 하는지 기술하면, React는 그렇게 되도록 해줍니다. 이 모델의 이점을 잘 활용하세요!
- 싱글톤인 컴포넌트는 없습니다
- 항상 지역 상태를 격리하세요
