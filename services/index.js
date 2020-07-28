export async function getPokemons(axios, page = 0) {
  const response = await axios.get(`pokemon/?offset=${page}&limit=12`)
  return response.data.results
}

export async function getPokemon(axios, name) {
  const response = await axios.get(`pokemon/${name}`)
  return response.data
}

export async function getPokemonSpecies(axios, name) {
  const response = await axios.get(`pokemon-species/${name}`)
  return response.data
}
