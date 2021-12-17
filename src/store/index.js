import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import qlists from './modules/qlists'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: { qlists },
  plugins: [createPersistedState()]
})
