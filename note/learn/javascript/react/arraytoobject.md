# array to object

a 배열이 있고, 그 배열을 b 배열에 담아야 한다.
b 배열은 배열이면서 안에는 두개의 값을 가지는 객체를 갖는다.

먼저 a 를 map 해서 b 에 concat 한다.
이렇게 담으면 배열안에 각 배열이 생기고 그 안에 객체가 담긴다.
왜 그러는지는 아직 모르겠다.

아무튼 지금 내가 원하는 값은 [object, object, ...] 의 형태이기 때문에
b 를 다시 map 하고 그 값의 0 번째 값을 가져오면 된다.
이것은 배열 안의 배열이 0 번째 값만 가지고 있기 때문에 0 을 설정하는 것이고,
이렇게 풀어서 작성함으로써 원하던 형태를 구현할 수 있다.

사실 이런 과정 없이 바로 배열 안에 객체를 담을 수 있을 것 같은데 지금은 안된다.

- 해결
  : const c = tHead.map(item => ({ value: item, id: item }));
  위와 같은 방법으로 시도를 했었는데 기존에는
  const c = tHead.map(item => { value: item, id: item });
  의 형태로 시도를 했다. () 가 필요했다.

  참고 링크: https://stackoverflow.com/questions/40348171/es6-map-an-array-of-objects-to-return-an-array-of-objects-with-new-keys

```
import React from "react";
import "./styles.css";

export default function App() {
  const tHead = ["targe1", "targe2", "targe3", "targe4", "targe5", "targe6"];

  let columns = [];

  columns = tHead.map(item =>
    columns.concat({
      id: item,
      value: item
    })
  );

  console.log(columns.map((item, index) => item[0].value));

  const columns_2 = [
    {
      id: "",
      value: ""
    }
  ];
  console.log(columns.map(item => item[0]));
  console.log(columns_2);

  return (
    <div className="App">
      {columns.map((item, index) => (
        <div key={item[0].id}>{item[0].value}</div>
      ))}
      <div>hello world!</div>
    </div>
  );
}
```

해결책 반영

```
import React, form "react";
import "./styles.css";

export default function App() {
  const tHead = ["targe1", "targe2", "targe3", "targe4", "targe5", "targe6"];
  const c = tHead.map(item => ({ value: item, id: item }));
  console.log(c);
  return (
    <div className="App">
      {c.map((item, index) => (
        <div key={item.id}>
          <div>value: {item.value}</div>
          <div>id: {item.id}</div>
        </div>
      ))}
      <div>hello world!</div>
    </div>
  );
}
```
