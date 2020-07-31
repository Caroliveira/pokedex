<template>
  <div class="mt-10">
    <v-row v-for="el in about" :key="el.title">
      <v-col cols="3" class="body1-gray3"> {{ el.title }} </v-col>
      <v-col cols="9" class="body1-gray2"> {{ el.value }} </v-col>
    </v-row>
    <h2 class="h2-gray1 mt-10">Breeding</h2>
    <v-row>
      <v-col cols="3" class="body1-gray3"> Gender </v-col>
      <v-col v-if="hasGender" cols="9" class="body1-gray2 d-flex align-center">
        <div class="male mr-2" />
        <span> {{ male }} </span>
        <div class="female ml-8 mr-2" />
        <span> {{ female }} </span>
      </v-col>
      <v-col v-else cols="9" class="body1-gray2">
        Genderless
      </v-col>
      <v-col cols="3" class="body1-gray3"> Egg Groups </v-col>
      <v-col cols="9" class="body1-gray2"> {{ pokemon.eggGroups }} </v-col>
      <v-col cols="3" class="body1-gray3"> Egg Cycle </v-col>
      <v-col cols="9" class="body1-gray2"> {{ pokemon.eggCycle }} </v-col>
    </v-row>
    <h2 class="h2-gray1 mt-10">Training</h2>
    <v-row v-for="el in training" :key="el.title">
      <v-col cols="3" class="body1-gray3"> {{ el.title }} </v-col>
      <v-col cols="9" class="body1-gray2"> {{ el.value }} </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object(),
  },
  computed: {
    hasGender() {
      return this.pokemon.gender !== -1
    },
    female() {
      const percentage = (this.pokemon.gender / 8) * 100
      return `${percentage}%`
    },
    male() {
      const percentage = 100 - (this.pokemon.gender / 8) * 100
      return `${percentage}%`
    },
    about() {
      return [
        { title: 'Species', value: this.pokemon.species },
        { title: 'Height', value: this.pokemon.height },
        { title: 'Weight', value: this.pokemon.weight },
        { title: 'Abilities', value: this.pokemon.abilities },
      ]
    },
    training() {
      return [
        { title: 'Base EXP', value: this.pokemon.baseExp },
        { title: 'Effort points', value: this.pokemon.effortPoints },
        { title: 'Capture rate', value: this.pokemon.captureRate },
        { title: 'Base happiness', value: this.pokemon.baseHappiness },
        { title: 'Growth rate', value: this.pokemon.growthRate },
      ]
    },
  },
}
</script>

<style lang="scss" src="~/assets/scss/tabs.scss" scoped />
