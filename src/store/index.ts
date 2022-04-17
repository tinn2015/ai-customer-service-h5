import { createStore } from 'vuex'

export default createStore({
  state: {
    wordsId: ''
  },
  getters: {
  },
  mutations: {
    setWordsId (state, wordsId) {
      state.wordsId = wordsId
    }
  },
  actions: {
    setWordsId (context, wordsId) {
      context.commit('setWordsId', wordsId)
      localStorage.setItem('wordsId', wordsId)
    }
  },
  modules: {
  }
})
