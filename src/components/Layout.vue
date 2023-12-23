
<template>

  <a-layout class="layout">
    <a-layout-header>

      <a-menu
        v-model:selectedKeys="useUser.selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }">

        <template v-if="!useUser.loading">
          <a-menu-item key="1"  >
            <router-link to="/">Home</router-link>
          </a-menu-item>
        </template>
        <a-menu-item key="2">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/register">Register</router-link>
        </a-menu-item>

      </a-menu>
    </a-layout-header>
  </a-layout>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../store/bundle.js';

export default {

  name: 'Layout',

  data () {
    return {
      router: useRouter(),
      useUser: useUserStore()
    }
  },
  methods: {

  },
  components: {
    useRouter,
    useUserStore
  }
}
</script>

<style>

</style>

