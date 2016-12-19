<template>
  <div class="container">
    <div class="row">
      <ul class="list-unstyled wiki-article">
        <transition-group name="fade-down-animation"
          enter-active-class="animated fadeIn"
          move-class="animated fadeOut"
        >
          <li v-for="article in filteredArticles" v-bind:href="article.link" v-bind:key="article.title" target="_blank" class="col-md-10 col-md-offset-1">
            <a v-bind:href="article.link" target="blank" v-on:click="saveArticle(article)">
              <h4 class=""><strong>{{ article.title }}</strong></h4>
              <h5>{{ article.description }}</h5>
            </a>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
  import bus from '../bus'

  export default {
    data() {
      return {
        articles: [],
        currentSearchQuery: ''
      }
    },

    computed: {
      filteredArticles() {
        var filtered = [];
        for(var article in this.articles) {
          filtered.push({
            link: 'https://en.wikipedia.org/?curid=' + article,
            title: this.articles[article].title,
            description: this.articles[article].extract
          });
        }
        return filtered;
      }
    },

    created() {
      bus.$on('search-query', this.onSearchQueryChange);
    },

    methods: {
      onSearchQueryChange(searchQuery) {
        // Remove articles if the search query is empty
        if(searchQuery === '') {
          this.currentSearchQuery = searchQuery;
          this.articles = [];
          return;
        }
        // Prevent to load the same query more than once
        if(this.currentSearchQuery === searchQuery) return;

        this.currentSearchQuery = searchQuery;

        var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
        var queryEncoded = encodeURIComponent(searchQuery);
        this.$http.jsonp(api + queryEncoded).then((data) => {
          // Pass the data to the computed property filteredArticles
         this.articles = data.body.query.pages;
        });
      },
      saveArticle(article) {

        // Save the titles on an array to check for duplicates
        // and dump them
        if(bus.savedTitles.indexOf(article.title) > -1)
          return;
        bus.savedArticles.push(article);
        bus.savedTitles.push(article.title);
      }

    }
  }
</script>