<template>
  <div class="beer-view container px-2 pt-5">
    <b-button @click="$router.push('/')" class="back-button mb-3" size="is-medium" icon-left="arrow-left">Back to beers</b-button>
    <div v-if="beer || loading">
      <div class="columns">
        <div class="column is-half">
          <div class="image py-3">
            <spinner v-if="loading" :color="'#fff'" />
            <img v-else :src="beer.image_url" :alt="beer.name">
          </div>
        </div>
        <div class="column is-half">
          <div class="info pa-3">
            <spinner v-if="loading" :color="'#b0d0dc'" />
            <div v-else>
              <h1 class="title is-1 mb-1">{{ beer.name }}</h1>
              <p class="description">{{ beer.description }}</p>
              <h2 class="title is-4 mt-3 mb-0">Ingredients:</h2>
              <div class="columns">
                <div class="column pb-0 pl-0" :class="{'pr-0': $store.state.win.width < 768}">
                  <b-table :data="ingredients.hops" :columns="getTableColumns('Hops')" :mobile-cards="false"></b-table>
                </div>
                <div class="column pb-0 pr-0" :class="{'pl-0': $store.state.win.width < 768}">
                  <b-table :data="ingredients.malt" :columns="getTableColumns('Malt')" :mobile-cards="false"></b-table>
                </div>
              </div>
              <p><strong>Yeast:</strong> {{ ingredients.yeast }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      {{ error }}
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";

export default {
  name: "BeerView",
  props: ["id"],
  components: {
    Spinner
  },
  data() {
    return {
      beer: null,
      error: null,
      loading: true
    }
  },
  created() {
    this.$store.dispatch("fetchBeerById", this.id).then((beer) => {
      this.beer = beer;
      this.loading = false;
    })
    .catch(e => {
      this.error = e
      this.loading = false;
    })
  },
  computed: {
    ingredients() {
      const o = this.beer.ingredients;
      for(const key in o) {
        if(typeof o[key] === "object") {
          o[key] = o[key].map(x => {
            let unit;
            switch(x.amount.unit) {
              case "kilograms":
                unit = "kg"; break;
              case "grams":
                unit = "g"; break;
              default:
                unit = x.amount.unit; break;
            }
            x.amount = x.amount.value + unit
            return x
          });
        }
      }
      return o
    }
  },
  methods: {
    getTableColumns(name) {
      return [
        {
          field: 'name',
          label: name,
        },
        {
          field: 'amount',
          width: 40
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.beer-view {
  .image {
    min-height: 200px;
    border-radius: 30px;
    background: rgb(210,212,214);
    background: linear-gradient(27deg, rgba(210,212,214,1) 0%, rgba(233,233,233,0.7) 65%, rgba(242,242,242,0.2) 100%);
    img {
      display: block;
      margin: 0 auto;
      width: auto;
      max-height: 280px;
    }
  }
  .info {
    border-radius: 30px;
    background: #fff;
  }
}

</style>