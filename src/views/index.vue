<template>
  <section class="container">
    <input
      class="search_keywords"
      name="q"
      type="search"
      tabindex="1"
      autocomplete="off"
      autocapitalize="off"
      autocorrect="off">
  </section>
</template>

<script>

export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 18%;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 37.5rem;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
  }

  .search_keywords {
    width: 100%;
    height: 2.125rem;
    font-family: inherit;
    font-size: inherit;
    padding: 0 .875rem;
    color: rgba(0, 0, 0, .69);
    background: rgba(0, 0, 0, .05);
    border: none;
    border-radius: .125rem;
    -webkit-appearance: none;
    &:focus, &:hover, &:active {
      outline: 0;
    }
  }
</style>
