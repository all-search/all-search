<template>
  <el-card shadow="never">
    <el-form
      ref="form"
      label-width="80px">
      <el-form-item label="应用版本">
        <p v-text="tmVersion"></p>
      </el-form-item>
      <el-form-item label="菜单方向">
        <el-radio v-model="mode" label="horizontal">横向</el-radio>
        <el-radio v-model="mode" label="vertical">竖向</el-radio>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getSession, setSession } from '../util'
import store from '../util/store'
import pkg from '../../package.json'

const options = [
  { label: '竖向', value: 'vertical' },
  { label: '横向', value: 'horizontal' }
]

export default {
  name: 'setting',
  data: () => ({
    tmVersion: store.tmVersion,
    version: pkg.version,
    mode: 'horizontal',
    options
  }),
  mounted () {
    this.mode = getSession('mode') || 'horizontal'
  },
  methods: {
    changeMode (value) {
      setSession('mode', value)
      this.mode = value
    }
  }
}
</script>
<style>

</style>
