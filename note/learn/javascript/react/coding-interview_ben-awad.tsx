import axios from "axios";
import { useState } from "react";
import "./styles.css";

interface IUsername {
  title: string;
  first: string;
  last: string;
}

interface IPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface IUserInfos {
  name: IUsername;
  picture: IPicture;
}

const RANDOM_USER_API = "https://randomuser.me/api";

const getRandomUser = async () => {
  const data = await fetch(RANDOM_USER_API)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
};

const getRandomUserWithAxios = async (page: number = 1) => {
  try {
    const URL = `${RANDOM_USER_API}?page=${page}`;
    const data = await axios.get(URL).then((res) => res.data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getFullUsername = (data: IUserInfos) => {
  const {
    name: { first, last }
  } = data;
  return `${first} ${last}`;
};

export default function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [randomUserDataJson, setRandomUserDataJson] = useState("");
  const [userInfos, setUserInfos] = useState<any>([]);
  const [page, setPage] = useState(1);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleDcrease = () => {
    setCount(count - 1);
  };

  const handleRandomUser = async () => {
    const data = await getRandomUser();
    setRandomUserDataJson(JSON.stringify(data));
  };

  const handleUserInfos = async () => {
    const data = await getRandomUserWithAxios(page);
    if (!data.results) return;

    setUserInfos([...userInfos, ...data.results]);
    setPage(data.info.page + 1);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>
        Count: <span>{count}</span>
      </h2>
      <button onClick={handleIncrease}>increase</button>
      <button onClick={handleDcrease}>decrease</button>

      <h2>
        Data: <span>{randomUserDataJson ? randomUserDataJson : "user"}</span>
      </h2>
      <button onClick={handleRandomUser}>get random user</button>
      <h2>User Infos</h2>
      <div>
        {userInfos.map((item: IUserInfos, index: number) => (
          <div key={index}>
            <div>name: {getFullUsername(item)}</div>
            <div>
              picture: <img src={item.picture.thumbnail} alt="user" />
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleUserInfos}>get user infos</button>
      <h3>load more</h3>
      <button onClick={handleUserInfos}>load more</button>
    </div>
  );
}
