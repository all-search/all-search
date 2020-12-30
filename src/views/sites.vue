<template>
  <div class="sites">
    <el-tabs
      class="sites-tabs"
      type="border-card"
      v-model="tabName"
      @tab-remove="removeTab">
      <el-tab-pane
        v-for="(cate, index) in localSites"
        :key="`${cate.name}-${index}`"
        :label="cate.nameZhBackup"
        :name="cate.name"
        :closable="isPersonal(cate)">
        <div class="url-item">
          <div class="bd">
            <el-input
              v-if="isPersonal(cate)"
              class="cate-input"
              v-model="cate.nameZh">
            </el-input>
            <p v-else
               class="cate-name"
               v-text="cate.nameZh"/>
          </div>
          <div class="ft">
            <el-button-group>
              <el-button
                icon="el-icon-arrow-left"
                @click="moveLeft(index)"
              />
              <el-button
                icon="el-icon-arrow-right"
                @click="moveRight(index)"
              />
            </el-button-group>
            <el-button
              icon="el-icon-view"
              @click="changeVisible(cate.data)">
              {{cate.data.visible ? '隐藏': '展示'}}
            </el-button>
          </div>
        </div>
        <draggable
          handle=".move-icon"
          v-model="cate.list">
          <div
            v-for="(item, j) in cate.list"
            :key="j"
            class="url-item">
            <el-button
              class="move-icon"
              type="text"
              icon="el-icon-d-caret"/>
            <div class="hd">
              <el-input
                v-if="isPersonal(cate)"
                class="input"
                v-model="item.nameZh"/>
              <p v-else
                 class="name"
                 v-text="item.nameZh"/>
            </div>
            <div class="bd">
              <el-input
                v-if="isPersonal(cate)"
                class="input"
                v-model="item.url"/>
              <p v-else
                 class="input"
                 v-text="item.url"/>
            </div>
            <div class="ft">
              <el-dropdown
                v-if="!isPersonal(cate) && personalCategory.length"
                trigger="click"
                @command="addToPersonal($event, item)">
                <el-button
                  icon="el-icon-plus">
                  添加
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(pItem, i) in personalCategory"
                      :key="i"
                      :command="pItem">
                      {{pItem.nameZh}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button
                icon="el-icon-view"
                @click="changeVisible(item.data)">
                {{item.data.visible ? '隐藏': '展示'}}
              </el-button>
            </div>
          </div>
        </draggable>
        <div
          v-if="isPersonal(cate)"
          class="url-item">
          <el-button
            @click="addNewUrl(cate)">
            添加网址
          </el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-button
      class="add-cate-btn"
      icon="el-icon-plus"
      size="mini"
      @click="addCategory"/>
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
import { VueDraggableNext } from 'vue-draggable-next'
import { initSites, setSession, version } from '../util'
import sites from '../config/sites'

export default {
  name: 'sites',
  components: {
    draggable: VueDraggableNext
  },
  data: () => ({
    sites,
    localSites: [],
    tab: '',
    tabName: '',
    dragging: false,
    dialog: false,
    tipsText: '',
    isModifyCateName: false,
    cateNameZh: ''
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
    del (j) {
      const i = this.localSites.findIndex(item => item.name === 'personal')
      this.localSites[i].list.splice(j, 1)
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
        const list = this.localSites.splice(i, 1)
        this.localSites.splice(j, 0, list[0])
      }
    },
    moveRight (i) {
      const j = i + 1
      if (j < this.localSites.length) {
        const list = this.localSites.splice(i, 1)
        this.localSites.splice(j, 0, list[0])
      }
    },
    reset () {
      this.$confirm('重置操作将还原所有网址数据，确定要重置吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const localSites = JSON.parse(JSON.stringify(this.sites))
        this.localSites = localSites.map(item => ({
          ...item,
          nameZhBackup: item.nameZh
        }))
        this.$message.success('重置成功')
      })
    },
    formatSites () {
      return this.localSites.map(item => ({
        nameZh: item.nameZh,
        name: item.name,
        list: item.list.map(child => ({
          id: child.id,
          nameZh: child.nameZh,
          url: child.url,
          data: child.data
        })),
        data: item.data
      }))
    },
    save () {
      setSession('sites', this.formatSites())
      setSession('sites-version', version)
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
    color: #606266;
    align-items: center;
    padding: 12px 20px 12px 10px;
    transition: background-color .25s ease;

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

    .input {
      margin: 0 20px 0 0;
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
      margin-left: 220px;
      margin-right: 20px;
      padding: 10px;
      background-color: #fff;
      border-radius: 3px 3px 0 0;
    }

    .el-button {
      /*border-radius: 0;*/
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
