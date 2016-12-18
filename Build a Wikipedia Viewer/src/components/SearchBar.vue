<template>
  <div>
    <div class="search-container">
      <form v-on:submit.prevent="searchArticle(searchQuery)">
          <input type="text" id="search" v-model="searchQuery" placeholder="Search for article" autocomplete="off">
          <button type="submit" class="icon"><i class="fa fa-search"></i></button>
      </form>
    </div>
  </div>
</template>

<script>
  import bus from '../bus';

  export default {
    data () {
      return {
        searchQuery: ''
      }
    },

    methods: {
      searchArticle(searchQuery) {
          bus.$emit('search-query', searchQuery);
      }
    }
  }
</script>




