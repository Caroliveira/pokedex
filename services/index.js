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
  try {
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
      height: `${data.height * 10} cm`,
      weight: `${data.weight / 10} kg`,
      abilities: abilities.join(', '),
      baseExp: data.base_experience,
      stats: data.stats.map((el) => ({
        name: el.stat.name,
        stat: el.base_stat,
      })),
      effortPoints: effort.join(', '),
    }
    return pokemon
  } catch (err) {
    return { status: err.response.status }
  }
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
    evolution: data.evolution_chain.url,
    gender: data.gender_rate,
    growthRate: data.growth_rate.name,
    species: data.genera[7].genus,
  }
  return pokemon
}

export async function getEvolutionChain(axios, url) {
  const response = await axios.get(url)
  const data = response.data.chain.evolves_to
  const evolution = []
  data.map((el) => evolvesTo(axios, evolution, el, 0))
  return evolution
}

async function evolvesTo(axios, ar, pokemon, key) {
  const i = key + 1
  if (pokemon.evolves_to.length !== 0) {
    pokemon.evolves_to.map((el) => evolvesTo(axios, ar, el, i))
  }
  const name = pokemon.species.name
  const { picture } = await getPokemon(axios, `pokemon/${name}`)
  const evolution = {
    stage: i,
    level: pokemon.evolution_details[0].min_level,
    trigger: pokemon.evolution_details[0].trigger.name,
    picture,
    name,
  }
  ar.push(evolution)
  return ar
}
