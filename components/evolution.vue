<template>
  <div class="mt-10">
    <v-row>
      <v-col v-for="ev in evolution" :key="ev.name" cols="6">
        <v-card flat>
          <p class="h2-gray1">Stage {{ ev.stage }}</p>
          <v-row align="center">
            <v-col cols="auto">
              <v-img :src="ev.picture" class="evolution-picture" />
            </v-col>
            <v-col cols="auto">
              <p class="body1-gray3">{{ ev.name }}</p>
              <p class="body1-gray2">
                {{ ev.trigger }},
                <span class="transform-none"> starting at level </span>
                {{ ev.level }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getEvolutionChain } from '~/services'
export default {
  props: {
    url: String(),
  },
  data() {
    return {
      evolution: [],
    }
  },
  async mounted() {
    this.evolution = await getEvolutionChain(this.$axios, this.url)
  },
}
</script>

<style lang="scss" src="~/assets/scss/tabs.scss" scoped />
