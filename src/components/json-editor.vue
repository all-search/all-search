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
        @click="exportToFile">
        下载 JSON
      </el-button>
      <el-button
        size="small"
        @click="importFormClipboard">
        从剪贴板导入
      </el-button>
      <el-button
        size="small"
        @click="pickFile">
        从文件导入
      </el-button>
      <input
        ref="fileInput"
        class="file-input"
        type="file"
        accept="application/json,.json"
        @change="importFromFile">
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
import { validateSites } from '../util/validateSites'

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
    const fileInput = ref(null)
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
        /**
         * 校验规则与 `util/validateSites` 合一。
         *
         * 以前这里是另一套（要求分类和站点都有 nameZh），而导入走的是 validateSites
         * （只要求 name / list / url）。于是「导入成功 → 点保存被拒」会卡死。
         */
        onValidate (json) {
          const result = validateSites(json)
          if (result.ok) return []
          return [{ path: [], message: result.error || '配置格式不正确' }]
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

    /**
     * 保存前只剔除界面用的 `__uid`，其余字段原样保留。
     *
     * 这里以前是白名单（只留 nameZh/name/data/list 和 nameZh/url/icon/data），
     * 于是手写的 invisible / style / selectors / query / favicon 保存一次就没了——
     * JSON 编辑器本来就是给高级用户改这些字段用的，白名单等于把功能废掉。
     * 与 sites.vue 的 `stripUid` 保持同一语义。
     */
    function formatSites (data) {
      if (!Array.isArray(data)) {
        return []
      }
      return data.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { __uid, ...cate } = item
        return {
          ...cate,
          list: Array.isArray(cate.list)
            ? cate.list.map((child) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { __uid: childUid, ...site } = child
              return { ...site, icon: site.icon || '' }
            })
            : []
        }
      })
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

    /** 读编辑器当前内容；非法 JSON 返回 null 并提示 */
    function currentJson () {
      try {
        return instance.get()
      } catch {
        ElMessage.error('当前内容不是合法 JSON')
        return null
      }
    }

    /**
     * 导入前统一校验形状：形状不对就拒绝，别把用户的存储写坏。
     * 返回 true 表示已 emit change。
     */
    function applyImported (json) {
      const result = validateSites(json)
      if (!result.ok) {
        ElMessage.error(`配置格式不对：${result.error}`)
        return false
      }
      ctx.emit('change', json)
      ElMessage.success(`已导入 ${result.categories} 个分类 / ${result.sites} 个站点，记得保存`)
      return true
    }

    function importFormClipboard () {
      navigator.clipboard
        .readText()
        .then(value => {
          const json = jsonParse(value)
          if (!json) {
            ElMessage.error('剪贴板里不是合法 JSON')
            return
          }
          applyImported(json)
        })
        .catch((v) => {
          ElMessage.error('获取剪贴板失败: ', v)
        })
    }

    function exportToClipboard () {
      // 复制编辑器里的当前内容，而不是外部传入的 props（可能已经改过还没保存）
      const json = currentJson()
      if (!json) return
      clipboard(JSON.stringify(json, null, 2))
      ElMessage.success('已复制当前配置到剪贴板')
    }

    /** 导出成 .json 文件，方便备份 / 换设备 / 换形态（油猴 ↔ 插件） */
    function exportToFile () {
      const json = currentJson()
      if (!json) return
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `all-search-sites-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(link)
      link.click()
      link.remove()
      // 立刻 revoke 会让 Firefox / Safari 偶发取消下载，延后一点再释放
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      ElMessage.success('已下载配置文件')
    }

    function pickFile () {
      fileInput.value?.click()
    }

    function importFromFile (event) {
      const file = event.target.files && event.target.files[0]
      // 同一个文件选两次也要能触发 change
      event.target.value = ''
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        // Windows 上导出的文件常带 UTF-8 BOM，JSON.parse 会直接报错，先去掉
        const text = String(reader.result || '').replace(/^\uFEFF/, '')
        const json = jsonParse(text)
        if (!json) {
          ElMessage.error(`「${file.name}」不是合法 JSON`)
          return
        }
        applyImported(json)
      }
      reader.onerror = () => ElMessage.error('读取文件失败')
      reader.readAsText(file)
    }

    return {
      jsoneditor,
      fileInput,
      reset,
      format,
      save,
      exportToClipboard,
      exportToFile,
      importFormClipboard,
      pickFile,
      importFromFile
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

/* 隐藏的 file input：由「从文件导入」按钮触发 */
.file-input {
  display: none;
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
