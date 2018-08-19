<template>
  <div class="container" >
    <div>
      我的收藏
    </div>

    <div v-for="(item,index) in collection" :key="index" class="list">
      <img :src="item.book.img" >
      <button @click="handleDelete(item)" size="mini">删除该收藏</button>
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
        collection: []
      }
    },
    methods: {
      async getData () {
        const {data} = await this.$fetch.get('/collection')
        this.collection = data
        console.log(this.collection)
      },
      async handleDelete (item) {
        const bookId = item.book._id
        const {data} = await this.$fetch.delete('/collection/' + bookId)
        console.log(data)
      }
    },
    onShow () {
      this.getData()
    }
  }
</script>

<style scoped lang="scss" src="@/css/person.scss"></style>
