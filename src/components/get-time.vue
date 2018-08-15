<template>
  <div>
    {{str}}
  </div>
</template>

<script>
  export default {
    props: {
      time: {
        type: [String, Number]
      }
    },
    data () {
      return {
        str: '',
        timestamp: ''
      }
    },
    methods: {
      getTimestamp () { // 转换并获取后端给的时间戳
        const date = new Date(this.time)
        this.timestamp = Math.round(date.getTime() / 1000)
        return this.timestamp
      },
      getNowUnix () { // 获取当前时间戳
        const time = new Date().getTime()
        const unix = Math.round(time / 1000)
        return unix
      },
      getTodayUnix () { // 获取当前0时0分0秒的时间戳
        const time = new Date()
        time.setHours(0)
        time.setMinutes(0)
        time.setSeconds(0)
        time.setMilliseconds(0)
        const unix = Math.round(time.getTime() / 1000)
        return unix
      },
      getUpdateStr () { // 获取发布时的时间字符串
        const time = new Date(this.time)
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const day = time.getDate()
        return `${year}年${month}月${day}日`
      },
      getTimeStr () {
        const timestamp = this.getTimestamp()
        const nowUnix = this.getNowUnix()
        const todayUnix = this.getTodayUnix()

        if (nowUnix - timestamp >= 0 && nowUnix - timestamp < 3600) {
          this.str = Math.floor((nowUnix - timestamp) / 60) + '分钟前'
        } else if (timestamp - todayUnix >= 0) {
          this.str = Math.round((nowUnix - timestamp) / 3600) + '小时前'
        } else if (nowUnix - timestamp >= 86400 && nowUnix - timestamp <= 31 * 86400) {
          this.str = Math.round((nowUnix - timestamp) / 86400) + '天前'
        } else {
          this.str = this.getUpdateStr()
        }
      }
    },
    onShow () {
      this.getTimeStr()
    },
    computed: {
      setDate () {
        this.getTimeStr()
        return this.time
      }
    }
  }
</script>

<style scoped>

</style>
