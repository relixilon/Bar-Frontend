<template>
  <h1>Login</h1>
  <div>
    <input type="text" v-model="username" placeholder="usuario">
    <input type="password" v-model="password" placeholder="contraseña">
    <button v-on:click="submit()">Login</button>
  </div>

</template>

<script>
import auth from '../services/auth'
export default {
  name: 'loginPage',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submit() {
      try {
        auth.login(this.username, this.password).then((res) => {
          if (res) {
            this.$router.push('/')
          }
        }
        )
      }
      catch (err) {
        console.log(err)
      }
    },
  }
}
</script>

<style>

</style>