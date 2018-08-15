<template>
  <div class="container" >
    <!--<img src="/static/imgs/loading3.svg" class="svg-loading" v-show="isLoading">-->
    <img src="/static/imgs/loading4.svg" v-show="loading" class="my-svg">
    <div v-if="!loading"
      class="content">
      <div class="book w710">
        <div class="book-img">
          <img :src="bookMsg.img" >
        </div>
        <div class="book-msg">
          <div class="title">
            {{bookMsg.title}}
          </div>
          <div class="author">
            作者: {{bookMsg.author}}
          </div>
          <div class="look-nums">
            {{bookMsg.looknums}}人在看
          </div>
          <div class="starts-nums">
            {{bookMsg.startsnums}}人喜欢
          </div>
        </div>
      </div>
      <!--book done-->

      <!--share start-->
      <div class="share-wrap w710">
        <button class="share-btn" @click="handleCollect" :disabled="isCollected">
          {{isCollected ? '已收藏' : '加入收藏'}}
        </button>
        <button class="share-btn" open-type="share">
          分享好友
        </button>
        <!--<button class="share-btn" @click="handleClick">-->
        <!--分享朋友圈-->
        <!--</button>-->
      </div>
      <!--share done-->

      <!--分割线-->
      <div class="role"></div>
      <!--分割线-->

      <!--简介-->
      <div class="intro w710">
        <div class="title">
          简介
        </div>

        <div class="desc">
          {{bookMsg.desc}}
        </div>
      </div>
      <!--简介-->

      <!--目录-->
      <div class="catalog">
        <div class="catalog-l">
        <span class="show-catalog">
          查看目录
        </span>
          <span class="total">
          共{{titleLength}}章
        </span>
        </div>
        <div class="catalog-r">
          更新于2天前 >
        </div>
      </div>
      <!--目录-->

      <div class="read-book">
        <!--<span class="start">-->
        <!--<span class="iconfont icon-xingzhuang163" ></span>-->
        <!--<span class="start-text">-->
        <!--start-->
        <!--</span>-->
        <!--</span>-->
        <button @click="handleRead">
          阅读该书籍
        </button>
      </div>
    </div>

  </div>
</template>

<script>
  import { fetch } from '@/utils/index.js'
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        bookId: '',
        bookMsg: {},
        titleLength: 0,
        loading: false,
        isCollected: false
      }
    },
    computed: {
      ...mapState(['isLoading'])
    },
    methods: {
      getData () {
        this.bookMsg = {}
        this.titleLength = 0
        this.loading = true
        fetch.get(`/book/${this.bookId}`).then(res => {
          this.loading = false
          this.bookMsg = res.data
          this.isCollected = res.isCollect === 1
          this.titleLength = res.length
        }).catch(err => {
          console.log(err)
        })
      },
      handleClick () {
        wx.showModal({
          title: '该功能将在上线后逐步完善'
        })
      },
      handleRead () {
        wx.navigateTo({
          url: `/pages/catalog/main?id=${this.bookId}`
        })
      },
      handleCollect () {
        let params = {
          bookId: this.bookId
        }
        this.$fetch.post('/collection', params).then(res => {
          console.log(res)
          if (res.code === 200) {
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000
            })
            this.isCollected = 1
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'warning',
              duration: 1000
            })
          }
        })
      }
    },
    onLoad (options) {
      this.bookId = options.id
      this.getData()
    },
    onShareAppMessage (obj) {
      console.log(obj)
      return {
        title: this.bookMsg.title,
        path: `/pages/bookdesc/main?id=${this.bookId}`,
        imageUrl: this.bookMsg.img
      }
    },
    onReady () {
      console.log('done')
    }
  }
</script>

<style scoped lang="scss" src="@/css/bookdesc.scss"></style>
<style>
  .my-svg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 200rpx;
    height: 200rpx;
    margin: auto;
  }
</style>
