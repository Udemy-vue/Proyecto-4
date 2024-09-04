<template>
  <div class="Home">
    <h1>Home</h1>
    <h2 v-if="!useUser.loading">{{useUser.userInfo.email}}</h2>
    
    <form class="inputs" @submit.prevent="">

      <a-input v-model:value="name" type="text" placeholder="Ingrese URL">

        <template #prefix>
          <GlobalOutlined />
        </template>

        <template #suffix>
          <a-tooltip title="Adiciona la URL">
            <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)"/>
          </a-tooltip>
        </template>

      </a-input>

      <ButtonCounter :buttonText="'Agregar'"
        :updateIcono="global"
        @lectura="CreateInput" 
        :paso="useData.loadingDoc" 
        :clase="'antDesign'"/>

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
            :updateIcono="editado"
            @lectura="Editar" 
            :paso="useData.loadingDoc" 
            :clase="'antDesign'"/>

          <ButtonCounter
              :buttonText="'Borrar'"
              :info="item.id"
              :updateIcono="borrar"
              @lectura="useData.deleteUrl"
              :paso="useData.loadingDoc"
              :clase="'antDesign'"/>

        </div> 
      </li>
    </ul>

    <ButtonCounter
        :buttonText="'Logout'"
        :updateIcono="salir"
        @lectura="cerrado" 
        :paso="useData.loadingDoc" 
        :clase="'antDesign'"/>
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
import { PoweroffOutlined, FormOutlined, GlobalOutlined, CloudUploadOutlined, UserOutlined, InfoCircleOutlined,
  DeleteOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons-vue';

export default {
  name: 'Home',

  data () {
    return {
      useUser: useUserStore(),
      useData: useDatabaseStore(),
      router: useRouter(),
      name: '',
      global: CloudUploadOutlined,
      borrar: DeleteOutlined,
      salir: LogoutOutlined,
      editado: EditOutlined
    }
  },
  methods: {
    cerrado() {
      this.useData.signOutUser();
      // this.UseData.$reset();
      this.useUser.signOutUser();
      this.useUser.selectedKeys = ["2"];
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
    this.useUser.selectedKeys = ["1"]
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
    useRouter,
    InfoCircleOutlined,
    GlobalOutlined,
    CloudUploadOutlined,
    DeleteOutlined,
    LogoutOutlined,
    EditOutlined
  }
}
</script>

<style lang="css" scoped>
</style>