export async function getPokemons(axios, offset = 0) {
  const response = await axios.get(`pokemon/?offset=${offset}&limit=12`)
  return response.data
}

export async function getPokemon(axios, url) {
  const response = await axios.get(url)
  return response.data
}

export async function getPokemonSpecies(axios, url) {
  const response = await axios.get(url)
  return response.data
}
