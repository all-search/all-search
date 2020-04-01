<template>
  <div class="as-setting">
    <div v-for="(category, i) in engines"
         :key="i"
         class="as-setting-category">
      <p class="as-category-name" v-text="category.nameZh"></p>
      <checkbox
        class="as-setting-menu"
        v-for="(menu, j) in category.list"
        :key="j">
        {{menu.name}}
      </checkbox>
    </div>
  </div>
</template>

<script>
import engines from '../config/engines/index.js'
import checkbox from '../components/checkbox.vue'

export default {
  name: 'setting',
  components: {
    checkbox
  },
  data () {
    return {
      engines
    }
  }
}
</script>

<style lang="scss">
  .as-setting {
    display: flex;
    flex-wrap: wrap;
  }

  .as-setting-category {
    flex: 20%;
    margin-bottom: 20px;
  }

  .as-category-name {
    font-size: 16px;
    color: #666;
    margin: 0 0 10px;
  }

  .as-setting-menu {
    margin: 0 0 6px;
  }
</style>
