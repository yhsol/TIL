# <img>, background-image

- ref
  - [https://mygumi.tistory.com/369](https://mygumi.tistory.com/369)
  - [https://blog.px-lab.com/html-img-tag-vs-css-background-image/](https://blog.px-lab.com/html-img-tag-vs-css-background-image/)
  - [https://nystudio107.com/blog/the-css-background-image-property-as-an-anti-pattern](https://nystudio107.com/blog/the-css-background-image-property-as-an-anti-pattern)

### <img>

```html
<img src="{imageUrl}" alt="" />
```

- 로드 실패 할 경우
  - broken image 와 alt 텍스트가 보임.
  - broken image 와 alt 텍스트 노출을 우회하여 가릴 수도 있음.
- SEO, 성능 등 효율적인 면이 많음.

### background-img

```html
<div class="thumb" style={{backgroundImage: `url("${imageUrl}")`}} />
```

- 로드 실패 할 경우
  - background-image 속성을 사용하면 alt 와 같은 설명 할 수 없음.
  - 결과적으로 broken image도, 텍스트도 노출하지 않음
- SEO 에 좋지 않음
- 접근성 좋지 않음 - 스크린 리더는 background-image 를 무시함.
- 성능에 좋지 않음

### 사용 구분

- 이미지가 사용자에게 컨텐츠 이해에 도움을 더 준다고 생각하면 img 태그를 쓰고, 그렇지 않으면 background image 사용
  > does this image help people in understanding my content better?  If the answer is yes – use img tag. If – no – set it as a background image.
  출처:
  [https://mygumi.tistory.com/369](https://mygumi.tistory.com/369)
  [마이구미의 HelloWorld]
- 꼭 그래야 하는 것은 아님.
