<template>
  <div class="container" >


  </div>
</template>

<script>
  // import { fetch } from '@/utils/index.js'

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
      welcome () {
        wx.showModal('success')
      }
    }
  }
</script>

<style scoped lang="scss" src="@/css/index.scss"></style>
