<template>
  <v-row class="mb-6">
    <v-col cols="12" md="8">
      <h1 class="primary-title">Pokedex</h1>
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field
        solo
        flat
        rounded
        clearable
        hide-details
        placeholder="Search Pokemon"
        prepend-inner-icon="mdi-magnify"
        background-color="#F5F5F5"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>

<style lang="scss" src="~/assets/scss/titleBar.scss" scoped />
