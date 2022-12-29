<template>
  <nav-bar />
  <div class="main">
    <div class="inputs">
      <input type="Date" v-model="this.$store.state.date" @change="getData()" />
      <div class="amount" v-for="amount in amounts" :key="amount._id">
        <span>{{ amount.label }}</span>
        <input type="number" :value="amount.value" :id="amount.label" @change="updateAmount">
      </div>
    </div>
    <span>Notes</span>
    <textarea :value="notes" name="" id="" cols="30" rows="10" @change="updateNotes"></textarea>
    <button v-on:click="submit">Submit</button>
    <image-upload></image-upload>
    <div class="imageWrap">
      <img class="image" v-for="image in this.images" :key="image.id" :src="('data:image/png;base64,' + image.img)"
        :alt="image.id" v-on:click="imageOptions(image.id)" />
    </div>
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 60vw;
}

.image {
  width: 30vw;
  height: 30vw;
}
</style>

