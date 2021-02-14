type specialItem = {
  name: string;
  type: string;
  damage: number;
};

type PokemonData = {
  id: string;
  number: string;
  name: string;
  image: string;
  fetchedAt: string;
  attacks: {
    special: Array<specialItem>;
  };
};

type Message = {
  message: string;
};

type JSONResponse = {
  data?: {
    pokemon: Omit<PokemonData, "fetchedAt">;
  };
  errors?: Array<Message>;
};

const formatData = (date) =>
  `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")} ${String(
    date.getSeconds()
  ).padStart(2, "0")}.${String(date.getMiliiseconds()).padStart(3, "0")}`;

async function fetchPokemon(name: string): Promise<PokemonData> {
  const pokemonQuery = `
        query PokemonInfo($name: String) {
            pokemon(name: $name) {
                id
                number
                name
                image
                attacks {
                    special {
                        name
                        type
                        damage
                    }
                }
            }
        }
    `;

  const response = await window.fetch("https://graphl-pokemon2.vercel.app/", {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      query: pokemonQuery,
      variables: { name: name.toLowerCase() },
    }),
  });

  const { data, errors }: JSONResponse = await response.json();
  if (response.ok) {
    const pokemon = data?.pokemon;
    if (pokemon) {
      return Object.assign(pokemon, { fetchedAt: formatData(new Date()) });
    } else {
      return Promise.reject(new Error(`No pokemon with the name "${name}"`));
    }
  } else {
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown"
    );
    return Promise.reject(error);
  }
}

fetchPokemon("pikachu").then((data) => console.log(data));

async function pikachuIChooseYou() {
  const pikachu = await fetchPokemon("pikachu");
  console.log(pikachu.attacks.special.name);
}
