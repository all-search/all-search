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
              <el-icon><Delete /></el-icon>
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
                class="input col"
                v-model="item.nameZh"/>
              <el-input
                class="input col"
                v-model="item.url"/>
            </div>
          </div>
          <div class="ft">
            <el-dropdown
              v-if="!isPersonal(cate) && personalCategory.length"
              trigger="click"
              @command="addToPersonal($event, item)">
              <el-button>
                <el-icon><Plus/></el-icon>
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
                <el-icon><Delete /></el-icon>
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
  </div>
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
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import { delSession, setSession } from '../util'
import { initSites } from '../util/sites'

export default {
  name: 'sites',
  components: {
    draggable: VueDraggableNext
  },
  data: () => ({
    localSites: [],
    tab: '',
    tabName: ''
  }),
  computed: {
    personalCategory () {
      return this.localSites.filter(item => item.name.indexOf('personal') > -1)
    }
  },
  mounted () {
    this.initSites()
  },
  methods: {
    initSites () {
      this.localSites = initSites().map(item => ({
        ...item,
        nameZhBackup: item.nameZh
      }))
      this.tabName = this.localSites[0].name
    },
    tabChange (value) {
      this.tabName = value
    },
    changeVisible (data) {
      data.visible = !data.visible
    },
    addCategory () {
      const i = this.personalCategory.length
      this.localSites.push({
        nameZh: '新分类',
        nameZhBackup: '新分类',
        name: `personal-${i + 1}`,
        list: [],
        data: {
          visible: true
        }
      })
      this.tabName = `personal-${i + 1}`
    },
    addToPersonal (cate, item) {
      cate.list.push(item)
      this.$message('添加成功')
    },
    deleteUrl (j) {
      const currentTab = this.localSites.find(item => item.name === this.tabName)
      if (currentTab) {
        currentTab.list.splice(j, 1)
      }
    },
    addNewUrl (cate) {
      cate.list.push({
        nameZh: '新网址',
        url: 'https://www.baidu.com/s?wd=%s&ie=utf-8',
        data: {
          visible: true
        }
      })
    },
    removeTab (targetName) {
      this.$confirm('确定要删除这个分类吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tabs = this.localSites
        if (this.tabName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                this.tabName = nextTab.name
              }
            }
          })
        }
        const i = this.localSites.findIndex(item => item.name === targetName)
        if (i > -1) {
          this.localSites.splice(i, 1)
        }
      }).catch(() => {

      })
    },
    isPersonal (cate) {
      return cate.name.indexOf('personal') > -1
    },
    moveLeft (i) {
      const j = i - 1
      if (j >= 0) {
        const list = this.localSites;
        [list[i], list[j]] = [list[j], list[i]]
        this.localSites = list
      }
    },
    moveRight (i) {
      const j = i + 1
      if (j < this.localSites.length) {
        const list = this.localSites;
        [list[i], list[j]] = [list[j], list[i]]
        this.localSites = list
      }
    },
    reset () {
      this.$confirm('重置操作将还原所有网址数据，确定要重置吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSession('sites')
        this.$message.success('重置成功')
      })
    },
    formatSites () {
      return this.localSites.map(item => ({
        nameZh: item.nameZh,
        name: item.name,
        list: item.list.map(child => ({
          nameZh: child.nameZh,
          url: child.url,
          data: child.data
        })),
        data: item.data
      }))
    },
    save () {
      setSession('sites', this.formatSites())
      this.$message.success('保存成功')
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
