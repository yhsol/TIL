# Data fetching with hooks

- using useEffect
  - useEffect 내에 async/await 함수를 정의해서 사용한다.

```
    useEffect(() => {
        const FetchData = async () => {
            const result = await axios();

            setData(result.data)
        }

        FetchData()
    }, [])
```
