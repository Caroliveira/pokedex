<template>
  <v-row class="mb-6">
    <v-col cols="12" md="8">
      <h1 class="h1-gray1">Pokedex</h1>
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        v-model="name"
        solo
        flat
        rounded
        clearable
        hide-details
        placeholder="Search Pokemon"
        prepend-inner-icon="mdi-magnify"
        background-color="gray6"
        @keyup.enter="search"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    }
  },
  methods: {
    search() {
      this.$emit('search', this.name)
    },
  },
}
</script>
