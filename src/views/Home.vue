<template>
  <div class="Home">
    <h1>Home</h1>
    <h2 v-if="!useUser.loading">{{useUser.userInfo.email}}</h2>

    <ButtonCounter :buttonText="'Logout'" 
      @lectura="useUser.signOutUser" 
      :paso="useUser.loadingUser" 
      :clase="''"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../store/bundle.js';
import ButtonCounter from '../components/ButtonCounter.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default {
  name: 'Home',

  data () {
    return {
      useUser: useUserStore()
    }
  },
  created() {
    // onAuthStateChanged(auth, (user) => {
    //   console.log(user);
    // });
  },
  components: {
    useUserStore,
    ButtonCounter
  }
}
</script>

<style lang="css" scoped>
</style>