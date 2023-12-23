<template>
	<div class="Editar">
   <h1>Editar</h1> 

   <form class="inputs" @submit.prevent="">
      <h3>{{ useData.userUid }}</h3>

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

<!--       <input class="input-register" 
        v-model="name"  
        type="text"
        placeholder="Ingrese URL"> -->

      <ButtonCounter :buttonText="'Editar'"
        :info="name"
        :updateIcono="editado"
        @lectura="useData.updateUrl" 
        :paso="useData.loadingDoc" 
        :clase="'antDesign BotonEditar'"/>

      <ButtonCounter :buttonText="'Regresar'"
        :updateIcono="retornar"
        @lectura="useData.returnData" 
        :paso="useData.loadingDoc" 
        :clase="'antDesign BotonEditar'"/>

      <!-- <ButtonCounter :buttonText="'Agregar'" 
        :info="name"
        @lectura="useData.updateUrl"
        :paso="useData.loadingDoc" 
        :clase="''"/> -->
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore, useDatabaseStore } from '../store/bundle.js';
import ButtonCounter from '../components/ButtonCounter.vue';
import { EditOutlined, RollbackOutlined, InfoCircleOutlined, GlobalOutlined } from '@ant-design/icons-vue';

export default {
  name: 'Editar',

  data () {
    return {
      route: useRoute(),
      router: useRouter(),
      useUser: useUserStore(),
      useData: useDatabaseStore(),
      name: ref(''),
      editado: EditOutlined,
      retornar: RollbackOutlined
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
    ButtonCounter,
    EditOutlined,
    RollbackOutlined,
    InfoCircleOutlined,
    GlobalOutlined
  }
}
</script>

<style lang="css" scoped>
</style>