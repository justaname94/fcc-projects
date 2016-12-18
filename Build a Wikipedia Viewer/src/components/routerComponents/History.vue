<template>
  <div>
    <search-bar></search-bar>
    <wikipedia-article></wikipedia-article>
  </div>
</template>

<script>
  import SearchBar from '../SearchBar.vue';
  import WikipediaArticle from '../WikipediaArticle.vue';

  export default {
    components: {
      SearchBar,
      WikipediaArticle
    }
  }
</script>