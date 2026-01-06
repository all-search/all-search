<script setup lang="ts">
defineProps<{
  name?: string
}>()
</script>

<template>
  <svg class="as-icon as-menu-item-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<style lang="scss">
.as-icon {
  font-size: 20px;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  margin: 0.25px 4px 0 0;
  display: inline-block;
}
</style>
