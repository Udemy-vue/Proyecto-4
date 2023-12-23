<template>
	<div class="Login">
		
    <h1>Login</h1>

    <form v-if="useUser.loading" class="inputs" @submit.prevent="">
      
     
      <a-input 
        v-model:value="email" 
        type="email" 
        placeholder="Email">

        <template #prefix><UserOutlined/></template>

        <template #suffix>
          <a-tooltip title="Adiciona el Correo">
            <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)"/>
          </a-tooltip>
        </template>
      </a-input>

      <a-space 
        direction="vertical" 
        size="middle" 
        style="width: auto">

        <a-input-password 
          v-model:value="pass" 
          id="Pass" 
          placeholder="Password" 
          :maxlength="24"/>

      </a-space>

      <ButtonCounter :buttonText="'Ingresar'" 
        :updateIcono="login"
        @lectura="WriteInput" 
        :paso="useUser.loadingUser" 
        :clase="'antDesign'"/>

      <!-- <input class="input-register" 
        id="Email"
        v-model="email"  
        type="email"  
        maxlength="30"
        placeholder="Email"> -->
        <!-- <span v-if="!email">El correo es obligatorio</span> -->

      <!-- <input class="input-register" 
        id="Pass"
        v-model="pass"  
        type="password"  
        maxlength="24"
        placeholder="Password"> -->

        <!-- <span v-if="!pass">La contraseña es obligatoria</span> -->
    </form>
	</div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../store/bundle.js';
import ButtonCounter from '../components/ButtonCounter.vue';
import { useRouter } from 'vue-router';
import { MessageOutlined } from '@ant-design/icons-vue';
import { PoweroffOutlined, LoginOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';

export default {

  name: 'Login',
  data () {
    return {
    	useUser: useUserStore(),
    	tMayuscula: ref(''),
      router: useRouter(),
      Texto: '',
      email: ref(''),
      pass: ref(''),
      login: LoginOutlined
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
      if(this.email.length < 6 || this.pass.length < 6) return alert('Completa los campos')

      await this.useUser.loginUser(this.email, this.pass);
    }
  },
  components: {
  	ButtonCounter,
    useUserStore,
    useRouter,
    PoweroffOutlined,
    LoginOutlined,
    UserOutlined,
    InfoCircleOutlined
  }
}
</script>

<style>
</style>