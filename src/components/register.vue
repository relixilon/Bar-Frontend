<template>
  <div class="register">
    <h1>Register</h1>
    <form v-on:submit.prevent="register">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" placeholder="username" required>
      </div>
      <fieldset class="form-group">
        <input type="checkbox" id="Jauja" value="Jauja" v-model="bars">
        <label for="Jauja">Jauja</label>
        <input type="checkbox" id="Continental" value="Continental" v-model="bars">
        <label for="Continental">Continental</label>
        <input type="checkbox" id="Bro" value="Bro" v-model="bars">
        <label for="Bro">Bro</label>
      </fieldset>
      <fieldset class="form-group">
        <input type="radio" name="role" id="user" value="user" v-model="role">
        <label for="user">User</label>
        <input type="radio" name="role" id="admin" value="admin" v-model="role">
        <label for="Admin">Admin</label>
        <input type="radio" name="role" id="moderator" value="moderator" v-model="role">
        <label for="Moderator">Moderator</label>
      </fieldset>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="password" required>
      </div>
      <div class="form-group">
        <label for="password">Confirm Password</label>
        <input type="password" class="form-control" id="password-confirm" v-model="passwordConfirm"
          placeholder="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>

</template>

<script>
import postToDB from '@/services/postToDB'

export default {
  name: 'registerPage',
  data: function () {
    return {
      username: '',
      password: '',
      passwordConfirm: '',
      bars: [],
      role: ''
    }
  },
  methods: {
    register: function () {
      if (this.password !== this.passwordConfirm) {
        alert('Passwords do not match')
        return
      }
      postToDB.register({
        username: this.username,
        password: this.password,
        bars: this.bars,
        role: this.role
      })
    }
  }
}
</script>

<style>

</style>