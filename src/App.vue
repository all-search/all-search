<template>
  <div id="app">
    <tab-header
      :value="current"
      @search="search"
      @menu-click="menuClick"/>
    <div class="container">
      <sideBar
        :value="current"
        :keyword="keyword"
        :is-collapse="isCollapse"
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
import { tabs } from './config/sites'
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
      // showHeader: false,
      showSwUpdate: false,
      keyword: '',
      tabs: tabs,
      isCollapse: true,
      drawer: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  watch: {
    current (val) {
      const i = this.tabs.findIndex(site => site.name === val)
      if (i === -1) {
        this.menuClick(this.tabs[0])
      }
    }
  },
  computed: {
    current () {
      return this.$route.query.s || ''
    },
    showHeader () {
      return this.$route.query.layout === 'topMenu'
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
            ...this.$route.query,
            s: tabs[0].name,
            k: this.keyword
          }
        })
      }
    },
    menuClick (item) {
      this.$router.push({
        path: '/',
        query: {
          ...this.$route.query,
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
