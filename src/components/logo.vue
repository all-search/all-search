<script setup lang="ts">
import { isMobile } from '../util'

defineProps<{
  direction?: 'horizontal' | 'vertical'
}>()

const mobile = isMobile()
</script>

<template>
  <a
    v-if="!mobile"
    class="as-title"
    href="https://github.com/all-search/all-search"
    target="_blank"
    :class="`as-title-${direction}`">
    <p class="as-title-inner">
      All Search
    </p>
  </a>
</template>

<style lang="scss">
@use "../assets/common" as *;

@media screen and (max-width: 750px) {
  .as-title-horizontal {
    display: none;
  }
}

.as-title-horizontal {
  min-width: 90px;
  margin: 0 10px;
}

.as-title-vertical {
  width: 100%;
}

.as-title {
  text-decoration: none !important;
  padding: 0;
  margin: 0;
  color: var(--as-primary-color);
}

.as-title-inner {
  padding: 0;
  font-size: 17px;
  height: $height;
  line-height: $height;
  font-weight: 600;
  color: var(--as-primary-color);
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
</style>
