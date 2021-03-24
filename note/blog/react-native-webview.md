---

[ReactNative] async storage 및 webview 에서 message 사용하기
제목그대로 async storage 와 webview 와의 message 통신에 대한 이야기를 하려고 해요.
먼저 위와 같은 기능이 필요한 시나리오를 생각해 볼게요.
문제 정의:
web 에서 갖게 된 'banana' 를 app 에 저장해 뒀다가 필요할 때 꺼내오고 싶다. 
새로고침을 하거나, app 을 종료하더라도 다시 켰을 때, 필요할 때 가지고 오고 싶다.

해결방법:
web 에서 저장하는 시점에 app 으로 'banana' 를 전달한다.
app 은 'banana' 를 받으면 새로고침, 앱 종료에도 'banana'를 저장해 둘 수 있는 곳에 저장한다.
web 에서 'banana' 가 필요할 때 app 에게 'banana' 를 달라고 요청한다.
app 은 'banana' 를 달라는 web 의 요청을 받으면 저장했던 'banana' 를 꺼내어 app 에게 보낸다.
web 은 app 이 보낸 'banana' 를 받는다.

필요:
WebView
react-native-webview 를 사용해서 webview 를 연결해요. (Getting Started Guide)
Message
react-native-webview 에서 제공하는 WebView 에서 제공하는 onMessage 를 통해 message 를 주고 받을 수 있어요. (app ↔ web)
Store
'banana' 를 저장할 곳은 react-native-async-storage 를 통해서 마련해요. asycn storage 는 react native 자체에서 지원했었는데요, 지금은 지원이 중단되어서 community pakages 를 사용하라고 권고하더라고요. 저희는 그 중에서 react-native-async-storage 를 사용할거예요. (documentation)

작업:
먼저 WebView 를 연결해 볼게요.
Filename: App.tsx (app)

위와 같이 세팅을 하면 웹뷰가 연결이 될거예요. WebView 내부에 비어있는 메서드의 핸들러들은 앞으로 채워가보도록 할게요.

---

Message
app 에서 메시지 받기 (react-native)

message 기능은 이름에서도 알 수 있듯이 onMessage 를 통해서 이루어져요.
그러면 onMessage 에 사용할 핸들러가 필요한데요. web 에서 전달되는 메시지에 따라 'banana' 를 저장하거나, 버리는 기능을 만들어 볼게요.

onMessage 는 WebViewMessageEvent 를 사용해요. 이 이벤트의 data 에 전달 된 메시지가 들어있고요. 저는 통신하는 메시지의 형태를 type 과 payload 를 가지고 있는 객체의 형태로 정의해 두었어요. type 에는 원하는 액션에 대한 정보를 표현할 수 있고, payload 에는 데이터를 담아서 전달 할 수 있어요. 그래서 이 메시지 객체(data)를 파싱해서 타입에 따라 원하는 작업을 진행하면 되요. 아, 파싱하기전에 isJsonString() 이라는 함수를 통해서 데이터가 파싱하기에 적합한 형태인지 확인하는 과정을 거치는데요, isJsonString() 함수는 아래와 같아요.
Filename: utils/isJsonString.ts

data 의 파싱이 잘 되었고, 내부 요소에 접근이 가능해지면 type 을 확인해요. 위에서는 web 에서 'banana' 가 전달 될 때 ("bananaFromWeb") 와 'banana' 를 제거할 때 ("removeBanana") 에 해당하는 작업을 정의해 두었어요.
'banana' 가 전달 되었다면 저장하고, 삭제하라는 메시지가 오면 삭제해요. 여기에서 사용된 setBanana(), removeBanana() 는 async storage 를 살펴볼 때 이야기 할게요.
이제 작성한 메시지 핸들러를 WebView의 onMessage에 연결해 볼게요.
Filename: App.tsx

이제 web 으로부터 메시지를 전달 받는 부분은 완성되었습니다!

app 에서 메시지 보내기 (react-native)

app 에서 web 으로 메시지를 보낼 때는 webViewRef 가 필요해요. webViewRef.current.postMeesage('메시지') 와 같은 형태로 메시지를 보내거든요. 이를 위해 useRef 로 webViewRef만들어서 WebView 와 연결하고, 메시지를 보낼 때도 사용할거예요.
webViewRef 를 만들어서 연결하는 과정은 아래에서 살펴보기로 하고, 먼저 webViewRef 를 전달받아서 메시지를 보내는 함수를 먼저 구현해보도록 할게요.
Filename: src/utils/sendMessage.ts

위에서 언급했듯이 메시지는 type 과 payload 를 갖고 있고, 메시지를 보낼 때는 webViewRef 도 필요하기 때문에 webViewRef 를 가지고 있는 형태로 타입을 정의했어요. 이렇게 전달받은 인자들을 postMessage 에 넣어서 보내주면 되요.
그러면 이제 sendMessage 를 사용해서 메시지를 보내면 되는데, 메시지를 보내는 시점을 'WebView 가 켜졌을 때' 로 하려고 해요. 이때 사용할 수 있는 WebView 의 메서드들이 있어요. 위 App.tsx 파일에서 핸들러가 비어있던 메서드들, onLoadStart, onLoadProgress, onLoad 들인데요, 이 중에서 onLoadProgress 와 onLoad 를 사용할 거예요.
각 메서드들은 이름에서도 알 수 있듯이, load 가 시작됨 (onLoadStart), load 되는 중(onLoadProgress), load 됨 (onLoad) 을 알 수 있어요.
 처음에는 'WebView 가 켜졌을 때` 라는 시점이기 때문에 onLoad 만 사용하면 되겠다고 생각했는데요, 보다보니 iOS, android 가 각각의 이벤트를 조금 다른시점에 실행하더라고요. 두 OS 모두 세가지 이벤트를 모두 실행시키기는 하는데요, iOS 는 load 가 된 뒤에 페이지 전환등의 이벤트가 있을 때 onLoad 이벤트를 다시 실행해요. android 는 load 가 된 뒤에 페이지 전환등의 이벤트가 있을 때 onLoadProgress 를 다시 실행하고요.
이렇게 되면 페이지를 전환할 때 마다 'banana' 를 계속 다시보내게 되겠죠. 그래서 각각의 OS 에서 load 된 시점에만 'banana' 를 보낼 수 있도록 기기의 OS 를 읽어와서 iOS 는 onLoaddProgress 에서, android 는 onLoad 에서 메시지를 보내도록 할게요.
(※ OS 정보는 react-native 에서 제공하는 Platform 을 활용했어요. const iOS = Platform.OS === 'ios'; , const android = Platform.OS === 'android'; 와 같이 사용할 수 있어요.)
그러면 먼저 App.tsx 에 ref 와 핸들러를 채워넣고, 채워넣은 핸들러들도 함께 볼게요.
Filename: App.tsx

Filename: src/utils/bridgeHandler.ts

핸들러파일 (bridgeHandler.ts) 의 윗부분부터 살펴볼게요.
먼저 OS 별로 다른 이벤트에 메시지를 보내야해서 기기의 OS 를 읽어와서 판단할 수 있는 조건을 만들었어요.
그리고 sendBanana 에서는 webViewRef 를 전달받고, 내부에서 getBanana 를 통해서 저장해둔 'banana' 를 꺼내와서 메시지를 구성하고, sendMessage 를 통해서 메시지를 보내요. 여기서 사용 된 getBanana 는 async storage 를 다룰 때 다시 이야기 해 볼게요.
handleLoadStart 에서는 간단히 WebView 가 시작됨을 표시해요.
handleLoadProgressCurried 는 webViewRef 와 webViewProgressEvent 를 전달받아서 progress가 1인 시점, 즉 load 가 됐을 때 OS 가 iOS 인지 확인한 후에 메시지를 전달해요.
handleLoadCurried 는 webViewRef 와 webViewNavigationEvent 를 전달받아서 OS 가 android 일 때 메시지를 전달해요.
handleLoadProgressCurried, handleLoadCurried 에서 currying 의 형태를 사용했는데요, 꼭 이렇게 구현해야하는 것은 아니니 편한 형태로 만들어서 사용하면 되요.
추가적으로, 중간에 isBanana 라는 함수를 사용하는데요, 이 함수는 간단히 말해 'banana' 가 'banana' 가 맞나 검증하는 함수라고 할 수 있어요.
간단하게 아래와 같이 만들어서 사용할 수 있어요. 자세한 정보는 'User-Defined Type Guards' 를 살펴보시면 될거예요. 이러한 타입가드에는 여러 방법을 사용할 수 있고, 지금 보니 위 페이지는 deprecated 라고 하니, 이런 방법도 있구나 하고 다른 방법들도 살펴보면 좋을 것 같아요.
Filename: src/banana/isBanana.ts

여기까지의 내용을 통해 app 에서 메시지를 받고, 보내는 과정을 살펴봤어요. 다음으로는 web 에서 메시지를 다루는 방법을 살펴볼게요.
web 에서 메시지 처리하기

web 에서 메시지를 보낼 때는 ReactNativeWebView 를 사용해요. window.ReactNativeWebView.postMessage('메시지') 와 같은 형태로 메시지를 보낼 수 있어요. 여기서 TypeScript 를 사용한다면 ReactNativeWebView 를 window 객체에 포함시켜줘야 해요. global.d.ts 파일과 tsconfig.json 파일을 수정해서 포함시킬 수 있어요.
Filename: global.d.ts

Filename: tsconfig.json

그러면 이제 app 으로 메시지를 전달하고, app 에서 전달 된 메시지를 처리하는 함수를 만들어 볼게요.
Filename: sendReactNativeMessage.ts

Filename: getReactNativeMessage.ts

이 두 함수를 통해서 app 과의 메시지 통신을 할 수 있어요. 이제 원하는 시점에 'banana' 를 app 으로 보내고, 받을 수 있을거예요.
TIP
개인적으로 웹뷰 어플리케이션을 개발하며 조금 불편하다고 느끼는 부분은 web 에서와 같은 개발자 도구를 편하게 사용할 수 없다는 것이었어요. 물론 xcode 나 android 스튜디오를 통해서, 그리고 safari 나 chrome 을 활용해서 디버깅을 할 수 있을텐데요, 조금 번거로울 때가 있더라고요. 이럴 때 위에서 만든 sendReactNativeMessage 를 사용해서 확인하고자 하는 데이터를 앱으로 전달하고, app 에서 받은 메시지를 출력하면 마치 console.log() 와 같이 사용할 수 있어요. 간단하게 데이터를 확인할 때 유용하더라고요. 혹시 참고가 될까 싶어서 함께 써둬요.

---

지금까지 app 과 web 에서 메시지를 처리하는 방법에 대해서 살펴봤는데요, 조금 길어졌네요. 아직 'banana' 를 저장하고, 꺼내오고, 삭제하는 것에 대한 이야기를 못했죠. 이 부분에 대해서는 다음 포스트에서 다루도록 할게요.
WebView 에서 메시지 통신은 굉장히 중요하고 유용한 기능이라고 생각해요. 이번 글이 조금이나마 도움이 되었으면 좋겠어요.
긴 글 읽어주셔서 감사합니다!
