<template>
  <div class="container" >
    <img src="/static/imgs/loading3.svg" v-if="isLoading" class="svg-loading">
    <div class="content" v-if="!isLoading">
      <div class="read-item" v-for="(item, index) in readlist" :key="index">
        <img :src="item.book.img" >
        <div class="article-title">
          <div class="title">
            {{item.book.title}}
          </div>
          <div class="title-total">
            书籍 {{item.title.index}}/{{item.title.total}}章节
          </div>
          <div class="progress-wrap">
            <progress class="progress"
                      :percent="item.percent"
                      :stroke-width="2"
                      activeColor="#1296db"
                      backgroundColor="#8a8a8a"
                      :active="true"
            ></progress>
            <div class="read-progress">
              已看{{item.percent}}%
            </div>
          </div>
          <div class="last-read">
            <span>
              上次查看: {{item.title.title}}
            </span>
            <span>
              两天前
            </span>
          </div>
          <div class="btns">
            <button class="btn" @click="comtinueRead(item.title)">
              继续阅读
            </button>
            <button class="btn" @click="jumpToCatalog(item.book)">
              查看文档
            </button>
          </div>

        </div>
      </div>
    </div>
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
        readlist: []
      }
    },
    methods: {
      getData () {
        this.$fetch.get('/readList').then(res => {
          console.log(res)
          this.readlist = res.data.map(item => {
            item.percent = Math.floor(item.title.index / item.title.total * 100)
            return item
          })
        })
      },
      comtinueRead (title) {
        console.log(title)
        wx.navigateTo({
          url: '/pages/article/main?id=' + title._id + '&bookId=' + title.bookId
        })
      },
      jumpToCatalog (book) {
        wx.navigateTo({
          url: '/pages/catalog/main?id=' + book._id
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
      this.getData()
    }
  }
</script>

<style scoped lang="scss" src="@/css/mystudy.scss"></style>
