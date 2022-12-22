import { createStore } from 'vuex'
import getFromDB from '@/services/getFromDB'
import postToDB from '@/services/postToDB'
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
    setDay(state, day) {
      state.day = day
    },
    setImages(state, images) {
      state.day.images = images
    },
    setCurrentBar(state, bar) {
      state.currentBar = bar
    },
    addImagePreview(state, image) {
      state.day.imagePreviews.push(image)
    },

    logOut(state) {
      state.user = {}
    }
  },
  actions: {
    getUser({ commit }, id) {
      return new Promise((resolve) => {
        getFromDB.user(id).then((res) => {
          commit('setUser',
            {
              username: res.data.username,
              bars: res.data.bars,
              roles: res.data.roles,
            }
          )
          commit('setCurrentBar', res.data.bars[0].name)
          resolve()
        })
      })
    },

    getDay({ dispatch, commit, state }) {
      let id = JSON.parse(localStorage.getItem('userId'))
      return new Promise((resolve) => {
        dispatch('getUser', id).then(() => {
          getFromDB.day(state.date, state.currentBar).then((res) => {
            getFromDB.images(state.date, state.currentBar).then((images) => {
              commit('setDay', {
                bar: res.data.bar,
                amount: res.data.amount,
                notes: res.data.notes,
                images: images.data.images,
              })
              resolve()
            }
            )
          })
        })
      })
    },
    getDashboard({ dispatch, state }) {
      let id = JSON.parse(localStorage.getItem('userId'))
      return new Promise((resolve) => {
        dispatch('getUser', id).then(() => {
          getFromDB.dashboard(state.currentBar).then((res) => {
            console.log(res.data)
            resolve()
          }
          )
        })
      })
    },
    deleteImage({ commit, state }, id) {
      return new Promise((resolve) => {
        postToDB.deleteImage(id).then(() => {
          commit('setImages', state.day.images.filter((img) => img._id !== id))
          resolve()
        })
      })
    }
  },

  getters: {
    currentBar(state) {
      return state.currentBar
    },
  }
})

