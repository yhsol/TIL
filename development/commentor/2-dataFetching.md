# data fetching

- 영화 정보를 제공하는 오픈 api 를 사용했다.
  restApi 를 쓸 때는 axios 를 써왔고, 특히 axios 의 instance 기능을 즐겨 써 왔는데 버전이 올라가면서 해당 기능이 작동하지 않는 듯 하다.
  instance 를 정리해서 만들어 두고, 그 instance 를 사용하는 useApi hooks 를 만들어서 여러가지 api 를 잘 써왔기 때문에
  작동하지 않았을 때 해당 api_key 를 여러번 써서 그런가보다 했었다.

  그렇게 생각하고 다른 기능을 개발하다가 다시 살펴보니 baseURL 에 붙어 있어야 할 params 들이 없었다.
  그래서 url 전부를 그대로 보냈더니 잘 응답했다. 결국 instance 를 없애고 url 의 대부분을 그대로 넣고, props 가 필요한 부분만 조정한 뒤 설정해뒀다.

  instance 와 같은 기능을 쓰기 위해서는 const config = {} 와 같이 만들어서 필요한 값들을 넣어서 쓰면 된다고 한다.
  그렇지만 여러 값들을 조합해야 하는 경우 오히려 복잡하겠다는 생각이 들어 각각의 값들을 나눠서 썼다.

  https://www.robinwieruch.de/react-hooks-fetch-data 에 나오는 query 를 쓰는 방법을 통해서 api 를 조금 더 편하게 사용하는 도구를 만들어 봐야겠다.
