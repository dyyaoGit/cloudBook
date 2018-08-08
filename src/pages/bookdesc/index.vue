<template>
  <div class="container" >
    <div class="book">
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
    <div class="share-wrap">
      <button class="share-btn">
        加入收藏
      </button>
      <button class="share-btn" open-type="share">
        分享好友
      </button>
      <button class="share-btn">
        分享朋友圈
      </button>
    </div>

    <!--share done-->

  </div>
</template>

<script>
  import { fetch } from '@/utils/index.js'

  export default {
    data () {
      return {
        bookId: '',
        bookMsg: {}
      }
    },
    methods: {
      getData () {
        fetch.get(`/book/${this.bookId}`).then(res => {
          this.bookMsg = res.data
          console.log(this.bookMsg)
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
        path: '/pages/bookdesc/main',
        imageUrl: this.bookMsg.img
      }
    }
  }
</script>

<style scoped lang="scss" src="@/css/bookdesc.scss"></style>
