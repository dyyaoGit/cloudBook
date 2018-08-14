<template>
  <div class="container" >
    <img src="/static/imgs/loading3.svg" class="svg-loading" v-show="isLoading">
    <div class="content" v-if="!isLoading">
      <a :href="'/pages/article/main?id=' + item._id + '&bookId=' + bookId" v-for="(item, index) in titles" :key="index" class="title" v-if="!isLoading">
        {{item.title}}
      </a>
    </div>
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
        titles: [],
        bookId: '',
        isLoading: false
      }
    },
    methods: {
      getData () {
        this.isLoading = true
        fetch.get(`/titles/${this.bookId}`).then(res => {
          this.isLoading = false
          this.titles = res.data
        })
      }
    },
    onLoad (options) {
      this.bookId = options.id
      this.getData()
    }
  }
</script>

<style scoped lang="scss" src="@/css/catalog.scss"></style>
