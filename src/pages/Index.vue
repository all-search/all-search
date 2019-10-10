<template>
  <div class="home">
    <iframe
      id="frame"
      width="100%"
      height="100%"
      :src="src"
      frameborder="0"
    >
    </iframe>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Index',
  props: {
    link: {
      type: String,
      default: ''
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  computed: {
    src () {
      return this.link.replace('{keyword}', this.keyword)
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.changeFrameHeight()
  },
  methods: {
    changeFrameHeight () {
      const ifm = document.getElementById('frame')
      const header = document.getElementById('header')
      ifm.height = document.documentElement.clientHeight - header.clientHeight
      window.onresize = () => {
        return (() => {
          const ifm = document.getElementById('frame')
          ifm.height = document.documentElement.clientHeight - header.clientHeight
        })()
      }
    }
  }
}
</script>

<style scoped>
  .home {

  }
</style>
