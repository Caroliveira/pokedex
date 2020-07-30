<template>
  <div>
    <div :class="`pokemon-bar-${pokemon.color}`">
      <v-row align="center">
        <v-col cols="1">
          <v-icon color="white" @click="goBack">mdi-arrow-left</v-icon>
        </v-col>
        <v-col>
          <h1 class="name">{{ pokemon.name }}</h1>
        </v-col>
        <v-col cols="1" class="d-flex justify-end">
          <v-icon color="white" @click="like">
            {{ liked ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col offset-md="1">
          <span v-for="type in pokemon.types" :key="type" class="chip">
            {{ type }}
          </span>
        </v-col>
        <v-col cols="1" class="d-flex justify-end">
          <p class="id">#{{ id }}</p>
        </v-col>
      </v-row>
    </div>
    <div class="pokemon-bg" />
    <v-card flat rounded="xl" class="pokemon-content">
      <v-tabs v-model="tab" class="tabs" color="primary">
        <v-tab key="about">About</v-tab>
        <v-tab key="stats">Base Stats</v-tab>
        <v-tab key="evolution">Evolution</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="about">
          about
        </v-tab-item>
        <v-tab-item key="stats">
          stats
        </v-tab-item>
        <v-tab-item key="evolution">
          evolution
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { getPokemon, getPokemonSpecies } from '~/services'
export default {
  data() {
    return {
      id: '',
      tab: 'about',
      liked: false,
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
  methods: {
    goBack() {
      this.$router.push('/')
    },
    like() {
      this.liked = !this.liked
    },
  },
}
</script>

<style lang="scss" src="~/assets/scss/pokemon.scss" scoped />
