<template>
  <div class="sites">
    <div>
      <draggable
        handle=".move-icon"
        v-model="list">
        <div
          v-for="(item, j) in list"
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
                class="input col"
                v-model="item.nameZh"/>
              <el-input
                class="input col"
                v-model="item.url"/>
            </div>
          </div>
          <div class="ft">
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
                @click="deleteUrl(list, j)">
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
  </div>
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
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { VueDraggableNext } from 'vue-draggable-next'
import { setStorage } from '../util/tmMethods'
import { initToolbar } from '../util/sites'

export default {
  name: 'sites',
  components: {
    draggable: VueDraggableNext
  },
  setup () {
    const list = ref(initToolbar())

    function changeVisible (data) {
      data.visible = !data.visible
    }

    function deleteUrl (list, j) {
      list.splice(j, 1)
    }

    function addNewUrl () {
      list.value.push({
        nameZh: '新网址',
        url: 'https://www.baidu.com/s?wd=%s&ie=utf-8',
        data: {
          visible: true
        }
      })
    }

    function reset () {
      ElMessageBox.confirm('重置操作将还原所有网址数据，确定要重置吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        list.value = initToolbar({
          reset: true
        })
        ElMessage.success('重置成功')
      })
    }

    function formatSites () {
      return list.value.map(child => ({
        nameZh: child.nameZh,
        url: child.url,
        data: child.data
      }))
    }

    function save () {
      setStorage('toolbar', formatSites())
      ElMessage.success('保存成功')
    }

    return {
      list,
      changeVisible,
      deleteUrl,
      addNewUrl,
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

  &:hover {
    background-color: #f5f7fa;
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

  .name {
    width: 100px;
    margin: 0;
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

</style>

<style>

</style>
