<template>
  <div>
    <div class="search-container">
      <input type="text" id="search" v-model="searchQuery" placeholder="Enter a search term">
      <button class="icon"><i class="fa fa-search"></i></button>
      {{searchQuery}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchQuery: ''
      }
    }
  }
</script>