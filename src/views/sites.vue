<template>
  <div class="sites">
    <el-radio-group
      class="tabs-container"
      v-model="tabName"
      size="large">
      <el-radio-button
        v-for="(cate, index) in localSites"
        :key="`${cate.name}-${index}`"
        :label="cate.name">
        {{ cate.nameZhBackup }}
      </el-radio-button>
    </el-radio-group>
    <div
      v-for="(cate, index) in localSites"
      v-show="tabName === cate.name"
      :key="`${cate.name}-${index}`">
      <div class="url-item">
        <div class="bd">
          <el-input
            class="cate-input"
            v-model="cate.nameZh">
          </el-input>
        </div>
        <div class="ft">
          <el-button-group>
            <el-button
              @click="moveLeft(index)">
              <el-icon>
                <ArrowLeft/>
              </el-icon>
            </el-button>
            <el-button
              @click="moveRight(index)">
              <el-icon>
                <ArrowRight/>
              </el-icon>
            </el-button>
          </el-button-group>
          <el-tooltip
            content="展示隐藏"
            placement="top">
            <el-button
              :type="cate.data.visible ? 'primary': 'info'"
              plain
              @click="changeVisible(cate.data)">
              <el-icon>
                <View/>
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip
            content="删除"
            placement="top">
            <el-button
              plain
              type="danger"
              @click="removeTab(cate.name)">
              <el-icon>
                <Delete/>
              </el-icon>
            </el-button>
          </el-tooltip>
        </div>
      </div>
      <draggable
        handle=".move-icon"
        v-model="cate.list">
        <div
          v-for="(item, j) in cate.list"
          :key="j"
          class="url-item"
          :class="{invisible: !item.data.visible}">
          <el-button
            class="move-icon"
            text>
            <el-icon>
              <DCaret/>
            </el-icon>
          </el-button>
          <div class="bd">
            <div class="row">
              <el-input
                class="input nameZh"
                v-model="item.nameZh"/>
              <el-input
                class="input url"
                v-model="item.url"/>
            </div>
          </div>
          <div class="ft">
            <el-button
              class="addIcon"
              title="图标"
              @click="addIcon(item, j)">
              <el-icon>
                <Picture/>
              </el-icon>
            </el-button>
            <el-dropdown
              v-if="!isPersonal(cate) && personalCategory.length"
              trigger="click"
              @command="addToPersonal($event, item)">
              <el-button>
                <el-icon>
                  <Plus/>
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(pItem, i) in personalCategory"
                    :key="i"
                    :command="pItem">
                    {{ pItem.nameZh }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-tooltip
              content="展示隐藏"
              placement="top">
              <el-button
                :type="item.data.visible ? 'primary': 'info'"
                plain
                @click="changeVisible(item.data)">
                <el-icon>
                  <View v-if="item.data.visible"/>
                  <Hide v-else/>
                </el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip
              content="删除"
              placement="top">
              <el-button
                title="删除"
                :plain="true"
                type="danger"
                @click="deleteUrl(j)">
                <el-icon>
                  <Delete/>
                </el-icon>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </draggable>
      <div
        class="url-item btn-container">
        <el-button
          @click="addNewUrl(cate)">
          添加网址
        </el-button>
      </div>
    </div>
    <el-button
      class="add-cate-btn"
      size="small"
      @click="addCategory">
      <el-icon>
        <Plus/>
      </el-icon>
    </el-button>
    <div class="fixed-footer">
      <div class="btn-container">
        <el-button
          type="primary"
          @click="reset">
          重置
        </el-button>
        <el-button
          type="success"
          @click="save">
          保存
        </el-button>
      </div>
    </div>
    <el-dialog
      title="编辑图标"
      v-model="dialogVisible">
      <el-upload
        ref="elUpload"
        class="icon-uploader"
        action="#"
        :limit="1"
        :auto-upload="false"
        :show-file-list="false"
        accept="image/*"
        :on-change="handleIconChange">
        <el-button
          type="primary">
          上传
        </el-button>
        <template #tip>
          <div class="el-upload__tip">
            请尽量上传小于20kb的图片，以避免性能问题
          </div>
        </template>
      </el-upload>
      <template
        v-if="currentItem && currentItem.icon">
        <div
          class="icon-upload-preview">
          <img :src="currentItem.icon" alt="">
        </div>
        <el-button
          type="danger"
          @click="handleIconRemove">
          删除
        </el-button>
      </template>
      <template #footer>
        <el-button
          type="primary"
          @click="iconConfirm">
          确定
        </el-button>
        <el-button
          @click="iconCancel">
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { ElMessage, ElMessageBox } from 'element-plus'
import { delStorage, setStorage } from '../util/storage'
import useSites from '../components/useSites'

export default {
  name: 'sites',
  components: {
    draggable: VueDraggableNext
  },
  setup () {
    const localSites = ref([])
    const tab = ref('')
    const tabName = ref('')
    const personalCategory = computed(() => {
      return localSites.value.filter(item => item.name.indexOf('personal') > -1)
    })
    const { sites } = useSites()
    const currentTab = computed(() => {
      return localSites.value.find(item => item.name === tabName.value)
    })

    watch(sites, value => {
      init(value)
    }, {
      immediate: true
    })

    function init (val) {
      localSites.value = (val || []).map(item => ({
        ...item,
        nameZhBackup: item.nameZh
      }))
      if (localSites.value[0]) {
        tabName.value = localSites.value[0].name
      }
    }

    function changeVisible (data) {
      data.visible = !data.visible
    }

    function addCategory () {
      const i = personalCategory.value.length
      localSites.value.push({
        nameZh: '新分类',
        nameZhBackup: '新分类',
        name: `personal-${i + 1}`,
        list: [],
        data: {
          visible: true
        }
      })
      tabName.value = `personal-${i + 1}`
    }

    function addToPersonal (cate, item) {
      cate.list.push(item)
      ElMessage('添加成功')
    }

    const dialogVisible = ref(false)
    const currentItem = ref(null)
    const elUpload = ref(null)
    let itemIndex = 0
    const fileList = ref([])

    function addIcon (item, j) {
      dialogVisible.value = true
      currentItem.value = JSON.parse(JSON.stringify(item))
      itemIndex = j
    }

    function getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = () => {
          imgResult = reader.result
        }
        reader.onerror = error => {
          reject(error)
        }
        reader.onloadend = () => {
          resolve(imgResult)
        }
      })
    }

    function handleIconChange (file) {
      if (!/^image\/*/.test(file.raw.type)) {
        return ElMessage.error(`上传的文件类型为${file.raw.type}，请上传正确的图片`)
      }
      getBase64(file.raw).then(res => {
        currentItem.value.icon = res
        console.log(res)
      }).catch(() => {
        ElMessage.error('上传失败')
      })
    }

    function handleIconRemove () {
      delete currentItem.value.icon
      elUpload.value.clearFiles()
    }

    function iconConfirm () {
      if (!currentItem.value.icon) {
        return ElMessage.error('上传失败')
      }
      currentTab.value.list[itemIndex].icon = currentItem.value.icon
      dialogVisible.value = false
    }

    function iconCancel () {
      currentItem.value = null
      elUpload.value.clearFiles()
      dialogVisible.value = false
    }

    function deleteUrl (j) {
      const currentTab = localSites.value.find(item => item.name === tabName.value)
      if (currentTab) {
        currentTab.list.splice(j, 1)
      }
    }

    function addNewUrl (cate) {
      cate.list.push({
        nameZh: '新网址',
        url: 'https://www.baidu.com/s?wd=%s&ie=utf-8',
        data: {
          visible: true
        }
      })
    }

    function removeTab (targetName) {
      ElMessageBox.confirm('确定要删除这个分类吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tabs = localSites.value
        if (tabName.value === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                tabName.value = nextTab.name
              }
            }
          })
        }
        const i = localSites.value.findIndex(item => item.name === targetName)
        if (i > -1) {
          localSites.value.splice(i, 1)
        }
      }).catch(() => {

      })
    }

    function isPersonal (cate) {
      return cate.name.indexOf('personal') > -1
    }

    function moveLeft (i) {
      const j = i - 1
      if (j >= 0) {
        const list = localSites.value;
        [list[i], list[j]] = [list[j], list[i]]
        localSites.value = list
      }
    }

    function moveRight (i) {
      const j = i + 1
      if (j < localSites.value.length) {
        const list = localSites.value;
        [list[i], list[j]] = [list[j], list[i]]
        localSites.value = list
      }
    }

    function reset () {
      ElMessageBox.confirm('重置操作将还原所有网址数据，确定要重置吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStorage('sites')
        ElMessage.success('重置成功')
      })
    }

    function formatSites () {
      return localSites.value.map(item => ({
        nameZh: item.nameZh,
        name: item.name,
        list: item.list.map(child => ({
          nameZh: child.nameZh,
          url: child.url,
          icon: child.icon || '',
          data: child.data
        })),
        data: item.data
      }))
    }

    function save () {
      setStorage('sites', formatSites())
      ElMessage.success('保存成功')
    }

    return {
      localSites,
      tab,
      tabName,
      personalCategory,
      changeVisible,
      addCategory,
      addIcon,
      addToPersonal,
      deleteUrl,
      dialogVisible,
      currentItem,
      elUpload,
      fileList,
      iconConfirm,
      iconCancel,
      handleIconChange,
      handleIconRemove,
      addNewUrl,
      removeTab,
      isPersonal,
      moveLeft,
      moveRight,
      reset,
      formatSites,
      save
    }
  }
}
</script>

<style lang="scss">
.sites {
  border-radius: 4px;
  box-shadow: none;
  position: relative;
  margin-bottom: 20px;
}

.tabs-container {
  margin-bottom: 20px;
}

.sites-tabs {
  border: 1px solid #eee;
  box-shadow: none;
}

.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.el-button {
  vertical-align: middle;
}

.add-cate-btn {
  position: absolute;
  right: 6px;
  top: 6px;
}

.url-item {
  display: flex;
  background-color: #fff;
  font-size: 14px;
  color: #303133;
  align-items: center;
  padding: 12px 20px 12px 10px;
  transition: background-color .25s ease;

  &.invisible {
    color: #C0C4CC;
  }

  & + & {
    border-top: 1px solid #ebeef5;
  }

  .move-icon {
    padding: 6px 10px;
    font-size: 18px;
    color: #999;
    cursor: move;

    &:hover {
      color: #409EFF;
    }
  }

  .addIcon {
    margin-right: 10px;
  }

  .name {
    width: 100px;
    margin: 0;
  }

  .nameZh {
    flex: 1;
  }

  .url {
    flex: 3;
  }

  .hd {
    margin-right: 10px;
  }

  .bd {
    flex: 1;
    margin-right: 10px;
  }

  .input + .input {
    margin-left: 10px;
  }

  .cate-name {
    flex: 1;
    font-size: 16px;
    margin: 0 0 0 15px;
  }

  .el-button-group {
    margin-right: 10px;
  }
}

.el-dropdown + .el-button {
  margin-left: 10px;
}

.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: right;
  width: 100%;

  .btn-container {
    box-shadow: 0 -2px 8px #f0f1f2;
    margin: 0 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 3px 3px 0 0;
  }
}

.category {
  display: flex;
  align-items: center;

  .label {
    margin: 0;
    font-size: 16px;
  }
}

.icon-upload-preview {
  width: 128px;
  height: 128px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin: 10px 0;

  img {
    width: 100%;
  }
}
</style>
