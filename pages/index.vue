<template>
  <div class="content">
    <v-img src="/pokeball.svg" class="pokeball" />
    <v-row class="mb-6">
      <v-col cols="12" md="8">
        <h1 class="h1-gray1" @click="backHome">Pokedex</h1>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          solo
          flat
          rounded
          clearable
          hide-details
          placeholder="Search Pokemon"
          prepend-inner-icon="mdi-magnify"
          background-color="gray6"
          @keyup.enter="goSearch"
        />
      </v-col>
    </v-row>
    <v-row v-if="loading">
      <v-col v-for="i in 9" :key="i" cols="6" md="4">
        <v-skeleton-loader type="image" />
      </v-col>
    </v-row>
    <div v-else>
      <div v-if="search404" class="error-component">
        <p class="title-error">Sorry, no result found :(</p>
        <p class="body1-gray3 transform-none">
          The Pokemon you searched was <br />
          unfortunately not found or doest't exist.
        </p>
      </div>
      <v-row v-else>
        <v-col
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          cols="6"
          md="4"
          class="pa-sm-2 pa-md-5"
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
  </div>
</template>

<script>
import PokeCard from '~/components/card'
import { getPokemons, getPokemon, getPokemonSpecies } from '~/services'

export default {
  components: {
    PokeCard,
  },
  data() {
    return {
      loading: false,
      search: '',
      isSearching: false,
      search404: false,
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
      this.loading = true
      const offset = num.toString()
      const { pokemons, count } = await getPokemons(this.$axios, offset)
      this.pokemons = pokemons
      this.totalPages = Math.ceil(count / 12)
      this.loading = false
    },
    backHome() {
      this.isSearching = false
      this.search404 = false
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
    async goSearch() {
      if (this.search && this.search !== '') {
        this.loading = true
        const resPokemon = await getPokemon(
          this.$axios,
          `pokemon/${this.search.toLowerCase()}`
        )
        if (resPokemon.status) {
          this.search404 = true
        } else {
          this.isSearching = true
          const resSpecies = await getPokemonSpecies(
            this.$axios,
            resPokemon.url
          )
          this.pokemons = [
            {
              ...resPokemon,
              ...resSpecies,
            },
          ]
        }
        this.loading = false
      } else if (this.search404) {
        this.backHome()
      }
    },
  },
}
</script>

<style lang="scss" src="~/assets/scss/home.scss" scoped />
