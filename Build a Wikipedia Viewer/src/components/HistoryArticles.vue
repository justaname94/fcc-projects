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
              <i class="remove-article fa fa-minus fa-lg" aria-hidden="true"></i>
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
</script>