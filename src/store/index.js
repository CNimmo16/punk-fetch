import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000 })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    win: {
      height: null,
      width: null,
      scrollTop: null
    },
    page: 1,
    beers: [],
    latestFetch: [],
    params: {},
    fetching: false
  },
  getters: {
    win: state => state.win
  },
  mutations: {
    setParams(state, params) {
      state.params = params;
    },
    setFetching(state) {
      state.fetching = true;
    },
    setFinishedFetching(state) {
      state.fetching = false;
    },
    setBeers(state, beers) {
      state.beers = beers
    },
    setLatestFetch(state, beers) {
      state.latestFetch = beers
    },
    setWinSize(state, win) {
      state.win = win
    },
    resetPagination(state) {
      state.page = 1
    },
    nextPage(state) {
      state.page ++
    }
  },
  actions: {
    fetchBeers({state, commit}, params) {
      return new Promise((resolve) => {
        params = params || {}
        commit("setParams", params)
        params.page = state.page;
        params.per_page = 24;
        if(state.page === 1) {
          commit("setBeers", [])
        }
        http.get("https://api.punkapi.com/v2/beers", {params}).then((res) => {
          const beers = res.data.map(x => {
            const cutPoint = x.first_brewed.indexOf("/")
            if(cutPoint > -1) {
              const str = x.first_brewed.substr(0,cutPoint) + "/01" + x.first_brewed.substr(cutPoint)
              x.first_brewed_unix = new Date(str).getTime()
            }
            return x
          });
          commit("setBeers", state.beers.concat(beers))
          commit("setLatestFetch", beers)
          setTimeout(() => {
            commit("setFinishedFetching")
            resolve()
          }, 200)
        })
      })
    },
    async fetchBeerById(context, id) {
      context;
      return new Promise((resolve, reject) => {
        http.get("https://api.punkapi.com/v2/beers/" + id)
        .then(r => {
          if(r.data[0]) { 
            resolve(r.data[0])
          } else {
            reject("Beer not found")
          }
        })
        .catch(() => {
          reject("Something went wrong")
        })
      });
    }
  },
})