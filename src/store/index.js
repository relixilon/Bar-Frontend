import { createStore } from 'vuex'
import getFromDB from '@/services/getFromDB'
//import postToDB from '@/services/postToDB'
// Create a new store instance.
export default createStore({
  state() {
    return {
      user: {
        username: '',
        bars: [],
        roles: [],
      },
      currentBar: '',
      day: {},
      date: new Date().toISOString().slice(0, 10),
      imagePreviews: [],
      dashboard: {},
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setAmounts(state, amount) {
      state.day.amounts = amount
    },
    setAmount(state, data) {
      let target = state.day.amounts.find((item) => item.label === data.label)
      if (target) {
        target.value = data.value
      } else {
        state.day.amounts.push(data)
      }
    },
    setDashboard(state, data) {
      state.dashboard = data
    },

    setNotes(state, notes) {
      state.day.notes = notes
    },
    setDay(state, day) {
      state.day = day
    },

    setCurrentBar(state, bar) {
      state.currentBar = bar
    },

    logOut(state) {
      state.user = {}
    }
  },
  actions: {
    getUser({ commit, state }, id) {
      return new Promise((resolve) => {
        getFromDB.user(id).then((res) => {
          commit('setUser',
            {
              username: res.data.username,
              bars: res.data.bars,
              roles: res.data.roles,
            }
          )
          if (state.currentBar === '') {
            commit('setCurrentBar', res.data.bars[0].name)
          }
          resolve()
        })
      })
    },

    getDay({ dispatch, commit, state }) {
      let id = JSON.parse(localStorage.getItem('userId'))
      return new Promise((resolve) => {
        dispatch('getUser', id).then(() => {
          getFromDB.day(state.date, state.currentBar).then((res) => {
            commit('setDay', res.data)
            resolve()
          }
          )
        })
      })
    },

    getDashboard({ dispatch, commit, state }) {
      let id = JSON.parse(localStorage.getItem('userId'))
      return new Promise((resolve) => {
        dispatch('getUser', id).then(() => {
          getFromDB.dashboard(state.currentBar).then((res) => {
            commit('setDashboard', res.data.data)
            resolve()
          }
          )
        })
      })
    },
  },

  getters: {
    currentBar(state) {
      return state.currentBar
    },
  }
})

