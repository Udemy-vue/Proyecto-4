<template>
	<div class="Editar">
   <h1>Editar</h1> 

   <form class="inputs" @submit.prevent="">
      <h2>{{ useData.userUid }}</h2>
      <input class="input-register" 
        v-model="name"  
        type="text"
        placeholder="Ingrese URL">

      <ButtonCounter :buttonText="'Agregar'" 
        :info="name"
        @lectura="useData.updateUrl"
        :paso="useData.loadingDoc" 
        :clase="''"/>
    </form>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useUserStore, useDatabaseStore } from '../store/bundle.js';
import ButtonCounter from '../components/ButtonCounter.vue';

export default {
  name: 'Editar',

  data () {
    return {
      route: useRoute(),
      router: useRouter(),
      useUser: useUserStore(),
      useData: useDatabaseStore(),
      name: ''
    }
  },
  async created() {
    // console.log(this.route.params);
    if (this.useData.userUid !== ''){
      this.name = await this.useData.readUrl();
    }
    else {
      this.router.push('/login');
    }
  },
  components: {
    useRoute,
    useRouter,
    useUserStore,
    useDatabaseStore,
    ButtonCounter
  }
}
</script>

<style lang="css" scoped>
</style>