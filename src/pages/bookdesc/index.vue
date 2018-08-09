<template>
  <div class="container" >
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
      <button class="share-btn">
        加入收藏
      </button>
      <button class="share-btn" open-type="share">
        分享好友
      </button>
      <button class="share-btn" @click="handleClick">
        分享朋友圈
      </button>
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
</template>

<script>
  import { fetch } from '@/utils/index.js'

  export default {
    data () {
      return {
        bookId: '',
        bookMsg: {},
        titleLength: 0
      }
    },
    methods: {
      getData () {
        fetch.get(`/book/${this.bookId}`).then(res => {
          this.bookMsg = res.data
          this.titleLength = res.length
          console.log(res.length)
          console.log(this.bookMsg)
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
      }
    },
    onLoad (options) {
      console.log(options)
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
    }
  }
</script>

<style scoped lang="scss" src="@/css/bookdesc.scss"></style>
