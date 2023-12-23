<template>
	<!-- <button 
    :class="clase" 
    v-on:click="emitLectura" 
    v-text="buttonText" 
    :disabled="paso">
  </button> -->
  <!-- <a-space direction="vertical"> -->

  <a-button 
    type="primary" 
    :class="clase"
    :loading="paso" 
    v-on:click="emitLectura"
    style="font-size: 18px;">

    <template #icon><component :is="updateIcono" /></template>
    {{ buttonText }}
  </a-button>
  <!--  -->
  <!-- </a-space> -->
</template>

<script>

import { ref } from 'vue';
// import { PoweroffOutlined, LoginOutlined } from '@ant-design/icons-vue';
export default {
  name: 'ButtonCounter',
  props: ['updateName', 'buttonText', 'clase', 'paso', 'info', 'updateIcono'],
  data () {
    return {
      // login: LoginOutlined
    }
  },
  methods: {
    emitLectura() {
      this.$emit('lectura', this.info );
    }
  },
  created() {
    // console.log(this.updateIcono);
  },
  components: {

  }
}
</script>

<style lang="css" scoped>
</style>