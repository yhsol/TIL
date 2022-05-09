# 리액트에서 d3 사용하기

리액트에서 d3 를 활용하는 방법을 공부하며 참고한 영상을 한국어로 요약하여 옮긴 자료입니다.
포스팅의 목적이라기보다는 개인 공부의 정리와 같은 개념으로 작성한 것이라 유려하지 않음을 이해해주세요!

참고한 영상은 https://www.youtube.com/watch?v=9uEmNgHzPhQ 입니다.

리액트와 d3 를 사용하는 방법을 쉽고 친절하게 알려주지만 영어 자막 뿐이라 이 정리가 조금 도움이 될 수도 있겠다는 생각을 하며 작성하였습니다.

먼저 리액트 프로그램을 구성한다.
d3 를 사용할 컴포넌트를 만들고,
그래프를 그리기 위한 공간을 svg element 를 사용하여 구현한다.

tip: svg 는 벡터이미지를 구현하기 위한 포맷이다. w3c 에서 만든 백터 이미지 표준이다. 백터 이미지라는 것은 확대했을 때 깨지지 않는 이미지라고 쉽게 이해할 수 있다. (더 자세히는 구글링!)

```
<svg>

</svg>
```

그리고 svg Dom element 에 접근하기 위해 useRef() 를 사용한다.

```
import React, { useRef, useEffect, useState } from "react";
import { select, utcParse } from "d3";
import styled from "styled-components";

const Wrapper = styled.svg`
  background-color: grey;
`;

function App() {
  const svgRef = useRef();
  return (
    <>
      <Wrapper ref={svgRef}>{}</Wrapper>
    </>
  );
}

export default App;

```

https://codesandbox.io/s/react-d3-7d0yi?fontsize=14&hidenavigation=1&theme=dark

스타일링은 styled-components 를 사용했다.
css 파일로도 작동한다.

그리고 최초 render 후, 즉 mount 후 작업을 진행하기 위해 useEffect() 를 사용한다.

tip: useEffect 는 헷갈리기 쉬운 개념이다. 공식 문서와 함께 Dan Abramov 의 "A Complete Guide to useEffect" 가 많은 도움이 된다.(https://overreacted.io/a-complete-guide-to-useeffect/)

최초 render 가 진행 된 후, useEffect() 가 실행되고, 여기서 svg 에 접근하여 작업하게 된다.

```
 useEffect(() => {
     console.log(svgRef)
 }, [])
```

useEffect 내에서 콘솔에 svgRef 를 출력해보면 current 값을 출력한다.
이것을 활용하여 d3 작업을 진행한다.

d3 에서 svg, ref 를 활용하기 위한 select 를 import 한다.
그리고 svg 를 먼저 정의 했던 svgRef 의 current 값을 select 에 담아서 정의한다.

```
import React, { useRef, useEffect, useState } from "react";
import { select, utcParse } from "d3";
import styled from "styled-components";

const Wrapper = styled.svg`
  background-color: grey;
`;

function App() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
  }, []);

  return (
    <>
      <Wrapper ref={svgRef}>{}</Wrapper>
    </>
  );
}

export default App;

```

그리고 그래프를 그리기 위한 data 를 설정한다.

```
import React, { useRef, useEffect, useState } from "react";
import { select, utcParse } from "d3";
import styled from "styled-components";

const Wrapper = styled.svg`
  background-color: grey;
`;

const data = [25, 30, 45, 60, 20];

function App() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
  }, []);

  return (
    <>
      <Wrapper ref={svgRef}>{}</Wrapper>
    </>
  );
}

export default App;

```

그리고 데이터를 svg 에 담아서 그리기 위해 d3 의 api 를 사용한다.

```
import React, { useRef, useEffect, useState } from "react";
import { select, utcParse } from "d3";
import styled from "styled-components";

const Wrapper = styled.svg`
  background-color: grey;
`;

const data = [25, 30, 45, 60, 20];

function App() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("circle").data(data);

  }, []);

  return (
    <>
      <Wrapper ref={svgRef}>{}</Wrapper>
    </>
  );
}

export default App;

```

svg 에 해당하는 요소를 selectAll("circle") 을 통해 circle 로 그리겠다는 것을 알리고, data 에 정의해둔 data 를 전달한다.

그리고 join 을 통해 요소를 생성한다.

```
import React, { useRef, useEffect, useState } from "react";
import { select, utcParse } from "d3";
import styled from "styled-components";

const Wrapper = styled.svg`
  background-color: grey;
`;

const data = [25, 30, 45, 60, 20];

function App() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join(
        enter => enter.append("circle"),
        update => update.attr("class", "updated"),
        exit => exit.remove()
      );
  }, []);

  return (
    <>
      <Wrapper ref={svgRef}>{}</Wrapper>
    </>
  );
}

export default App;

```

여기까지 진행한 뒤 개발자 도구에서 element 를 확인해보면 svg 내에 circle 요소가 정의한 data 에 맞게 생성된 것을 확인 할 수 있을 것이다.

(아직 d3 api 의 자세한 작동 방법, 사용 방법을 몰라서 추후 추가하도록 해보겠다.)

간단히 말하면 진행과정에 따라 동작을 정의해 둔 것이라고 볼 수 있겠다.
위 예제에서 enter 에 attr 을 추가하고 개발자 도구를 다시 확인해보면 추가한 class 가 나타난 것을 확인할 수 있다.

```
   enter => enter.append("circle").attr("class", "new"),
```

나머지 api 의 작동 확인과 함께 대부분 그래프를 사용할 때 필요할 유동적인 데이터 활용을 위해 useState 를 활용해 data 를 state 에 담는다.

```
  const [data, setDate] = useState([25, 30, 45, 60, 20]);
```

그리고 해당 data 를 업데이트 하기 위해 간단한 버튼을 만들어 setData 를 통해 값을 업데이트 한다.

```
<>
    <Wrapper ref={svgRef} />
    <button onClick={() => setData(data.map(value => value + 5))}>
      update data
    </button>
  </>
```

그리고 그에 맞추어 data 가 업데이트 될 때마다 useEffect() 가 실행될 수 있도록 useEffect 의 dependency 에 data 를 넣는다.

```
 useEffect(() => {
  const svg = select(svgRef.current);
  svg
    .selectAll("circle")
    .data(data)
    .join(
      enter => enter.append("circle").attr("class", "new"),
      update => update.attr("class", "updated"),
      exit => exit.remove()
    );
}, [data]);
```

여기까지 작업 후 update 버튼을 눌러 element 를 확인해보면
class 명이 "updated" 로 변경되는 것을 확인할 수 있다.

ref 와 d3 의 api 를 통해 데이터를 그리고, 데이터의 변경을 반영하여 다시 그리는 작업의 힌트를 얻을 수 있다.

exit 을 확인해보기 위해 filter 기능을 하는 버튼을 작성한다.

```
     <button onClick={() => setData(data.filter(value => value < 35))}>
        filter data
      </button>
```

해당 버튼을 누르고 개발자 도구를 확인해보면 class 는 updated 로 변경되고,
filter 조건에 해당하지 않는 엘리먼트는 사라지는 것을 확인할 수 있다.

기본적인 동작과 순서를 확인했으니 속성(attr) 을 더 추가해 보며 그래프를 그려나간다.

```
 useEffect(() => {
   const svg = select(svgRef.current);
   svg
     .selectAll("circle")
     .data(data)
     .join(
       enter =>
         enter
           .append("circle")
           .attr("class", "new")
           .attr("r", value => value)
           .attr("cx", value => value * 2)
           .attr("cy", value => value * 2)
           .attr("stroke", "blue"),
           // cs -> x-coordinate
       update => update.attr("class", "updated"),
       exit => exit.remove()
     );
 }, [data]);
```

라인을 하나씩 확인해보자.

.attr("r", value => value)
radius 를 추가합니다.

.attr("cx", value => value _ 2)
.attr("cy", value => value _ 2)
x좌표, y좌표를 추가합니다.

.attr("stroke", "blue"),
stroke 속성을 추가합니다.

여기까지 작성 후 개발자 도구를 열고 버튼을 눌러보면 class 명만 변경이 되고 다른 변화는 없다.

이것은 update 에 attr 를 추가하지 않아서 그렇다.
update 에도 enter 와 같은 속성을 추가한다.

```
    update =>
          update
            .attr("class", "updated")
            .attr("r", value => value)
            .attr("cx", value => value * 2)
            .attr("cy", value => value * 2),
```

그런 후 다시 버튼을 눌러보면 button 에 설정한 +5 가 잘 반영되는 것을 확인할 수 있다.

잘 작동하지만 같은 코드를 반복하게 된다.
해결 방법이 있다.

```
 useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join(
        enter => enter.append("circle").attr("class", "new"),
        update => update.attr("class", "updated"),
        exit => exit.remove()
      )
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "blue");
  }, [data]);
```

join 뒤에 다시 이 속성들을 추가하면 enter 와 update 를 한번에 통제할 수 있다.
버튼을 다시 눌러보면 해당 속성들이 잘 적용된 것을 확인할 수 있다.

또한 exit 엘리먼트는 d3 의 default 설정이기 때문에 명시하지 않아도 된다.

```
  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join(
        enter => enter.append("circle").attr("class", "new"),
        update => update.attr("class", "updated")
      )
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "blue");
  }, [data]);
```

마찬가지로 enter 와 update 역시 제거해 줄 수 있다.
update 엘리먼트에 추가된 속성이 class 를 추가하는 것인데 이것이 꼭 필요한 것이 아니라면 제거해도 된다.
enter 역시 같은 이유로 class 추가 속성을 제거해도 되며,
circle 속성을 추가하는 것은 join 에 바로 넣어줄 수 있다.

```

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", value => value)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "blue");
  }, [data]);
```

정리하자면 join 을 통해 circle 을 생성하고,(enter)
업데이트 되었을 때 역시 속성을 반영한다.(update)
data 를 filter 하는 등의 작동을 하게 된다면 역시 속성을 반영하면서,
해당 filter 기능의 동작을 반영한다.(exit)

이렇게 리액트에서 d3 를 사용하는 기본적인 방법을 살펴봤다.
위와 같은 경우 꼭 d3 를 사용하지 않아도 되겠지만, d3 는 많은 시각화에 기초를 제공함으로 의미가 있다고 생각한다.
