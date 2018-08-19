<template>
  <div class="container" >
    <img src="/static/imgs/loading3.svg" v-show="isLoading" class="svg-loading">
    <div v-if="!isLoading">
      <div class="swiper-wrap">
        <swiper class="swiper"
                :indicator-dots="indicatorDots"
                :circular="true"
                :autoplay="autoplay"
                :interval="interval"
                :duration="duration" indicator-active-color="#ffffff">
          <block v-for="(item,index) in swiperArr" :key="index">
            <swiper-item>
              <a v-if="item.book" :href="'/pages/bookdesc/main?id='+ item.book._id">
                <img :src="item.img" >
              </a>
            </swiper-item>
          </block>
        </swiper>
      </div>

      <div class="content">
        <div class="category" v-for="(item,index) in articles" :key="index">
          <div class="category-name">
            {{item.title}}
          </div>
          <a :href="'/pages/bookdesc/main?id=' + content._id" class="content-item" v-for="(content,idx) in item.books" :key="idx">
            <div class="img-wrap">
              <img :src="content.img">
            </div>
            <div class="item-article">
              <div class="title">
                {{content.title}}
              </div>
              <div class="prev-content">
                {{content.desc}}
              </div>
              <div class="author-details">
              <span class="author-name">
                {{content.author}}
              </span>
                <div class="look-msg">
                <span class="create-time">
                  两天前
                </span>
                  <span class="look-number">
                  {{item.title}}  {{content.looknums}}人在看
                </span>
                </div>

              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetch, login } from '@/utils/index.js'

  export default {
    data () {
      return {
        autoplay: true,
        interval: 5000,
        duration: 500,
        indicatorDots: true,
        swiperArr: [],
        articles: [],
        pn: 1,
        isLoading: false,
        hasMore: true
      }
    },
    methods: {
      getCategory () {
        this.isLoading = true
        fetch.get('/category/books', {pn: this.pn}).then(res => {
          this.articles = res.data
          this.isLoading = false
        })
      },
      getSwiper () {
        fetch.get('/swiper').then(data => {
          this.swiperArr = data.data
        })
      },
      async getMoreCategory () {
        const {data} = await this.$fetch.get('/category/books', {pn: this.pn})
        if (data && data.length > 0) {
          console.log(data)
          console.log(this.articles)
          this.articles = [...this.articles, ...data]
          this.hasMore = true
        } else {
          this.hasMore = false
        }
      }
    },
    created () {
      login().then(user => {
        this.getSwiper()
        this.getCategory()
      })
    },
    onPullDownRefresh () {

    },
    onReachBottom () {
      this.pn++
      this.getMoreCategory()
    }
  }
</script>

<style scoped lang="scss" src="@/css/index.scss"></style>
