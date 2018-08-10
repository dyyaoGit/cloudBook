<template>
  <div class="container" >
    <div class="content" v-if="article.title">
      <div :style="{fontSize: fontSize + 'px'}">
        <wemark :md="article.article.content" link :highlight="true" ></wemark>
      </div>
    </div>
    <div class="menu">
      <span class="iconfont icon-prev click" @click="handlePrev"></span>
      <span class="iconfont icon-mulu click"></span>
      <span class="iconfont icon-zitifangda click" @click="handleAdd"></span>
      <span class="iconfont icon-zitisuoxiao click" @click="handleReduce"></span>
      <span class="iconfont icon-next click" @click="handleNext"></span>
    </div>
  </div>
</template>

<script>
  import { fetch } from '@/utils/index.js'

  export default {
    data () {
      return {
        articleId: '',
        article: {},
        index: 0,
        fontSize: 20,
        titles: []
      }
    },
    methods: {
      async getData () {
        const article = await fetch.get(`/article/${this.articleId}`)
        const titles = await fetch.get(`/titles/${this.$root.$mp.query.bookId}`)
        this.article = article.data
        this.titles = titles.data
        this.index = this.titles.findIndex(item => item._id === this.articleId)
      },
      handleAdd () {
        this.fontSize += 4
      },
      handleReduce () {
        this.fontSize -= 4
      },
      handlePrev () {
        console.log(this.titles)
        if (!this.titles[this.index - 1]) {
          wx.showToast({title: '已经是第一章了'})
        } else {
          fetch.get(`/article/${this.titles[this.index - 1]._id}`)
            .then(article => {
              this.article = article.data
              this.index--
            })
        }
      },
      handleNext () {
        if (!this.titles[this.index + 1]) {
          wx.showToast({title: '已经是最后一章了'})
        } else {
          fetch.get(`/article/${this.titles[this.index + 1]._id}`)
            .then(article => {
              this.article = article.data
              this.index++
            })
        }
      }
    },
    onLoad (options) {
      this.articleId = options.id
      this.getData()
    },
    onShareAppMessage (obj) {
      console.log(obj)
      return {
        title: this.bookMsg.title,
        path: '/pages/bookdesc/main',
        imageUrl: this.bookMsg.img
      }
    }
  }
</script>

<style scoped lang="scss" src="@/css/article.scss"></style>
