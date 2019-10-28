<template>
  <article @click="$router.push('/beer/' + beer.id)" id="spot-card" :class="{'rel': $store.state.win.width > 768}" :style="{'opacity': cardOpacity}">
    <img v-if="beer.image_url" :src="beer.image_url" :alt="beer.name" class="image is-block py-2">
    <b-icon style="margin: 0 auto; height: 270px; padding-top: 100px;" class="is-block" icon="help" size="is-large" v-else></b-icon>
    <div class="card-text px-1 pb-1">
      <div class="mt-1 mb-1">
        <h1 class="title is-size-3 is-inline">{{ beer.name }}</h1>
        <span class="subtitle is-size-5 has-text-right ml-1">{{ beer.abv }}%</span>
      </div>
      <p class="is-size-5">{{ beer.tagline }}</p>
      <p class="is-size-6 mb-1">Brewed since {{ firstBrewed }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "spot-card",
  props: ["beer"],
  computed: {
    firstBrewed() {
      if(this.beer.first_brewed_unix) {
        const d = new Date(this.beer.first_brewed_unix)
        let m = d.getMonth()
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        m = months[Number(m)]
        const y = d.getFullYear()
        return m + " " + y
      } else {
        return this.beer.first_brewed
      }
    },
    cardOpacity() {
      if(this.$store.state.fetching) {
        return 0;
      } else {
        return 1;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

#spot-card {
  max-width: 350px;
  height: 100%;
  transition: opacity 0.2s;
  border-radius: 30px;
  background: rgb(210,212,214);
  background: linear-gradient(27deg, rgba(210,212,214,1) 0%, rgba(233,233,233,0.7) 65%, rgba(242,242,242,0.2) 100%);
  cursor: pointer;
  .image {
    height: 270px;
    width: 100%;
    object-fit: contain;
  }
  &:hover {
    background: linear-gradient(27deg, #d2d4d6 0%, rgba(233, 233, 233, 0.9) 65%, rgba(242, 242, 242, 0.8) 100%);
    .title {
      text-decoration: underline;
    }
  }
}

</style>