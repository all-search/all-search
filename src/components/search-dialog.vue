<template>
  <asDialog :visible="visible"></asDialog>
</template>

<script>
import { onKeyDown } from './onkeydown'
import asDialog from './dialog'

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
