<template>
  <div class="container" >

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
        readList: []
      }
    },
    methods: {
      getData () {}
    },
    onShow () {
      this.getData()
    }
  }
</script>

<style scoped lang="scss" src="@/css/person.scss"></style>
