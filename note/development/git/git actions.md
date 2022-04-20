# git actions

- Actions 탭에서 설정
    - 설정을 완료하면 root 에 .github/workflows 안에 파일이 생성 됨.
    - [GitHub Actions 워크플로우 사용하기](https://blog.outsider.ne.kr/1510)
- yaml 파일
- staging.yml

```yaml
name: 지출관리 웹 staging 배포

on:
  push:
    branches:
      - staging

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - name: Checkout branch
        uses: actions/checkout@v2
        with:
          ref: 'staging'

      - name: Cache node modules
        uses: actions/cache@v2
        with:
          path: node_modules
          key: ${{ runner.os }}-build-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-build-

      - name: Install dependencies
        run: yarn install

      - name: Build
        run: yarn build:dev

      - name: Deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp \
            --recursive \
            --region ap-northeast-2 \
            build s3://stg-expense.gowid.com

      - name: Invalidate cloudfront distribution and wait for completion
        uses: muratiger/invalidate-cloudfront-and-wait-for-completion-action@master
        env:
          DISTRIBUTION_ID: ${{ secrets.DISTRIBUTION_ID_STG }}
          PATHS: '/*'
          AWS_REGION: 'ap-northeast-2'
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

- secrets
    - SSH, AWS 등에 관련 된 private key 가 필요할 경우 Settings 에 Secrets 를 설정한다.
    - 여기서 사용되는 SSH 는 id_rsa.pub 가 아닌 id_rsa
    - id_rsa 안의 전체 내용! (주석같이 생긴 라인도 전부 다 필요)

- gowid 관련 사항
    - gowid-common-front
        - 인증을 위해 SSH 를 통한 설치 필요 → 아래와 같이 package.json - dependencies 에 추가
        - package.json

        ```yaml
        "gowid-common-front": "git+ssh://git@github.com:moneylabs/gowid-common-front.git"
        ```

        - [참고](https://syung05.tistory.com/20)

    - @graphql-codegen/typescript-react-apollo
        - 기존 @graphql-codegen/typescript-react-apollo 의 버전이 낮아서 install 시에 버전을 선택해줘야 하는데 actions 로 빌드할 경우 이런 상황에서 에러가 발생한다.
        - 명시적으로 버전을 올려야 할 듯.

- production.yml

```yaml
name: 지출관리 웹 production 배포

on:
  release:
    types:
      - created

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - name: Checkout branch
        uses: actions/checkout@v2
        with:
          ref: 'production'

      - name: Cache node modules
        uses: actions/cache@v2
        with:
          path: node_modules
          key: ${{ runner.os }}-build-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-build-

      - name: Install dependencies
        run: yarn install

      - name: Build
        run: yarn build:dev

      - name: Deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp \
            --recursive \
            --region ap-northeast-2 \
            build s3://expense-content.gowid.com

      - name: Invalidate cloudfront distribution and wait for completion
        uses: muratiger/invalidate-cloudfront-and-wait-for-completion-action@master
        env:
          DISTRIBUTION_ID: ${{ secrets.DISTRIBUTION_ID_PROD }}
          PATHS: '/*'
          AWS_REGION: 'ap-northeast-2'
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```