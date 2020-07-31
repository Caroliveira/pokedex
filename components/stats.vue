<template>
  <div class="mt-10">
    <v-row v-for="el in pokemon.stats" :key="el.title">
      <v-col cols="4" class="body1-gray3"> {{ el.name }} </v-col>
      <v-col cols="2" class="body1-gray2"> {{ el.stat }} </v-col>
      <v-col cols="6" class="centralize">
        <v-progress-linear
          :value="el.stat"
          color="primary"
          background-color="gray6"
          height="0.313rem"
          rounded
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="body1-gray3"> Total </v-col>
      <v-col cols="2" class="body1-gray2"> {{ total }} </v-col>
      <v-col cols="6" class="centralize">
        <v-progress-linear
          :value="total / qtde"
          color="primary"
          background-color="gray6"
          height="0.313rem"
          rounded
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: Object(),
  },
  computed: {
    total() {
      return this.pokemon.stats.reduce((count, el) => count + el.stat, 0)
    },
    qtde() {
      return this.pokemon.stats.length
    },
  },
}
</script>
