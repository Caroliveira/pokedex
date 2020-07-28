<template>
  <div>
    <TitleBar />
    <v-row>
      <v-col v-for="p in pokemons" :key="p.id" md="6" lg="4">
        <PokeCard :name="p.name" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TitleBar from '~/components/titleBar'
import PokeCard from '~/components/card'
import { getPokemons } from '~/services'

export default {
  components: {
    TitleBar,
    PokeCard,
  },
  data() {
    return {
      pokemons: [],
    }
  },
  async mounted() {
    this.$store.commit('pokemons/reset')
    this.pokemons = await getPokemons(this.$axios)
  },
}
</script>
