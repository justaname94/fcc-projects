<template>
  <div class="container">
    <div class="row">
      <ul class="list-unstyled wiki-article">
        <transition-group name="fade-down-animation"
          enter-active-class="animated fadeInDown"
          tag="a"
        >
          <a v-for="article in filteredArticles" v-bind:href="article.link" v-bind:key="article.title" target="_blank">
            <li class="col-md-10 col-md-offset-1">
              <h4 class=""><strong>{{ article.title }}</strong></h4>
              <h5>{{ article.description }}</h5>
            </li>
          </a>
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
        // Prevent to load the same query more than once
        if(this.currentSearchQuery === searchQuery) return;
        this.currentSearchQuery = searchQuery;

        var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
        var queryEncoded = encodeURIComponent(searchQuery);
        this.$http.jsonp(api + queryEncoded).then((data) => {
          // Pass the data to the computed property filteredArticles
         this.articles = data.body.query.pages;
        });
      }
    }
  }
</script>