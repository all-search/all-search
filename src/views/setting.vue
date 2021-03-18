<template>
  <el-card shadow="never">
    <el-form
      ref="form"
      label-width="80px">
      <el-form-item label="应用版本">
        <p v-text="tmVersion"></p>
      </el-form-item>
      <el-form-item label="菜单方向">
        <el-radio-group
          v-model="mode"
          @change="changeMode">
          <el-radio
            v-for="item in options"
            :key="item.value"
            :label="item.value">
            {{item.label}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { reactive, ref } from 'vue'
import { getSession, setSession } from '../util'
import store from '../util/store'

export default {
  name: 'setting',
  setup () {
    const mode = ref(getSession('mode') || 'horizontal')
    const options = reactive([
      { label: '竖向', value: 'vertical' },
      { label: '横向', value: 'horizontal' }
    ])
    const changeMode = (value) => {
      setSession('mode', value)
      mode.value = value
    }
    return {
      mode,
      tmVersion: store.tmVersion,
      options,
      changeMode
    }
  }
}
</script>
<style>

</style>
