<template>
  <div class="container">
    <div class="row">
      <ul class="list-unstyled wiki-article">
        <a v-for="article in filteredArticles" v-bind:href="article.link" target="_blank">
          <li class="col-md-10 col-md-offset-1">
            <h4 class=""><strong>{{ article.title }}</strong></h4>
            <h5>{{ article.description }}</h5>
          </li>
        </a>
        <!--<a href="#" target="_blank">
          <li class="col-md-10 col-md-offset-1">
            <h4><strong>Adolf Hitler in popular culture</strong></h4>
            <h5>Adolf Hitler (20 April 1889 – 30 April 1945) was the leader of the National Socialist German Workers' Party and
              Chancellor of Nazi Germany from 1933 (Führer from 1934) to 1945.</h5>
          </li>
        </a>-->
      </ul>
    </div>
  </div>
</template>

<script>
  import bus from '../bus'

  export default {
    data() {
      return {
        articles: []
      }
    },

    computed: {
      filteredArticles() {
        var filtered = [];
        console.log(this.articles);
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
        // https://en.wikipedia.org/?curid=
        var api = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="
        var queryEncoded = encodeURIComponent(searchQuery);
        this.$parent.$http.jsonp(api + queryEncoded).then((data) => {
          this.articles = data.body.query.pages;
        });
      }
    }
  }
</script>