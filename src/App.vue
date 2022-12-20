<template>
  <router-view />
</template>

<script>
import auth from "./services/auth"

export default {
  name: 'App',
  components: {
  },
  beforeCreate() {
    auth.loginStatus().catch((err) => {
      if (err.response.status === 403) {
        this.$router.push('/login')
      }
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
