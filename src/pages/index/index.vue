<template>
  <div class="container" >
    <div class="swiper-wrap">
      <swiper class="swiper"
        :indicator-dots="indicatorDots"
              :circular="true"
              :autoplay="autoplay"
              :interval="interval"
              :duration="duration" indicator-active-color="#ffffff">
        <!--<block v-for="(item,index) in swiperArr" :key="index">-->
          <!--<swiper-item>-->
            <!--<a href="/pages/book/main">-->
              <!--<img :src="item.cover_url" alt="">-->
            <!--</a>-->
          <!--</swiper-item>-->
        <!--</block>-->
        <block>
          <swiper-item>
            <a href="/pages/book/main">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533472249587&di=0c23af26e45a1f0a358d8df0626310cd&imgtype=0&src=http%3A%2F%2Fwww.redwall.ee%2Fimages%2Fblog%2Ftarkvaratrendid2016%2Fes6.jpg" >
            </a>
          </swiper-item>
          <swiper-item>
            <a href="/pages/book/main">
              <img src="https://box.kancloud.cn/cover_2015-09-21_55ff9ea2db56_800x1068.jpg-bookmiddle">
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
    }
  },
  created () {
    this.getData()
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
