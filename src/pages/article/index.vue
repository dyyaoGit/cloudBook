<template>
  <div class="container" >
    <div>
    </div>
  </div>
</template>

<script>
  import { fetch } from '@/utils/index.js'

  export default {
    data () {
      return {
        articleId: '',
        article: {}
      }
    },
    methods: {
      getData () {
        fetch.get(`/article/${this.articleId}`).then(res => {
          this.article = res.data
          console.log(this.article)
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

<style scoped lang="scss" src="@/css/bookdesc.scss"></style>
