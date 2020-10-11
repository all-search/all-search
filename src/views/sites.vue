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
                v-text="`分类：${group.nameZh}`"
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
        <div v-show="group.name === 'personal'" class="pa-3">
          <v-btn
            color="primary"
            size="large">
            新建地址
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
    dragging: false
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
