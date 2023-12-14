<template>
	<div class="Login">
		<h1>Login</h1>

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

    name: 'Login',
    data () {
      return {
      	useUser: useUserStore(),
      	tMayuscula: ref(''),
        router: useRouter(),
        Texto: '',
        email: ref(''),
        pass: ref('')
      }
    },
    mounted() {
      // Actualiza tMayuscula cuando userData cambia
    },
    created() {
    	this.tMayuscula = this.useUser.userData.toUpperCase();
    },
    methods: {
      async WriteInput() {
        // this.useUser.registro(this.Texto);
        if(!this.email || this.pass.length < 6) return alert('Completa los campos')

        await this.useUser.loginUser(this.email, this.pass);
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