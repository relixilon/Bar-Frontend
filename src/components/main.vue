<template>
  <div class="main">
    <h1>{{ bar }}</h1>
    <div class="inputs">
      <input type="Date" v-model="date" @change="getData()" />
      <div class="amount">
        <span>Caja</span>
        <input type="number" v-model="amount">
      </div>
      <button v-on:click="submit">Submit</button>
    </div>
    <span>Notes</span>
    <textarea v-model="notes" name="" id="" cols="30" rows="10"></textarea>
    <image-upload :bar="bar" :date="date"></image-upload>

  </div>
</template>

<script>
import imageUpload from "./imageUpload.vue"
import postToDB from "../services/postToDB"
import getFromDB from "../services/getFromDB"
export default {
  name: "mainPage",
  components: {
    imageUpload
  },
  data() {
    return {
      bar: 'Bro',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      notes: '',
    }
  },

  mounted() {
    getFromDB.day(this.date, this.bar)
      .then((res) => {
        this.amount = res.data.amount ? res.data.amount : 0
        this.notes = res.data.notes ? res.data.notes : ''
      },
        error => {
          console.log(error);
        }
      );
  },
  methods: {
    submit() {
      postToDB.day(this.date, this.bar, this.amount, this.notes)
        .then((res) => {
          console.log(res)
        },
          error => {
            console.log(error);
          }
        );
    },
    getData() {
      getFromDB.day(this.date, this.bar)
        .then((res) => {
          this.amount = res.data.amount ? res.data.amount : 0
          this.notes = res.data.notes ? res.data.notes : ''
        },
          error => {
            console.log(error);
          }
        );
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

