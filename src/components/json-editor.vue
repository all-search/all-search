<template>
  <div class="json-editor">
    <div class="editor-toolbar">
      <el-button
        size="small"
        @click="format">
        格式化
      </el-button>
      <el-button
        size="small"
        @click="exportToClipboard">
        复制配置
      </el-button>
      <el-button
        size="small"
        @click="importFormClipboard">
        从剪贴板导入
      </el-button>
      <span class="toolbar-spacer" />
      <el-button
        size="small"
        type="danger"
        plain
        @click="reset">
        恢复默认
      </el-button>
      <el-button
        size="small"
        type="success"
        @click="save">
        保存
      </el-button>
    </div>
    <div ref="jsoneditor" class="editor-body"></div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'
import { ElMessage, ElMessageBox } from 'element-plus'
import clipboard from '../util/clipboard'

export default {
  name: 'json-editor',
  props: {
    value: {
      type: [Object, Array]
    }
  },
  emits: ['reset', 'save', 'change'],
  setup (props, ctx) {
    const jsoneditor = ref(null)
    let instance = null
    let changeTimer = null
    onMounted(() => {
      // create the editor
      const container = jsoneditor.value
      const options = {
        modes: [
          'code',
          'tree',
          'preview'
        ],
        // 内容一变就回传给父组件，父组件才能算出「有未保存的修改」
        onChange () {
          clearTimeout(changeTimer)
          changeTimer = setTimeout(() => {
            if (!instance) return
            try {
              ctx.emit('change', instance.get())
            } catch {
              // 编辑中间态可能不是合法 JSON，忽略即可
            }
          }, 200)
        },
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
          // 父组件是我们自己 onChange 喂回去的，内容一样就别 set 了，
          // 否则每次输入都会被 set 一次，光标跳到开头
          try {
            if (JSON.stringify(instance.get()) === JSON.stringify(newVal)) return
          } catch {
            // 内容非法时直接覆盖
          }
          instance.set(newVal)
        }, {
          deep: true,
          immediate: true
        })
    })
    onBeforeUnmount(() => clearTimeout(changeTimer))

    function reset () {
      ElMessageBox.confirm(
        '会丢弃当前编辑的所有内容并恢复为默认搜索引擎列表，确定继续吗？',
        '恢复默认',
        { type: 'warning', confirmButtonText: '恢复默认', cancelButtonText: '取消' }
      ).then(() => {
        ctx.emit('reset')
      }).catch(() => {})
    }

    /** 把当前内容按 2 空格缩进重排；内容非法时给出具体报错 */
    function format () {
      let parsed
      try {
        parsed = instance.get()
      } catch (err) {
        ElMessage.error(`格式化失败：${err.message}`)
        return
      }
      instance.setText(JSON.stringify(parsed, null, 2))
      if (instance.getMode && instance.getMode() === 'tree') {
        instance.setMode('code')
      }
      ElMessage.success('已格式化')
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
          icon: child.icon || '',
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

    function jsonParse (val) {
      if (val) {
        if (typeof val !== 'string') {
          return val
        } else {
          try {
            return JSON.parse(val)
          } catch (e) {
            return null
          }
        }
      }
      return null
    }

    function importFormClipboard () {
      navigator.clipboard
        .readText()
        .then(value => {
          const json = jsonParse(value)
          if (json) {
            ctx.emit('change', json)
            ElMessage.success('导入成功')
          } else {
            ElMessage.error('获取到的网址格式有误')
          }
        })
        .catch((v) => {
          ElMessage.error('获取剪贴板失败: ', v)
        })
    }

    function exportToClipboard () {
      // 复制编辑器里的当前内容，而不是外部传入的 props（可能已经改过还没保存）
      let text
      try {
        text = JSON.stringify(instance.get(), null, 2)
      } catch (e) {
        ElMessage.error('当前内容不是合法 JSON，无法复制')
        return
      }
      clipboard(text)
      ElMessage.success('已复制当前配置到剪贴板')
    }

    return {
      jsoneditor,
      reset,
      format,
      save,
      exportToClipboard,
      importFormClipboard
    }
  }
}
</script>

<style lang="scss" scoped>
.json-editor {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  flex: none;
  padding: 10px 0;

  .toolbar-spacer {
    flex: 1;
  }
}

.editor-body {
  flex: 1;
  min-height: 320px;
  margin-bottom: 16px;
  border-radius: 6px;
  overflow: hidden;
}
</style>

<style lang="scss">
/* jsoneditor / ace 自带亮色主题，深色模式下单独压一层暗色，避免整块刺眼 */
html.dark {
  .ace-jsoneditor.ace_editor {
    color: #d4d4d4;
    background-color: #1e1e1e;
  }

  .ace-jsoneditor .ace_scroller {
    background-color: #1e1e1e;
  }

  .ace-jsoneditor .ace_print-margin {
    background: #2a2a2a;
  }

  .ace-jsoneditor .ace_gutter {
    color: #858585;
    background-color: #252526;
  }

  .ace-jsoneditor .ace_gutter-active-line {
    background-color: #2a2d2e;
  }

  .ace-jsoneditor .ace_marker-layer .ace_active-line {
    background-color: #2a2d2e;
  }

  .ace-jsoneditor .ace_marker-layer .ace_selection {
    background-color: #264f78;
  }

  .ace-jsoneditor .ace_cursor {
    color: #d4d4d4;
  }

  .ace-jsoneditor .ace_variable {
    color: #9cdcfe;
  }

  .ace-jsoneditor .ace_string {
    color: #ce9178;
  }

  .ace-jsoneditor .ace_constant.ace_numeric {
    color: #b5cea8;
  }

  .ace-jsoneditor .ace_keyword {
    color: #569cd6;
  }

  .jsoneditor-statusbar {
    color: #9d9d9d;
    background-color: #252526;
    border-top-color: #3c3c3c;
  }

  /* 只改主工具条，右键菜单是白底，不能被一起压暗 */
  .jsoneditor > .jsoneditor-menu {
    background-color: #2d2d30;
    border-bottom-color: #3c3c3c;
  }

  .jsoneditor > .jsoneditor-menu .jsoneditor-modes,
  .jsoneditor > .jsoneditor-menu .jsoneditor-poweredBy {
    color: #d4d4d4;
  }
}
</style>
