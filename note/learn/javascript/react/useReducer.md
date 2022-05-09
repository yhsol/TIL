# useReducer

- useReducer hook

    ```jsx
    const [state, dispatch] = useReducer((state, action) => {
    	// something logic
    }, {});

    // or

    const [state, dispatch] = useReducer(reducer, initialState);
    ```

- useReducer 는 state 와 dispatch 를 return 하고 그를 위해 reducer 와 initialstate 를 필요로 한다.
- reducer 는 순수함수로써, state 와 action 을 통해 state 값을 변경시키는 등의 작동을 한다.
- reducer 는 정의된 action 의 type 과 payload 등에 따라 필요한 작업을 진행한다. 보통 액션 타입들을 정한 뒤, reducer 에서 switch 를 통해 각각의 작업을 분기해 작동할 수 있도록 한다.

- 균형을 잘 잡는 것이 필요하다는 생각을 한다. useState 만으로 충분하다면 useState 를 사용하는 것을, 또는 오히려 너무 복잡해지면 redux 를 쓰는 것을 생각할 수 있어야 할 듯 하다. 그리고 그 사이의 너무 단순하거나 혹은 매직 같지 않으면서도, 너무 복잡하지 않은 로직으로 설계할 수 있도록 사용할 방법에 대한 생각 역시 필요할 듯 하다.

- 정의

    ```jsx
    type State = {
    	count: number;
    };

    type Action = 
    	| {type: "increment"}
    	| {type: "decrement"}

    const initialState: State = {count: 0};

    function reducer(state: State, action: Action) {
      switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
          return {count: state.count - 1};
        default:
          throw new Error();
      }
    }

    function Counter() {
      const [state, dispatch] = useReducer(reducer, initialState);
      return (
        <>
          Count: {state.count}
          <button onClick={() => dispatch({type: 'decrement'})}>-</button>
          <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
      );
    }
    ```