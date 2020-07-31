<template>
  <div class="content">
    <v-img src="/pokeball.svg" class="pokeball" />
    <TitleBar @search="goSearch" />
    <div v-if="search404" class="search-not-found">
      <p class="title-404">Sorry, no result found :(</p>
      <p class="body1-gray3 transform-none">
        The Pokemon you searched was <br />
        unfortunately not found or doest't exist.
      </p>
    </div>
    <v-row v-else>
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
    <p v-if="isSearching || search404" class="link" @click="backHome">
      <v-icon color="primary">mdi-chevron-left</v-icon>
      <span class="link-text">Back to home</span>
    </p>
    <v-pagination
      v-else
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
import PokeCard from '~/components/card'
import TitleBar from '~/components/titleBar'
import { getPokemons, getPokemon, getPokemonSpecies } from '~/services'

export default {
  components: {
    PokeCard,
    TitleBar,
  },
  data() {
    return {
      isSearching: false,
      search404: true,
      page: 1,
      totalPages: 0,
      pokemons: [],
    }
  },
  mounted() {
    this.getPokemonsAndCount(0)
  },
  methods: {
    async getPokemonsAndCount(num) {
      const offset = num.toString()
      const { pokemons, count } = await getPokemons(this.$axios, offset)
      this.pokemons = pokemons
      this.totalPages = Math.ceil(count / 12)
    },
    backHome() {
      this.getPokemonsAndCount(0)
    },
    goPage() {
      const offset = (this.page - 1) * 12
      this.getPokemonsAndCount(offset)
    },
    goNext() {
      const offset = this.page * 12
      this.getPokemonsAndCount(offset)
    },
    goPrevious() {
      const offset = (this.page - 2) * 12
      this.getPokemonsAndCount(offset)
    },
    async goSearch(search) {
      this.isSearching = true
      const resPokemon = await getPokemon(this.$axios, `pokemon/${search}`)
      const resSpecies = await getPokemonSpecies(this.$axios, resPokemon.url)
      this.pokemons = [
        {
          ...resPokemon,
          ...resSpecies,
        },
      ]
    },
  },
}
</script>

<style lang="scss" src="~/assets/scss/home.scss" scoped />
