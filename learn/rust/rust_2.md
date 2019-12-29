let, match, 메소드, 연관함수(assiciated functions), 외부 크레이트(external crates) 활용 방법.

```
$ cargo new guessing_game --bin
$ cd guessing_game
```

- cargo new
  cargo new는 프로젝트의 이름 (guessing_game)을 첫번째 인자로 받습니다. --bin 플래그는 Cargo가 바이너리용 프로젝트를 생성하도록 합니다.
  cargo new는 "Hello, world!" 프로그램을 생성합니다. src/main.rs 파일을 살펴보면 다음과 같습니다.

src/main.rs 를 다시 열어 두세요. 이 파일에 모든 코드를 작성할 것입니다.

- use std::io;
  사용자 입력을 받고 결과값을 표시하기 위해서는 io (input/output) 라이브러리를 스코프로 가져와야 합니다.
  io 라이브러리는 std라고 불리는 표준 라이브러리에 있습니다.

```
use std::io;
```

러스트는 모든 프로그램의 스코프에 prelude 내의 타입들을 가져옵니다.
만약 여러분이 원하는 타입이 prelude에 없다면 use문을 활용하여 명시적으로 그 타입을 가져와야 합니다.
std::io는 사용자의 입력을 받는 것을 포함하여 io와 관련된 기능들을 제공합니다.

- main
  main 함수는 프로그램의 진입점입니다.

- fn

```
fn main() {
```

fn 문법은 새로운 함수를 선언하며 ()는 인자가 없음을 나타내고 {는 함수 본문의 시작을 나타냅니다.

- 이 코드는 게임에 대한 설명과 사용자의 입력을 요청하는 글자를 표시합니다.

```
println!("Guess the number!");

println!("Please input your guess.");

```

- 값을 변수에 저장하기
  - let: 러스트에서 변수는 기본적으로 불변.
  - mut: mut을 이용하여 가변변수

```
let foo = 5; // immutable
let mut bar = 5; // mutable
```

- 타입 String
  String은 표준 라이브러리에서 제공하는 확장 가능한(growable) UTF-8 인코딩의 문자열 타입입니다.

- 연관함수
  ::new에 있는 ::는 new가 String 타입의 연관함수 임을 나타냅니다.
  연관함수는 하나의 타입을 위한 함수이며, 이 경우에는 하나의 String 인스턴스가 아니라 String 타입을 위한 함수입니다.
  몇몇 언어에서는 이것을 정적 메소드 라고 부릅니다.

- new
  new 함수는 새로운 빈 String을 생성합니다. new 함수는 새로운 값을 생성하기 위한 일반적인 이름이므로 많은 타입에서 찾아볼 수 있습니다.
  요약하자면 let mut guess = String::new(); 라인은 새로운 빈 String 인스턴스와 연결된 가변변수를 생성합니다.

- stdin
  프로그램에 첫번째 라인에 use std::io; 를 이용하여 표준 라이브러리의 input/output 기능을 포함한 것을 떠올려 보세요.
  이제 우리는 io의 연관함수인 stdin을 호출합니다.

```
io::stdin().read_line(&mut guess)
.expect("Failed to read line");
```

만약 프로그램 시작점에 use std::io가 없다면 함수 호출 시 std::io::stdin처럼 작성해야 합니다.
stdin 함수는 터미널의 표준 입력의 핸들(handle)의 타입인 std::io::Stdin의 인스턴스를 돌려줍니다.

- read_line()
  코드의 다음 부분인 .read_line(&mut guess)는 사용자로부터 입력을 받기 위해 표준 입력 핸들에서 .read_line(&mut guess) 메소드를 호출합니다.
  또한 read_line에 &mut guess 를 인자로 하나 넘깁니다.

read_line은 사용자가 표준 입력에 입력할 때마다 입력된 문자들을 하나의 문자열에 저장하므로 인자로 값을 저장할 문자열이 필요합니다.
그 문자열 인자는 사용자 입력을 추가하면서 변경되므로 가변이어야 합니다.

- & 참조자
  &는 코드의 여러 부분에서 데이터를 여러 번 메모리로 복사하지 않고 접근하기 위한 방법을 제공하는 참조자 임을 나타냅니다.
  참조자는 복잡한 특성으로서 러스트의 큰 이점 중 하나가 참조자를 사용함으로써 얻는 안전성과 용이성입니다.
  참조자는 변수처럼 기본적으로 불변.
  따라서 가변으로 바꾸기 위해 &guess가 아니라 &mut guess로 작성해야 합니다.

- expect()

```
.expect("Failed to read line");

```

- Result
  Result 타입으로 잠재된 실패 다루기
  이전에 언급한 것처럼 read_line은 우리가 인자로 넘긴 문자열에 사용자가 입력을 저장할 뿐 아니라 하나의 값을 돌려 줍니다.
  여기서 돌려준 값은 io::Result 입니다.
  러스트는 표준 라이브러리에 여러 종류의 Result 타입을 가지고 있습니다.
  제네릭 Result이나 io:Result가 그 예시입니다.

Result 타입은 열거형(enumerations)로써 enums 라고 부르기도 합니다.
열거형은 정해진 값들만을 가질 수 있으며 이러한 값들은 열거형의 variants 라고 부릅니다.

Result의 variants는 Ok와 Err입니다.
Ok는 처리가 성공했음을 나타내며 내부적으로 성공적으로 생성된 결과를 가지고 있습니다.
Err는 처리가 실패했음을 나타내고 그 이유에 대한 정보를 가지고 있습니다.

이러한 Result는 에러 처리를 위한 정보를 표현하기 위해 사용됩니다.
Result 타입의 값들은 다른 타입들처럼 메소드들을 가지고 있습니다.
io::Result 인스턴스는 expect 메소드를 가지고 있습니다.
만약 io::Result 인스턴스가 Err일 경우 expect 메소드는 프로그램이 작동을 멈추게 하고 expect에 인자로 넘겼던 메세지를 출력하도록 합니다.
만약 read_line 메소드가 Err를 돌려줬다면 그 에러는 운영체제로부터 생긴 에러일 경우가 많습니다.
만약 io::Result가 Ok 값이라면 expect는 Ok가 가지고 있는 결과값을 돌려주어 사용할 수 있도록 합니다.
이 경우 결과값은 사용자가 표준 입력으로 입력했던 바이트의 개수입니다.

만약 expect를 호출하지 않는다면 컴파일은 되지만 경고가 나타납니다.
러스트는 read_line가 돌려주는 Result 값을 사용하지 않았음을 경고하며 일어날 수 있는 에러를 처리하지 않았음을 알려줍니다.
이 경고를 없애는 옳은 방법은 에러를 처리하는 코드를 작성하는 것이지만 만약 문제가 발생했을 때 프로그램이 멈추길 바란다면 expect를 사용할 수 있습니다.

- println! 변경자(placeholder)를 이용한 값 출력

println!("You guessed: {}", guess);
이 라인은 사용자가 입력한 값을 저장한 문자열을 출력합니다.
{}는 변경자로써 값이 표시되는 위치를 나타냅니다.
{}를 이용하여 하나 이상의 값을 표시할 수도 있습니다.
첫번째 {}는 형식 문자열(format string) 이후의 첫번째 값을 표시하며, 두번째 {}는 두번째 값을 나타내며 이후에도 비슷하게 작동합니다.
다음 코드는 println!을 이용하여 여러 값을 표시하는 방법을 보여줍니다.

```

let x = 5;
let y = 10;

```

println!("x = {} and y = {}", x, y);
이 코드는 x = 5 and y = 10을 출력합니다.

- using crate
  크레이트(Crate)를 사용하여 더 많은 기능 가져오기
  크레이트는 러스트 코드의 묶음(package)임을 기억하세요.
  우리가 만들고 있는 프로젝트는 실행이 가능한 binary crate 입니다.
  rand crate는 다른 프로그램에서 사용되기 위한 용도인 library crate 입니다.

Cargo에서 외부 크레이트의 활용이 정말 멋진 부분입니다.
rand를 사용하는 코드를 작성하기 전에 Cargo.toml 을 수정하여 rand 크레이트를 의존 리스트에 추가해야 합니다.
파일을 열고 Cargo가 여러분을 위해 생성한 [dependencies] 절의 시작 바로 아래에 다음 내용을 추가하세요.

```
Filename: Cargo.toml

[dependencies]

rand = "0.3.14"
```

Cargo.toml 파일에서 하나의 절의 시작 이후의 모든 내용은 그 절에 포함되며 이는 다음 절이 나타날 때까지 동일합니다.
[dependencies] 절은 여러분의 프로젝트가 의존하고 있는 외부 크레이트와 각각의 요구 버전을 Cargo에 명시하는 곳입니다.
지금의 경우 우리는 rand 크레이트의 유의적 버전인 0.3.14을 명시했습니다.
Cargo는 버전을 명시하는 표준에 해당하는 Semantic Versioning(semver)을 이용합니다.
0.3.14는 ^0.3.14의 축약형이 되며 이는 버전 0.3.14와 호환되는 API를 제공하는 모든 버전임을 의미합니다.

이제 Listing 2-2처럼 코드 수정 없이 프로젝트를 빌드 해 봅시다.

```
\$ cargo build
Updating registry `https://github.com/rust-lang/crates.io-index`
Downloading rand v0.3.14
Downloading libc v0.2.14
Compiling libc v0.2.14
Compiling rand v0.3.14
Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
Finished dev [unoptimized + debuginfo] target(s) in 2.53 secs

```

Listing 2-2: rand 크레이트를 의존성으로 추가한 후 cargo build 를 실행한 결과

이제 우리는 외부 의존성을 가지게 되었고, Cargo는 Crates.io 데이터의 복사본인 레지스트리(registry) 에서 모든 것들을 가져옵니다. Crates.io는 러스트의 생태계의 개발자들이 다른 사람들도 이용할 수 있도록 러스트 오픈소스를 공개하는 곳입니다.

레지스트리를 업데이트하면 Cargo는 [dependencies] 절을 확인하고 아직 여러분이 가지고 있지 않은 것들을 다운 받습니다. 이 경우 우리는 rand만 의존한다고 명시했지만 rand는 libc에 의존하기 때문에 libc도 다운 받습니다. 러스트는 이것들을 다운받은 후 컴파일 하여 의존성이 해결된 프로젝트를 컴파일합니다.

- 재현 가능한 빌드를 보장하는 Cargo.lock
  Cargo는 여러분뿐만이 아니라 다른 누구라도 여러분의 코드를 빌드할 경우 같은 산출물이 나오도록 보장하는 방법을 가지고 있습니다. Cargo는 여러분이 다른 의존성을 추가하지 전까지는 여러분이 명시한 의존 패키지만을 사용합니다. 예로 rand 크레이트의 다음 버전인 v0.3.15에서 중요한 결함이 고쳐졌지만 당신의 코드를 망치는 변경점(regression) 이 있다면 어떻게 될까요?

이 문제의 해결책은 여러분이 처음 cargo build를 수행할 때 생성되어 이제 guessing_game 디렉토리 내에 존재하는 Cargo.lock 입니다. 여러분이 처음 프로젝트를 빌드할 때 Cargo는 기준을 만족하는 모든 의존 패키지의 버전을 확인하고 Cargo.lock 에 이를 기록합니다. 만약 여러분이 미래에 프로젝트를 빌드할 경우 Cargo는 모든 버전들을 다시 확인하지 않고 Cargo.lock 파일이 존재하는지 확인하여 그 안에 명시된 버전들을 사용합니다. 이는 여러분이 재현가능한 빌드를 자동으로 가능하게 합니다. 즉 여러분의 프로젝트는 Cargo.lock 덕분에 당신이 명시적으로 업그레이드하지 않는 이상 0.3.14를 이용합니다.

- 크레이트를 새로운 버전으로 업그레이드하기
  만약 당신이 정말 크레이트를 업데이트하고 싶은 경우를 위해 Cargo는 update 명령어를 제공합니다. 이것은 Cargo.lock 파일을 무시하고 Cargo.toml 에 여러분이 명시한 요구사항에 맞는 최신 버전을 확인합니다. 만약 이 버전들로 문제가 없다면 Cargo는 해당 버전을 Cargo.lock 에 기록합니다.

하지만 Cargo는 기본적으로 0.3.0보다 크고 0.4.0보다 작은 버전을 찾을 것입니다. 만약 rand 크레이트가 새로운 두 개의 버전인 0.3.15와 0.4.0을 릴리즈했다면 여러분이 cargo update를 실행했을 때 다음의 메세지를 볼 것입니다.

```

\$ cargo update
Updating registry `https://github.com/rust-lang/crates.io-index`
Updating rand v0.3.14 -> v0.3.15

```

이 시점에 여러분은 Cargo.lock 파일에서 변경이 일어난 것과 앞으로 사용될 rand 크레이트의 버전이 0.3.15임을 확인할 수 있습니다.

만약 여러분이 0.4.0이나 0.4.x에 해당하는 모든 버전을 받고 싶다면 Cargo.toml 을 다음과 같이 업데이트해야 합니다.

```

[dependencies]

rand = "0.4.0"

```

다음번에 여러분이 cargo build를 실행하면 Cargo는 가용 가능한 크레이트들의 레지스트리를 업데이트할 것이고 여러분의 rand 요구사항을 새롭게 명시한 버전에 따라 재계산할 것입니다.

Cargo와 그의 생태계에 대해 더 많은 것들은 14장에서 다뤄지지만 지금 당장은 이 정도만 알면 됩니다. Cargo는 라이브러리의 재사용을 쉽게 하여 러스트 사용자들이 많은 패키지들과 결합된 더 작은 프로젝트들을 작성할 수 있도록 도와줍니다.

- 임의의 숫자를 생성하기
  이제 rand를 사용 해 봅시다. 다음 단계는 src/main.rs 를 Listing 2-3처럼 업데이트하면 됩니다.

```

Filename: src/main.rs

extern crate rand;

use std::io;
use rand::Rng;

fn main() {
println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    println!("The secret number is: {}", secret_number);

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin().read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {}", guess);

}

```

Listing 2-3: 임의의 숫자를 생성하기 위해 필요한 코드

- extern crate rand;
  우리는 extern crate rand;을 추가하여 러스트에게 우리가 외부에 의존하는 크레이트가 있음을 알립니다.
  이 라인은 use rand으로도 표기할 수 있으며 이제 우리는 rand::를 앞에 붙여 rand내의 모든 것을 호출할 수 있습니다.

- use rand::Rng
  다음으로 우리는 또 다른 use 라인인 use rand::Rng를 추가합니다. Rng는 정수 생성기가 구현한 메소드들을 정의한 trait이며 해당 메소드들을 이용하기 위해서는 반드시 스코프 내에 있어야 합니다.

- rand::thread_rng
  rand::thread_rng 함수는 OS가 시드(seed)를 정하고 현재 스레드에서만 사용되는 특별한 정수생성기를 돌려 줍니다.

- get_range
  다음으로 우리는 get_range 메소드를 호출합니다.
  이 메소드는 Rng trait에 정의되어 있으므로 use rand::Rng 문을 통해 스코프로 가져올 수 있습니다.
  gen_range 메소드는 두 개의 숫자를 인자로 받고 두 숫자 사이에 있는 임의의 숫자를 생성합니다.
  하한선은 포함되지만 상한선은 제외되므로 1부터 100 사이의 숫자를 생성하려면 1과 101을 넘겨야 합니다.

- use std::cmp::Ordering
  Ordering은 Result와 같은 열거형이지만 Ordering의 값은 Less, Greater, Equal입니다.
  이것들은 여러분이 두 개의 값을 비교할 때 나올 수 있는 결과들입니다.

그리고 나서 우리는 Ordering 타입을 이용하는 다섯 줄을 마지막에 추가 했습니다.

```

match guess.cmp(&secret_number) {
Ordering::Less => println!("Too small!"),
Ordering::Greater => println!("Too big!"),
Ordering::Equal => println!("You win!"),
}

```

- cmp
  cmp 메소드는 두 값을 비교하며 비교 가능한 모든 것들에 대해 호출할 수 있습니다.
  이 메소드는 비교하고 싶은 것들의 참조자를 받습니다.
  여기서는 guess와 secret_number를 비교하고 있습니다.
  cmp는 Ordering 열거형을 돌려줍니다.
  우리는 match 표현문을 이용하여 cmp가 guess와 secret_number를 비교한 결과인 Ordering의 값에 따라 무엇을 할 것인지 결정할 수 있습니다.

- match
  match 표현식은 arm 으로 이루어져 있습니다.
  하나의 arm은 하나의 패턴 과 match 표현식에서 주어진 값이 패턴과 맞는다면 실행할 코드로 이루어져 있습니다.
  러스트는 match에게 주어진 값을 arm의 패턴에 맞는지 순서대로 확인합니다.

예제서 사용된 match 표현식에 무엇이 일어날지 한번 따라가 봅시다.
사용자가 50을 예측했다고 하고 비밀번호가 38이라 합시다.
50과 38을 비교하면 cmp 메소드의 결과는 Ordering::Greater 입니다.
match 표현식은 Ordering::Greater를 값으로 받을 것입니다.
처음으로 마주하는 arm의 패턴인 Ordering::Less는 Ordering::Greater와 매칭되지 않으므로 첫번째 arm은 무시하고 다음으로 넘어갑니다.
다음 arm의 패턴인 Ordering::Greater는 확실히 Ordering::Greater와 매칭합니다!
arm과 연관된 코드가 실행될 것이고 Too big가 출력될 것입니다.
이 경우 마지막 arm은 확인할 필요가 없으므로 match 표현식은 끝납니다.

- 타입
  러스트는 강한 정적 타입 시스템을 가지고 있습니다. 하지만 타입 추론도 수행합니다.
  만약 let guess = String::new()를 작성한다면 러스트는 guess가 String타입이어야 함을 추론할 수 있으므로 타입을 적으라고 하지 않습니다.
  반대로 secret_number는 정수형입니다. 몇몇 숫자 타입들이 1과 100 사이의 값을 가질 수 있습니다.
  i32는 32비트 정수, u32는 32비트의 부호없는 정수, i64는 64비트의 정수이며 그 외에도 비슷합니다.
  러스트는 기본적으로 우리가 다른 정수형임을 추론할 수 있는 다른 타입 정보를 제공하지 않는다면 숫자들을 i32으로 생각합니다. 이 에러의 원인은 러스트가 문자열과 정수형을 비교하지 않기 때문입니다.

최종적으로 우리는 추리값을 정수형으로 비교하기 위해 입력으로 받은 String을 정수로 바꾸고 싶을 것입니다.
이것은 main 함수 내에 다음 두 라인을 넣어서 할 수 있습니다.

```

Filename: src/main.rs

extern crate rand;

use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    println!("The secret number is: {}", secret_number);

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin().read_line(&mut guess)
        .expect("Failed to read line");

    let guess: u32 = guess.trim().parse()
        .expect("Please type a number!");

    println!("You guessed: {}", guess);

    match guess.cmp(&secret_number) {
        Ordering::Less    => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal   => println!("You win!"),
    }

}

```

두 라인은 다음과 같습니다.

```

let guess: u32 = guess.trim().parse()
.expect("Please type a number!");

```

- Shadowing
  우리는 guess 변수를 생성했습니다. 잠깐, 이미 프로그램에서 guess라는 이름의 변수가 생성되지 않았나요?
  그렇긴 하지만 러스트는 이전에 있던 guess의 값을 가리는(shadow) 것을 허락합니다.
  이 특징은 종종 하나의 값을 현재 타입에서 다른 타입으로 변환하고 싶을 경우에 사용합니다.
  Shadowing은 우리들이 guess_str과 guess처럼 고유의 변수명을 만들도록 강요하는 대신 guess를 재사용 가능하도록 합니다.

우리는 guess를 guess.trim().parse() 표현식과 묶습니다.
표현식 내의 guess는 입력값을 가지고 있던 String을 참조합니다.
String 인스턴스의 trim 메소드는 처음과 끝 부분의 빈칸을 제거합니다.
u32는 정수형 글자만을 가져야 하지만 사용자들은 read_line을 끝내기 위해 enter키를 반드시 눌러야 합니다.
enter키가 눌리는 순간 개행문자가 문자열에 추가됩니다.
만약 사용자가 5를 누르고 enter키를 누르면 guess는 5\n처럼 됩니다.
\n은 enter키, 즉 개행문자를 의미합니다. trim 메소드는 \n을 제거하고 5만 남도록 처리합니다.

문자열의 parse 메소드는 문자열을 숫자형으로 파싱합니다.
이 메소드는 다양한 종류의 정수형을 변환하므로 우리는 let guess: u32처럼 정확한 타입을 명시해야 합니다.
guess 뒤의 콜론(:)은 변수의 타입을 명시했음을 의미합니다.
러스트는 몇몇 내장된 정수형을 가지고 있습니다.
u32은 부호가 없는 32비트의 정수입니다.
이 타입은 작은 양수를 표현하기에는 좋은 선택입니다.
3장에서 다른 숫자형에 대해 배울 것입니다.
추가로 이 예시에서 명시했던 u32과 secret_number와의 비교는 러스트가 secret_number의 타입을 u32로 유추해야 함을 의미합니다.
이제 이 비교는 같은 타입의 두 값의 비교가 됩니다.

parse 메소드의 호출은 에러가 발생하기 쉽습니다.
만약 A👍%과 같은 문자열이 포함되어 있다면 정수로 바꿀 방법이 없습니다.
"Result 타입으로 잠재된 실패 다루기"에서 read_line와 비슷하게 parse 메소드는 실패할 경우를 위해 Result 타입을 결과로 돌려 줍니다.
만약 parse 메소드가 문자열에서 정수로 파싱을 실패하여 Err Result variant를 돌려준다면 expect 호출은 게임을 멈추고 우리가 명시한 메세지를 출력합니다.
만약 parse 메소드가 성공적으로 문자열을 정수로 바꾸었다면 Result의 Ok variant를 돌려 받으므로 expect에서 Ok에서 얻고 싶었던 값을 결과로 받게 됩니다.

이제 프로그램을 실행해 봅시다!

```

\$ cargo run
Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
Finished dev [unoptimized + debuginfo] target(s) in 0.43 secs
Running `target/guessing_game`
Guess the number!
The secret number is: 58
Please input your guess.
76
You guessed: 76
Too big!

```

- 반복문을 이용하여 여러 번의 추리 허용
  loop 키워드는 무한루프를 제공합니다.
  이것을 이용하여 사용자들에게 숫자를 추리할 기회를 더 줍니다.

```

Filename: src/main.rs

extern crate rand;

use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    println!("The secret number is: {}", secret_number);

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        io::stdin().read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = guess.trim().parse()
            .expect("Please type a number!");

        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less    => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal   => println!("You win!"),
        }
    }

}

```

우리는 추리값을 입력 받는 코드부터 모든 코드들을 반복문 내로 옮겼습니다.
각각의 라인이 4간격 더 들여쓰기 되어 있음을 확실히 하고 프로그램을 다시 실행 해 보세요.
프로그램이 우리가 지시에 정확히 따르다보니 새로운 문제가 생긴 것을 확인하세요.
이제 프로그램이 영원히 다른 추리값을 요청합니다! 사용자가 이 프로그램을 종료할 수 없어요!

사용자는 ctrl-C 단축키를 이용하여 프로그램을 멈출 수 있습니다. 하지만 "비밀번호를 추리값과 비교하기"에서 parse 메소드에 대해 논의할 때 언급한 방법으로 이 만족할 줄 모르는 괴물에게서 빠져나올 수 있습니다. 만약 사용자가 숫자가 아닌 답을 적는다면 프로그램이 멈춥니다. 사용자는 프로그램 종료를 위해 다음처럼 이 장점을 활용할 수 있습니다.

```

\$ cargo run
Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
Running `target/guessing_game`
Guess the number!
The secret number is: 59
Please input your guess.
45
You guessed: 45
Too small!
Please input your guess.
60
You guessed: 60
Too big!
Please input your guess.
59
You guessed: 59
You win!
Please input your guess.
quit
thread 'main' panicked at 'Please type a number!: ParseIntError { kind: InvalidDigit }', src/libcore/result.rs:785
note: Run with `RUST_BACKTRACE=1` for a backtrace.
error: Process didn't exit successfully: `target/debug/guess` (exit code: 101)

```

quit를 입력하면 게임은 확실히 끝나지만 다른 입력값들 또한 마찬가지 입니다. 하지만 이것은 최소한의 차선책입니다. 우리는 정답을 입력할 경우 자동으로 게임이 끝나도록 하고 싶습니다.

- 정답 이후에 종료하기
  사용자가 정답을 맞췄을 때 게임이 종료되도록 break문을 추가합니다.

```

Filename: src/main.rs

extern crate rand;

use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    println!("The secret number is: {}", secret_number);

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        io::stdin().read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = guess.trim().parse()
            .expect("Please type a number!");

        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less    => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal   => {
                println!("You win!");
                break;
            }
        }
    }

}

```

break문을 You win! 이후에 추가하여 사용자가 비밀번호를 맞췄을 때 프로그램이 반복문을 끝내도록 합니다.
반복문이 main의 마지막 부분이므로 반복문의 종료는 프로그램의 종료를 의미합니다.

- 잘못된 입력값 처리하기
  사용자가 숫자가 아닌 값을 입력했을 때 프로그램이 종료되는 동작을 더 다듬어 숫자가 아닌 입력은 무시하여 사용자가 계속 입력할 수 있도록 해 봅시다. guess가 String에서 u32로 변환되는 라인을 수정하면 됩니다.

```

let guess: u32 = match guess.trim().parse() {
Ok(num) => num,
Err(\_) => continue,
};

```

expect 메소드 호출을 match 표현식으로 바꾸는 것은 에러 발생 시 종료에서 처리 로 바꾸는 일반적인 방법입니다.
parse 메소드가 Result 타입을 돌려주는 것과 Result는 Ok나 Err variants를 가진 열거형임을 떠올리세요.
cmp 메소드의 Ordering 결과를 처리했을 때처럼 여기서 match 표현식을 사용하고 있습니다.

만약 parse가 성공적으로 문자열에서 정수로 변환했다면 결과값을 가진 Ok 를 돌려줍니다.
Ok는 첫번째 arm의 패턴과 매칭하게 되고 match 표현식은 parse 가 생성한 num값을 돌려줍니다.
그 값은 우리가 생성하고 있던 새로운 guess 과 묶이게 됩니다.

만약 parse가 문자열을 정수로 바꾸지 못했다면 에러 정보를 가진 Err를 돌려줍니다.
Err는 첫번째 arm의 패턴인 Ok(num)과 매칭하지 않지만 두 번째 arm의 Err(*) 와 매칭합니다.
*은 모든 값과 매칭될 수 있습니다.
이 예시에서는 Err내에 무슨 값이 있던지에 관계없이 모든 Err를 매칭하도록 했습니다.
따라서 프로그램은 두 번째 arm의 코드인 continue를 실행하며,
이는 loop의 다음 반복으로 가서 또 다른 추리값을 요청하도록 합니다.
효율적으로 프로그램은 parse에서 가능한 모든 에러를 무시합니다.

이제 우리가 원하는대로 프로그램이 작동해야 합니다. cargo run을 실행해 봅시다.

```

\$ cargo run
Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
Running `target/guessing_game`
Guess the number!
The secret number is: 61
Please input your guess.
10
You guessed: 10
Too small!
Please input your guess.
99
You guessed: 99
Too big!
Please input your guess.
foo
Please input your guess.
61
You guessed: 61
You win!

```

멋집니다! 마지막에 조금 값을 조정하여 우리는 추리 게임을 끝냈습니다. 프로그램이 여전히 비밀번호를 출력하고 있다는 것을 떠올리세요. 테스트 때는 괜찮지만 게임을 망치게 됩니다. 비밀번호를 출력하는 println!을 삭제합니다. Listing 2-5는 최종 코드를 보여줍니다.

```

Filename: src/main.rs

extern crate rand;

use std::io;
use std::cmp::Ordering;
use rand::Rng;

fn main() {
println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        io::stdin().read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {}", guess);

        match guess.cmp(&secret_number) {
            Ordering::Less    => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal   => {
                println!("You win!");
                break;
            }
        }
    }

}

```

Listing 2-5: 추리 게임의 완성된 코드

요약
이 시점에서 여러분은 성공적으로 추리 게임을 만들었습니다! 축하합니다!

이 프로젝트는 let, match, 메소드, 연관함수, 외부 크레이트 사용과 같은 많은 새로운 러스트 개념들을 소개하기 위한 실습이었습니다. 다음 장들에서는 이 개념들의 세부적인 내용을 배울 것입니다. 3장은 대부분의 프로그래밍 언어들이 가지고 있는 변수, 데이터 타입, 함수를 소개하고 러스트에서의 사용법을 다룹니다. 4장에서는 다른 프로그래밍 언어와 차별화된 러스트의 특성인 소유권을 다룹니다. 5장에서는 구조체와 메소드 문법을 다루며 6장에서는 열거형에 대해 다룹니다.

```

```
