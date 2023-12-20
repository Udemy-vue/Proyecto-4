<template>
  <div class="Home">
    <h1>Home</h1>
    <h2 v-if="!useUser.loading">{{useUser.userInfo.email}}</h2>
    
    <form class="inputs" @submit.prevent="CreateInput">

      <input class="input-register" 
        v-model="name"  
        type="text"
        placeholder="Ingrese URL">

      <ButtonCounter :buttonText="'Agregar'" 
        :paso="useData.loadingDoc" 
        :clase="''"/>
    </form>

    <h2 v-if="useData.loadingDoc">Loading docs..</h2>
    
    <ul v-else class="Userli">
      <li v-for="item of useData.documents" :key="item.id">
        <span>{{item.id}}</span>
        <span>{{item.name}}</span>
        <span>{{item.short}}</span>

        <div class="li-Botones">
          <ButtonCounter :buttonText="'Editar'" 
            :info="item.id"
            @lectura="Editar" 
            :paso="useData.loadingDoc" 
            :clase="''"/>

          <ButtonCounter :buttonText="'Eliminar'" 
            :info="item.id"
            @lectura="useData.deleteUrl" 
            :paso="useData.loadingDoc" 
            :clase="''"/>
        </div> 
      </li>
    </ul>

    <ButtonCounter :buttonText="'Logout'" 
      @lectura="cerrado" 
      :paso="useUser.loadingUser" 
      :clase="''"/>
   <!--  <ButtonCounter :buttonText="'Revisar'" 
      @lectura="useData.Mirar" 
      :paso="useUser.loadingUser" 
      :clase="''"/> -->
  </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore, useDatabaseStore
 } from '../store/bundle.js';
import ButtonCounter from '../components/ButtonCounter.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',

  data () {
    return {
      useUser: useUserStore(),
      useData: useDatabaseStore(),
      router: useRouter(),
      name: ''
    }
  },
  methods: {
    cerrado() {
      this.useData.signOutUser();
      // this.UseData.$reset();
      this.useUser.signOutUser();
    },
    async CreateInput() {
      if(this.name === '') return alert('Añada una URL');

      await this.useData.addUrl(this.name)
      this.name = '';
      console.log("agregado");
      // this.useData.lectura();
    },
    Editar(id) {
      this.useData.userUid = id;
      this.router.push(`/editar`)
    }
  },
  async created() {
    this.useData.signOutUser();
    // console.log(this.useUser.loading)
    if (!this.useUser.loading) {
      await this.useData.getUrls();
    }
    else {
      this.useUser.signOutUser();
    }
  },
  components: {
    useUserStore,
    ButtonCounter,
    useDatabaseStore,
    useRouter
  }
}
</script>

<style lang="css" scoped>
</style>