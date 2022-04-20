# delete with filter or splice

delete 는 보통 특정 id 를 통해서 filter 를 통해 나머지 리스트를 가져오거나, 또는 splice 를 사용해 list 에서 제거할 수 있다.
둘 다 나쁘지 않지만 filter 는 반복을 돌게 된다.
그렇기 때문에 splice 를 쓸 수 있는 상황이라면 splice 를 통해 구현하는게 좀 더 효율이 좋은 듯 하다.
