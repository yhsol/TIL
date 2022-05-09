## [react] 페이지 네이션 구현하기

페이지 네이션은 어찌보면 프로그램의 굉장히 당연한 요소입니다.
그리고 그렇기에 잘 만들어진 라이브러리들이 많이 있죠.
react 를 쓴다면 material-ui-flat-pagination 을 생각해 볼 수 있습니다.
그렇기는 하지만 raw 하게나마 작동방식을 이해해보고, 라이브러리를 더 편하게 사용할 수 있도록 직접 구현해보았습니다.
아, 직접 다 생각해내서 짠 것은 아니고 https://www.youtube.com/watch?v=IYCa1F-OWmk 를 참고하여 구현하였습니다.

이 포스트는 튜토리얼의 개념이라기보다는 제가 공부한 것을 기록하고, 시도한 것을 기록해두는 것에 가깝습니다.
이것이 정확하고 효과적인 방법이라는 것보다는 이런 방법과 고민이 있구나 정도로 이해해주시면 감사하겠습니다.

데이터를 보여주는 방식에 페이지 네이션 말고도 인피니트 스크롤 같은 방법도 생각할 수 있습니다.
보여주는 방식은 다르지만, 작동하는 원리는 비슷하다고 느껴집니다.

- 기본원리
  - 데이터를 가져온다.
  - 현재 보는 페이지에서 보여줄 데이터의 개수를 정하고, 보여준다.
  - 그리고 다음 페이지넘버를 클릭하거나, (인피니트 스크롤의 경우) 스크롤을 했을 때 정의 된 개수 만큼의 (이전에 출력된 데이터에 이어지는) 데이터를 - 보여준다.

여기에 필요한 요소는 다음과 같습니다.

- data: 보여줄 데이터.
- current page: '현재'보는 페이지를 명시하는 요소.
- post per page: 페이지에서 보여줄 데이터(포스트)의 개수. limits 로 표현하기도 한다.
- index of last page: 페이지 내에서 '마지막 포스트'의 index 값. 위에서 정의한 current page 값과 post per page 값을 곱하면 구할 수 있다.
- index of first page: 페이지의 '첫 포스트'의 index 값. 위에서 정의한 index of last page 값에서 post per page 값을 빼면 구할 수 있다.
- current posts: '현재'보는 페이지에서 보여 줄 데이터(포스트). 위에서 정의한 index of first page 부터 index of last page 까지의 데이터를 slice 등의 방법을 통해 보여준다.
- paging function: 페이지를 이동시킬 함수. 추후 만들게 될 번호 또는 스크롤 이벤트를 통해 위의 current page 값을 변경시킨다.

이를 통해 구현한 코드는 아래에 첨가하겠습니다.
다만 기존에 작업하던 것에 pagination 만 붙인것이다보니 다른 요소들이 들어있고, 스타일링도 styled-components 로 되어있습니다.
그렇지만 위에서 이야기한, pagination 과 관련된 요소들을 파악해서 흐름을 보면 좋을 것 같습니다.
(아래 코드는 페이지네이션 만을 설명하기에는 친절하지 않은 코드입니다. 직접 페이지네이션을 구현하는 코드를 찾아보면 대략 비슷한 흐름으로 진행되니 페이지네이션에 집중 된 깔끔한 코드를 금방 찾을 수 있을거라 생각합니다.)

이렇게 구현을 하면 페이지 넘버를 클릭했을 때, 다음 데이터를 잘 보여줍니다.

Count.tsx

```
import React, { useState } from "react";
import styled from "styled-components";
import Feed from "../Feed";
import Header from "../Header";
import { useFetchAll } from "../../stateManagement/hooks/useFetchAll";
import Pagination from "../../utils/Pagination";

const Wrapper = styled.div`
  margin: 5rem auto 0;
`;

const SHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
`;

function Count() {
  const { loading, error, results } = useFetchAll.useFetchPopular();

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <SHeader>
        <Header />
      </SHeader>
      <Wrapper>
        {/* {!loading && <div>{data}</div>} */}
        {loading ? (
          <div>loading...</div>
        ) : (
          <div>
            {currentPosts &&
              currentPosts.length > 0 &&
              currentPosts.map((result: any) => (
                <Feed
                  key={result.id}
                  id={result.id}
                  title={result.original_title}
                  image={result.poster_path}
                  overview={result.overview}
                  vote_average={result.vote_average}
                  release_date={result.release_date}
                />
              ))}
            <Pagination
              postPerPage={postPerPage}
              totalPosts={results.length}
              paginate={paginate}
            />
          </div>
        )}
      </Wrapper>
    </div>
  );
}

export default Count;
```

Pagination.js

```
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageLists = styled.ul`
  display: flex;
`;

const PageNumber = styled.li``;

const PageButton = styled.button`
  cursor: pointer;
  font-size: 2rem;
  color: ${props => props.theme.uiColorOrange};
  margin: 0 0.3rem;
  padding: 0;
  border: none;
  background: none;
`;

function Pagination({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  // 페이지 넘버를 설정하기 위해 페이지당 포스트 개수와 총 포스트 개수를 가져온다.
  // index 를 1로 설정하고, index 가 (총 포스트개수 / 페이지당 포스트 개수) 보다 크지 않을때까지 i값을 올린다.
  // 그리고 그 값을 pageNumber 에 넣어서 설장한다.
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Wrapper>
      <PageLists>
        {pageNumbers.map(number => (
          <PageNumber key={number}>
            <PageButton onClick={() => paginate(number)}>{number}</PageButton>
          </PageNumber>
        ))}
      </PageLists>
    </Wrapper>
  );
}

export default Pagination;
```

그런데 여기서 생각해 볼 지점이 있습니다.

하나는 지금 코드는 데이터를 한번에 '다'가져온다는 것입니다.
데이터의 크기가 아주 크지 않다면 그것이 페이지 이동시에 빠른 이동을 보장할 수 있습니다.
그렇지만 보여줘야 할 데이터가 크다면, 페이지를 가져오는 단계에서 데이터를 잘라서 가져오고(post per page),
다음 페이지로 이동할 때 다시 다음 데이터를 가져오는 방법을 생각해볼 수 있습니다.

또 하나는 페이지를 이동할 때 이동 기록을 기억하지 않는다는 것입니다.
이것은 location, query 등을 사용하여 해결방법을 찾아볼 수 있을 것입니다.
그것을 간단하면서도 효율적이게 해결할 방법을 찾는 중이고, 방법을 찾는다면 수정하여 올리겠습니다.

또 하나는 페이지 이동 후, 뒤로가기 버튼을 눌렀을 때 그에 맞게 잘 반응하지 못한다는 것입니다.
이것은 router 와 location, history, match 등의 값을 활용해서 해결 방법을 생각해 볼 수 있을 것입니다.

첫번째 지점에서 이야기 했던 데이터를 가져올 때 데이터를 잘라서 가져오는 방법을 쓴다면
라우터의 파라미터 기능을 사용할 수 있을 것 같습니다.

현재 프로그램에서는 데이터가 크지 않기 때문에 데이터는 한번에 가져오지만,
뒤로가기 버튼은 잘 이해했으면 좋겠습니다.

그래서 사용한 값은 lcoation.search 입니다.
url 에서 ? 뒤에 붙게되는 값이라고 생각할 수 있습니다.

이를 위해서 보여줄 페이지로 이동시, 해당 값을 설정해서 넘겨줍니다.
저의 경우에는 다음과 같이 설정하였습니다.

main.tsx

```
    <Link to="/count?page=1">GO TO COUNT PAGE</Link>
```

또한 Pagination.js 에서 역시 페이지 이동시 해당 값을 전달해줍니다.

Pagination.js

```
   <Link
     to={`${match.url}?page=${number}`}
     onClick={() => paginate(number)}
    >
     {number}
    </Link>
```

그리고 count 컴포넌트에서 저 값을 가져와서 기존의 currentPage 의 값으로 사용합니다.
이때 query 값을 쉽게 가져오는 것을 돕는 query-string 을 사용하였습니다.

```
import queryString from "query-string";

...

  const query = queryString.parse(location.search);
  const [currentPage, setCurrentPage] = useState<any>(query.page || 1);

  const indexOfLastPost = parseInt(currentPage) * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => console.log(pageNumber);
...

```

query-string 으로 가져온 값은 string 이기 때문에 currentPage 를 쓸 때 parseInt 를 사용하여 Int 값으로 변경합니다.

그리고 마운트 된 뒤에도 query.page 값의 변경에 따라 업데이트 할 수 있도록 useEffect() 를 사용합니다.
dpes 에 query.page 를 설정하여 해당 값이 변경될 때 setCurrentPage() 의 동작을 트리거할 수 있게 합니다.

```
  useEffect(() => {
    setCurrentPage(query.page);
  }, [query.page]);
```

이 과정까지 하면 뒤로가기 버튼을 잘 이해합니다.
그리고 이 동작은 기존의 paginate 와 겹치기 때문에 paginate 를 제거해도 됩니다.
저는 아직 조금 더 효율적인 방법이 있지 않을까 하여 paginate 는 console 로 값을 보내게 하여 다른 작업을 진행하고자 남겨두었습니다.

아직 해결해야할 요소들이 더 있겠지만 생각했던 동작을 구현해 볼 수 있었습니다.
아무래도 직접 구현하다보니 작동 원리 뿐 아니라 그를 활용하여 다양한 객체들과 효율적인 조합을 고민하는 등 좋은 기회가 되었습니다.
결국 이런 작은 단계에서의 작동방법을 이해하고, 또 그것이 잘 작동할 때 더 복잡한 기능을 단단하게 추가할 수 있을 것이라고 생각합니다.

사실 페이지 네이션은 당연하다면 당연하고, 작다면 작은 요소일 수 있지만 또 그래서 그만큼 중요한 요소라고 생각합니다.
개인적으로 페이지네이션, 그리고 이동하는 정보가 기록되어 있지 않은 페이지는 굉장히 불편을 느끼기 때문입니다.
그런 고민을 지속해 가며, 보다 쉽고 간결한 코드를 만들어 가도록 노력하고자 합니다.

Count.tsx

```
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Feed from "../Feed";
import Header from "../Header";
import { useFetchAll } from "../../stateManagement/hooks/useFetchAll";
import Pagination from "../../utils/Pagination";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

const Wrapper = styled.div`
  margin: 5rem auto 0;
`;

const SHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
`;

function Count({ history, location, match }: any) {
  const { loading, error, results } = useFetchAll.useFetchPopular();

  const query = queryString.parse(location.search);

  const [currentPage, setCurrentPage] = useState<any>(query.page|| 1);
  const [postPerPage, setPostPerPage] = useState(5);

  const indexOfLastPost = parseInt(currentPage) * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currentPosts = results.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => console.log(pageNumber);

  useEffect(() => {
    setCurrentPage(query.page);
  }, [query.page]);

  console.log(query);
  console.log(currentPosts.map((post: any) => post.title));
  return (
    <div>
      <SHeader>
        <Header />
      </SHeader>
      <Wrapper>
        {/* {!loading && <div>{data}</div>} */}
        {loading ? (
          <div>loading...</div>
        ) : (
          <div>
            {currentPosts &&
              currentPosts.length > 0 &&
              currentPosts.map((result: any) => (
                <Feed
                  key={result.id}
                  id={result.id}
                  title={result.original_title}
                  image={result.poster_path}
                  overview={result.overview}
                  vote_average={result.vote_average}
                  release_date={result.release_date}
                />
              ))}
            <Pagination
              postPerPage={postPerPage}
              totalPosts={results.length}
              paginate={paginate}
              match={match}
              currentPage={currentPage}
              query={query}
            />
            {query.page}
          </div>
        )}
      </Wrapper>
    </div>
  );
}

export default withRouter(Count);

```

Pagination.js

```
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageLists = styled.ul`
  display: flex;
`;

const PageNumber = styled.li``;

const PageButton = styled.button`
  cursor: pointer;
  font-size: 2rem;
  color: ${props => props.theme.uiColorOrange};
  margin: 0 0.3rem;
  padding: 0;
  border: none;
  background: none;
`;

function Pagination({
  postPerPage,
  totalPosts,
  paginate,
  match,
  currentPage,
  query
}) {
  const pageNumbers = [];
  // 페이지 넘버를 설정하기 위해 페이지당 포스트 개수와 총 포스트 개수를 가져온다.
  // index 를 1로 설정하고, index 가 (총 포스트개수 / 페이지당 포스트 개수) 보다 크지 않을때까지 i값을 올린다.
  // 그리고 그 값을 pageNumber 에 넣어서 설장한다.
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Wrapper>
      <PageLists>
        {pageNumbers.map(number => (
          <PageNumber key={number}>
            <Link
              to={`${match.url}?page=${number}`}
              onClick={() => paginate(number)}
            >
              {number}
            </Link>
          </PageNumber>
        ))}
      </PageLists>
    </Wrapper>
  );
}

export default Pagination;
```
