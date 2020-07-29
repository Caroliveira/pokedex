<template>
  <div>
    <v-card flat rounded="lg" class="ov-hidden" :color="pokemon.color">
      <v-row align="center">
        <v-col cols="6" class="centralize py-0">
          <v-img :src="pokemon.picture" />
        </v-col>
        <v-col cols="6" class="py-6">
          <p class="pokemon-name">{{ pokemon.name }}</p>
          <span
            v-for="type in pokemon.types"
            :key="type"
            :class="`pokemon-type`"
          >
            {{ type }}
          </span>
          <p class="pokemon-id">#{{ pokemon.id }}</p>
        </v-col>
      </v-row>
      <div :class="`pokemon-bg`" />
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object(),
  },
}
</script>

<style lang="scss" src="~/assets/scss/card.scss" scoped />
