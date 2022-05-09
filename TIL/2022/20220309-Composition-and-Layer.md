# \***\*Chromium Composition과 Layer\*\***

**Compositing?**

Composition은 분리 가능한 레이어를 분리하고 미리 레스터라이즈를 한 뒤, 그 레이어를 움직이거나 Viewport를 움직이는 방식이다.

특정한 레이어의 레스터가 변경되고, 위치가 변경된다고 해서 다른 레이어의 요소에 영향을 끼치진 않는다.

실제로 분리된 레이어를 살펴보자.

다음은 토이프로젝트로 만들었던 [DFD](https://github.com/DevSDK/DFD)의 layer이다.

React-Virtualized에 의하여 실시간으로 리스트가 갱신되는 것을 볼 수 있다.

**How?**

그렇다면 Layer은 어떻게 분리가 될까?

렌더러는 DOMTree에서 만들어진 LayoutTree를 이용하여 Compositing Trigger를 가진 녀석들을 layer로 분리시킬 후보로 만든다. 여기서 말하는 트리거는 다양한 이유가 될 수 있는데 대표적으로 transform 요소가 될 수 있다.
