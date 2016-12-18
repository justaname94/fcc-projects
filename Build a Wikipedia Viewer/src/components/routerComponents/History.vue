<template>
  <div>
    <search-bar></search-bar>
    <history-article></history-article>
  </div>
</template>

<script>
  import SearchBar from '../SearchBar.vue';
  import HistoryArticle from '../HistoryArticle.vue';

  export default {
    components: {
      SearchBar,
      HistoryArticle
    }
  }
</script>