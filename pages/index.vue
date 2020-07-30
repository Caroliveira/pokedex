<template>
  <div class="content">
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
import { getPokemons } from '~/services'

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
  mounted() {
    const offset = (this.page - 1) * 12
    this.getPokemonsAndCount(offset)
  },
  methods: {
    async getPokemonsAndCount(num) {
      const offset = num.toString()
      const { pokemons, count } = await getPokemons(this.$axios, offset)
      this.pokemons = pokemons
      this.totalPages = Math.ceil(count / 12)
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
  },
}
</script>

<style lang="scss" src="~/assets/scss/home.scss" scoped />
