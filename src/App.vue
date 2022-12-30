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

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}
</style>
