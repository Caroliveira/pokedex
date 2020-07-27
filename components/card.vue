<template>
  <div>
    <v-card color="#F16F65" flat rounded="lg" class="ov-hidden py-6">
      <v-row>
        <v-col cols="6" class="centralize">
          <v-avatar tile size="80" color="grey" />
        </v-col>
        <v-col cols="6">
          <p class="pokemon-name">Charmander</p>
          <span class="pokemon-type">Fire</span>
          <p class="pokemon-id">#001</p>
        </v-col>
      </v-row>
      <div class="pokemon-bg" />
    </v-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" src="~/assets/scss/card.scss" scoped />
