<template>
  <div>
    <div class="w-full flex flex-wrap px-4 pb-10">
      <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-48" @click="createNewQlist">
        <div class="bg-white relative mx-4 mt-4 h-40 select-none cursor-pointer rounded-lg shadow-lg hover:bg-tertiary-500 transition duration-500 ease-in-out">
          <div class="flex flex-col px-4 py-5 sm:p-6 absolute inset-0 items-center justify-center">
            <div>
            <p class="text-center text-lg font-medium">new qlist</p>
            </div>
            <div class="mt-4">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <w-card
        v-for="(qlist, index) in qlists"
        :key="`qlist-${index}`"
        :qlist="qlist"
        :openCallback="openQlist"
        :shareCallback="shareQlist"
        :renameCallback="renameQlist"
        :duplicateCallback="duplicateQlist"
        :deleteCallback="confirmDelete"
        @click.native="openQlist(qlist)">
      </w-card>
      <!--div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-48" @click="goToQlist">
      </div-->
    </div>
    <!-- input modal begin -->
    <div v-if="showInputModal || showRenameModal">
      <div class="z-20 fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center select-none">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="z-20 bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <button type="button" @click="cancelInputModal" class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" aria-label="Close">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="sm:flex sm:items-start">
            <div class="pt-4 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 pb-5" id="modal-headline">
                enter new qlist name
              </h3>
              <div class="mt-2 max-w-full">
                <div class="mt-1 relative rounded-md shadow-sm mr-16">
                  <input  type="text"
                          id="idNewQlistInput"
                          autofocus
                          spellcheck="false"
                          autocomplete="off"
                          autocorrect="off"
                          autocapitalize="off"
                          v-model="qlistName"
                          class="w-full form-input border-gray-300 font-medium block sm:text-sm sm:leading-5 focus:shadow-outline-green" />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse pt-1">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="button"  @click="okInputModal" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary-600 text-base leading-6 font-semibold text-white shadow-sm hover:bg-primary-400 focus:outline-none focus:border-primary-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                ok
              </button>
            </span>
            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button @click="cancelInputModal" type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- input modal end --->
    <!-- share modal begin -->
    <div v-if="showShareModal">
      <div class="z-20 fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center select-none">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="z-20 bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <button type="button" @click="cancelShareModal" class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" aria-label="Close">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="sm:flex sm:items-start">
            <div class="pt-4 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 pb-5" id="modal-headline">
                qlist link to share
              </h3>
              <div class="mt-2 max-w-full">
                <div class="mt-1 relative rounded-md shadow-sm mr-16">
                  <input  type="text"
                          id="idLinkInput"
                          autofocus
                          spellcheck="false"
                          autocomplete="off"
                          autocorrect="off"
                          autocapitalize="off"
                          v-model="qlistLink"
                          class="w-full form-input border-gray-300 font-medium block sm:text-sm sm:leading-5 focus:shadow-outline-green" />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="button"  @click="okShareModal" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-primary-400 focus:outline-none focus:border-primary-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Ok
              </button>
            </span>
            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button @click="copyToClipboard" type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Copy
              </button>
            </span>
            <span v-if="copyMessage !== ''" class="flex w-full sm:ml-3 sm:w-auto mx-3 pt-2 italic font-hairline">
              {{ copyMessage }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- share modal end --->
    <!-- yesno modal begin --->
    <div v-if="showYesNoModal">
      <div class="z-20 select-none fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="z-20 relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <button type="button" @click="cancelYesNoModal" class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" aria-label="Close">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left py-2">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                delete qlist
              </h3>
              <div class="mt-2">
                <p class="text-sm font-semibold leading-5 text-gray-500">
                  are you sure you want to delete this qlist?
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="button" @click="okYesNoModal" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                yes
              </button>
            </span>
            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button type="button" @click="cancelYesNoModal" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                no
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- yesno modal end --->
    <!-- error modal begin --->
    <div v-if="showError">
      <div class="z-20 select-none fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div class="z-20 relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
            <button type="button" @click="okErrorModal" class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" aria-label="Close">
              <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left py-2">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                error
              </h3>
              <div class="mt-2">
                <p class="text-sm font-semibold leading-5 text-gray-500">
                  {{ errorMessage }}
                </p>
                <p class="text-sm font-semibold leading-5 text-gray-500">
                  {{ errorMessageDetail }}
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="button" @click="okErrorModal" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Ok
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- error modal end --->
  </div>
</template>

<script>
import router from '@/router'
import { createID } from '@/utils/utils.js'
import WCard from './WCard.vue'
import { mapActions, mapGetters } from 'vuex'
import * as dbutils from '@/utils/dbutils'

export default {
  name: 'Workspace',
  components: { WCard },
  data () {
    return {
      loader: null,
      qlists: [],
      qlistName: '',
      qlistIdDelete: '',
      qlistIdRename: '',
      qlistLink: '',
      errorMessage: '',
      errorMessageDetail: '',
      showInputModal: false,
      showRenameModal: false,
      showShareModal: false,
      showYesNoModal: false,
      showInfo: false,
      showError: false,
      copyMessage: ''
    }
  },
  watch: {
    showInputModal: function (newValue) {
      if (newValue) {
        setTimeout(() => { document.getElementById('idNewQlistInput').focus() }, 50)
      }
    },
    showRenameModal: function (newValue) {
      if (newValue) {
        setTimeout(() => { document.getElementById('idNewQlistInput').focus() }, 50)
      }
    },
    showShareModal: function (newValue) {
      if (newValue) {
        setTimeout(() => { document.getElementById('idLinkInput').focus() }, 50)
      }
    }
  },
  methods: {
    ...mapActions({
      saveQLists: 'setQListsA'
    }),
    ...mapGetters({
      loadQLists: 'getQLists'
    }),
    createNewQlist () {
      this.showInputModal = true
    },
    async deleteQlist () {
      const qlistDelete = this.qlists.filter(el => { return el.qlistId === this.qlistIdDelete })[0]
      this.qlists = this.qlists.filter(el => { return el.qlistId !== this.qlistIdDelete })

      this.saveQLists(this.qlists)
      await dbutils.dbDeleteQlist(qlistDelete.qlistId)
      this.qlistIdDelete = ''
    },
    confirmDelete (qlistId) {
      this.qlistIdDelete = qlistId
      this.showYesNoModal = true
    },
    cancelInputModal () {
      this.qlistName = ''
      this.showInputModal = false
      this.showRenameModal = false
    },
    async okInputModal () {
      if (this.qlistName.length > 0) {
        if (this.showInputModal) {
          this.showInputModal = false
          const qlist = {}
          qlist.qlistId = createID()
          qlist.qlistName = this.qlistName
          qlist.qlistItems = []
          qlist.qlistChecked = []
          this.qlists.unshift(qlist)
          this.saveQLists(this.qlists)
          await dbutils.dbSetQlist(qlist)
          this.qlistName = ''
          // router.push('/qlist/' + qlist.qlistId)
        } else {
          const qlists = this.loadQLists()
          const qlistRename = qlists.filter(el => { return el.qlistId === this.qlistIdRename })[0]
          qlistRename.qlistName = this.qlistName
          this.saveQLists(qlists)
          await dbutils.dbSetQlist(qlistRename)
          this.qlists = qlists
          this.qlistName = ''
          this.showRenameModal = false
        }
      }
    },
    okShareModal () {
      this.copyMessage = ''
      this.showShareModal = false
    },
    cancelShareModal () {
      this.qlistLink = ''
      this.showShareModal = false
    },
    cancelYesNoModal () {
      this.showYesNoModal = false
    },
    okYesNoModal () {
      this.showYesNoModal = false
      this.deleteQlist()
    },
    okErrorModal () {
      this.showError = false
    },
    modalKeyUp (event) {
      if (event.which === 13) {
        this.showInputModal = false
        this.showRenameModal = false
        this.showError = false
      }
    },
    openQlist (qlist) {
      router.push('/qlist/' + qlist.qlistId)
    },
    shareQlist (qlistId) {
      if (process.env.NODE_ENV === 'development') {
        this.qlistLink = 'http://localhost:8207/qlist/' + qlistId
      } else {
        this.qlistLink = 'http://qlist.vercel.app/qlist/' + qlistId
      }
      this.showShareModal = true
    },
    copyToClipboard () {
      const copyText = document.getElementById('idLinkInput')
      copyText.select()
      document.execCommand('copy')
      copyText.blur()
      this.copyMessage = 'qlist link copied to the clipboard'
      this.$forceUpdate()
    },
    renameQlist (qlistId) {
      this.qlistIdRename = qlistId
      this.qlists = this.loadQLists()
      const qlistRename = this.qlists.filter(el => { return el.qlistId === qlistId })[0]
      this.qlistName = qlistRename.qlistName
      this.showRenameModal = true
    },
    async duplicateQlist (qlistId) {
      this.qlists = this.loadQLists()
      const qlist = this.qlists.filter(el => { return el.qlistId === qlistId })[0]
      const newQlistName = qlist.qlistName + ' (copy)'

      const qlistCopy = {}
      qlistCopy.qlistId = createID()
      qlistCopy.qlistName = newQlistName
      qlistCopy.qlistItems = qlist.qlistItems
      qlistCopy.qlistChecked = qlist.qlistChecked
      await dbutils.dbSetQlist(qlistCopy)

      this.qlists.unshift(qlistCopy)
      this.saveQLists(this.qlists)
    }
  },
  mounted () {
    // this.loader = this.$loading.show()
    this.qlists = this.loadQLists()
    // this.loader.hide()
  },
  created () {
    window.addEventListener('keyup', event => {
      if (this.showInputModal || this.showRenameModal) {
        if (event.key === 'Escape') {
          this.cancelInputModal()
        }
        if (event.key === 'Enter') {
          this.okInputModal()
        }
      } else if (this.showYesNoModal) {
        if (event.key === 'Escape') {
          this.cancelYesNoModal()
        }
        if (event.key === 'Enter') {
          this.okYesNoModal()
        }
      } else if (this.showInfo) {
        if (event.key === 'Escape') {
          this.okInfoModal()
        }
        if (event.key === 'Enter') {
          this.okInfoModal()
        }
      } else if (this.showError) {
        if (event.key === 'Escape') {
          this.okErrorModal()
        }
        if (event.key === 'Enter') {
          this.okErrorModal()
        }
      }
    })
  }
}
</script>
