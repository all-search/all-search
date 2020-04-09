<template>
  <a class="as-title"
     href="https://github.com/endday/all-search"
     target="_blank"
  >
    <p class="as-title-inner">
      All Search
    </p>
  </a>
</template>

<script>
export default {
  name: 'logo'
}
</script>

<style lang="scss">
  @import "../assets/common";

  .as-title {
    text-decoration: none;
    padding: 0;
    margin: 0;
    
    .as-title-inner {
      font-size: 18px;
      width: 120px;
      height: $height;
      line-height: $height;
      font-weight: 600;
      color: #1990fc;
      margin: 0;
      text-align: center;
      cursor: pointer;
    }
  }
</style>
