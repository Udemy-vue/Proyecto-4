<template>
	<button 
    :class="clase" 
    v-on:click="emitLectura" 
    v-text="buttonText" 
    :disabled="paso">
  </button>
</template>

<script>

import { ref } from 'vue';

export default {
  props: ['updateName', 'buttonText', 'clase', 'paso', 'info'],
  methods: {
    emitLectura() {
      this.$emit('lectura', this.info );
      // this.$emit('lectura', this.buttonText);
    },
  },
};
</script>