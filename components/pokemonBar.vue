<template>
  <div :class="`pokemon-bar-${pokemon.color}`" class="d-flex justify-center">
    <div class="pokemon-bar-width hidden-md-and-up">
      <v-row align="center">
        <v-col cols="6">
          <v-icon color="white" @click="goBack">mdi-arrow-left</v-icon>
        </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-icon color="white" @click="like">
            {{ liked ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h1 class="h1-white">{{ pokemon.name }}</h1>
          <span v-for="type in pokemon.types" :key="type" class="chip">
            {{ type }}
          </span>
        </v-col>
        <v-col class="d-flex justify-end">
          <p class="h2-white">#{{ pokemonId }}</p>
        </v-col>
      </v-row>
    </div>
    <div class="pokemon-bar-width hidden-sm-and-down">
      <v-row align="center">
        <v-col cols="1">
          <v-icon color="white" @click="goBack">mdi-arrow-left</v-icon>
        </v-col>
        <v-col>
          <h1 class="h1-white">{{ pokemon.name }}</h1>
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
        <v-col class="d-flex justify-end">
          <p class="h2-white">#{{ pokemonId }}</p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemonId: String(),
    pokemon: Object(),
  },
  data() {
    return {
      liked: false,
    }
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
