# Interview List

## 개발상식

- 객체 지향 프로그래밍이란 무엇인가?

  - 관리체계, 책장, 데이터, 코드, 복잡도, 정리
  - "객체"라는 Box 에 복잡한 대상(함수, 변수 등)을 잘 정리해 두는 것.
  - 복잡한 것을 함수에 담아서 정리(function Do() { ...복잡 } -> Do() 로 단순화) -> 함수가 다시 복잡(Do1(), Do2(), Do3()) -> 이것을 다시 객체에 정리 -> toy = { Do1(), Do2(), Do3(), ... } -> toy.Do1(), toy.Do2(), toy.Do3()
  - 재사용성이 높아진다. 자주 사용되는 로직을 잘 정리해두면(라이브러리로 만드는 등의 방식으로) 계속 사용할 수 있으며 신뢰성을 확보할 수 있다.
  - 따라서, 디버싱, 유지보수, 데이터 모델링시 객체와 매핑하는 것에 좋다.
  - 문제
    - 객체가 상태를 갖게 됨.
    - 변수가 존재하고 이 변수를 통해 객체가 예측할 수 없는 상태를 갖게 되어 버그 발생 -> 함수형 프로그래밍 패러디암이 주목받는 이유.
  - 설계 원칙
    - 단일 책임 원칙, 개방-폐쇄 원칙, 리스코프 치환 원칙, 인터페이스 분리 원칙, 의존 역전 원칙

- 함수형 프로그래밍이란?

  - 순수함수, 인풋-아웃풋, 주저이즌 역할을 간섭, 참조 없이 수행 -> 결과값에 대한 신뢰 가능,
    독립성, 변수의 부서적인 값 변경등의 오류를 원천 배제
  - 선언형. 함수를 값으로 이해, 인자로 사용가능
    var say_it = function(given) { console.log(given) }
    const say_it = (given) => console.log(given)
  - imuutable, 일급 객체, 순수 함수.

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
- Stack and Queue
- Tree
  - Binary Tree
  - Full Binary Tree
  - Complete Binary Tree
  - BST(Binary Search Tree)
- Binary Heap
  --Black Tree - 정의 - 특징 - 삽입 - 삭제
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
- T-handshake
- TCP 와 UDP 의 차이점
- HTTP 와 HTTPS 의 차이점
  - HTTP 의 문제점들
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
