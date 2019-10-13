<template>
  <div id="app">
    <el-container>
      <el-header
        id="header"
        height="0px"/>
      <el-container>
        <sideBar
          :value="current"
          :keyword="keyword"
          :is-collapse="isCollapse"
          @menu-click="menuClick"
          @changeCollapse="changeCollapse"
          @search="search"
        />
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <SW-update-popup/>
  </div>
</template>

<script>
import SWUpdatePopup from './components/SWUpdatePopup'
import sites from './config/sites'
import sideBar from './components/sideBar'
import { getQueryString } from './util/index'

export default {
  name: 'App',
  components: {
    SWUpdatePopup,
    sideBar
  },
  data () {
    return {
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
        this.handleClick(this.sites[0])
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

    .el-header {
      width: 100%;
      position: fixed;
      top: 0;
      background-color: #fff;
      border-bottom: 1px #ccc solid;
    }

    .el-tabs__header {
      margin: 0;
    }

    .el-main {
      padding: 0;
    }

    .search {
      width: 160px;
      float: left;
      margin-right: 20px;
      z-index: 1;
      top: 50%;
      transform: translateY(-50%);
    }

    .el-tabs {

    }
  }
</style>
