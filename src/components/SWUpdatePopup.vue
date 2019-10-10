<template>
  <div>
    <div
      class="sw-update-dialog"
      v-if="showSwUpdate"
    >
      <button @click="handleSkipWaiting">
        更新
      </button>
    </div>
    <div
      class="sw-update-dialog"
      v-if="showSwUnregister"
    >
      <button @click="handleRefresh">
        更新
      </button>
    </div>
  </div>
</template>

<script>
let refreshing = false

export default {
  name: 'SWUpdatePopup',
  data () {
    return {
      showSwUpdate: false,
      showSwUnregister: false
    }
  },
  mounted () {
    this.addListener()
  },
  methods: {
    addListener () {
      window.addEventListener('sw.update', this.handleUpdate)
      window.addEventListener('sw.unregister', this.handleUnregister)
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('sw.update', this.handleUpdate)
        window.removeEventListener('sw.unregister', this.handleUnregister)
      })
    },
    handleUpdate () {
      this.showSwUpdate = true
    },
    handleSkipWaiting () {
      navigator.serviceWorker.getRegistration()
        .then(reg => this.skipWaiting(reg))
        .then(() => {
          window.location.reload(true)
        })
    },
    handleSWChange () {
      if (refreshing) {
        return
      }
      refreshing = true
      window.location.reload()
    },
    skipWaiting (registration) {
      const worker = registration.waiting
      if (!worker) {
        return Promise.resolve()
      }
      // 这里是参考vue-press的写法
      // 利用MessageChannel返回一个promise
      return new Promise((resolve, reject) => {
        const channel = new MessageChannel()
        channel.port1.onmessage = (event) => {
          if (event.data.error) {
            reject(event.data.error)
          } else {
            resolve(event.data)
          }
        }
        worker.postMessage({ type: 'skip-waiting' }, [channel.port2])
      })
    },
    handleUnregister () {
      this.showSwUnregister = true
    },
    handleRefresh () {
      window.location.reload(true)
    }
  }
}
</script>

<style scoped>
  .sw-update-dialog {
    position: fixed;
    bottom: 50px;
    right: 50px;
    background-color: #fff;
    border: 1px solid #42b983;
  }

  .sw-update-dialog button {
    padding: 6px 10px;
    margin: 15px 30px;
    font-size: 16px;
  }
</style>
