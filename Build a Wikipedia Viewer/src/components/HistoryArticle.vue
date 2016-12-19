<template>
  <div class="container">
    <div class="row">
      <ul v-if="articles.length > 0" class="list-unstyled wiki-article">
        <transition-group name="fade-down-animation"
          enter-active-class="animated fadeIn"
          move-class="animated fadeOut"
          leave-active-class="animated fadeOut"
        >
          <li v-for="article in articles" v-bind:href="article.link" v-bind:key="article" target="_blank" class="col-md-10 col-md-offset-1">
            <i class="remove-article fa fa-trash fa-lg" aria-hidden="true" v-on:click="deleteArticle(article)"></i>
            <a v-bind:href="article.link" target="blank">
              <h4 class=""><strong>{{ article.title }}</strong></h4>
              <h5>{{ article.description }}</h5>
            </a>
          </li>
        </transition-group>
      </ul>
      <h4 class="text-center" v-else>Here you will be able to see your previously searched articles.</h4>
    </div>
  </div>
</template>

<script>
  import bus from '../bus'

  export default {
    data() {
      return {
        articles: bus.savedArticles,
      }
    },
    methods: {
      deleteArticle(article) {
        let index = bus.savedTitles.indexOf(article.title);
        bus.savedArticles.splice(index, 1);
        bus.savedTitles.splice(index, 1);
      },
    }
  }
</script>