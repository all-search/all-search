<template>
  <asDialog :visible="visible"></asDialog>
</template>

<script>
import { onKeyDown } from './onkeydown.js'
import asDialog from './dialog.vue'

export default {
  name: 'search-dialog',
  components: {
    asDialog
  },
  setup () {
    const { visible } = onKeyDown()
    return {
      visible
    }
  }
}
</script>
