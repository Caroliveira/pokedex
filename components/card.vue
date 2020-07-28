<template>
  <div>
    <v-card flat rounded="lg" class="ov-hidden" :color="pokemon.color">
      <v-row>
        <v-col cols="6" class="centralize py-0">
          <v-img :src="pokemon.picture" />
        </v-col>
        <v-col cols="6" class="py-6">
          <p class="pokemon-name">{{ name }}</p>
          <span
            v-for="type in pokemon.types"
            :key="type"
            :class="`pokemon-type-${pokemon.color}`"
          >
            {{ type }}
          </span>
          <p class="pokemon-id">#{{ pokemon.id }}</p>
        </v-col>
      </v-row>
      <div :class="`pokemon-bg-${pokemon.color}`" />
    </v-card>
  </div>
</template>

<script>
import { getPokemon, getPokemonSpecies } from '~/services'

export default {
  props: {
    name: String(),
  },
  data() {
    return {
      pokemon: {},
    }
  },
  async mounted() {
    const res = {
      ...(await getPokemon(this.$axios, this.name)),
      ...(await getPokemonSpecies(this.$axios, this.name)),
    }
    this.pokemon = {
      id: res.id.toString().padStart(3, '0'),
      name: res.name,
      types: res.types.map((el) => el.type.name),
      picture: res.sprites.front_default,
      color: res.color.name,
      height: res.height,
      width: res.width,
      // abilities: res.abilities.map((el) => el.ability.name),
      // eggGroups: res.eggGroups.map((el) => el.name),
      baseExp: res.base_experience,
      captureRate: res.capture_rate,
      baseHappiness: res.base_happiness,
      growthRate: res.growth_rate.name,
      // stats: res.stats.map((el) => ({
      //   name: el.stat.name,
      //   stat: el.base_stat,
      // })),
    }
  },
}
</script>

<style lang="scss" src="~/assets/scss/card.scss" scoped />
