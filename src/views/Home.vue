<template>
  <div class="home">
    <div class="container pt-5 px-1 has-text-white">
      <h1 class="title is-2 mb-3 has-text-white">You need beer?</h1>
      <h2 class="subtitle is-4 has-text-white">We got beer.</h2>

      <Refine :loading="$store.state.cardOpacity === 0" />
    </div>
    <div class="container px-1">
      <beer-list v-if="areResults" :beers="$store.state.beers" />
      <p v-else class="has-text-centered has-text-white is-size-4 mt-5">Whoops, no beers found!</p>
    </div>
  </div>
</template>

<script>
import BeerList from "@/components/home/BeerList.vue";
import Refine from "@/components/home/Refine.vue"

export default {
  name: 'home',
  components: {
    BeerList,
    Refine
  },
  data() {
    return {
    }
  },
  computed: {
    areResults() {
      return this.$store.state.beers.length > 0 || this.$store.state.fetching
    }
  },
}
</script>

<style lang="scss" scoped>
</style>