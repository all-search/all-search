<template>
  <label>
    <input type="radio" name="radio">
    <span v-text="label"></span>
  </label>
</template>

<script>
export default {
  name: 'radio',
  props: {
    label: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props) {
    return {}
  }
}
</script>

<style>

</style>
