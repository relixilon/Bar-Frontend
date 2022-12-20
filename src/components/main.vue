<template>
  <nav-bar />
  <div class="main">
    <div class="inputs">
      <input type="Date" v-model="this.$store.state.date" @change="getData()" />
      <div class="amount">
        <span>Caja</span>
        <input type="number" v-model="amount">
      </div>
    </div>
    <span>Notes</span>
    <textarea v-model="notes" name="" id="" cols="30" rows="10"></textarea>
    <button v-on:click="submit">Submit</button>
    <image-upload></image-upload>
    <div class="imageWrap">
      <img class="image" v-for="image in this.$store.state.day.images" :key="image._id"
        :src="('data:image/png;base64,' + image)" :alt="image.date" />
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
  data() {
    return {
      amount: 0,
      notes: '',
      images: '',
    }
  },

  beforeCreate() {
    this.$store.dispatch('getDay').then(() => {
      this.amount = this.$store.state.day.amount
      this.notes = this.$store.state.day.notes
      this.images = this.$store.state.day.images
    })


  },
  methods: {
    submit() {
      postToDB.day(this.$store.state.date, this.$store.state.currentBar, this.amount, this.notes)
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
      this.$store.dispatch('getDay').then(() => {
        this.amount = this.$store.state.day.amount
        this.notes = this.$store.state.day.notes
        this.images = this.$store.state.day.images
      })

    },
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
</style>

