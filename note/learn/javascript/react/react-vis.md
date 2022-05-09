# react-vis

- react-vis 는 최대한 기존 리액트의 문법과 가깝게 만들기 위해 노력했다고 한다.  
   그리고 그 노력이 잘 느껴지는 퀄리티를 제공한다.  
   예시로 제공되는 코드를 보면 리액트의 컴포넌트를 쓰는것과 거의 동일한 방식으로 작동된다.  
   추가로 데이터를 넣는 경우에는 props 를 전달하듯이 데이터를 전달하면 된다.

  공식 문서를 확인하여 사용법을 배워가며 필요한 정보들을 기록해둔다.

- install:  
   npm install react-vis or yarn add react-vis

- XYPlot:
  모든 react-vis cahrt 는 XYPlot 안에 위치한다.  
   heigth, width 는 필수값이다.

  차트 요소들(series, axes, gridlines, etc. are other components) 은 XYPlot 의 children 이 된다.

- Scales and data

  - Data
    react-vis의 차트는 Series components (LineSeries, BarSeries and so on and so forth.) 로 이루어져 있다.  
     각 차트는 data 를 필요로 한다.  
     data 는 객체의 배열 형태로 전달한다. (array of objects)

    이러한 값은 해당 마크의 다양한 시각적 특성에 해당됩니다.  
     예를들어, 대부분의 seriese type 에서 필요로 하는 x,y 는 각 마크의 위치에 영향을 줍니다.  
     각 series type 은 더 많은 프로퍼티를 필요로 할 수 있으며, 이것은 각 series section 에 설명되어 있습니다.

  - Scales
    scales 는 데이터 객체의 프로퍼티 값을 시각적으로 변환하는 것을 의미합니다.

    react-vis 는 react-vis 가 한 것을 사용자가 덮어쓰기를 원하기 전까지는  
     최대한 사용자가 아무것도 하지 않아도 되도록 디자인했다고 하고 있습니다.

    scales 의 개념은 d3.js 에서 가져옵니다.

    스케일은 각 데이터 포인트를 마크의 시각적 특성으로 변환하므로 주어진 속성에 대해 해당 데이터 속성이 존재하는 경우에만 작동합니다. 데이터 포인트의 속성은 속성과 이름이 같아야합니다.  
     데이터 포인트 객체에 원하는 모든 속성을 가질 수 있지만 왼쪽에서 오른쪽으로 마크를 배치하려면 ax 속성이 필요합니다.

    - Scale properties
      scale 을 재정의하고자 할 경우,  
       해당 scale 을 사용하고자 하는 series 에 props 를 전달해야 합니다.
      props 이름은 name + Domain, name + Range, name + Type, name + Padding 속성의 이름을 기준으로합니다 (예 : yDomain, colorType, xRange).  
       (자세한 사항은 문서 참조.)

    - Overriding scales
      - scales 는 XYPlot 레벨에서 정의할 수 있으며, 이렇게 정의된 경우 차트 전체에 적용되거나 series 수준에서 적용됩니다.
      - series 레벨에서 정의 된 scale 은 XYPlot 레벨에서 정의 된 scale 보다 우선합니다.

- x,y 축의 type
  - 기본적으로 XYPlot 의 x, y 타입은 number 로 설정되어 있는 듯 하다.
  - 그렇기 때문에 다른 데이터 타입을 넣을 경우 에러 발생.
  - 이때, xType 과 같이 설정을 넣을 수 있다. xType="ordinal" 과 같이 속성을 추가하면 string 데이터를 사용할 수 있다.
