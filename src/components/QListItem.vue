<template>
  <div class="col-span- py-2">
    <button @click="check" class="mr-2">
      <svg width="16" height="16" viewBox="0 0 24 19" class="rounded-full hover:bg-tertiary-500 focus:outline-none select-none">
        <path d="M7.41,14.58L12,19.17L16.59,14.58L18,16L12,22L6,16L7.41,14.58M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58M7.41,2.58L12,7.17L16.59,2.58L18,4L12,10L6,4L7.41,2.58Z"/>
        </svg>
    </button>
    <input
        :id="createHrefId(id)"
        type="text"
        spellcheck="false"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        v-model="listText"
        placeholder="..."
        @input="change"
        class="input-design font-semibold"
        onfocus="let value = this.value; this.value = null; this.value=value">
    <!--input type="checkbox" @click="check" class="ml-2 form-checkbox h-4 w-4 text-green-600"-->
    <button @click="remove" class="ml-2">
      <svg width="10" height="10" viewBox="0 0 20 20" class="rounded-full hover:bg-tertiary-500 focus:outline-none">
        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
        </svg>
    </button>
  </div>

</template>

<script>
// import { createID } from '@/utils/utils.js'
// import { eventBus } from '@/main'

export default {
  name: 'QListItem',
  props: {
    id: { type: String, required: true },
    text: { type: String, required: true },
    callbackRemove: { type: Function, required: true },
    callbackChange: { type: Function, required: true },
    callbackCheck: { type: Function, required: true },
    callbackJumpUp: { type: Function, required: true },
    callbackJumpDown: { type: Function, required: true }
  },
  data () {
    return {
      listText: this.text,
      listId: this.id
    }
  },
  watch: {
    text () {
      this.listText = this.text
    }
  },
  created () {
    const handleKeys = (e) => {
      if ((e.key === 'Backspace' || e.key === 'Delete') && this.isInFocus()) { // backspace and delete
        if (this.text.length === 0) {
          const hrefId = 'id-' + this.id
          const el = document.getElementById(hrefId)
          if (document.activeElement === el) {
            this.remove()
          }
        }
      } else if ((e.key === 'ArrowUp' || e.key === 'Up') && this.isInFocus()) { // up
        this.jumpUp()
      } else if ((e.key === 'ArrowDown' || e.key === 'Down') && this.isInFocus()) { // down
        this.jumpDown()
      }
    }

    document.addEventListener('keydown', handleKeys)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleKeys)
    })
  },
  mounted () {
    // this.listText = this.text
    // this.listId = this.id
  },
  methods: {
    isInFocus () {
      const hrefId = 'id-' + this.id
      const el = document.getElementById(hrefId)
      if (document.activeElement === el) {
        return true
      }
      return false
    },
    remove () {
      if (this.callbackRemove) {
        this.callbackRemove(this.id)
      }
    },
    check () {
      if (this.callbackCheck) {
        this.callbackCheck(this.id, this.listText)
      }
    },
    change () {
      if (this.callbackChange) {
        this.callbackChange(this.id, this.listText)
      }
    },
    jumpUp () {
      if (this.callbackJumpUp) {
        this.callbackJumpUp(this.id)
      }
    },
    jumpDown () {
      if (this.callbackJumpDown) {
        this.callbackJumpDown(this.id)
      }
    },
    createHrefId (id) {
      return 'id-' + this.id
    },
    focusById (id) {
      const idJump = 'id-' + id
      setTimeout(function () {
        document.getElementById(idJump).focus()
      }, 50)
    }
  }
}

</script>

<style scoped>

@media only screen and (max-width: 400px) {
  .input-design {
  display: inline-block;
  text-decoration: none;
  max-width: 15rem;
  width: 15rem;
  border: none;
  border-bottom: 1px solid rgba(128,128,128, 0.5);
  font-size: 100%;
  outline: none;
  box-sizing: border-box;
  font-weight: 600;
  background: transparent;
}
}

@media only screen and (min-width: 400px) {
  .input-design {
  display: inline-block;
  text-decoration: none;
  max-width: 20rem;
  width: 20rem;
  border: none;
  border-bottom: 1px solid rgba(128,128,128, 0.5);
  font-size: 100%;
  outline: none;
  box-sizing: border-box;
  font-weight: 600;
  background: transparent;
}
}
</style>
