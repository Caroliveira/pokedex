<template>
  <div class="pokecard">
    <v-card
      flat
      rounded="lg"
      class="ov-hidden hidden-sm-and-down"
      :color="pokemon.color"
      @click="handleClick"
    >
      <v-row align="center">
        <v-col cols="6" class="centralize py-0">
          <v-img :src="pokemon.picture" />
        </v-col>
        <v-col cols="6" class="py-6">
          <div class="h2-white mb-1 ov-hidden">{{ pokemon.name }}</div>
          <span v-for="type in pokemon.types" :key="type" class="chip">
            {{ type }}
          </span>
          <p class="pokemon-id">#{{ id }}</p>
        </v-col>
      </v-row>
      <div class="pokemon-circle-bg" />
    </v-card>
    <v-card
      flat
      rounded="lg"
      class="pokemon-card hidden-md-and-up pb-n6"
      :color="pokemon.color"
      @click="handleClick"
    >
      <v-row align="center" class="px-5 mb-n3 row-height">
        <v-col cols="12" class="pt-4 pb-0">
          <p class="h2-white mb-1">{{ pokemon.name }}</p>
        </v-col>
        <v-col
          v-for="type in pokemon.types"
          :key="type"
          cols="12"
          class="py-0 mb-1"
        >
          <span class="chip">
            {{ type }}
          </span>
        </v-col>
      </v-row>
      <v-row class="pl-5">
        <v-col cols="6" class="pr-0 mt-n3">
          <p class="pokemon-id">#{{ id }}</p>
        </v-col>
        <v-col cols="6" class="justify-end pa-0">
          <v-img :src="pokemon.picture" class="picture-bg" />
        </v-col>
      </v-row>
      <!-- <div class="pokemon-circle-bg" /> -->
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object(),
  },
  computed: {
    id() {
      return this.pokemon.id.toString().padStart(3, '0')
    },
  },
  methods: {
    handleClick() {
      this.$store.commit('pokemon/set', this.pokemon)
      this.$router.push(`/pokemon/${this.pokemon.id}`)
    },
  },
}
</script>

<style lang="scss" src="~/assets/scss/card.scss" scoped />
