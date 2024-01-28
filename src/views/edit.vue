<template>
  <jsonEditor
    :value="localSites"
    @reset="reset"
    @save="save"
    @change="change"/>
</template>

<script>
import jsonEditor from '../components/jsonEditor'
import { setStorage } from '../util/storage'
import { initSites } from '../util/sites'
import sites from '../config/sites'

export default {
  name: 'edit',
  components: {
    jsonEditor
  },
  data () {
    return {
      localSites: initSites()
    }
  },
  methods: {
    reset () {
      this.$confirm('重置操作将还原所有网址数据，确定要重置吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const localSites = JSON.parse(JSON.stringify(sites))
        this.localSites = localSites.map(item => ({
          ...item,
          nameZhBackup: item.nameZh
        }))
        this.$message.success('重置成功')
      })
    },
    save (val) {
      this.localSites = val
      setStorage('sites', val)
      this.$message.success('保存成功')
    },
    change (val) {
      this.localSites = val
    }
  }
}
</script>
