export const state = () => ({
  pokemon: {},
})

export const mutations = {
  set(state, pokemon) {
    state.pokemon = pokemon
  },
}
