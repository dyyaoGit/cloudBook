<template>
  <div class="container" >
    <div>
      <button @click="handleShow">
        显示目录
      </button>
      <div v-for="item in 100">
        我是段落
      </div>

    </div>
    <div class="mask" v-show="isShow" @click="handleHide"></div>
    <scroll-view :scroll-y="true"
                 class="catalog"
                 :style="{transform: 'translateX('+trans+'rpx)'}
">
      <div v-for="(item, index) in 20" :key="index" class="item">
        我是目录{{index}}
      </div>
    </scroll-view>

  </div>
</template>

<script>
  import { fetch } from '@/utils/index.js'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['isLoading'])
    },
    data () {
      return {
        autoplay: true,
        interval: 5000,
        duration: 500,
        indicatorDots: true,
        swiperArr: [],
        articles: [],
        isShow: false,
        trans: -600
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
          console.log(this.swiperArr)
        })
      },
      handleShow () {
        this.isShow = true
        this.trans = 0
      },
      handleHide () {
        this.trans = -600
        this.isShow = false
      }
    }
  }
</script>

<style>
  .mask {
    position: fixed;
    z-index: 666;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.2);
  }

  .catalog {
    position: fixed;
    z-index: 998;
    top: 0;
    bottom: 0;
    left: 0;
    width: 600rpx;
    transform: translateX(-600rpx);
    transition: transform ease .3s;
    background: yellow;
  }
  .item {
    line-height: 30px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #f1f1f1;
    padding-left: 40rpx;
  }
</style>
