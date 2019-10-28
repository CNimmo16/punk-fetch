<template>
  <div ref="list"
  class="spot-card-list columns is-multiline mt-0 pt-2">
    <div class="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen" v-for="(beer, index) in beers" :key="index">
      <beer-card :beer="beer" ref="beer-card" />
    </div>
    <div class="column is-full">
      <spinner v-if="loading" :color="'#b0d0dc'" />
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'

import BeerCard from "@/components/home/BeerCard.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "BeerList",
  props: ["beers"],
  components: {
    BeerCard,
    Spinner
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {
    win: {
      handler: function(val, oldVal) {
        if(oldVal.scrollTop !== null) {
          const el = this.$refs.list
          const loadPoint = el.clientHeight - (window.innerHeight * 2)
          if(val.scrollTop > loadPoint && this.$store.state.latestFetch.length > 0) {
            this.loading = true;
            this.$store.commit("nextPage")
            this.$store.dispatch("fetchBeers", this.$store.state.params).then(() => {
              setTimeout(() => {
                this.loading = false;
              }, 2000)
            })
          }
        }
      },
      deep: true
    }
  },
  computed:{
    ...Vuex.mapGetters(["win"])
  },
}
</script>

<style lang="scss" scoped>
  .spot-card-list {
    margin: 30px 0;
    @media only screen and (max-width: 767px) {
      align-items: center;
    }
  }
</style>