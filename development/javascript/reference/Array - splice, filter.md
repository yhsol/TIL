- 삭제가 목적이라면 splice 를 사용하고,
  toggle, isChecked 등과 같이 특정 값에 따라 값을 가져오고 싶을 경우 filter 를 사용할 수 있겠다.
- splice 사용
  - return ['삭제된 요소']
  - 삭제할 item 을 find 메서드를 통해서 특정하고, 그 값을 splice 에서 사용.

```jsx
this.selectedItems.splice(this.selectedItems.indexOf(itemToTake), 1);
```

```jsx
@action
  removeTodo = (todo: TodoItem) => {
    this.list.splice(this.list.indexOf(todo), 1);
  };
```

```jsx
@action
  deleteWithId = async (purpose: string) => {
    try {
      this.requestState = "pending";
      const res = await ExpensePolicyRepository.deleteWithId(purpose);
      runInAction(() => {
        if (res !== "") {
          // 이렇게 filter 한 뒤에 override 하거나, splice 사용
          // this.expensePolicyList = this.expensePolicyList.filter(
          //   (item: ExpensePolicyModel) => item.purpose !== purpose
          // );
          const itemToDelete = this.expensePolicyList.find(
            (item) => item.purpose === purpose
          );
          return (
            itemToDelete &&
            this.expensePolicyList.splice(
              this.expensePolicyList.indexOf(itemToDelete),
              1
            )
          );
        }
      });
    } catch (error) {
      console.log(error);
      this.requestState = "error";
    }
  };
```

- filter
  - return ['filter 된 array']
  - filter 를 사용해도 된다. 그렇지만 filter 는 '삭제'라는 기능보다는 말그대로 'filter'이기 때문에 filter 한 array 를 다시 기존 array 에 override 해줘야 한다.
