[react] react-dnd 사용시 draggable 요소 외부 배경색 제거
 react-dnd 에서 draggable 요소에 border-radius 같은 속성을 반영할 경우 border-radius 바깥 부분이 제거되지 않는 경우가 있다. 색종이를 오리다가 남은 것 같이 남아있게 되는데 이 부분을 제거하느라 많은 시간이 소요됐다.
해결방법 먼저 이야기하자면 opacity: 0.999; 이다. 
react-dnd 의 예제를 보면 draggable 요소에 opacity: 1 을 설정하게 되는데 이럴 경우 상위에 지정된 background-color 가 없는 경우에는 border-radius 에 맞게 깔끔하게 드래그 되지만 상위에 background-color 가 지정된 요소가 있는 경우에는 background-color 가 상속된다.
찾아보니 draggable 로 지정된 요소에 대한 작동이 브라우저 또는 웹킷에 의해 다르게 또는 예상과 다르게 동작하는 듯하다.
opacity 를 0.999 로 줬을 때 작동하는 정확하고 명쾌한 이유는 찾지 못했다.

문제 상황:

해결:

이 외의 해결 방법으로는 react-dnd의 drag layer 를 사용해서 직접 draggable 요소를 디테일하게 설정하거나 react-beautiful-dnd 를 사용하는 방법이 있을 것 같다.
개인적으로 drag layer 의 경우 통제해야할 요소가 다양할 경우라면 몰라도 지금 경우에 사용하기에는 조금 과하게 복잡하다는 느낌이 들어서 react-beautiful-dnd 를 사용하려고 했었다. react-beautiful-dnd 의 경우 react-dnd 에 비해 다양한 범위를 커버하지는 않지만 x, y 축으로의 이동에 대해서는 강점을 갖고 있다고 하고, 구현할 경우에도 drag context, droppable, draggable 의 요소로 나눠 각 요소들을 지정해주면되서 괜찮겠다는 생각을 했다. 키보드로 사용할 수 있는 등의 접근성에 대한 고려도 들어가 있다. 그런 이유로 react-beautiful-dnd 를 보다가 잠깐 다시 react-dnd 에서 해결방안을 검색하다가 opacity 에 대한 글을 찾게 됐고, 잘 반영이 되서 지금은 이 해결방안을 사용할 예정이다. 아마 다음에 리액트에서 drag and drop 을 구현할 경우에는 react-beautiful-dnd 도 강력한 후보가 되지 않을까 한다.
아무튼 생각보다 복잡했던 구현을 생각보다는 간단하게 해결할 수 있어 다행이었고, 생각보다는 간단한 이 방법을 찾기가 쉽지 않았어서 남겨둔다.
