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
import sites from '../config/sites'
import Url from 'url'

export default {
  name: 'Index',
  computed: {
    url () {
      // eslint-disable-next-line
      return Url.parse(this.site.src)
    },
    src () {
      if (this.keyword !== '') {
        return this.site.src.replace('{keyword}', this.keyword)
      }
      return `${this.url.protocol}//${this.url.host}`
    },
    keyword () {
      return this.$route.query.k || ''
    },
    current () {
      return this.$route.query.s || ''
    },
    site () {
      const index = sites.findIndex(site => site.name === this.current)
      if (index > -1) {
        return sites[index]
      } else {
        return sites[0]
      }
    }
  },
  data () {
    return {}
  },
  methods: {

  }
}
</script>

<style scoped>
  #frame {
    display: block; /* iframes are inline by default */
    border: none; /* Reset default border */
    height: 100vh; /* Viewport-relative units */
    width: 100%;
  }
</style>
