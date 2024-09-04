<template>
  <div class="Perfil">
    <a-avatar :src="useUser.userInfo.photoURL" size="large"/>
    <h2>Perfil de ususario</h2>
    <a-form
        :model="useUser.userInfo"
        layout="vertical"
        autocomplete="off"
        class="inputs"
        name="basicPerfil"
        @finish="onFinish">

      <a-form-item
          label="Tu correo"
          name="email"
          class="pass"
          :rules="[{ required: true, whitespace: true, type: 'email', message: 'Adicionar el correo valido' }]"
          style="width: auto; display: flex; flex-direction: column; gap: .5rem;">

        <a-input
            v-model:value="useUser.userInfo.email"
            class="email"
            disabled
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
          label="Adiciona su nickName"
          name="displayName"
          class="pass"
          :rules="[{ required: true, whitespace: true, message: 'Adicionar un nick valido' }]"
          style="width: auto; display: flex; flex-direction: column; gap: .5rem;">

        <a-input
            v-model:value="useUser.userInfo.displayName"
            :class="{ 'error': 1 === 0 }"
            type="text"
            placeholder="Nick">
          <template #prefix>
            <UserOutlined/>
          </template>
          <template #suffix>
            <a-tooltip title="Adiciona el Nick">
              <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)"/>
            </a-tooltip>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item class="clearfix">
        <a-upload
            name="avatar"
            v-model:file-list="fileList"
            list-type="picture-card"
            @remove="handleRemove"
            class="avatar-uploader"
            :max-count="1"
            :before-upload="beforeUpload"
            @change="handleChange">
          <a-button v-if="fileList.length === 0" style="width: 90%; height: 90%;">
            <template #icon>
              <UploadOutlined style="font-size: 2rem;"/>
            </template>
          </a-button>

        </a-upload>
      </a-form-item>
      <a-form-item>
        <ButtonCounter
            :buttonText="'Actualizar'"
            type="primary" html-type="submit"
            :updateIcono="update"
            :paso="useUser.loadingUser"
            :clase="'antDesign'"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useUserStore} from "../store/bundle.js";
import {
  ImportOutlined,
  PoweroffOutlined,
  LoginOutlined,
  UserOutlined,
  InfoCircleOutlined,
  UploadOutlined

} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue';

export default {
  name: 'Perfil',
  setup() {
  },
  components: {
    useUserStore,
    ImportOutlined,
    PoweroffOutlined,
    LoginOutlined,
    UserOutlined,
    InfoCircleOutlined,
    UploadOutlined
  },
  data() {
    return {
      useUser: useUserStore(),
      update: ImportOutlined,
      fileList: ref([]),
      remove: false
    }
  },
  methods: {
    handleChange(file) {
      const {type} = file.file;
      const isJpgOrPng = ['image/jpeg', 'image/png'].includes(type);
      if (!this.remove) this.useUser.fault(isJpgOrPng);
      this.remove = false;
      console.log(this.fileList)
      if (!isJpgOrPng) {
        this.handleRemove();
        this.fileList = ref([]);
      }
    },
    beforeUpload(file) {
      this.fileList.value = [...this.fileList.value, file];
      return false;
    },
    handleRemove() {
      this.remove = true;
    },
    async onFinish(value) {
      // console.log(this.useUser.userInfo);
      let img = null;
      if (this.fileList[0]) {
        img = await this.useUser.updateImg(this.fileList[0]);
      }
      const error = await this.useUser.updateUser(value.displayName);
      // console.log(error)
      // const success = (error, imagen) => {
      message
          .loading('Verificando credenciales...', 1)
          .then(() => {
            if (!error) {
              message.success('Se actualizó la información', 2.5);
            } else if (img) {
              message.error('Problemas al subir la imagen', 2.5);
            } else {
              message.error(this.useUser.validation(error), 2.5);
            }
          });
      // };
      // success(error, img);
      // console.log(this.useUser.userInfo);
    },
  },
  mounted() {
    if(Object.keys(this.useUser.userInfo).length === 0) this.useUser.Home();
    // console.log(this.useUser.readImg());
  }
}
</script>

<style lang="css" scoped>
</style>