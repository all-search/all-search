<template>
  <el-drawer
    title="我是标题"
    :visible="visible"
    direction="rtl"
    @close="close">
    <div>
      <el-radio-group
        v-model="layout"
        @change="changeMenu">
        <el-radio
          label="sideMenu">
          <img src="../assets/sideMenu.svg" alt="">
        </el-radio>
        <el-radio
          label="topMenu">
          <img src="../assets/topMenu.svg" alt="">
        </el-radio>
      </el-radio-group>
    </div>
  </el-drawer>
</template>

<script>
import { getQueryString } from '../util/index'

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
      layout: ''
    }
  },
  mounted () {
    this.layout = getQueryString('layout') || 'sideMenu'
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    changeMenu (value) {
      console.log(value)
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

<style scoped>

</style>
