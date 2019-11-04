- npx create-react-app project-name --typescript

- yarn add jest @types/jest

-

```
const sum = require('./sum');

test('1 + 2 = 3', () => {
 expect(sum(1, 2)).toBe(3);
});
```

test: 새로운 테스트 케이스 생성
expect: 특정 값의 예측 값을 정의하고, 통과하면 테스트 성공, 통과하지 못하면 테스트 실패.
toBe: matchers 라고 불리며 특정 값이 어떤 조건을 만족하는지, 어떤 함수가 실행 됐는지, 에럭 났는지 등을 확인하게 해줌.
여기서 toBe 는 특정 값이 지정한 값과 일치하는지 확인함.

- package.json 에 scripts 추가

```
  "scripts": {
  "test": "jest --watchAll --verbose"
  }
```

- 계산이 의도한데로 잘 작동하는지, prosp 를 넣었을 때 그에 맞는 작동을 하는지 등을 확인 하는 것.
