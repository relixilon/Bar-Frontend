<template>
  <div class="main">
    <h1>{{ bar }}</h1>
    <div class="inputs">
      <input type="Date" v-model="date" v-on:change="getData(date)" />
      <div class="amount">
        <span>Caja</span>
        <input type="number" v-model="amount">
      </div>
      <button v-on:click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "mainPage",
  data() {
    return {
      bar: 'Bro',
      amount: 0,
      date: new Date().toISOString().slice(0, 10)
    }
  },

  mounted() {
    let url = "http://127.0.0.1:3000/api/getDate/" + this.date + "/" + this.bar
    axios.get(url).then((res) => {
      this.amount = res.data[0]?.amount

    })
  },

  methods: {
    submit() {
      axios
        .post("http://127.0.0.1:3000/api/post", {
          bar: this.bar,
          date: this.date,
          amount: this.amount,
        }).then((res) => {
          console.log(res.data)
        })
    },
    getData(date) {
      let url = "http://127.0.0.1:3000/api/getDate/" + date + "/" + this.bar
      axios.get(url).then((res) => {
        this.amount = res.data[0]?.amount
      })

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 30vh;
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
