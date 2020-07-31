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
  const abilities = data.abilities.map((el) => el.ability.name)
  const effort = data.stats
    .filter((el) => el.effort !== 0)
    .map((el) => `${el.effort} ${el.stat.name}`)
  const pokemon = {
    id: data.id,
    url: data.species.url,
    name: data.name,
    types: data.types.map((el) => el.type.name),
    picture: data.sprites.front_default,
    height: `${data.height / 10} cm`,
    weight: `${data.weight / 10} kg`,
    abilities: abilities.join(', '),
    baseExp: data.base_experience,
    stats: data.stats.map((el) => ({
      name: el.stat.name,
      stat: el.base_stat,
    })),
    effortPoints: effort.join(', '),
  }
  console.log(pokemon)
  return pokemon
}

export async function getPokemonSpecies(axios, url) {
  const response = await axios.get(url)
  const { data } = response
  const eggGroups = data.egg_groups.map((el) => el.name)
  const pokemon = {
    baseHappiness: data.base_happiness,
    captureRate: data.capture_rate,
    color: data.color.name === 'white' ? 'orange' : data.color.name,
    eggCycle: data.hatch_counter,
    eggGroups: eggGroups.join(', '),
    gender: data.gender_rate,
    growthRate: data.growth_rate.name,
    species: data.genera[7].genus,
  }
  console.log(pokemon)
  return pokemon
}
