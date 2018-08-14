import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: true,
    loginState: false,
    userMsg: {}
  },
  mutations: {
    SET_STATE_ISlOADING (state, loadingState) {
      state.isLoading = loadingState
    },
    SET_LOGIN_STATUS (state, loginState) {
      state.isLoading = loginState
    },
    SET_USER_MSG (state, userMsg) {
      state.isLoading = userMsg
    }
  },
  plugins: []
})

export default store
