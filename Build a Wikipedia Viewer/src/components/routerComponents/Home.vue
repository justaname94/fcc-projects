<template>
  <div>
    <search-bar></search-bar>
    <random-article></random-article>
    <wikipedia-article></wikipedia-article>
  </div>
</template>

<script>
  import SearchBar from '../SearchBar.vue';
  import RandomArticle from '../RandomArticle.vue';
  import WikipediaArticle from '../WikipediaArticle.vue';

  export default {
    components: {
      SearchBar,
      RandomArticle,
      WikipediaArticle
    }
  }
</script>