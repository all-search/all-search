<template>
  <div>
    <div class="bg"></div>
    <div class="search-container">
      <input
        class="input"
        type="search"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {

  },
  methods: {}
}
</script>

<style scoped>
  .search-container {
    border-radius: 6px;
    background-color: #fff;
    border: 1px #ccc solid;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
    position: fixed;
    top: 50%;
    left: 50%;
    margin: 0;
    padding: 4px;
    transform: translate(-50%, -50%);
  }

  .input {
    height: 36px;
    line-height: 36px;
    margin: 0 10px;
    font-size: 16px;
    border: 0;
    outline: none;
    -webkit-appearance: none;
    width: 400px;
  }

  .bg {
    width: 100vw;
    height: 100vh;
    background: #666 url(https://bing.ioliu.cn/v1/?w=1920&h=1080) no-repeat center;
    background-size: cover;
  }
</style>
