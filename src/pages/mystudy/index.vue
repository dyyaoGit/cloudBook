<template>
  <div class="container" >

  </div>
</template>

<script>
  // import { fetch} from '@/utils/index.js'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['isLoading'])
    },
    data () {
      return {
        articleId: '',
        article: {},
        index: 0,
        fontSize: 20,
        titles: [],
        trans: 0,
        isShowMask: false
      }
    },
    methods: {},
    onShareAppMessage (obj) {
      return {
        title: this.article.article.title,
        path: '/pages/article/main?id=' + this.articleId,
        imageUrl: this.article.article.img
      }
    }
  }
</script>

<style scoped lang="scss" src="@/css/article.scss"></style>
