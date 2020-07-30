export async function getPokemons(axios, offset = 0) {
  const response = await axios.get(`pokemon/?offset=${offset}&limit=12`)
  const { results, count } = response.data
  const pokemons = await Promise.all(
    results.map(async (el) => {
      const resPokemon = await getPokemon(axios, el.url)
      const resSpecies = await getPokemonSpecies(axios, resPokemon.url)
      return {
        ...resPokemon,
        ...resSpecies,
      }
    })
  )
  const data = {
    pokemons,
    count,
  }
  return data
}

export async function getPokemon(axios, url) {
  const response = await axios.get(url)
  const { data } = response
  const pokemon = {
    id: data.id,
    url: data.species.url,
    name: data.name,
    types: data.types.map((el) => el.type.name),
    picture: data.sprites.front_default,
    height: data.height,
    width: data.width,
    abilities: data.abilities.map((el) => el.ability.name),
    baseExp: data.base_experience,
    stats: data.stats.map((el) => ({
      name: el.stat.name,
      stat: el.base_stat,
    })),
  }
  console.log(pokemon)
  return pokemon
}

export async function getPokemonSpecies(axios, url) {
  const response = await axios.get(url)
  const { data } = response
  const pokemon = {
    color: data.color.name === 'white' ? 'orange' : data.color.name,
    // eggGroups: data.eggGroups.map((el) => el.name),
    captureRate: data.capture_rate,
    baseHappiness: data.base_happiness,
    growthRate: data.growth_rate.name,
  }
  console.log(pokemon)
  return pokemon
}
