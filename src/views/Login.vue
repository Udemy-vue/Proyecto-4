<template>
	<div class="Login">
		
    <h1>Login</h1>

    <a-form v-if="useUser.loading"
            :model="formState"
            class="inputs"
            name="basic"
            @finish="onFinish"
            @finishFailed="onFinishFailed">

      <a-form-item
          label="Adiciona el correo"
          name="username"
          class="pass"
          :rules="[{ required: true, whitespace: true, type: 'email', message: 'Adicionar el correo valido' }]"
          style="width: auto; display: flex; flex-direction: column; gap: .5rem;">

        <a-input
            v-model:value="formState.username"
            :class="{ 'error': formState.username.length === 0 }"
            type="email"
            placeholder="Email">
          <template #prefix>
            <UserOutlined/>
          </template>
          <template #suffix>
            <a-tooltip title="Adiciona el Correo">
              <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)"/>
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
          name="password"
          label="Ingrese contraseña"
          :rules="[{ required: true, min: 6, message:  'Ingresa una contraseña con minimo 6 caracteres' }]"
          size="middle"
          class="pass"
          style="width: auto; display: flex; flex-direction: column;">

        <a-input-password v-model:value="formState.password"
            id="Pass"
            placeholder="Password"
            :maxlength="24" />
      </a-form-item>
      <a-form-item>
        <ButtonCounter :buttonText="'Ingresar'"
                       type="primary" html-type="submit"
                       :updateIcono="login"
                       :paso="useUser.loadingUser"
                       :clase="'antDesign'"/>
      </a-form-item>
    </a-form>
	</div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useUserStore } from '../store/bundle.js';
import ButtonCounter from '../components/ButtonCounter.vue';
import { useRouter } from 'vue-router';
import { MessageOutlined } from '@ant-design/icons-vue';
import { PoweroffOutlined, LoginOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';

export default {

  name: 'Login',
  setup() {

  },
  data () {

    return {
    	useUser: useUserStore(),
    	tMayuscula: ref(''),
      router: useRouter(),
      Texto: '',
      login: LoginOutlined,
      formState: reactive({
        username: '',
        password: ''
      })
    }
  },
  mounted() {
    // Actualiza tMayuscula cuando userData cambia
  },
  created() {
  	this.tMayuscula = this.useUser.userData.toUpperCase();
  },
  methods: {
    async onFinish(values) {
        console.log('Success:', values);
        await this.useUser.loginUser(this.formState.username, this.formState.password);
    },
    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    },
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