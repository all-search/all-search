<template>
  <router-view class="all-search-config"/>
</template>

<script>
export default {
  name: 'App',
  components: {},
  setup () {

  }
}
</script>

<style lang="scss">
  /* 统一盒模型：配置页到处是「定宽 + 内边距」的卡片与条，content-box 会让实际宽度多出内边距 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent
  }

  body, dl, dd, h1, h2, h3, h4, h5, h6, p, form {
    margin: 0;
  }

  ol, li, ul {
    margin: 0;
    padding: 0;
  }

  body {
    height: 100vh;
    overflow: hidden;
    position: fixed;
    width: 100vw;
    background: #f5f6f8;
  }

  html.dark body {
    background: #141414;
  }
</style>
