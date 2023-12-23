<template>
  <div class="Register">

    <h1 class="texto_centrado">Registro</h1>
    
    <form v-if="useUser.loading" class="inputs" @submit.prevent="WriteInput">

      <!-- <input class="input-register" 
        id="Email"
        v-model="email"  
        type="email"  
        maxlength="30"
        placeholder="Email"> -->
        <!-- <span v-if="!email">El correo es obligatorio</span> -->
        <a-input v-model:value="email" type="email" placeholder="Email">

          <template #prefix>
            <UserOutlined />
          </template>

          <template #suffix>
            <a-tooltip title="Adiciona el Correo">
              <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)"/>
            </a-tooltip>
          </template>

        </a-input>

      <a-space direction="vertical" size="middle" style="width: auto">
        <a-input-password 
          v-model:value="pass" 
          id="Pass" 
          placeholder="Password" 
          :maxlength="24"/>
      </a-space>

      <ButtonCounter :buttonText="'Ingresar'" 
        :info="Texto"
        :updateIcono="register"
        @lectura="WriteInput" 
        :paso="useUser.loadingUser" 
        :clase="'antDesign'"/>
      <!-- <input class="input-register" 
        id="Pass"
        v-model="pass"  
        type="password"  
        maxlength="24"
        placeholder="Password"> -->
        <!-- <span v-if="!pass">La contraseña es obligatoria</span> -->

      <!-- <ButtonCounter :buttonText="'Registrar'" 
        :info="Texto"
        @lectura="" 
        :paso="useUser.loadingUser" 
        :clase="''"/> -->
    </form>

  </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '../store/bundle.js';
import ButtonCounter from '../components/ButtonCounter.vue';
import { useRouter } from 'vue-router';
import { PoweroffOutlined, FormOutlined, LoginOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';

export default {

  name: 'Register',

  data () {
    return {
      useUser: useUserStore(),
      router: useRouter(),
      Texto: '',
      email: ref(''),
      pass: ref(''),
      register: FormOutlined
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
    useRouter,
    PoweroffOutlined,
    FormOutlined,
    LoginOutlined,
    UserOutlined,
    InfoCircleOutlined
  }
}
</script>

<style>
</style>