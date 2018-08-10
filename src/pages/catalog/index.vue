<template>
  <div class="container" >
    <a :href="'/pages/article/main?id=' + item._id + '&bookId=' + bookId" v-for="(item, index) in titles" :key="index" class="title">
      {{item.title}}
    </a>
  </div>
</template>

<script>
  import { fetch } from '@/utils/index.js'

  export default {
    data () {
      return {
        titles: [],
        bookId: ''
      }
    },
    methods: {
      getData () {
        fetch.get(`/titles/${this.bookId}`).then(res => {
          console.log(res)
          this.titles = res.data
        })
      }
    },
    onLoad (options) {
      console.log(options)
      this.bookId = options.id
      this.getData()
    }
  }
</script>

<style scoped lang="scss" src="@/css/catalog.scss"></style>
