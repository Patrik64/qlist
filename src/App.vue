<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import * as dbutils from '@/utils/dbutils'

export default {
  components: {
    appHeader: Header
  },
  async created () {
    dbutils.signIn().catch((err) => { console.log(err) })
  }
}
</script>

<style>
body {
    background-color: #CFE2E2
}
</style>
