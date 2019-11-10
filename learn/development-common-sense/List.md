# Interview List

## 개발상식

- 객체 지향 프로그래밍이란 무엇인가?

  - 관리체계, 책장, 데이터, 코드, 복잡도, 정리
  - "객체"라는 Box 에 복잡한 대상(함수, 변수 등)을 잘 정리해 두는 것.
  - 복잡한 것을 함수에 담아서 정리(function Do() { ...복잡 } -> Do() 로 단순화) -> 함수가 다시 복잡(Do1(), Do2(), Do3()) -> 이것을 다시 객체에 정리 -> toy = { Do1(), Do2(), Do3(), ... } -> toy.Do1(), toy.Do2(), toy.Do3()
  - 재사용성이 높아진다. 자주 사용되는 로직을 잘 정리해두면(라이브러리로 만드는 등의 방식으로) 계속 사용할 수 있으며 신뢰성을 확보할 수 있다.
  - 따라서, 디버싱, 유지보수, 데이터 모델링시 객체와 매핑하는 것에 좋다.
  - 역할에 따라서 객체로 나눠서 정리하고, 각 객체에 더해서 가져야 할 특성을 상속을 통해 확장해 추가할 수 있다.
  - 문제
    - 객체가 상태를 갖게 됨.
    - 변수가 존재하고 이 변수를 통해 객체가 예측할 수 없는 상태를 갖게 되어 버그 발생 -> 함수형 프로그래밍 패러디암이 주목받는 이유.
  - 설계 원칙
    - 단일 책임 원칙, 개방-폐쇄 원칙, 리스코프 치환 원칙, 인터페이스 분리 원칙, 의존 역전 원칙

- 함수형 프로그래밍이란?

  - 순수함수, 인풋-아웃풋, 주어지는 역할을 간섭, 참조 없이 수행 -> 결과값에 대한 신뢰 가능,
    독립성, 변수의 부서적인 값 변경등의 오류를 원천 배제
  - 순수함수 - 순수하게 정해진 역할을 수행하는 함수.
  - 선언형. 함수를 값으로 이해, 인자로 사용가능
    var say_it = function(given) { console.log(given) }
    const say_it = (given) => console.log(given)
  - imuutable, 일급 객체, 순수 함수.
  - 리액트의 함수형 컴포넌트를 생각하면 이해가 쉽다.
    예를 들어 어떤 string 이 들어왔을 때 h1 tag 로 감싸서 출력하는 컴포넌트를 작성했다면,
    여기서 이 컴포넌트는 string 이 무엇인지 알 지 못한다.
    그렇지만 정확히 그 string 을 h1 tag 로 감싸서 출력한다.
    이렇게 순수함수의 역할을 하고, 이러한 컴포넌트를 엮어서 프로그래밍을 구성해가는 것을
    함수형 프로그래밍이라고 이해할 수 있지 않을까 생각한다.

- RESTful API 란 무엇인가?

  - API - application programmin interface
    - 소프트웨어가 통신하는 interface
  - RESTful API - http 환경에서 api 를 작성하는 형식. 약속.
  - 리소스는 uri 로 표현하며, 리소스가 가리키는 것은 명사로 명시적으로, 분명하게 써야함.
  - get, post, puth, patch, delete 등을 명확하게 써야함.

- TDD 란 무엇이며 어떠한 장점이 있는가?

  - 테스트 코드를 작성하고, 그 테스트를 통과하는 코드를 작성하는 것.
  - 신뢰도를 높일 수 있고, 리팩토링시에 보다 보장되는 환경에서 할 수 있음.

- MVC 패턴이란 무엇인가?

  ### web browser -> web server -> controller(servlet) -> model(with database, value object) -> cotroller -> view(jsp) -> controller -> seb serber -> web browser

  - MVC 각 컴포넌트의 역할
    - CONTROLLER(컨트롤러)
      - 일종의 조정자
      - 클라이언트의 요청을 받았을 때, 그 요청에 대해 실제 업무를 수행하는 모델 컴포넌트를 호출.
      - 클라이언트가 보낸 데이터가 있다면, 모델에 전달하기 쉽게 데이터 가공.
      - 모델이 업무를 마치면 그 결과를 뷰에게 전달.
    - MODEL(모델)
      - 컨트롤러가 호출할 때, 요청에 맞는 역할을 수행한다.
      - 비즈니스 로직을 구현하는 영역으로, 응용프로그램에서 데이터를 처리하는 부분.
      - 비즈니스 로직이란 업무에 필요한 데이터 처리를 수행하는 응용프로그램의 일부.
      - DB에 연결하고, 데이터를 추출하거나 저장, 삭제, 업데이트, 변환 등의 작업 수행.
      - 상태의 변화가 있을 때 컨트롤러와 뷰에 통보해 후속 조치 명령을 받을 수 있게 한다.
    - VIEW(뷰)
      - 컨트롤러로부터 받은 모델의 결과값을 가지고 사용자에게 출력할 화면을 만드는 일을 한다.
      - 만들어진 화면을 웹브라우저에 전송하여 웹브라우저가 출력하게 하는 것이다.
      - 화면에 표시되는 부분으로 추출한 데이터나 일반적인 텍스트 데이터를 표시하거나
        입력폼 또는 사용자와의 상호작용을 위한 인터페이스를 표시하는 영역이다.

- Git 과 GitHub 에 대해서
  - Git 은 버전관리를 위한 소프트웨어
  - GitHub 는 Git 으로 저장돼서 원격전송된 내역들이 저장되는 공간을 제공하는 서비스.

## 자료구조

- Array vs LinkedList

  - Array 는 순서 그대로 저장한다. 따라서 index 를 통해 해당 원소에 빠르게 접근 할 수 있다.
    그렇지만 삭제, 삽입 시에는 이 순서에 균열이 생기기 때문에 그 균열을 다시 조정해야하는 비용이 발생한다.
  - LinkedLisst 는 자료를 연결하는 지점을 만들어서 저장한다. 따라서 삭제와 삽입을 쉽게 할 수 있다.
    하지만 해당 위치, 원소를 탐색하는 비용이 높다.

- Stack and Queue (선형 구조)

  - Stack 은 나중에 들어간게 먼저 나온다. 차곡차곡 쌓여서 가장 위에 있는 것이 출력됨.
  - Queue 는 먼저 들어간게 먼저 나온다. 먼저 들어간게 가장 앞에 있다가 가장 먼저 출력됨.

- Tree (비 선형 구조)
  - 계층적 관계(Hierarchical Relationship)를 표현하는 자료구조.
  - Node, Edge, Root Node, Terminal Node, Internal Node
  - Binary Tree
  - Full Binary Tree
  - Complete Binary Tree
  - BST (Binary Search Tree)
    - 효율적인 탐색을 위한 저장방법
    - binary search 와 linked list 를 결합한 자료구조의 일종이다.
      이진 탐색의 효율적인 탐색 능력을 유지하면서도, 빈번한 자료 입력과 삭제가 가능하게 하기 위함.
- Binary Heap
  - 자료구조를 효율적으로 관리하는 방법?
  - Red Black Tree - 정의 - 특징 - 삽입 - 삭제
- Hash Table
  - hash function
  - Resolve Collision
    - Open Addressing
    - Separate Chaining
  - Resize
- Graph
  - Graph 용어 정리
  - Graph 구현
  - Graph 탐색
  - Minimum Spanning Tree
    - Kruskal algorithm
    - Prim algorithm

## 네트워크

- GET, POST 방식의 차이점
- TCP 3-way-handshake
- TCP 와 UDP 의 차이점
- HTTP 와 HTTPS 의 차이점

  - HTTP 는 데이터를 주고 받기 위한 통신 프로토콜.
    - 먼저 클라이언트에 접속 -> 클라이언트가 요청 -> 서버가 응답
    - stateless 라서 한번 왔다갔다하면 연결이 끊겨서 불특정 다수를 향한 서비스에 적합.
  - HTTP 의 문제점들

    - 보안
      - 평문 통신 - 도청 가능
      - 통신 상대 확인 하지 않음 - 위장 가능
      - 완정성을 증명할 수 없음 - 변조 가능
    - 해결 방법
      - 통신 자체를 암호화
        SSL(Secure Socket Layer) or TLs(Transport Layer Security) 라는 다른 프로토콜을 조합함으로써
        HTTP 의 통신 내용을 암호화 할 수 있다. SSL 을 조합한 HTTP 를 HTTPS(HTTP Secure) or HTTP over SSL 이라고 한다.
      - 콘텐츠를 암호화
        HTTP 메시지에 포함되는 콘텐츠만 암호화. 암호화해서 전송하면 받는 측에서는 그 암호를 해독하여 출력하는 처리가 필요.

  - HTTPS
    HTTP 에 암호화와 인증, 그리고 완정성 보호를 더한 HTTPS
    - HTTP 는 원래 TCP 와 직접 통신했지만, HTTPS 에서 HTTP 는 SSL 과 통신하고 SSL 이 TCP 와 통신 하게 된다. SSL 을 사용한 HTTPS 는 암호화와 증명서, 안전성 보호를 이용할 수 있게 된다.
    - 모든 웹 페이지에서 HTTPS 를 사용하지 않는 이유
      평문 통신에 비해서 암호화 통신은 CPU 나 메모리 등 리소스가 많이 필요하다. 그렇기 때문에 통신할 때마다 암호화를 하면 서버 한대당 처리할 수 있는 리퀘스트의 수가 줄어든다. 그렇기 때문에 민감한 정보를 다룰 때만 HTTPS 에 의한 암호화 통신을 사용한다.

- DNS round robin 방식
- 웹 통신의 큰 흐름

## 운영체제

- 프로세스와 스레드의 차이
- 스케줄러의 종류
  - 장기 스케줄러
  - 단기 스케줄러
  - 중기 스케줄러
- CPU 스케줄러
  - FCFS
  - SJF
  - SRT
  - Priority scheduling
  - RR
- 동기와 비동기의 차이
- 멀티스레드
  - 장점과 단점
- 프로세스 동기화
  - Critical Section
  - 해결책
- 메모리 관리 전략
  - 메모리 관리 배경
  - Paging
  - Segmentation
- 가상 메모리
  - 배경
  - 가상 메모리가 하는 일
  - Demand Paging(요구 페이징)
  - 페이지 교체 알고리즘
- 캐시의 지역성
  - Locality
  - Caching line

## 데이터베이스

- 데이터 베이스
  - 데이터 베이스를 사용하는 이유
  - 데이터베이스 성능
- index
  - index 란 무엇인가
  - index 의 자료구조
  - Primary index vs Secondary index
  - Composite index
  - Index 의 성능과 고려해야할 사항
- 정규화에 대해서
  - 정규화 탄생 배경
  - 정규화란 무엇인가
  - 정규화의 종류
  - 정규화의 장단점
- Transaction
  - 트랜잭션(Transaction) 이란 무엇인가?
  - 트랜잭션과 Lock
  - 트랜잭션의 특성
  - 트랜잭션의 상태
  - 트랜잭션을 사용할 때 주의할 점
- Statement vs PrepareStatement
- NoSQL
  - 정의
  - CAP 이론
    - 일관선
    - 가용성
    - 네트워크 분할 허용성
  - 저장방식에 따른 분류
    --Value Model
    - Document Model
    - Column Model

## 디자인 패턴

- Singleton

## 알고리즘
