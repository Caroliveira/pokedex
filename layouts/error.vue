<template>
  <div class="error-content">
    <div>
      <p class="title-error">{{ title }}</p>
      <nuxt-link class="link" to="/">
        <v-icon color="primary">mdi-chevron-left</v-icon>
        <span class="link-text">Back to home</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      if (window.location.pathname === 500) {
        return 'Server error, try again later :('
      } else {
        return 'Sorry, no result found :('
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.error-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
