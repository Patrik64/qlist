<template>
  <div class="line-through cursor-pointer select-none" @click="uncheck">
    {{ text }}
  </div>
</template>

<script>

export default {
  name: 'QListChecked',
  props: {
    id: { type: String, required: true },
    text: { type: String, required: true },
    callbackUncheck: { type: Function, required: true }
  },
  data () {
    return {
      listText: '',
      listId: ''
    }
  },
  methods: {
    uncheck () {
      if (this.callbackUncheck) {
        this.callbackUncheck(this.id)
      }
    }
  }
}

</script>
