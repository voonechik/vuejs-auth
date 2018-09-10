<template lang='pug'>

  el-row(type="flex" class="row-bg form-authorization-wrap" justify="center")
    el-form
      el-form-item(label="Login")
        el-input(v-model="login" placeholder='Login')
      el-form-item(label="Password")
        el-input(v-model="password" placeholder='Password')
      el-form-item
        el-button(
          type='primary' 
          @click='loginReq') Sign In

</template>

<script>
export default {
  data() {
    return {
      login: 'administrator@sdk.finance',
      password: '1',
    };
  },
  methods: {
    loginReq() {
      const { login, password } = this;
      this.$store.dispatch('AUTH_REQUEST', { login, password }).then(() => {
        this.$router.push('/user');
      })
    }
  }
}
</script>

<style lang="sass">

  .form-authorization-wrap
    height: 100vh
    align-items: center
    flex-direction: column

</style>
