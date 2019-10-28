<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import debounce from 'lodash.debounce'

export default {
  components: {
    Navbar
  },
  created() {
    this.setWindowState();
    window.addEventListener("resize", this.setWindowState)
    window.addEventListener("scroll", this.setWindowState)
  },
  methods: {
    setWindowState: debounce(function() {
      this.$store.commit("setWinSize", {
        width: window.innerWidth,
        height: window.innerHeight,
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      })
    }, 100)
  }
}
</script>

<style lang="scss">

@font-face {
  font-family: 'Veneer Two';
  src: url('assets/fonts/VeneerTwo.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

.title, .subtitle {
  font-family: "Veneer Two", Helvetica, sans-serif;
}

body {
  margin: 0;
  background-color: #08384a;
  min-height: 100vh;
}

#app {
  font-family: 'PT Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  @media only screen and (max-width: 767px) {
    overflow-x: hidden;
  }
}

.b-slider.is-primary .b-slider-track .b-slider-fill {
  background-color: #b0d0dc !important;
}

.b-tooltip.is-primary::after {
  background: #b0d0dc !important;
}
.b-tooltip.is-primary::before {
  border-top-color: #b0d0dc !important;
}
</style>
