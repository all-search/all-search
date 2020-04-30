<template>
  <aside>
    <logo/>
  </aside>
</template>

<script>
import logo from '../components/logo.vue'

export default {
  name: 'as-sidebar',
  components: {
    logo
  }
}
</script>

<style>
  body {
    margin-right: 150px;
  }
</style>
