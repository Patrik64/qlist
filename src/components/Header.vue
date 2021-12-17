<template>
  <div class="flex p-2 select-none" @click="backToWorkspace">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="gray">
      <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM1 5h18v2H1V5zm0 8h18v2H1v-2z"/>
    </svg>
    <span class="qlist-pos pl-1">qlist</span>
  </div>
</template>

<script>
import router from '@/router'
export default {
  name: 'Header',
  data () {
    return {}
  },
  methods: {
    backToWorkspace () {
      router.push('/').catch(error => {
        if (error.name !== 'NavigationDuplicated') {
          throw error
        }
      })
    }
  }
}
</script>
