<template>
  <h1>Login</h1>
  <form v-on:submit.prevent="submit()">
    <input type="text" v-model="username" placeholder="usuario">
    <input type="password" v-model="password" placeholder="contraseña">
    <button v-on:click="submit()">Login</button>
  </form>

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
            localStorage.setItem('userId', JSON.stringify(res.data.id))
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

<style scoped>
h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin: 10px;
}

button {
  margin: 10px;
}
</style>