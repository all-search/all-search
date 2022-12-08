<template>
  <as-dialog
    v-model:visible="localVisible">

  </as-dialog>
</template>

<script>
import { computed } from 'vue'
import asDialog from './dialog'

export default {
  name: 'main-dialog',
  components: {
    asDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  setup (props, ctx) {
    const localVisible = computed({
      get: () => props.visible,
      set: value => {
        ctx.emit('update:visible', value)
      }
    })
    return {
      localVisible
    }
  }
}
</script>

<style scoped>

</style>
