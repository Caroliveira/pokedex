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
      <v-tabs>
        <v-tab>About</v-tab>
        <v-tab>Base Stats</v-tab>
        <v-tab>Evolution</v-tab>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
import { getPokemon, getPokemonSpecies } from '~/services'
export default {
  data() {
    return {
      id: '',
      pokemon: {},
      liked: false,
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
