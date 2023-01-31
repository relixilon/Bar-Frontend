<template>
  <navBar />
  <div class="card">
    <ul class="data" v-for="day in data" :key="day.weekDay">
      <li class="title">
        <h3>
          {{ day.weekDay }}
        </h3>
      </li>
      <li class="item">
        <span>Media</span>
        <span>{{ day.average }}</span>
      </li>
      <li class="item">
        <span>Maximo</span>
        <span>{{ day.max }}</span>
      </li>
      <li class="item">
        <span>Minimo</span>
        <span>{{ day.min }}</span>
      </li>
    </ul>
  </div>

</template>

<script>
import navBar from "./nav.vue"
export default {
  name: "dashboardPage",
  components: {
    navBar
  },
  computed: {
    data() {
      return this.$store.state.dashboard
    }

  },
  beforeCreate() {
    this.$store.dispatch('getDashboard')
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2vw;
  margin: 2vw;
}

.data {
  padding: 1vw 2vw 1vw 2vw;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 30vw;
}

.item {
  display: flex;
  gap: 2vw;
  align-items: center;
}
</style>
