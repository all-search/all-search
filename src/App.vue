<template>
  <router-view/>
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
  }
</style>
