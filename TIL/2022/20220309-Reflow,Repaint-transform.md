# \***\*Reflow, Repaint Chromium 입장에서 살펴보기 (왜 transform은 빠를까?)\*\***

[https://devsdk.github.io/ko/development/2021/03/08/ReflowRepaint.html](https://devsdk.github.io/ko/development/2021/03/08/ReflowRepaint.html)

**1. Reflow, Repaint, Layout, Paint, Composite**

**Layout**

웹브라우져에는 사실 DOM Tree 말고 렌더 스테이지에서 중요한 역할을 하는 트리가 하나 더 있다. 화면에 실제로 그리기 위해 박스모델과 좌표 계산이 끝난 상태인 Layout Tree라는 것을 관리한다. 이는 DOM Tree와 대응되지 않으며, display : none인 경우에는 아예 Layout Tree에 제외되기도 한다. 이러한 내용이 궁금하다면 [여기](https://docs.google.com/presentation/d/1boPxbgNrTU0ddsc144rcXayGA_WF53k96imRH8Mp34Y/edit#slide=id.ga884fe665f_64_528)를 살펴보면 좋을 것 같다. layout 단계 혹은 reflow는 **이 트리를 전체 혹은 일부를 새로 구성하는 것**을 의미한다. layout이 발생한다는 경우에 대해서는 [이곳에서](https://sites.google.com/site/getsnippet/javascript/dom/repaints-and-reflows-manipulating-the-dom-responsibly) 리스트업을 하지만 브라우져 레벨에서 **“항상” layout이 발생하는 것은 아니다.** 예로 CSS Animation을 들 수 있다.

**Paint**

위에서 만든 LayoutTree를 순회하며 Paint Command를 만들고 [SKIA](https://skia.org/) 레스터라이저한테 전달하는 단계이다. 이를 추상화하고 줄여서 설명하면 **Layout Tree를 화면에 그리는 단계**라고 이해해도 좋을 것 같다. 여기서 layout 트리에 대응되는 computed style에서 color와 같은 값을 가져와서 화면을 그리게 된다. 이 단계 또한 매우 방대하며, 관심 있다면 [이 문서](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/paint/README.md#Current-compositing-algorithm-CompositeBeforePaint)를 보도록 하자.

**Composite**

Composite은 각각의 분리 가능한 레이어를 분리해서 처리한 뒤 합성하는 것이다. 거시적인 관점에서 **Composite는 Main Thread (Message Queue)에서 벗어나서 다른 Thread Flow를 가지고 화면을 업데이트** 할 수 있다. 즉 비동기적으로 실행된 후 기존 레이어에 합성된다. 주로 animation과 scroll 등등에서 활용되며, 다른 Thread Flow를 가지기 때문에 main thread에서 block이 일어나도 composite만 사용하는 애니메이션은 계속 재생될 수 있다.

Composition에 대해서는 [이곳에](https://devsdk.github.io/ko/development/2021/03/29/blink-render-composition.html) 정리를 해두었다.

**2. CSS Animation**

CSS Animation은 공짜가 아니며 브라우져의 리소스를 사용한다.

CSS Animation은 공짜가 아니며 브라우져의 리소스를 사용한다.

[https://csstriggers.com/](https://csstriggers.com/)

위 사이트는 CSS Animation이 렌더 스테이지에서 어떤 단계를 trigger 하는지 보여준다.

여기서 Layout > Paint > Composite 순으로 cost가 높으며 composite만 있다면 Message Queue와 무관하게 동작하므로 매우 좋은 애니메이션 타겟이 될 수 있다.

**3. 왜 transform을 이용하면 빠를까?**

transform을 사용한 예시중 첫번째 div는 최종 composite에서 [transformation matrix](https://en.wikipedia.org/wiki/Transformation_matrix)를 통해 렌더링 되기 전 composite thread에서 GPU의 도움을 받아 계산된다. 아주 빠른 연산이 비동기적으로 일어나 매우 빠른 속도를 보여준다. 어떤 연산이 일어나는지는 [표준을](https://drafts.csswg.org/css-transforms/#mathematical-description) 참고하자. 심지어 Main Thread가 다른 태스크에 의해 block 되어도 재생된다.

left를 사용한 아래 예시는 layout→composite.assign->paint의 절차를 모두 밟게 된다. 즉 애니메이션으로 사용되기엔 꽤 비싼 cost를 가지고 있다는 소리다. (Paint → Composite 는 현재 [Chromium의 주요 프로젝트중](https://bugs.chromium.org/p/chromium/issues/detail?id=471333) 하나이다. CAP (Composition After Paiting)이라고 불린다.)

여기서 즐거운 결론을 낼 수 있다. animation에서 만약 같은 결과를 내는 코드라면 **composite만 사용하는 애니메이션 (i.e.transform)**을 애용하자.

compositor는 전달받은 역할을 비동기적으로 실행함.

이런 이유 때문에 composite만 사용하는 애니메이션은 alert와 같이main thread가 block 된 상황에서도 정상적으로 렌더 수행이 진행됨.
