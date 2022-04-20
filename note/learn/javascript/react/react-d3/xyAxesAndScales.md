# x, y 축과 축척선

지난 포스팅의 라인차트 그리기 코드에서 시작합니다.

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
    const Line = line()
      .x((value, index) => index * 50)
      .y(value => 150 - value)
      .curve(curveLinear);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => Line(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
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

x축(axis) 를 그리기 위해 d3 에서 axisBottom 를 가져온다.

```
import { select, line, curveLinear, axisBottom } from "d3";

const xAxis = axisBottom()
```

axisBottom 은 함수이며 scale 값을 필요로 한다.
d3 에서 scaleLinear 를 가져온다.

```
import { select, line, curveLinear, axisBottom, scaleLinear } from "d3";

const xScale = scaleLinear()
```

scaleLinear 는 두가지 값을 필요로 한다.  
domain: 데이터의 input value, index 값이다. 보여줄 데이터의 index 범위를 설정한다고 생각할 수 있다.  
현재 프로그램에서 데이터의 인덱스는 0~6 이므로 domain([0, 6]) 으로 쓸 수도 있고,  
domain([0, data.length - 1]) 로 쓸 수도 있다.  
range: 그래프가 그려질 폭을 정의한다.  
기존 라인차트의 x 축이 index \* 50 으로 정의되어 있으므로, range([0, 300]) 으로 사용가능 하다.

xScale 을 작성한 뒤, 라인 차트에서 다음과 같이 사용할 수 있다.

```
useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    const xAxis = axisBottom();

    const Line = line()
      .x((value, index) => xScale(index))
      .y(value => 150 - value)
      .curve(curveLinear);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", value => Line(value))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
```

y 축 역시 그려지는 범위를 생각하여 domain 과 range 를 파악하여 작성한다.  
domain 은 0 부터, 그릴 최고값까지를 정의한다.  
현재 데이터에서 가장 높은 값은 75 이므로 domain 의 범위를 75 까지 그릴 수 있도록 한다.  
이렇게하면 그래프가 svg 를 꽉 채우게 되므로, 이 값을 여유롭게 잡아서 설정할 수도 있다.  
그리고 range 는 현재 150 - value 인 것을 range([150, 0]) 와 같이 구현한다.

```
    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);
```

yScale 을 라인에 반영하고, svg 역시 다음과 같이 수정한다.

```
  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear()
      .domain([0, 75])
      .range([150, 0]);
    const xAxis = axisBottom();

    const Line = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveLinear);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", Line)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
```

그리고 x축에 xScale 을 반영한다.  
축을 그릴때는 d3 에게 svg 에서 x축이 그려질 위치를 알려줘야 한다.
이 부분은 까다로우며, 여러가지 방식이 존재한다.  
아래 방식은 그 중 하나이다.  
현재 프로그램에서 필요한 것은 x, y 축 뿐이므로
svg 내에서 group elements 를 그리고, className 을 설정한다.
그 후 svg 에서 해당 class 요소를 select 하고, xAxis 를 불러오도록 한다.

```
    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").call(xAxis);

    // Wrapper 는 svg 를 styled-components 로 감싼것이다. svg 로 진행하면 된다.
    <Wrapper ref={svgRef}>
        <g className="x-axis" />
    </Wrapper>
```

이렇게 하면 svg 내에서 bottom 이 아닌 top 에 축이 그려진다.  
이것은 axisBottom 이 알아서 svg 내에서 bottom position 에 그려주는 것이 아니기 때문이다.  
style 을 추가해줘야 한다.

```
    svg
      .select(".x-axis")
      .style("transform", "translateY(150px")
      .call(xAxis);
```

이렇게 설정하면 svg 내부의 요소들이 사라진다.  
svg 의 css 의 overflow 를 visible 로 설정하여 확인하면 요소들이 다 같이 아래로 내려가 있는 것을 확인할 수 있다.  
이것은 그래프가 x-axis 클래스 요소 즉 g elements 아래에 생성되기 때문이다.

이것은 svg 를 렌더링할 때 x-axis 클래스를 셀렉트하고, 그 안에서 line path 를 생성하기 때문이다.  
그래서 아래 path 요소를 추가하는 부분을 다음과 같이 수정한다.

```
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", Line)
      .attr("fill", "none")
      .attr("stroke", "blue");
```

svg 에서 path 를 생성할 때 모든 path 를 select 하는게 아닌, line 클래스를 렌더링 할 수 있도록 하고,  
attr("class", "line") 요소를 추가한다.  
이렇게 하면 x축과 그래프 요소들이 잘 나타나는 것을 확인할 수 있다.

y축을 그리기 위해 d3 에서 axisRight 를 가져온다.  
그리고 x축을 그릴때와 비슷한 과정으로 진행한다.  
코드는 다음과 같다.

```
import { select, line, curveLinear, axisBottom, axisRight, scaleLinear } from "d3";

  svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

return (
    <>
      <Wrapper ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </Wrapper>
...
    </>
)
```

축에서 보여주는 눈금들을 정제하기 위해서 ticks 요소를 사용할 수 있다.  
다음과 같이 작성하면 데이터의 index 만큼의 눈금을 보여주게 된다.

```
    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(index => index + 1);
```
