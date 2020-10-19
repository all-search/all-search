<template>
  <v-tabs
    vertical
    v-model="tab">
    <draggable
      class="v-slide-group__content v-tabs-bar__content"
      v-model="sites"
    >
      <v-tab
        v-for="(group, i) in sites"
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
        v-for="(group, i) in sites"
        :key="i"
      >
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                v-text="group.nameZh"
              />
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                text
                @click=changeVisible(group)
              >
                <v-icon left v-text="group.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
                {{group.visible ? '显示' : '隐藏'}}
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider/>
          <draggable
            v-model="group.list"
          >
            <template v-for="(site, j) in group.list">
              <v-list-item
                :key="j"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="site.nameZh"
                  />
                  <v-list-item-subtitle
                    v-text="site.url"
                  />
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    text
                    @click=changeVisible(site)
                  >
                    <v-icon left v-text="site.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"/>
                    {{site.visible ? '显示' : '隐藏'}}
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider :key="`divider-${j}`"/>
            </template>
          </draggable>
        </v-list>
        <div class="pa-3"
             v-show="group.name === 'personal'">
          <v-dialog
            v-model="dialog"
            persistent
            max-width="60vw">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mr-2"
                color="primary"
                size="large"
                v-bind="attrs"
                v-on="on"
              >
                添加网址
              </v-btn>
            </template>
            <v-card>
              <v-card-title>添加网址</v-card-title>
              <v-list>
                <v-list-group
                  v-for="group in sites"
                  :key="group.name"
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title v-text="group.nameZh"/>
                    </v-list-item-content>
                  </template>
                  <v-list-item-group
                    multiple
                    v-model="selected">
                    <v-list-item
                      v-for="(site, j) in group.list"
                      :key="j"
                      :value="site"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-action>
                          <v-checkbox :input-value="active"/>
                        </v-list-item-action>
                        <v-list-item-content>
                          <v-list-item-title v-text="site.nameZh"/>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list-group>
              </v-list>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" text @click="dialog = false">取消</v-btn>
                <v-btn color="primary" text @click="dialog = false">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
            color="primary"
            size="large">
            新建网址
          </v-btn>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
import draggable from 'vuedraggable'
import sites from '../config/sites'

export default {
  name: 'sites',
  components: {
    draggable
  },
  data: () => ({
    sites,
    tab: '',
    tabName: '',
    dragging: false,
    dialog: false,
    selected: []
  }),
  mounted () {
    this.tabName = this.sites[0].name
  },
  methods: {
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
    changeVisible (item) {
      item.visible = !item.visible
    },
    checkedAll (list) {
      return list.every(item => item.checked)
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
</style>
