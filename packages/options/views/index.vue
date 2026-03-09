<template>
  <section class="container">
    <form class="search-form">
      <input
        class="search-input"
        type="search"
        maxlength="100"
        autocomplete="off"
        autocapitalize="off"
        autocorrect="off">
      <span
        class="search-reset">
        <i class="el-icon-menu"></i>
      </span>
      <button
        class="search-submit"
        type="submit">
        <i class="el-icon-search"></i>
      </button>
    </form>
  </section>
</template>

<script>

export default {
  name: 'index',
  mounted () {
    this.getBindImg()
  },
  methods: {
    getBindImg () {
      this.$fetch('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1')
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  $primary: #505050;

  .container {
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 37.5rem;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
  }

  .search-form {
    position: relative;
  }

  .search-reset {
    top: 0;
    bottom: 0;
    right: 3.375rem;
    margin: auto 0;
    padding-left: .625rem;
    padding-right: 1.125rem;
    text-align: center;
    color: $primary;
    cursor: pointer;
    visibility: hidden;
    background: 0 0;
    position: absolute;
  }

  .search-input {
    width: 100%;
    height: 50px;
    font-family: inherit;
    font-size: inherit;
    padding: 0 10px;
    color: rgba(0, 0, 0, .69);
    background: #efefef;
    border: none;
    border-radius: 3px;
    appearance: none;
    &:focus, &:hover, &:active {
      outline: 0;
    }
  }

  .search-submit {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 60px;
    border-radius: 0 3px 3px 0;
    .el-icon-search {
      font-size: 24px;
      color: #666;
    }

    &:hover {
      background-color: $primary;
      .el-icon-search {
        color: #fff;
      }
    }
  }

  button, input[type=button], input[type=reset], input[type=submit] {
    cursor: pointer;
    border: none;
    color: #fff;
    appearance: none;
  }
</style>
