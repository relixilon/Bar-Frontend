<template>
  <h1>
    Dashboard
  </h1>
  <ul class="data">
    <li v-for="item in data" :key="item.id" :class="{ updated: item.updated }">
      <ul class="item">
        <li>{{ item.bar }}</li>
        <li>
          <input type="number" v-model="item.amount" v-on:change="updated(item)">
        </li>
        <li>
          {{ item.date }}
          {{ item.updated }}
        </li>

      </ul>
    </li>
  </ul>

  <button v-on:click="submit">Save</button>
</template>

<script>
import axios from "axios"
export default {
  name: "dashboardPage",
  data() {
    return {
      data: []
    }
  },
  computed: {
    amount(id) {
      return this.data.find(element => element._id = id).amount
    }

  },
  mounted() {
    axios
      .get("http://127.0.0.1:3000/api/getAll", {
      }).then((res) => {
        this.data = res.data
        console.log(this.data[0].bar)
      })
  },
  methods: {
    updated(item) {
      item.updated = true
    }

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.data {
  list-style: none;
}

.item {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 2vh 0 0 0;
  width: 70vw;
  justify-content: space-around;
}

.item li {
  width: 10vw;
}

.updated {
  color: red;
}
</style>
