export const state = () => ({
  pokemons: [],
})

export const mutations = {
  reset(state) {
    state.pokemons = []
  },
  add(state, pokemon) {
    state.pokemons.push(pokemon)
  },
}
