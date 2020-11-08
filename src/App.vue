<template>
  <v-app id="app">
    <v-app-bar
      app
      clipped-left
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>全搜 All-Search</v-toolbar-title>
      <v-spacer/>
      <v-btn
        href="https://github.com/endday/all-search"
        target="_blank"
        text
      >
        <span class="mr-2">github地址</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list
        nav
        shaped
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            link
            to="/"
          >
            <v-list-item-icon>
              <v-icon right>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                基础设置
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            to="/sites"
          >
            <v-list-item-icon>
              <v-icon right>mdi-application</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                网址配置
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <version-alert/>
        <router-view></router-view>
        <v-footer app>
          <!-- -->
        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import versionAlert from './components/version-alert'

export default {
  name: 'App',
  components: {
    versionAlert
  },
  data: () => ({
    drawer: true,
    selectedItem: 1
  }),
  methods: {}
}
</script>
