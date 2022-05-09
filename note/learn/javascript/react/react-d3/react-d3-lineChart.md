# react-d3 line chart

```
import React, { useRef, useEffect, useState } from "react";
import { select, utcParse } from "d3";
import styled from "styled-components";

const Wrapper = styled.svg`
  background-color: grey;
`;

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

  }, [data]);

  return (
    <>
      <Wrapper ref={svgRef}>
        <path d="M0, 150, 100, 100, 150, 120" stroke="blue" fill="none" />
      </Wrapper>
      <button onClick={() => setData(data.map(value => value + 5))}>
        update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        filter data
      </button>
    </>
  );
}

export default App;

```

라인차트를 그리는 기본 원리를 보여주는 코드이다.
svg 태그 안에 path 태그를 추가한다. 그 안에서 그래프를 그리게 된다.
d 속성은 '그리는' 속성을 정의하게 된다.

path 부분을 지우고,
d3 에서 line 을 가져와서 그래프를 그리기 시작한다.

```
import React, { useRef, useEffect, useState } from "react";
import { select, line, curveLinear } from "d3";
import styled from "styled-components";

const Wrapper = styled.svg`
  background-color: grey;
`;

function App() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    // 여기서 Line 은 함수가 된다. 데이터에 기반해 path 엘리먼트의 d 속성을 생성한다.
    const Line = line()
      .x((value, index) => index * 50)
      .y(value => 150 - value)
      .curve(curveLinear);


    // 여기서 data([data]) 와 같이 array 에 담는 이유는 각 데이터마다의 path 를 생성할 것이 아니기 때문이다.
    // 하나의 path 에서 data 들을 그려낼 것이기 때문에 data 를 array 에 담아서 전달한다.

    // join("path") 는 각 데이터 entry 마다의 path 생성.
    svg
      .selectAll("path")
      .data([data])
      .join("path")
      // 여기서 value 는 data 를 가져와서 쓰게 된다.
      .attr("d", value => Line(value))
      .attr("fill", "none")
      .attr("stroke", "blue")
      ;
  }, [data]);

  return (
    <>
      <Wrapper ref={svgRef} />
      <button onClick={() => setData(data.map(value => value + 5))}>
        update data
      </button>
      <button onClick={() => setData(data.filter(value => value < 35))}>
        filter data
      </button>
    </>
  );
}

export default App;

```

d3 에서 line 을 가져와서 작업을 진행한다.
selectAll("path") 을 통해서 path 를 그릴 것을 설정하고,
data([data]) 를 통해 그릴 데이터를 담는다.
join("path") 를 통해 각 데이터 entry 마다의 패스를 그릴 것을 설정하고,
attr 를 통해 데이터를 Line() 에 전달한다.
그 후 색과 선을 정의한다.

Line 함수에서 x, y 축에서 데이터를 사용할 방식을 정의할 수 있고, curve() 를 통해 원하는 형태의 선을 사용할 수 있다.
d3 에서 제공하는 여러 curve 중에서 선택해서 사용하면 된다.

x: A coordinate accessor function which returns the x-coordinate value. The x accessor will be invoked for each defined element in the input data array, being passed the element d, the index i, and the array data as three arguments.

y: A coordinate accessor function which returns the y-coordinate value. The y accessor will be invoked for each defined element in the input data array, being passed the element d, the index i, and the array data as three arguments.

에디터에서 마우스를 올려보면 각 요소들의 뜻과 함께 기본적인 작동원리를 설명한다. 그것을 기반으로 데이터를 잘 활용해서 써야겠다.
