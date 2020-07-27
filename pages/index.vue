<template>
  <div>
    <TitleBar />
    <v-row>
      <v-col sm="6" md="4">
        <PokeCard />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TitleBar from '~/components/titleBar'
import PokeCard from '~/components/card'
export default {
  components: {
    TitleBar,
    PokeCard,
  },
}
</script>
