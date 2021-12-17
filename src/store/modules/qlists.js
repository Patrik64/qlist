const state = {
  qLists: []
}

const mutations = {
  setQListsM (state, ql) {
    state.qLists = JSON.parse(JSON.stringify(ql))
  }
}

const actions = {
  setQListsA ({ commit }, ql) {
    commit('setQListsM', ql)
  }
}

const getters = {
  getQLists: (state) => {
    return JSON.parse(JSON.stringify(state.qLists))
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
