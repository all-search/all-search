<template>
  <el-scrollbar
    class="side-menu"
    wrapStyle="overflow-x: hidden;">
    <el-aside
      width="200px">
      <el-menu
        router>
        <router-link
          to="sites"
          custom
          active-class="is-active"
          v-slot="{ navigate, route, isActive }">
          <el-menu-item
            :index="route.path"
            :class="[isActive && 'is-active']"
            @click="navigate">
            <i class="el-icon-menu"></i>
            <template #title>网址配置</template>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'asAside'
}
</script>

<style lang="scss">
  .side-menu {
    margin-top: 60px;
    position: fixed;
    top: 0;
    bottom: 0;
    .el-menu {
      min-height: calc(100vh - 60px);
    }
  }
</style>
