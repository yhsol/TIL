# props 사용하기

props 를 쓸 때는 withProps 파일을 만들어서 사용할 props 의 type 들을 정의한다.

그리고 사용할 엘리먼트의 태그명 옆에 <해당Props> 를 넣는다.

JSX 에서 사용할 엘리먼트에 props 을 전달하고,

그렇게 전달 된 props 는 styled-components 엘리먼트에서 사용가능 하다.

조건문 등 다양한 방식으로 사용 가능하다.

아래와 같이 컴포넌트 내에서 type 을 설정하고 사용도 가능하다.

```jsx
const List = styled.li<StyleProps>`
  span${Text} {
    color: ${props => (props.done ? "#999999" : "")};
    text-decoration: ${props => (props.done ? "line-through" : "")};
  }
`;

type StyleProps = {
  done?: boolean;
};

function TodoItem({ todo }: TodoItemProps) {
  const { onToggle, onRemove } = useTodoAction(todo.id);
  return (
    <List done={todo.done}>
      <Text onClick={onToggle}>{todo.text}</Text>
      <Remove onClick={onRemove}>(X)</Remove>
    </List>
  );
}
```