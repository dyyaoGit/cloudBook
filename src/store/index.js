import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: true
  },
  mutations: {
    SET_STATE_ISlOADING (state, loadingState) {
      state.isLoading = loadingState
    }
  },
  plugins: []
})

export default store
