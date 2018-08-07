<template>
  <div class="container" >
    <div class="swiper-wrap">
      <swiper class="swiper"
        :indicator-dots="indicatorDots"
              :circular="true"
              :autoplay="autoplay"
              :interval="interval"
              :duration="duration" indicator-active-color="#ffffff">
        <block v-for="(item,index) in swiperArr" :key="index">
          <swiper-item>
            <a href="/pages/book/main">
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
        <div class="content-item" v-for="(content,idx) in item.books" :key="idx">
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
            <div class="type">前端开发</div>
            <div class="author-details">
              <span class="author-name">
                Alex
              </span>
              <div class="look-msg">
                <span class="create-time">
                  两天前
                </span>
                <span class="look-number">

                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { fetch } from '@/utils/index.js'

  export default {
    data () {
      return {
        autoplay: true,
        interval: 3000,
        duration: 500,
        indicatorDots: true,
        swiperArr: [],
        articles: []
      }
    },
    methods: {
      getCategory () {
        fetch.get('/category/books').then(res => {
          this.articles = res.data
          console.log(res.data)
        })
      },
      getSwiper () {
        fetch.get('/swiper').then(data => {
          this.swiperArr = data.data
        })
      }
    },
    created () {
      // this.getData()
      this.getSwiper()
      this.getCategory()
    }
  }
</script>

<style scoped lang="scss" src="@/css/index.scss"></style>
