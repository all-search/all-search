<template>
  <div ref="jsoneditor" style="height: calc(100vh - 130px);"></div>
  <div class="fixed-footer">
    <div class="btn-container">
      <el-button
        size="small"
        type="primary"
        @click="reset">
        重置
      </el-button>
      <el-button
        size="small"
        type="success"
        @click="save">
        保存
      </el-button>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'
import { ElMessage } from 'element-plus'
import { formatSites } from '../util/sites'

export default {
  name: 'jsonEditor',
  props: {
    value: {
      type: [Object, Array]
    }
  },
  emits: ['reset', 'save'],
  setup (props, ctx) {
    const jsoneditor = ref(null)
    let instance = null
    onMounted(() => {
      // create the editor
      const container = jsoneditor.value
      const options = {
        modes: [
          'code',
          'tree',
          'preview'
        ],
        onValidate (json) {
          const errors = []
          if (!Array.isArray(json)) {
            errors.push({
              path: [],
              message: '根节点必须是数组'
            })
          }
          json.forEach((item, i) => {
            if (!item.name) {
              errors.push({
                path: [i],
                message: '分类对象中的name字段为必填项'
              })
            }
            if (!item.nameZh) {
              errors.push({
                path: [i],
                message: '分类对象中的nameZh字段为必填项'
              })
            }
            if (!Array.isArray(item.list)) {
              errors.push({
                path: [i],
                message: '分类的list字段必须为数组类型'
              })
            } else {
              item.list.forEach((urlItem, j) => {
                if (!urlItem.nameZh) {
                  errors.push({
                    path: [i, 'list', j],
                    message: '网址的nameZh字段为必填项'
                  })
                }
                if (!urlItem.url) {
                  errors.push({
                    path: [i, 'list', j],
                    message: '网址的url字段为必填项'
                  })
                }
              })
            }
          })
          return errors
        }
      }
      instance = new JSONEditor(container, options)

      // set json
      watch(
        () => props.value,
        newVal => {
          instance.set(newVal)
        }, {
          deep: true,
          immediate: true
        })
    })

    function reset () {
      ctx.emit('reset')
    }

    function formatSites (data) {
      if (!Array.isArray(data)) {
        return []
      }
      return data.map(item => ({
        nameZh: item.nameZh,
        name: item.name,
        data: item.data,
        list: item.list.map(child => ({
          nameZh: child.nameZh,
          url: child.url,
          data: child.data
        }))
      }))
    }

    function save () {
      instance.validate().then(res => {
        if (res.length !== 0) {
          return Promise.reject(Error('当前数据不符合格式规范'))
        } else {
          const updatedJson = instance.get()
          ctx.emit('save', formatSites(updatedJson))
        }
      }).catch(err => {
        ElMessage.error(err.message)
      })
    }

    return {
      jsoneditor,
      reset,
      save
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: right;
  width: 100%;

  .btn-container {
    box-shadow: 0 -2px 8px #f0f1f2;
    margin-left: 220px;
    margin-right: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 3px 3px 0 0;
  }
}
</style>
