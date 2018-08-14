<template>
  <div class="container" >
    <div v-for="item in collection" :key="item._id">
      <img :src="item.book.img">
    </div>
  </div>
</template>

<script>
  // import { fetch } from '@/utils/index.js'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['isLoading'])
    },
    data () {
      return {
        collection: []
      }
    },
    methods: {
      getCollection () {
        this.$fetch.get('/collection').then(res => {
          console.log(res)
          this.collection = res.data
        })
      }
    },
    onShareAppMessage (obj) {
      return {
        title: this.article.article.title,
        path: '/pages/article/main?id=' + this.articleId,
        imageUrl: this.article.article.img
      }
    },
    onShow () {
      this.getCollection()
    }
  }
</script>

<style scoped lang="scss" src="@/css/article.scss"></style>
