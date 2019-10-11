<script>
let refreshing = false

export default {
  name: 'SWUpdatePopup',
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
      this.$notify({
        title: '提示',
        message: '网站内容有更新，点击更新',
        duration: 0,
        onClick: () => {
          this.handleSkipWaiting()
        }
      })
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
      if (!registration) {
        return Promise.resolve()
      }
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
      this.$notify({
        title: '提示',
        message: '网站内容有更新，点击更新',
        duration: 0,
        onClick: () => {
          this.handleRefresh()
        }
      })
    },
    handleRefresh () {
      window.location.reload(true)
    }
  }
}
</script>
