<template>
  <div>
    <PokemonBar :pokemon-id="id" :pokemon="pokemon" />
    <div class="d-flex justify-center">
      <v-card flat rounded="xl" width="1000px" class="tabs-card">
        <v-tabs v-model="tab" class="tabs" color="primary">
          <v-tab key="about">About</v-tab>
          <v-tab key="stats">Base Stats</v-tab>
          <v-tab key="evolution">Evolution</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item key="about">
            <About :pokemon="pokemon" />
          </v-tab-item>
          <v-tab-item key="stats">
            <Stats :pokemon="pokemon" />
          </v-tab-item>
          <v-tab-item key="evolution">
            <Evolution :url="pokemon.evolution" />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getPokemon, getPokemonSpecies } from '~/services'
import About from '~/components/about'
import Stats from '~/components/stats'
import Evolution from '~/components/evolution'
import PokemonBar from '~/components/pokemonBar'
export default {
  components: {
    About,
    Stats,
    Evolution,
    PokemonBar,
  },
  data() {
    return {
      id: '',
      tab: 'about',
      pokemon: {},
    }
  },
  async mounted() {
    const { pokemon } = this.$store.state.pokemon
    if (Object.keys(pokemon).length === 0) {
      const { id } = this.$route.params
      const resPokemon = await getPokemon(this.$axios, `pokemon/${id}`)
      this.pokemon = {
        ...resPokemon,
        ...(await getPokemonSpecies(this.$axios, resPokemon.url)),
      }
    } else {
      this.pokemon = pokemon
    }
    this.id = this.pokemon.id.toString().padStart(3, '0')
  },
}
</script>

<style lang="scss" src="~/assets/scss/pokemon.scss" scoped />
