<template>
  <div class="Register">

    <h1 class="texto_centrado">Registro</h1>
    
    <a-form v-if="useUser.loading"
            :model="formState"
            class="inputs"
            name="basic"
            @finish="onFinish"
            @finishFailed="onFinishFailed" @validate="Validate">

      <a-form-item
          label="Adiciona el correo"
          name="email"
          class="pass"
          :rules="[{ required: true, whitespace: true, type: 'email', message: 'Adicionar un correo valido' }]"
          style="width: auto; display: flex; flex-direction: column; gap: .5rem;">

        <a-input
            v-model:value="formState.email"
            :class="{ 'error': formState.email.length === 0 }"
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

<!--      <a-space direction="vertical" size="middle" style="width: auto">-->
<!--        <a-input-password -->
<!--          v-model:value="pass" -->
<!--          id="Pass" -->
<!--          placeholder="Password" -->
<!--          :maxlength="24"/>-->
<!--      </a-space>-->

      <a-form-item
          name="password"
          label="Ingrese contraseña"
          :rules="[{ required: true, min: 6, message:  'Ingresa una contraseña con minimo 6 caracteres' }]"
          size="middle"
          class="pass"
          style="width: auto; display: flex; flex-direction: column;">

        <a-input-password
            v-model:value="formState.password"
            id="Pass"
            placeholder="Password"
            :maxlength="24"
            autocomplete="off"/>
      </a-form-item>

      <a-form-item
          name="checkPass"
          label="Repita contraseña"
          :rules="[{ required: true, min: 6, validator: validatePass }]"
          size="middle"
          class="pass"
          style="width: auto; display: flex; flex-direction: column;">

        <a-input-password
            v-model:value="formState.checkPass"
            id="Pass"
            placeholder="Password"
            :maxlength="24"
            autocomplete="off"/>
      </a-form-item>

      <a-form-item>
        <ButtonCounter :buttonText="'Registrar'"
                       type="primary" html-type="submit"
                       :info="Texto"
                       :updateIcono="register"
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
import { PoweroffOutlined, FormOutlined, LoginOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';

export default {

  name: 'Register',

  data () {
    return {
      useUser: useUserStore(),
      router: useRouter(),
      Texto: '',
      register: FormOutlined,
      formState: reactive({
        email: '',
        password: '',
        checkPass: ''
      })
    }
  },
  methods: {
    async validatePass(_rule, value){
      if (value === ''){
        return Promise.reject('Repita contraseña')
      }
      if(value !== this.formState.password){
        return Promise.reject('No coinciden las contraseñas')
      } else {
          return Promise.resolve()
      }
    },
    async onFinish(values) {
        console.log('Success:', values);
        await this.useUser.registerUser(values.email, values.password);
    },
    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    },
    // Validate(...args){
    //   console.log(args)
    // }
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