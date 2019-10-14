<template>
  <div id="app">
    <tab-header
      v-show="showHeader"
      :value="current"
      @menu-click="menuClick"/>
    <div class="container">
      <sideBar
        :value="current"
        :keyword="keyword"
        :is-collapse="isCollapse"
        @menu-click="menuClick"
        @changeCollapse="changeCollapse"
        @search="search"
      />
      <main>
        <router-view/>
      </main>
    </div>
    <SW-update-popup/>
  </div>
</template>

<script>
import tabHeader from './components/header'
import SWUpdatePopup from './components/SWUpdatePopup'
import sites from './config/sites'
import sideBar from './components/sideBar'
import { getQueryString } from './util/index'

export default {
  name: 'App',
  components: {
    tabHeader,
    SWUpdatePopup,
    sideBar
  },
  data () {
    return {
      showHeader: false,
      showSwUpdate: false,
      keyword: '',
      sites: sites,
      isCollapse: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  watch: {
    current (val) {
      const i = this.sites.findIndex(site => site.name === val)
      if (i === -1) {
        this.menuClick(this.sites[0])
      }
    }
  },
  computed: {
    current () {
      return this.$route.query.s || ''
    }
  },
  methods: {
    init () {
      this.keyword = getQueryString('k')
      const site = getQueryString('s')
      if (!site) {
        this.$router.push({
          path: '/',
          query: {
            s: sites[0].name,
            k: this.keyword
          }
        })
      }
    },
    menuClick (item) {
      this.$router.push({
        path: '/',
        query: {
          s: item.name,
          k: this.keyword
        }
      })
    },
    search (keyword) {
      this.keyword = keyword
      this.$router.push({
        path: '/',
        query: {
          ...this.$route.query,
          k: this.keyword
        }
      })
    },
    changeCollapse (value) {
      this.isCollapse = value
    }
  }
}
</script>
<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .container {
    display: flex;
    flex: 1;
    flex-direction: row;
    box-sizing: border-box;
    min-width: 0;
    padding: 0;
  }

  main {
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
  }
</style>
