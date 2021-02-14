# [What is a Reducer in JavaScript/React/Redux?](https://www.robinwieruch.de/javascript-reducer)

it's from [What is a Reducer in JavaScript/React/Redux?](https://www.robinwieruch.de/javascript-reducer)

위 아티클에서 타입스크립트 및 useState 와 함께 reducer 로 state 를 변경하고, 화면에 출력하는 것 추가.

아래는 두개의 코드로 나눠서 작성을 했다.
하나는 State 와 Action 의 타입을 나눠서 정의한 것이고,
다른 하나는 State 와 Action 을 하나의 Reducer 타입으로 묶어서 정의한 것이다.
어느쪽이 더 좋은지는 고민 + 조사가 필요할 듯하다.

개인적으로는 쓰는쪽에서 intellicense 등을 활용한다면 하나의 Reducer 타입으로 묶는 것이 통일성 측면에서 더 좋지 않나 싶다.

```tsx
import { useState } from "react";
import "./styles.css";

enum CounterTypesEnum {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
}

interface CounterState {
  count: number;
}
interface CounterAction {
  type: CounterTypesEnum;
}

enum PersonTypesEnum {
  INCREASE_AGE = "INCREASE_AGE",
  CHANGE_LASTNAME = "CHANGE_LASTNAME",
}

interface PersonState {
  firstname: string;
  lastname: string;
  age: number;
}

interface PersonAction {
  type: PersonTypesEnum;
  payload: {
    lastname: string;
  };
}

const counterReducer = (state: CounterState, action: CounterAction) => {
  switch (action.type) {
    case CounterTypesEnum.INCREASE:
      return { ...state, count: state.count + 1 };
    case CounterTypesEnum.DECREASE:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const personReducer = (state: PersonState, action: PersonAction) => {
  switch (action.type) {
    case PersonTypesEnum.INCREASE_AGE:
      return { ...state, age: state.age + 1 };
    case PersonTypesEnum.CHANGE_LASTNAME:
      return { ...state, lastname: action.payload.lastname };
    default:
      return state;
  }
};

export default function App() {
  const [counter, setCounter] = useState({ count: 0 });
  const [person, setPerson] = useState({
    firstname: "test-firstname",
    lastname: "test-lastname",
    age: 0,
  });

  function changeCount(type: CounterTypesEnum) {
    return function () {
      setCounter(counterReducer({ count: counter.count }, { type }));
    };
  }

  function changePerson(type: PersonTypesEnum) {
    return function () {
      setPerson(
        personReducer(person, { type, payload: { lastname: "test-payload" } })
      );
    };
  }
  return (
    <div className="App">
      <div>{counter.count}</div>
      <div>{`${person.firstname} ${person.lastname} ${person.age}`}</div>
      <div>
        <button onClick={changeCount(CounterTypesEnum.INCREASE)}>
          change counter increase
        </button>
        <button onClick={changeCount(CounterTypesEnum.DECREASE)}>
          change counter decrease
        </button>
      </div>
      <div>
        <button onClick={changePerson(PersonTypesEnum.INCREASE_AGE)}>
          change person increase age
        </button>
        <button onClick={changePerson(PersonTypesEnum.CHANGE_LASTNAME)}>
          change person change lastname
        </button>
      </div>
    </div>
  );
}
```

```tsx
import { useState } from "react";
import "./styles.css";

enum CounterTypesEnum {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
}

interface Counter {
  state: {
    count: number;
  };
  action: {
    type: CounterTypesEnum;
  };
}

enum PersonTypesEnum {
  INCREASE_AGE = "INCREASE_AGE",
  CHANGE_LASTNAME = "CHANGE_LASTNAME",
}

interface Person {
  state: {
    firstname: string;
    lastname: string;
    age: number;
  };
  action: {
    type: PersonTypesEnum;
    payload: {
      lastname: string;
    };
  };
}

const counterReducer = ({ state, action }: Counter) => {
  switch (action.type) {
    case CounterTypesEnum.INCREASE:
      return { ...state, count: state.count + 1 };
    case CounterTypesEnum.DECREASE:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const personReducer = ({ state, action }: Person) => {
  switch (action.type) {
    case PersonTypesEnum.INCREASE_AGE:
      return { ...state, age: state.age + 1 };
    case PersonTypesEnum.CHANGE_LASTNAME:
      return { ...state, lastname: action.payload.lastname };
    default:
      return state;
  }
};

export default function App() {
  const [counter, setCounter] = useState({ count: 0 });
  const [person, setPerson] = useState({
    firstname: "test-firstname",
    lastname: "test-lastname",
    age: 0,
  });

  function changeCount(type: CounterTypesEnum) {
    return function () {
      setCounter(
        counterReducer({ state: { count: counter.count }, action: { type } })
      );
    };
  }

  function changePerson(type: PersonTypesEnum) {
    return function () {
      setPerson(
        personReducer({
          state: person,
          action: { type, payload: { lastname: "test-payload" } },
        })
      );
    };
  }
  return (
    <div className="App">
      <div>{counter.count}</div>
      <div>{`${person.firstname} ${person.lastname} ${person.age}`}</div>
      <div>
        <button onClick={changeCount(CounterTypesEnum.INCREASE)}>
          change counter increase
        </button>
        <button onClick={changeCount(CounterTypesEnum.DECREASE)}>
          change counter decrease
        </button>
      </div>
      <div>
        <button onClick={changePerson(PersonTypesEnum.INCREASE_AGE)}>
          change person increase age
        </button>
        <button onClick={changePerson(PersonTypesEnum.CHANGE_LASTNAME)}>
          change person change lastname
        </button>
      </div>
    </div>
  );
}
```
