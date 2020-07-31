<template>
  <div class="pokecard">
    <v-card
      flat
      rounded="lg"
      class="ov-hidden"
      :color="pokemon.color"
      @click="handleClick"
    >
      <v-row align="center">
        <v-col cols="6" class="centralize py-0">
          <v-img :src="pokemon.picture" />
        </v-col>
        <v-col cols="6" class="py-6">
          <p class="h2-white mb-1">{{ pokemon.name }}</p>
          <span v-for="type in pokemon.types" :key="type" class="chip">
            {{ type }}
          </span>
          <p class="pokemon-id">#{{ pokemon.id }}</p>
        </v-col>
      </v-row>
      <div class="pokemon-circle-bg" />
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object(),
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
