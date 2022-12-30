<template>
  <nav-bar />
  <div>
    <form class="main" v-on:submit.prevent="submit()">
      <div class="inputs">
        <input type="Date" v-model="this.$store.state.date" @change="getData()" />
        <div class="amount" v-for="amount in amounts" :key="amount._id">
          <span>{{ amount.label }}</span>
          <input type="number" :value="amount.value" :id="amount.label" @change="updateAmount">
        </div>
      </div>
      <span>Notes</span>
      <textarea :value="notes" name="" id="" cols="30" rows="10" @change="updateNotes"></textarea>
      <button class="submit" v-on:click="submit">Submit</button>
      <image-upload></image-upload>
      <div class="imageWrap">
        <div v-for="image in this.images" :key="image.id">
          <img class="image" :class="{ magnify: image.magnify }" :src="('data:image/png;base64,' + image.img)"
            :alt="image.id" v-on:click="magnifyImage(image.id)" />
          <div>
            <button class="deleteButton" @click="imageOptions(image.id)">Borrar</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import imageUpload from "./imageUpload.vue"
import postToDB from "../services/postToDB"
import navBar from "./nav.vue"
export default {
  name: "mainPage",
  components: {
    imageUpload,
    navBar
  },
  data: function () {
    return {
      magnify: false,
    }
  },

  computed: {
    bar() {
      return this.$store.state.currentBar
    },
    amounts() {
      return this.$store.state.day.amounts
    },
    notes() {
      return this.$store.state.day.notes
    },
    images() {
      return this.$store.state.day.images
    },
  },

  beforeCreate() {
    this.$store.dispatch('getDay')
  },
  methods: {
    updateAmount(e) {
      this.$store.commit('setAmount', {
        value: e.target.value,
        label: e.target.id
      })
    },
    updateNotes(e) {
      this.$store.commit('setNotes', e.target.value)
    },
    submit() {
      postToDB.day(this.$store.state.date, this.$store.state.currentBar, this.$store.state.day.amounts, this.$store.state.day.notes)
        .then(() => {
        },
          error => {
            if (error) {
              alert('Error por favor intenta de nuevo')
            }

          }
        );
    },
    getData() {
      this.$store.dispatch('getDay')
    },
    imageOptions(image) {
      if (confirm('Eliminar imagen?')) {
        this.$store.dispatch('deleteImage', image).then(() => {
          this.$store.dispatch('getDay')
        })
      }
    },
    magnifyImage(image) {
      this.$store.commit('magnifyImage', image)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 2vh 0 0 2vh;
}

.inputs {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 15vh;
}

.amount {
  display: flex;
  width: 20vw;
  justify-content: space-around;
  align-items: baseline;
}

.amount input {
  width: 10vh;
}

.imageWrap {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
}

.submit {
  margin: 2vh 0 3vh 0;
}

.image {
  margin-top: 10vh;
  width: 90vw;
}

.deleteButton {
  margin: 0 0 0 2vw;
  height: 5vh;
  width: 10vw;
  background-color: red;
  color: white;
  border: none;
  font-size: 30px;
}

.magnify {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>

