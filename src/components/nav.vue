<template>
  <nav>
    <ul>
      <li>
        {{ bar }}
      </li>
      <li>
        <router-link class="link" to="/">Home</router-link>
      </li>
      <!-- <li>
        <router-link class="link" to="/Dashboard">Dashboard</router-link>
      </li> -->
      <li class="logout">
        <button v-on:click="logout()">LogOut</button>
      </li>
    </ul>
  </nav>

</template>

<script>
import auth from "../services/auth"
export default {
  name: 'navBar',
  data() {
    return {
      bar: this.$store.state.currentBar
    }
  },

  watch: {
    bar1(newValue, oldValue) {
      console.log(oldValue)
      this.bar1 = newValue
      console.log(this.bar1)
    }
  },
  beforeMount() {
    let id = JSON.parse(localStorage.getItem('userId'))
    this.$store.dispatch('getUser', id).then(() => {
      this.bar = this.$store.state.currentBar
    }
    )
  },
  methods: {
    logout() {
      auth.logout().then(() => {
        this.$store.commit('logOut')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #333;
  overflow: hidden;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  display: flex;
  flex-direction: row;
  height: 5vh;
  align-items: center;
  padding-left: 2vw;
}

li {
  font-size: 20px;
  color: white;
}

.logout {
  margin-left: auto;
  margin-right: 4vw;
  background-color: #333;
  border: none;
  color: white;
  padding: 14px 16px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.link {
  color: white;
  text-decoration: none;
  margin-left: 2vw;
}
</style>