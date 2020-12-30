<template>
  <el-container
    class="container">
    <el-header
      class="header">
      <a id="logo"
         href="/all-search">
        全搜 All-Search
      </a>
      <div class="header-bd"></div>
      <a class="gh-btn"
         href="https://github.com/endday/all-search">
        <span class="gh-icon"/>
      </a>
    </el-header>
    <el-scrollbar class="page-container">
      <el-container>
        <side-bar/>
        <el-main class="page-mainer">
          <version-alert/>
          <router-view/>
          <el-footer></el-footer>
        </el-main>
      </el-container>
    </el-scrollbar>
  </el-container>
</template>

<script>
import versionAlert from '../components/version-alert'
import sideBar from '../components/side-bar'

export default {
  name: 'config',
  components: {
    versionAlert,
    sideBar
  }
}
</script>

<style lang="scss" scoped>
  #logo {
    height: 64px;
    line-height: 64px;
    float: left;
    font-size: 18px;
  }

  .container {
    background: #f7f7f9;
  }

  .header {
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px #f0f1f2;
    background-color: #fff;
    position: relative;
    z-index: 10;
    .ant-menu-horizontal {
      border-bottom: none;
    }
    .header-bd {
      flex: 1;
    }
  }

  .layout {
    padding-top: 40px;
    background-color: #fff;
  }

  .menu {
    height: 62px;
    line-height: 62px;
    text-align: right;
  }

  .content {
    /*margin: 24px 16px;*/
    padding: 0 24px;
    background: #fff
  }

  .page-container {
    height: calc(100vh - 43px);
  }

  .page-mainer {
    margin-left: 200px;
  }

  .footer {
    text-align: center;
    background: #fff;
  }

  .gh-btn {
    margin: 4px;
    cursor: pointer;
    .gh-icon {
      display: block;
      width: 20px;
      height: 20px;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMTIgMTIgNDAgNDAiPjxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5IDAgOC40IDUuNSAxNS41IDEzIDE4IDEgLjIgMS4zLS40IDEuMy0uOXYtMy4yYy01LjMgMS4xLTYuNC0yLjYtNi40LTIuNi0uOS0yLjEtMi4xLTIuNy0yLjEtMi43LTEuNy0xLjIuMS0xLjEuMS0xLjEgMS45LjEgMi45IDIgMi45IDIgMS43IDIuOSA0LjUgMi4xIDUuNSAxLjYuMi0xLjIuNy0yLjEgMS4yLTIuNi00LjItLjUtOC43LTIuMS04LjctOS40IDAtMi4xLjctMy43IDItNS4xLS4yLS41LS44LTIuNC4yLTUgMCAwIDEuNi0uNSA1LjIgMiAxLjUtLjQgMy4xLS43IDQuOC0uNyAxLjYgMCAzLjMuMiA0LjcuNyAzLjYtMi40IDUuMi0yIDUuMi0yIDEgMi42LjQgNC42LjIgNSAxLjIgMS4zIDIgMyAyIDUuMSAwIDcuMy00LjUgOC45LTguNyA5LjQuNy42IDEuMyAxLjcgMS4zIDMuNXY1LjJjMCAuNS40IDEuMSAxLjMuOSA3LjUtMi42IDEzLTkuNyAxMy0xOC4xIDAtMTAuNS04LjUtMTktMTktMTl6Ii8+PC9zdmc+);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
</style>
