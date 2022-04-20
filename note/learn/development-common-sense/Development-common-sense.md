# Development common sense

## OOP - 객체 지향 프로그래밍

    - 인간 중심적 프로그래밍 패러다임.
         - 현실 세계의 사물들을 객체라고 보고 그 객체로부터 개발하고자 하는 애플리케이션에 필요한 특질을 뽑아와 프로그래밍 하는 것이다. 이것을 추상화라고 한다.

    - OOP 로 코드를 작성하면 재사용성을 높일 수 있다.
        - 자주 사용되는 로직을 라이브러리로 만들어두면 계속해서 사용할 수 있으며 그 신뢰성을 확보할 수 있다.
        - 객체 단위로 코드가 나눠져 작성되기 때문에 디버깅이 쉽고 유지보수에 좋다.
        - 데이터 모델링을 할 때 객체와 매핑하는 것이 수월하기 때문에 요구사항을 명확하게 파악하여 프로그래밍 할 수 있다.

    - 문제
        - 객체가 상태를 갖게 됨.
            - 변수가 존재하고 이 변수를 통해 객체가 예측할 수 없는 상태를 갖게 되어 애플리케이션 내부에서 버그를 발생시킨다는 것.

    - 객체 지향적 설계 원칙
        1 - SRP(Single Responsibility Principle) : 단일 책임 원칙
            클래스는 단 하나의 책임을 가져야 하며 클래스를 변경하는 이유는 단 하나의 이유이어야 한다.
        2 - OCP(Open-Closed Principle) : 개방-폐쇄 원칙
            확장에는 열려 있어야 하고 변경에는 닫혀 있어야 한다.
        3 - LSP(Liskov Substitution Principle) : 리스코프 치환 원칙
            상위 타입의 객체를 하위 타입의 객체로 치환해도 상위 타입을 사용하는 프로그램은 정상적으로 동작해야 한다.
        4 - ISP(Interface Segregation Principle) : 인터페이스 분리 원칙
            인터페이스는 그 인터페이스를 사용하는 클라이언트를 기준으로 분리해야 한다.
        5 -DIP(Dependency Inversion Principle) : 의존 역전 원칙
            고수준 모듈은 저수준 모듈의 구현에 의존해서는 안된다.

## RESTful API

### 월드 와이드 웹(World Wide Web a.k.a WWW)과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식으로 자원을 정의하고 자원에 대한 주소를 지정하는 방법 전반에 대한 패턴

    - https://www.edwith.org/boostcourse-web/lecture/16740/
    - REST란, REpresentational State Transfer 의 약자이다.
    - api - application programmin interface
    - 말 그대로, REST 형식의 API
    - 핵심 컨텐츠 및 기능을 외부사이트에서 활용할 수 있도록 제공되는 인터페이스.
    - REST 6 가지 원칙
        Uniform Interface
        Stateless
        Caching
        Client-Server
        Hierarchical system
        Code on demand

    - RESTful 하게 API 를 디자인 한다는 것.
        1. 리소스와 행위를 명시적이고 직관적으로 분리
            - 리소스는 uri 로 표현. 리소스가 가리키는 것은 명사로 표현.
            - 행위는 HTTP Method 로 표현.
                GET / POST / PUT / PATCH / DELETE 을 분명한 목적으로 사용.
        2. Message 는 Header 와 Body 를 명확히 분리해서 사용.
            - Entity 의 내용은 body 에 담는다.
            - 애플리케이션 서버가 행동할 판단의 근거가 되는 컨트롤 정보인 API 버전 정보,
                응답받고자 하는 MIME 타입 등은 header 에 담는다.
            - header 는 http header 와 http body 로 나눌 수도 있고,
                http body 에 들어가는 json 구조로 분리할 수도 있다.
        3. API 버전을 관리한다.
            - 환경은 항상 변하기 때문에 API 의 signature 가 변경될 수도 있음을 유의해야 함.
            - 특정 API 를 변경할 때는 반드시 하위호환성을 보장해야 한다.
        4. 서버와 클라이언트가 같은 방식을 사용해서 요청하도록 한다.
            - 브라우저는 form-data 형식의 submit 으로, 서버에서는 json 형태로 보내는 식의 분리보다는
                둘다 json 으로 보내든, 둘다 form-data 형식으로 보내든 하나로 통일한다.
            - 다른 말로 표현하자면 URI 가 플랫폼 중립적이어야 한ㄷ.

    - 장점
        1. Open API 를 제공하기 쉽다.
        2. 분산환경에는 부적합하다.
        3. HTTP 통신 모델에 대해서만 지원한다.

## TDD

### 요구되는 새로운 기능에 대한 테스트 코드 작성, 해당 테스트를 통과하는 가장 간단한 코드 작성, 그 후 상황에 맞게 리팩토링

## FP - 함수형 프로그래밍

### immutable data 와 first class citizen 으로서의 function

    - first-citizen(일급객체)
        - 함수형 프로그래밍 패러다임을 따르고 있는 언어에서의 함수는 일급객체로 간주된다. 일급 객체라 함은 다음과 같다.
            - 변수나 데이터 구조안에 함수를 담을 수 있어서 함수의 파라미터로 전달할 수 있고, 함수의 반환값으로 사용할 수 있다.
            - 할당에 사용된 이름과 관계없이 고유한 구별이 가능하다.
            - 함수를 리터럴로 바로 정의 할 수 있다.

## MVC Pattern

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

## git and github
