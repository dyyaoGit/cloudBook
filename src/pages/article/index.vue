<template>
  <div class="container" >
    <div v-if="!isLoading">
      <div class="content" v-if="article.title">
        <div :style="{fontSize: fontSize + 'px'}">
          <wemark :md="article.article.content" link :highlight="true" type="rich-text"></wemark>
        </div>
      </div>
      <div class="mask" v-show="isShowMask" @click="handleHideTitles"></div>
      <scroll-view class="titles" :scroll-y="true" :style="{transform: 'translateX(' + trans + ')'}">
        <div v-for="(item, index) in titles" :key="index" class="title-item" @click="handleGetData(item._id)">
          <div class="text">{{item.title}}</div>
        </div>
      </scroll-view>
      <div class="menu">
        <span class="iconfont icon-prev click" @click="handlePrev"></span>
        <span class="iconfont icon-mulu click" @click="handleShowTitles"></span>
        <span class="iconfont icon-zitifangda click" @click="handleAdd"></span>
        <span class="iconfont icon-zitisuoxiao click" @click="handleReduce"></span>
        <span class="iconfont icon-next click"  @click="handleNext"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetch, loading } from '@/utils/index.js'
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
    methods: {
      initData () {
        this.article = {}
      },
      async getData () {
        this.handleHideTitles()
        this.initData()
        loading.show()
        const article = await fetch.get(`/article/${this.articleId}`)
        const titles = await fetch.get(`/titles/${this.$root.$mp.query.bookId}`)
        this.article = article.data
        this.titles = titles.data
        this.index = this.titles.findIndex(item => item._id === this.articleId)
      },
      handleAdd () {
        this.fontSize += 2
      },
      handleReduce () {
        this.fontSize -= 2
      },
      handlePrev () {
        this.handleHideTitles()
        if (!this.titles[this.index - 1]) {
          wx.showToast({title: '已经是第一章了'})
        } else {
          loading.show()
          this.initData()
          fetch.get(`/article/${this.titles[this.index - 1]._id}`)
            .then(article => {
              this.article = article.data
              this.index--
            })
        }
      },
      handleNext () {
        this.handleHideTitles()
        if (!this.titles[this.index + 1]) {
          wx.showToast({title: '已经是最后一章了'})
        } else {
          loading.show()
          this.initData()
          fetch.get(`/article/${this.titles[this.index + 1]._id}`)
            .then(article => {
              this.article = article.data
              this.index++
            })
        }
      },
      handleGetData (id) {
        this.handleHideTitles()
        loading.show()
        this.initData()
        this.$fetch.get(`/article/${id}`).then(article => {
          this.article = article.data
          this.index = this.titles.findIndex(item => item._id === id)
        })
      },
      handleShowTitles () {
        this.isShowMask = true
        this.trans = 0
      },
      handleHideTitles () {
        this.isShowMask = false
        this.trans = '-600px'
      }
    },
    onLoad (options) {
      this.articleId = options.id
      this.getData()
    },
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
