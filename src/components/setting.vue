<template>
  <el-drawer
    title="设置"
    size="240px"
    :visible="visible"
    direction="rtl"
    @close="close">
    <div class="form">
      <p class="label">导航栏位置</p>
      <div class="setting-block">
        <div class="setting-item"
             @click="changeMenu('sideMenu')">
          <i class="el-icon-check"
             v-show="layout === 'sideMenu'">
          </i>
          <img src="../assets/sideMenu.svg" alt="">
        </div>
        <div class="setting-item"
             @click="changeMenu('topMenu')">
          <i class="el-icon-check"
             v-show="layout === 'topMenu'">
          </i>
          <img src="../assets/topMenu.svg" alt="">
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script>

export default {
  name: 'setting',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // layout: ''
    }
  },
  computed: {
    layout () {
      return this.$route.query.layout || 'sideMenu'
    }
  },
  mounted () {
    // this.layout = getQueryString('layout') || 'sideMenu'
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    changeMenu (value) {
      const { layout, ...rest } = this.$route.query
      this.$router.push({
        path: this.$route.path,
        query: {
          ...rest,
          layout: value
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  .form {
    padding: 24px;
    min-height: 100%;
  }

  .label {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .setting-block {
    display: flex;
  }

  .setting-item {
    position: relative;
    padding-right: 15px;
    .el-icon-check {
      color: #1990fc;
      position: absolute;
      top: 40%;
      left: 30%;
    }
    img {
      width: 48px;
    }
  }
</style>
