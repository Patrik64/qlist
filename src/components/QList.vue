<template>
<div>
  <div class="mt-10 flex items-center justify-center">
    <div class="ctrl-cont">
      <div class="flex flex-col items-center py-5">
        <q-list-item v-for="li in qlist.qlistItems"
          :key="li.id"
          :ref="`qli${li.id}`"
          :id="li.id"
          :text="li.text"
          :callbackRemove="removeListItem"
          :callbackChange="changeListItem"
          :callbackCheck="checkListItem"
          :callbackJumpUp="jumpUp"
          :callbackJumpDown="jumpDown"/>
      </div>
      <div class="flex flex-col items-center pb-3">
        <button @click="addListItem" class="w-10 h-10 rounded-full text-sm font-medium hover:bg-tertiary-500 focus:outline-none">
          <svg class="plus-pos" width="20" height="20" viewBox="0 0 23 24">
            <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"/>
          </svg>
        </button>
      </div>
      <div class="flex flex-col items-center py-5">
        <q-list-checked v-for="checked in qlist.qlistChecked"
          :key = "checked.id"
          :id = "checked.id"
          :text = "checked.text"
          :callbackUncheck="uncheckListItem"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { createID } from '@/utils/utils.js'
import { mapActions, mapGetters } from 'vuex'

import QListItem from '@/components/QListItem'
import QListChecked from '@/components/QListChecked'
import * as dbutils from '@/utils/dbutils'

export default {
  name: 'QList',
  components: {
    QListItem,
    QListChecked
  },
  data () {
    return {
      qlistId: this.$route.params.qlistId,
      qlistName: '',
      qlist: [],
      intervalHandle: null
    }
  },
  async created () {
    const handleKeys = (e) => {
      if (e.key === 'Enter') {
        this.addListItem()
      }
    }
    document.addEventListener('keydown', handleKeys)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleKeys)
    })

    this.intervalHandle = setInterval(async () => {
      await this.merge()
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.intervalHandle)
  },
  async mounted () {
    const qlists = this.loadQLists()
    const qlist = qlists.filter(el => { return el.qlistId === this.qlistId })[0]
    if (qlist) {
      this.qlist = qlist
      if (this.qlist.qlistItems.length <= 0) {
        const listItem = {}
        listItem.id = createID()
        listItem.text = ''
        this.qlist.qlistItems.push(listItem)
      }
      const firstListItemId = this.qlist.qlistItems[0].id
      this.$nextTick(() => {
        this.$refs[`qli${firstListItemId}`][0].focusById(firstListItemId)
      })
    } else {
      // can't find the qlist in local storage, pick up from firestore
      this.qlist = await dbutils.dbGetQlist(this.qlistId)
      this.saveChanges()
    }
  },
  methods: {
    ...mapActions({
      saveQlists: 'setQListsA'
    }),
    ...mapGetters({
      loadQLists: 'getQLists'
    }),
    removeListItem (id) {
      if (this.qlist.qlistItems.length) {
        const qlistitem = this.qlist.qlistItems.find(el => el.id === id)
        if (qlistitem) {
          const idxRemoved = this.qlist.qlistItems.indexOf(qlistitem)
          const idxPrevious = idxRemoved === 0 ? 1 : idxRemoved - 1
          if (idxPrevious >= 0 && idxPrevious < this.qlist.qlistItems.length) {
            this.jumpTo(this.qlist.qlistItems[idxPrevious].id)
          }
        }
        const filteredQListItems = this.qlist.qlistItems.filter((value, index, array) => {
          return value.id !== id
        })
        this.qlist.qlistItems = filteredQListItems
        this.saveChanges()
      }
    },
    changeListItem (id, text) {
      const qlistitem = this.qlist.qlistItems.find(el => el.id === id)
      if (qlistitem) {
        qlistitem.text = text
        this.saveChanges()
      }
    },
    checkListItem (id) {
      const qlistitem = this.qlist.qlistItems.find(el => el.id === id)
      if (qlistitem) {
        const filteredQListItems = this.qlist.qlistItems.filter((value, index, array) => {
          return value.id !== id
        })
        this.qlist.qlistItems = filteredQListItems
        if (qlistitem.text.length > 0) {
          this.qlist.qlistChecked.push(qlistitem)
        }
        this.saveChanges()
      }
    },
    uncheckListItem (id) {
      const qlistChecked = this.qlist.qlistChecked.find(el => el.id === id)
      if (qlistChecked) {
        const filteredQListChecked = this.qlist.qlistChecked.filter((value, index, array) => {
          return value.id !== id
        })
        this.qlist.qlistChecked = filteredQListChecked
        this.qlist.qlistItems.push(qlistChecked)
        this.saveChanges()
      }
    },
    async saveChanges () {
      const qlists = this.loadQLists()
      const currentQL = qlists.find(el => el.qlistId === this.qlistId)
      if (currentQL) {
        const idxCurrent = qlists.indexOf(currentQL)
        qlists[idxCurrent] = this.qlist
      } else {
        qlists.push(this.qlist)
      }
      this.saveQlists(qlists)
      await dbutils.dbSetQlist(this.qlist)
    },
    addListItem () {
      const listItem = {}
      listItem.id = createID()
      listItem.text = ''
      this.qlist.qlistItems.push(listItem)
      this.saveChanges()
      this.jumpTo(listItem.id)
    },
    jumpTo (id) {
      this.$forceUpdate()
      const idJump = 'id-' + id
      setTimeout(function () {
        document.getElementById(idJump).focus()
      }, 50)
    },
    jumpUp (id) {
      if (this.qlist.qlistItems.length) {
        const qlistitem = this.qlist.qlistItems.find(el => el.id === id)
        if (qlistitem) {
          const idxCurrent = this.qlist.qlistItems.indexOf(qlistitem)
          const idxPrevious = idxCurrent === 0 ? this.qlist.qlistItems.length - 1 : idxCurrent - 1
          if (idxPrevious >= 0 && idxPrevious < this.qlist.qlistItems.length) {
            this.jumpTo(this.qlist.qlistItems[idxPrevious].id)
          }
        }
      }
    },
    jumpDown (id) {
      if (this.qlist.qlistItems.length) {
        const qlistitem = this.qlist.qlistItems.find(el => el.id === id)
        if (qlistitem) {
          const idxCurrent = this.qlist.qlistItems.indexOf(qlistitem)
          const idxNext = idxCurrent === this.qlist.qlistItems.length - 1 ? 0 : idxCurrent + 1
          if (idxNext >= 0 && idxNext < this.qlist.qlistItems.length) {
            this.jumpTo(this.qlist.qlistItems[idxNext].id)
          }
        }
      }
    },
    async merge () {
      const lst = await dbutils.dbGetQlist(this.qlistId)
      if (lst) {
        this.qlist = lst
      }
      await dbutils.dbSetQlist(this.qlist)
      this.$forceUpdate()
    }
  }
}

</script>

<style scoped>

@media only screen and (min-width: 1024px) {
.ctrl-cont {
  margin-top: 0.5rem;
  padding: 1rem;
  border: 1px dashed grey;
  width: 52rem;
  border-radius: 5px;
}
}

.qlist-pos {
  margin-top: -0.2rem;
}

.plus-pos {
  margin-left: 0.6rem;
}

</style>
