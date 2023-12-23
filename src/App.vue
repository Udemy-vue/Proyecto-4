<template>
  <Layout class="head-register" v-if="!useUser.loadingSession"/>
  <!-- <div v-if="!useUser.loadingSession">
    <nav>
      <router-link to="/">Home</router-link>
      <span> | </span>
      <router-link to="/login">Login</router-link>
      <span> | </span>
      <router-link to="/register">Register</router-link>
    </nav>
  </div> -->

  <div v-else>
    <h1>loading...</h1>
  </div>

  <router-view />  
</template>

<script>
import { useUserStore } from './store/bundle'
import Layout from './components/Layout.vue'

export default {

  name: 'App',
  data () {
    return {
      useUser: useUserStore()
    }
  },
  components: {
    useUserStore,
    Layout
  }
}
</script>

<style lang="css" scoped>

</style>