<template>
  <div>
    <v-img src="/pokeball.svg" class="pokeball" />
    <TitleBar />
    <v-row>
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        md="6"
        lg="4"
        class="pa-5"
      >
        <PokeCard :pokemon="pokemon" />
      </v-col>
    </v-row>
    <v-pagination
      v-model="page"
      :length="totalPages"
      total-visible="7"
      circle
      class="pagination"
      color="primary"
      @input="goPage"
      @next="goNext"
      @previous="goPrevious"
    />
  </div>
</template>

<script>
import TitleBar from '~/components/titleBar'
import PokeCard from '~/components/card'
import { getPokemons, getPokemon, getPokemonSpecies } from '~/services'

export default {
  components: {
    TitleBar,
    PokeCard,
  },
  data() {
    return {
      page: 1,
      totalPages: 0,
      pokemons: [],
    }
  },
  async mounted() {
    const offset = (this.page - 1) * 12
    const { results, count } = await getPokemons(this.$axios, offset.toString())
    this.totalPages = Math.ceil(count / 12)
    this.setPokemons(results)
  },
  methods: {
    async setPokemons(results) {
      this.pokemons = await Promise.all(
        results.map(async (el) => {
          const resPokemon = await getPokemon(this.$axios, el.url)
          const resSpecies = await getPokemonSpecies(
            this.$axios,
            resPokemon.species.url
          )
          const pokemon = {
            id: resPokemon.id.toString().padStart(3, '0'),
            name: resPokemon.name,
            types: resPokemon.types.map((el) => el.type.name),
            picture: resPokemon.sprites.front_default,
            color:
              resSpecies.color.name === 'white'
                ? 'orange'
                : resSpecies.color.name,
            height: resPokemon.height,
            width: resPokemon.width,
            abilities: resPokemon.abilities.map((el) => el.ability.name),
            // eggGroups: resSpecies.eggGroups.map((el) => el.name),
            baseExp: resPokemon.base_experience,
            captureRate: resSpecies.capture_rate,
            baseHappiness: resSpecies.base_happiness,
            growthRate: resSpecies.growth_rate.name,
            stats: resPokemon.stats.map((el) => ({
              name: el.stat.name,
              stat: el.base_stat,
            })),
          }
          return pokemon
        })
      )
    },
    async goPage() {
      const offset = (this.page - 1) * 12
      const { results } = await getPokemons(this.$axios, offset.toString())
      this.setPokemons(results)
    },
    async goNext() {
      const offset = this.page * 12
      const { results } = await getPokemons(this.$axios, offset.toString())
      this.setPokemons(results)
    },
    async goPrevious() {
      const offset = (this.page - 2) * 12
      const { results } = await getPokemons(this.$axios, offset.toString())
      this.setPokemons(results)
    },
  },
}
</script>

<style lang="scss" src="~/assets/scss/home.scss" scoped />
