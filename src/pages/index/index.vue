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

    <div>

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
        swiperArr: []
      }
    },
    methods: {
      getData () {
        let self = this
        wx.request({
          url: 'https://cloud-doc.leyix.com/api/v3/index?page=1',
          success (data) {
            console.log(data)
            self.swiperArr = data.data.swiper
          }
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
    }
  }
</script>

<style scoped lang="scss">
  .swiper-wrap {
    .swiper {
      height: 300rpx;
    }

    img {
      width: 750rpx;
      height: 300rpx;
      background: #000;
    }
  }

</style>
