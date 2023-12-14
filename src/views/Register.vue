<template>
  <div class="Register">
    <h1 class="texto_centrado">Registro</h1>
    <!-- <h2>{{ useUser.mayusculaInicial }}</h2> -->
    
    <form v-if="useUser.loading" class="inputs" @submit.prevent="WriteInput">
      <input class="input-register" 
        id="Email"
        v-model="email"  
        type="email"  
        maxlength="30"
        placeholder="Email">
        <!-- <span v-if="!email">El correo es obligatorio</span> -->

      <input class="input-register" 
        id="Pass"
        v-model="pass"  
        type="password"  
        maxlength="24"
        placeholder="Password">
        <!-- <span v-if="!pass">La contraseña es obligatoria</span> -->

      <ButtonCounter :buttonText="'Ingresar'" 
        :info="Texto"
        @lectura="" 
        :paso="useUser.loadingUser" 
        :clase="''"/>
    </form>

  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useUserStore } from '../store/bundle.js';
  import ButtonCounter from '../components/ButtonCounter.vue';
  import { useRouter } from 'vue-router';

  export default {

    name: 'Register',

    data () {
      return {
        useUser: useUserStore(),
        router: useRouter(),
        Texto: '',
        email: ref(''),
        pass: ref('')
      }
    },
    methods: {
      async WriteInput() {
        // this.useUser.registro(this.Texto);
        if(!this.email || this.pass.length < 6) return alert('Completa los campos')

        await this.useUser.registerUser(this.email, this.pass);
      }
    },
    components: {
      ButtonCounter,
      useUserStore,
      useRouter
    }
  }
</script>

<style>
</style>