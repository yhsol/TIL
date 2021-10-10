# Children 사용 방법

- title 과 같이 특정하게 지정할 값을 따로 지정하고,
  나머지는 Section jsx 태그로 감싸서 사용하면 간편하면서도, 통일감 있게 사용 할 수 있다.

- SectionColumn.js

```
<Container>
		<Title>{title}</Title>
		<Grid>{children}</Grid>
	</Container>
```

- CountPresenter

```
{popular &&
				popular.length > 0 && (
					<SectionRows title="Popular">
						{popular.map((movie) => (
							<Poster
								key={movie.id}
								id={movie.id}
								title={movie.title}
								imageUrl={movie.poster_path}
								rating={movie.vote_average}
								// 아래와 같은 경우, substring 이나 slice 같은 메서드를 쓰는 경우 앞의 값이 null일 경우 에러가 생길 수 있어서 그 값을 확인하는 것이 필요.
								year={movie.release_date}
								isBook={true}
								overview={movie.overview}
							/>
						))}
					</SectionRows>
				)}
```
