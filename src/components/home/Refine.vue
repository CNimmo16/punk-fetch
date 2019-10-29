<template>
  <div class="refine">
    <p class="is-size-5">Find a beer:</p>
    <form @submit.prevent="search()">
      <b-field>
        <b-input v-model="searchInput" placeholder="Search..." type="search" icon="magnify"></b-input>
        <p class="control">
          <b-button class="search-button button has-text-dark" type="submit" @click.prevent="search()" :loading="loading">Search</b-button>
        </p>
      </b-field>
    </form>
    <p class="is-size-5 mt-3 is-flex" style="justify-content: space-between;">
      Filter by:
      <b-button class="reset-button button has-background-grey-lighter has-text-dark" @click.prevent="reset()">Reset filters</b-button>
    </p>
    <p class="is-size-6">ABV</p>
    <b-slider class="px-1" v-model="refine.abvRange" :min="0" :max="60" :step="0.5" lazy :custom-formatter="x => x + '%'"></b-slider>

    <p class="is-size-6">First brewed</p>
    <b-slider class="px-1" v-model="refine.dateRange" :min="2007" :max="2019" :step="1" lazy></b-slider>

  </div>
</template>

<script>
export default {
  name: "Refine",
  props: ["loading"],
  data() {
    return {
      refine: {
        searchTerm: "",
        abvRange: [0,60],
        dateRange: [2007, 2019],
      },
      searchInput: "",
      watchParams: false
    }
  },
  created() {
    this.refine = this.$store.state.refine
    this.searchInput = this.refine.searchTerm
  },
  mounted() {
    this.$nextTick(() => {
      this.watchParams = true;
    })
  },
  watch: {
    params() {
      if(this.watchParams) {
        this.$store.commit("setRefine", this.refine)
        this.$store.commit("setFetching")
        this.$store.commit("resetPagination")
        setTimeout(() => {
          this.$store.dispatch("fetchBeers", this.params)
        }, 200)
      }
    }
  },
  computed: {
    params() {
      let p = {
        abv_gt: this.refine.abvRange[0],
        abv_lt: this.refine.abvRange[1],
        brewed_after: "01-" + this.refine.dateRange[0],
        brewed_before: "12-" + this.refine.dateRange[1],
      }
      if(this.refine.searchTerm.length > 0) {
        p.beer_name = this.refine.searchTerm
      }
      return p
    }
  },
  methods: {
    reset() {
      this.refine.abvRange = [0,60],
      this.refine.dateRange = [2007, 2019]
      this.refine.searchTerm = ""
      this.searchInput = ""
    },
    search() {
      this.refine.searchTerm = this.searchInput
    }
  }
}
</script>

<style lang="scss">
  .search-button {
    background-color: #b0d0dc;
  }
</style>