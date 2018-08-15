<template>
  <div class="container" >
    <img src="/static/imgs/loading3.svg"
         class="svg-loading"
         v-if="isLoading"
    >
    <div class="content" v-if="!isLoading">
      <div class="read-item" v-for="(item,index) in readList" :key="index">
        <div class="left-box">
          <img :src="item.book.img" >
        </div>
        <div class="right-box">
          <div class="title">
            {{item.book.title}}
          </div>
          <div class="read-progress">
            书籍{{item.title.index}}/{{item.title.total}}章节
          </div>
          <div class="progress-wrap">
            <progress
              class="progress"
              :percent="item.percent"
              :active="true"
              stroke-width="4"
              activeColor="#1296db"
              backgroundColor="#8a8a8a"
            ></progress>
            <span>
            已看{{item.percent}}%
          </span>
          </div>
          <div class="last-read">
          <span>
            上次查看: {{item.title.title}}
          </span>
          <span>
            <getTime :time="item.updatedTime"></getTime>
          </span>
          </div>
          <div class="btns">
            <button class="btn" @click="handleJump(item.title)">
              继续阅读
            </button>
            <button class="btn">
              查看文档
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import getTime from '@/components/get-time'

  export default {
    computed: {
      ...mapState(['isLoading'])
    },
    components: {
      getTime
    },
    data () {
      return {
        readList: []
      }
    },
    methods: {
      getData () {
        this.$fetch.get('/readList').then(res => {
          this.readList = res.data.map(item => {
            item.percent = Math.ceil(item.title.index / item.title.total * 100)
            return item
          })
          console.log(res.data)
        })
      },
      handleJump (item) {
        wx.navigateTo({
          url: '/pages/article/main?id=' + item._id + '&bookId=' + item.bookId
        })
      }
    },
    onShow () {
      this.getData()
    }
  }
</script>

<style scoped lang="scss" src="@/css/person.scss"></style>
