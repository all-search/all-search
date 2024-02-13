<template>
  <jsonEditor
    :value="localSites"
    @reset="reset"
    @save="save"
    @change="change"/>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
import jsonEditor from '../components/jsonEditor'
import { setStorage } from '../util/storage'
import sites from '../config/sites'
import useSites from '../components/useSites'
import { ref } from 'vue'

export default {
  name: 'edit',
  components: {
    jsonEditor
  },
  setup () {
    const localSites = ref([])

    function init () {
      const { sites } = useSites()
      localSites.value = sites.value
    }

    function reset () {
      ElMessageBox.confirm('重置操作将还原所有网址数据，确定要重置吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const localSites = JSON.parse(JSON.stringify(sites))
        localSites.value = localSites.map(item => ({
          ...item,
          nameZhBackup: item.nameZh
        }))
        ElMessage.success('重置成功')
      })
    }

    function save (val) {
      localSites.value = val
      setStorage('sites', val)
      ElMessage.success('保存成功')
    }

    function change (val) {
      localSites.value = val
    }

    init()

    return {
      localSites,
      reset,
      save,
      change
    }
  }
}
</script>
