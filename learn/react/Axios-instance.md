# Axios instance 기능 사용 안됨.

- Axios 의 instance 기능을 잘 써왔는데 버전이 올라가면서 사용이 안되는 것 같다.

  - instance 와 같은 기능을 쓰려면 const config = {} 와 같이 만들어서 그 안에 baseURL 등을 넣어서 쓸 수 있는 듯.

  - 그렇지만 instance 를 쓸 때만큼 그 기능이 바로 request 의 순서를 정해서 request 하는 것은 아닌 것 같아서 굳이 그렇게 하지 않고 url 을 그냥 다 쓰는게 나은것 같다.

  - const [query, setQuery] = useState("")와 같이 url 에서 특정 값이 필요한 경우 해당 hooks 와 같이 작성해서 쓸 수 있을 것 같다.

  - axios 또는 restApi 자체를 조금 더 효율적이게 쓸 수 있는 방법을 찾아봐야겠다.
