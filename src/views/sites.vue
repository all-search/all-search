<template>
  <v-card
    class="mx-auto"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>网址配置</v-list-item-title>
        <v-list-item-subtitle>分类和网址可拖动排序，可以添加分类和添加网址，收藏可将网址添加到自定义分类中</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-tabs
        vertical
        v-model="tab">
        <draggable
          class="v-slide-group__content v-tabs-bar__content"
          v-model="localSites"
        >
          <v-tab
            v-for="(group, i) in localSites"
            :key="i"
            @change="tabChange(group.name)"
          >
            <i class="group-icon"
               :class="`icon-${group.name}`">
            </i>
            {{group.nameZh}}
          </v-tab>
        </draggable>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="(group, i) in localSites"
            :key="i"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-if="group.name === 'personal'"
                    label="分类名称"
                    dense
                    outlined
                    required
                    singleLine
                    v-model="group.nameZh"/>
                  <v-list-item-title
                    v-else
                    v-text="group.nameZh"
                  />
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    v-if="group.name === 'personal'"
                    text
                    @click="delGroup(i)"
                  >
                    <v-icon left>mdi-delete</v-icon>
                    删除
                  </v-btn>
                  <v-btn
                    v-else
                    text
                    @click=changeVisible(group.data)
                  >
                    <v-icon left v-text="group.data.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
                    {{group.data.visible ? '显示' : '隐藏'}}
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider/>
              <draggable
                v-model="group.list"
              >
                <v-list-item
                  class="border-bottom"
                  v-for="(site, j) in group.list"
                  :key="j"
                >
                  <v-list-item-content
                    v-if="group.name === 'personal'">
                    <v-row>
                      <v-col
                        class="pt-0 pb-0"
                        cols="4">
                        <v-text-field
                          class="mr-2"
                          dense
                          outlined
                          required
                          singleLine
                          label="网址名称"
                          v-model="site.nameZh"/>
                      </v-col>
                      <v-col
                        class="pt-0 pb-0"
                        cols="20">
                        <v-text-field
                          dense
                          outlined
                          required
                          singleLine
                          label="网址链接"
                          v-model="site.url"/>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                  <v-list-item-content
                    v-else>
                    <v-list-item-title
                      v-text="site.nameZh"
                    />
                    <v-list-item-subtitle
                      v-text="site.url"
                    />
                  </v-list-item-content>
                  <v-list-item-action
                    v-if="group.name === 'personal'">
                    <v-btn
                      text
                      @click="del(j)">
                      <v-icon left>mdi-delete</v-icon>
                      删除
                    </v-btn>
                  </v-list-item-action>
                  <template v-else>
                    <v-list-item-action>
                      <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon left v-text="'mdi-plus-circle'"/>
                            收藏
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="(item, index) in personalCategory"
                            :key="index"
                            @click="addToPersonal(site, item)"
                          >
                            <v-list-item-title>{{ item.nameZh }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-btn
                        text
                        @click=changeVisible(site.data)>
                        <v-icon left v-text="site.data.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
                        {{site.data.visible ? '显示' : '隐藏'}}
                      </v-btn>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </draggable>
            </v-list>
            <div class="pa-3"
                 v-if="group.name === 'personal'">
              <v-btn
                color="primary"
                size="large"
                @click="addNewUrl(group)">
                新建网址
              </v-btn>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="error"
        large
        text
        @click="reset">
        重置
      </v-btn>
      <v-spacer/>
      <v-btn
        large
        text
        @click="addCategory">
        添加分类
      </v-btn>
      <v-btn
        id="save-btn"
        color="primary"
        large
        text
        class="save-btn"
        @click="save">
        保存
      </v-btn>
    </v-card-actions>
    <v-snackbar
      :top="true"
      :timeout="2000"
      v-model="snackbar"
    >
      {{tipsText}}
    </v-snackbar>
  </v-card>
</template>

<script>
import { version, initSites, setSession } from '../util'
import draggable from 'vuedraggable'
import sites from '../config/sites'

export default {
  name: 'sites',
  components: {
    draggable
  },
  data: () => ({
    sites,
    localSites: [],
    tab: '',
    tabName: '',
    dragging: false,
    dialog: false,
    tipsText: '',
    snackbar: false
  }),
  computed: {
    personalCategory () {
      return this.localSites.filter(item => item.name === 'personal')
    }
  },
  mounted () {
    this.initSites()
  },
  methods: {
    initSites () {
      this.localSites = initSites()
      this.tabName = this.localSites[0].name
    },
    tabChange (value) {
      this.tabName = value
    },
    getComponentData () {
      return {
        on: {
          change: this.tabChange
        },
        props: {
          value: this.tab,
          dense: true
        }
      }
    },
    changeVisible (data) {
      data.visible = !data.visible
    },
    addCategory () {
      this.localSites.push({
        nameZh: '新分类',
        name: 'personal',
        list: [],
        data: {
          visible: true
        }
      })
    },
    addToPersonal (item, group) {
      group.list.push(item)
      this.showSnackbar('添加成功')
    },
    del (j) {
      const i = this.localSites.findIndex(item => item.name === 'personal')
      this.localSites[i].list.splice(j, 1)
    },
    delGroup (i) {
      this.localSites.splice(i, 1)
      this.showSnackbar('删除成功')
    },
    addNewUrl (group) {
      group.list.push({
        nameZh: '新网址',
        url: 'https://www.baidu.com/s?wd=%s&ie=utf-8',
        data: {
          visible: true
        }
      })
    },
    showSnackbar (text) {
      this.tipsText = text
      this.snackbar = true
    },
    reset () {
      this.localSites = JSON.parse(JSON.stringify(this.sites))
    },
    save () {
      setSession('sites', this.localSites)
      setSession('sites-version', version)
      this.showSnackbar('保存成功')
    }
  }
}
</script>
<style>
  .group-icon {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .border-bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  .save-btn {
    display: none;
  }
</style>
