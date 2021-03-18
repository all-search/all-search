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
import { ref } from 'vue'
import { getSession, setSession } from '../util'
import store from '../util/store'

// const options = [
//   { label: '竖向', value: 'vertical' },
//   { label: '横向', value: 'horizontal' }
// ]

export default {
  name: 'setting',
  setup () {
    const mode = ref(getSession('mode') || 'horizontal')
    const changeMode = (value) => {
      setSession('mode', value)
      mode.value = value
    }
    return {
      mode,
      tmVersion: store.tmVersion,
      changeMode
    }
  }
}
</script>
<style>

</style>
