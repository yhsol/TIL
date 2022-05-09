# select 를 활용한 다중 선택

```
import React, { useState, useRef } from "react";

function App() {
  const [lower] = useState(["", "a", "b", "c"]);
  const [upper] = useState(["", "A", "B", "C"]);

  const [lists, setLists] = useState([]);
  const [data, setData] = useState({
    lower: "",
    upper: ""
  });
  const nextId = useRef(0);

  const onChange = e => {
    setData({
      ...data,
      id: nextId.current,
      [e.target.name]: e.target.value
    });
  };

  const onClick = () => {
    setLists(lists.concat(data));
    nextId.current += 1;
    setData({
      lower: "",
      upper: ""
    });
  };

  const onDelete = id => {
    setLists(lists.filter(list => list.id !== id));
  };

  return (
    <div>
      <select onChange={onChange} name="lower">
        {lower.map(data => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </select>
      <select onChange={onChange} name="upper">
        {upper.map(data => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </select>

      <button onClick={onClick}>add</button>

      <div>
        {lists &&
          lists.length !== 0 &&
          lists.map(list => (
            <div key={list.id}>
              <div>lower: {list.lower}</div>
              <div>upeer: {list.upper}</div>
              <button onClick={() => onDelete(list.id)}>X</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
```
