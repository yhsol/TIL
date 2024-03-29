# 리팩터링 2판

- 리팩터링이란
  - 리팩터링은 겉으로 드러나는 코드의 기능(겉보기 동작)은 바꾸지 않으면서 내부 구조를 개선하는 방식으로 소프트웨어 시스템을 수정하는 과정이다.

## Chapter 01

- 리팩터링의 첫 단계는 항상 똑같다. 리팩터링할 코드 영역을 꼼꼼하게 검새하줄 테스트 코드들부터 마련해야 한다.
  리팩터링하기 전에 제대로 된 테스트부터 마련한다. 테스트는 반드시 자가진단하도록 만든다.

- 이 switch문을 살펴보면 한 번의 공연에 대한 요금을 계산하고 있다. 이러한 사실은 코드를 분석해서 얻은 정보다. 워드 커닝햄(Wrad Conningham)이 말하길, 이런 식으로 파악한 정보는 휘발성이 높기로 악명 높은 저장 장치인 내 머릿속에 기록되므로, 잊지 않으려면 재빨리 코드에 반영해야 한다. 그러면 다음번에 코드를 볼 대, 다시 분석하지 않아도 코드 스스로가 자신이 하는 일이 무엇인지 이야기해줄 것이다.

- 이렇게 수정하고 나면 곧바로 컴파일하고 테스트해서 실수한 게 없는지 확인한다. 아무리 간단한 수정이라도 리팩터링 후에는 항상 테스트하는 습관을 들이는 것이 바람직하다.
  (...중략...)
  한 가지를 수정할 때마다 테스트하면, 오류가 생기더라도 변경 폭이 작기 때문에 살펴볼 범위도 좁아서 문제를 찾고 해결하기가 훨씬 쉽다.

- 컴퓨터가 이해하는 코드는 바보도 작성할 수 있다. 사람이 이해하도록 작성하는 프로그래머가 진정한 실력자다.

- aPerformance는 루프 변수에서 오기 때문에 반복문을 한 번 돌 때마다 자연스레 값이 변경된다. 하지만 play는 개별 공연(aPerformance)에서 얻기 때문에 애초에 매개변수로 전달할 필요가 없다. 그냥 amountFor() 안에서 다시 계산하면 된다. 나는 긴 함수를 잘게 쪼갤 때마다 play 같은 변수를 최대한 제거한다. 이런 임시 변수들 때문에 로컬 범위에 존재하는 이름이 늘어나서 추출 작업이 복잡해지기 때문이다.

- hs: 변수를 계산하는 방식으로 변수를 줄였지만 사실 이게 코드를 이해하기 더 수월한가하면 아직은 갸우뚱. 오히려 함수에 매개변수로 명확히 전달해줌으로써 함수가 하는 일을 더 잘 이해할 수 있지 않으려나 싶은 생각.

- 지역 변수를 제거해서 얻는 가장 큰 장점은 추출 작업이 훨씬 쉬워진다는 것이다. 유효범위를 신경 써야 할 대상이 줄어들기 때문이다. 실제로 나는 추출 작업 전에는 거의 항상 지역 변수부터 제거한다.

- 때로는 리팩터링이 성능에 상당한 영향을 주기도 한다. 그런 경우라도 나는 개의치 않고 리팩터링한다. 잘 다듬어진 코드라야 성능 개선 작업도 훨씬 수월하기 때문이다.

- 리팩터링 때문에 성능이 떨어진다면, 하던 리팩터링을 마무리하고 나서 성능을 개선하자.

- 간결함이 지혜의 정수일지 몰라도, 프로그래밍에서만큼은 명료함이 진화할 수 있는 소프트웨어의 정수다. 모듈화한 덕분에 계산 코드를 중복하지 않고도 HTML 버전을 만들 수 있었다.

- hs: 위에 코멘트한 부분을 리팩터링을 진행하면서 이해할 수 있었음. 변수를 줄이고 인라인화 함으로써 각각의 부분을 분리하기가 수월해졌고 그를 바탕으로 각 코드 부분을 모듈화하는데에 도움이 됨.

- 캠핑자들에게는 "도착했을 때보다 깔끔하게 정돈하고 떠난다"는 규칙이 있다. 프로그래밍도 마찬가지다. 항시 코드베이스를 작업 시작 전보다 건강하게(healty) 만들어놓고 떠나야한다.

- hs: 클린코더에서도 비슷한 이야기가 있었고, 인상깊었었다. 거기서는 보이스카웃 규칙이라고 했던거 같긴 한데.

- amoundFor() 함수(switch 구문에서 조건에 따라 amound 를 계산함)를 보면 연극 장르에 따라 계산 방식이 달라진다는 사실을 알 수 있는데, 이런 형태의 조건부 로직은 코드 수정 횟수가 늘어날수록 골칫거리로 전락하기 쉽다. 이를 방지하려면 프로그래밍 언어가 제공하는 구조적인 요소로 적절히 보완해야 한다.

- 조건부 로직을 명확한 구조로 보완하는 방법은 다양하지만, 여기서는 객체지향의 핵심 특성인 다형성(polymorphism)을 활용하는 것이 자연스럽다.

- 이번 작업의 목표는 상속 계층을 구성해서 희극 서브클래스와 비극 서브클래스가 각자의 구체적인 계산 로직을 정의하는 것이다. 호출하는 쪽에서는 다형성 버전의 공연료 계산 함수를 호출하기만 하면 되고, 희극이냐 비극이냐에 따라 정확한 계산 로직을 연결하는 작업은 언어 차원에서 처리해준다.

- hs: 그냥 각각의 상황에 맞는 함수를 만들어도 되지 않을까 하는 생각

- 앞에서 함수를 추출했을 때처럼, 이번에도 구조를 보강하면서 코드가 늘어났다. 이번 수정으로 나아진 점은 연극 장르별 계산 코드들을 함께 묶어뒀다는 것이다. 앞으로의 수정 대부분이 이 코드에서 이뤄질 것 같다면 이렇게 명확하게 분리해두면 좋다. 이제 새로운 장르를 추가하려면 해당 장르의 서브클래스를 작성하고 생성함수인 createPerformanceCalculator()에 추가하기만 하면 된다.

- 하지만 나는 취향을 넘어서는 관점이 분명 존재하며, 코드를 '수정하기 쉬운 정도'야말로 좋은 코드를 가늠하는 확실한 방법이라고 믿는다. 코드는 명확해야 한다. 코드를 수정해야 할 상황이 되면 고쳐야 할 곳을 쉽게 찾을 수 있고 오류 없이 빠르게 수정할 수 있어야 한다.

- 리팩터링을 효과적으로 하는 핵심은, 단계를 잘게 나눠야 더 빠르게 처리할 수 있고, 코드는 절대 깨지지 않으며, 이러한 작은 단계들이 모여서 상당히 큰 변화를 이룰 수 있다는 사실을 깨닫는 것이다.

- hs: 리팩터링 과정을 따라가면서 재밌기도 했고, 의아할 때도 있었고, 오! 할 때도, 이렇게까지..? 라고 할 때도 있었다.
  인상깊은 것은 변수를 제거하면서 코드를 분리하기 좋은 구조로 바꿔나가는 과정이었다. 평소에도 코드를 잘게 쪼개려고 하는 편이기는 하지만 그 과정에서 변수를 줄이며 그 과정을 더 수월하게 할 수 있다는 생각은 못했었다.
  또한 구성을 분리하고, 구조를 정리하고, 파일을 나누는 등의 과정을 거치다보니 자연스레 그간 사용하던 Mobx 나 Nest 의 구조의 형태가 되어가서 반갑기도했다.
  개인적으로는 객체지향보다는 함수형으로 코드를 구성하고 싶어한다. 객체지향을 따라 잘 나눠진 구조는 물론 편리하고, 특히 협업할 때 좋지만 또한 사이드이펙트를 관리해야 하는 부분이 확실하지 않게 느껴지기 때문이다. 그렇지만 물론 프로젝트 전체는 함수형, 객체지향 등의 패러다임의 좋은 부분들이 어우러질 수 있다고 생각하고, 이번 챕터에서도 장점을 확인했기에 다음 장도 잘 따라가 봐야겠다.
