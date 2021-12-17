<template>
  <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 h-48">
    <div class="bg-white mx-4 mt-4 h-40 select-none cursor-pointer rounded-lg shadow-lg hover:bg-tertiary-500 hover:border-gray-700 transition duration-500 ease-in-out">
      <div class="py-12">
        <p class="mx-4 text-center font-medium overflow-hidden">{{ qlist.qlistName }}</p>
      </div>
      <div class="border-t border-gray-200 mx-6 py-2">
        <div class="flex justify-end items-baseline">
          <button @click.stop="isMenuOn = !isMenuOn" class="relative focus:outline-none">
            <svg width="20" height="20" viewBox="0 0 24 24" class="menuBtn text-gray-800" fill="currentColor">
              <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z"/>
            </svg>
            <div v-if="isMenuOn" class="z-20 absolute origin-top-left left-0 mt-2 -ml-28 w-36 rounded-md shadow-lg cursor-pointer">
              <div class="rounded-md bg-white shadow-xs">
                <div class="-py-20 font-medium" id="section-dropdown">
                  <div class="py-1">
                    <a @click.stop="openQlist()" class="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                      open
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mx-2">
                        <path  fill-rule="evenodd" clip-rule="evenodd" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                      </svg>
                    </a>
                    <a @click.stop="shareQlist()" class="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                      share
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mx-2">
                        <path  fill-rule="evenodd" clip-rule="evenodd" d="M7.859 14.691l-.81.805a1.814 1.814 0 0 1-2.545 0 1.762 1.762 0 0 1 0-2.504l2.98-2.955c.617-.613 1.779-1.515 2.626-.675a.992.992 0 1 0 1.397-1.407c-1.438-1.428-3.566-1.164-5.419.675l-2.98 2.956A3.719 3.719 0 0 0 2 14.244a3.72 3.72 0 0 0 1.108 2.658 3.779 3.779 0 0 0 2.669 1.096c.967 0 1.934-.365 2.669-1.096l.811-.805a.988.988 0 0 0 .005-1.4.995.995 0 0 0-1.403-.006zm9.032-11.484c-1.547-1.534-3.709-1.617-5.139-.197l-1.009 1.002a.99.99 0 1 0 1.396 1.406l1.01-1.001c.74-.736 1.711-.431 2.346.197.336.335.522.779.522 1.252s-.186.917-.522 1.251l-3.18 3.154c-1.454 1.441-2.136.766-2.427.477a.99.99 0 1 0-1.396 1.406c.668.662 1.43.99 2.228.99.977 0 2.01-.492 2.993-1.467l3.18-3.153A3.732 3.732 0 0 0 18 5.866a3.726 3.726 0 0 0-1.109-2.659z"/>
                      </svg>
                    </a>
                    <a @click.stop="renameQlist()" class="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                      rename
                    </a>
                    <a @click.stop="duplicateQlist()" class="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                      duplicate
                    </a>
                    <div class="border-t border-gray-200"></div>
                    <a @click.stop="deleteQlist()" class="group flex items-center px-4 py-2 text-sm leading-5 text-red-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
                      delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button v-if="isMenuOn" @click.stop="isMenuOn = false" tabindex="-1" class="z-10 fixed inset-0 h-full w-full cursor-default" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WCard',
  props: {
    qlist: {
      type: Object,
      required: true
    },
    openCallback: {
      type: Function,
      required: true
    },
    shareCallback: {
      type: Function,
      required: true
    },
    renameCallback: {
      type: Function,
      required: true
    },
    duplicateCallback: {
      type: Function,
      required: true
    },
    deleteCallback: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      isMenuOn: false
    }
  },
  created () {
    const handleEscape = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isMenuOn = false
      }
    }
    document.addEventListener('keydown', handleEscape)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape)
    })
  },
  methods: {
    openQlist () {
      this.isMenuOn = false
      if (this.openCallback) {
        this.openCallback(this.qlist)
      }
    },
    shareQlist () {
      this.isMenuOn = false
      if (this.shareCallback) {
        this.shareCallback(this.qlist.qlistId)
      }
    },
    renameQlist () {
      this.isMenuOn = false
      if (this.renameCallback) {
        this.renameCallback(this.qlist.qlistId)
      }
    },
    duplicateQlist () {
      this.isMenuOn = false
      if (this.duplicateCallback) {
        this.duplicateCallback(this.qlist.qlistId)
      }
    },
    deleteQlist () {
      this.isMenuOn = false
      if (this.deleteCallback) {
        this.deleteCallback(this.qlist.qlistId)
      }
    }
  }
}
</script>

<style>
  .menuBtn:hover {
    border: 1px dotted rgba(0,0,0,0.6 );
  }
</style>
