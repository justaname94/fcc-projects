<template>
  <div>
    <div class="message">
      {{ message  }}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: 'Hello Vue.js'
      };
    }
  }
</script>

<style>
.message {
  background: gray;
}
</style>