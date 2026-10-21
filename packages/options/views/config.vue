<template>
  <el-container
    class="container">
    <el-header
      class="header">
      <el-link
        id="logo"
        :underline="false"
        type="primary"
        href="/all-search">
        全搜 All-Search
      </el-link>
      <div class="header-bd">
        <el-menu
          class="menu"
          mode="horizontal"
          router
          :ellipsis="false"
          :default-active="route.path">
          <div class="flex-grow"/>
          <el-menu-item
            index="/config/sites">
            配置
          </el-menu-item>
          <el-menu-item
            index="/config/edit">
            编辑
          </el-menu-item>
          <el-menu-item
            index="/config/toolbar">
            划词工具栏
          </el-menu-item>
          <el-menu-item
            index="/config/interaction">
            交互
          </el-menu-item>
        </el-menu>
      </div>
      <el-dropdown
        class="theme-switch"
        trigger="click"
        @command="onThemeChange">
        <span class="theme-btn">{{ themeLabel }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="auto">
              跟随系统
            </el-dropdown-item>
            <el-dropdown-item command="light">
              浅色
            </el-dropdown-item>
            <el-dropdown-item command="dark">
              深色
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <a class="gh-btn"
         href="https://github.com/all-search/all-search">
        <span class="gh-icon"/>
      </a>
    </el-header>
    <el-scrollbar class="page-container">
      <el-container>
        <el-main class="page-mainer">
          <version-alert/>
          <router-view/>
          <el-footer></el-footer>
        </el-main>
      </el-container>
    </el-scrollbar>
  </el-container>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from '@element-plus/icons-vue'
import { useTheme } from '@src/components/useTheme'
import versionAlert from '@src/components/version-alert'

export default {
  name: 'config',
  components: {
    versionAlert
  },
  setup () {
    const drawerVisible = ref(false)
    const route = useRoute()

    // 主题：跟随系统 / 浅色 / 深色，Element Plus 用 html.dark 切换 dark css vars
    const { preference, isDark } = useTheme()
    watch(isDark, (dark) => {
      document.documentElement.classList.toggle('dark', dark)
    }, { immediate: true })

    const THEME_LABELS = { auto: '跟随系统', light: '浅色', dark: '深色' }
    const themeLabel = computed(() => THEME_LABELS[preference.value] || '跟随系统')
    const onThemeChange = (value) => {
      preference.value = value
    }

    return {
      drawerVisible,
      Menu,
      route,
      themePreference: preference,
      themeLabel,
      onThemeChange
    }
  }
}
</script>

<style lang="scss">
@use "@src/assets/common" as *;

.form-title {
  font-size: 16px;
  line-height: 64px;
  float: left;
  font-size: 18px;
  text-decoration: none !important;

  &:visited {
    color: $primary;
  }
}

.container {
  background: #f7f7f9;
}

.theme-switch {
  margin-right: 12px;
}

.theme-btn {
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  padding: 6px 10px;
  border-radius: 14px;
  color: var(--el-text-color-regular);
  border: 1px solid var(--el-border-color);

  &:hover {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
  }
}

// 深色模式：Element Plus 的 dark css vars 由 html.dark 驱动，
// 这里只需要补我们自己写死的几处底色
html.dark {
  .container {
    background: #141414;
  }

  .header {
    background-color: #1d1e1f;
    box-shadow: 0 2px 8px #000;
  }

  .layout,
  .content {
    background-color: transparent;
  }
}

.header {
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: #fff;
  position: relative;
  z-index: 10;

  .ant-menu-horizontal {
    border-bottom: none;
  }

  .header-bd {
    flex: 1;
  }

  .flex-grow {
    flex-grow: 1;
  }
}

.layout {
  padding-top: 40px;
  background-color: #fff;
}

.menu {
  height: 62px;
  line-height: 62px;
  text-align: right;
}

.content {
  padding: 0 24px;
  background: #fff
}

.page-container {
  height: calc(100vh - 43px);
}

.footer {
  text-align: center;
  background: #fff;
}

.gh-btn {
  padding: 0 20px;
  margin: 4px;
  cursor: pointer;

  .gh-icon {
    display: block;
    width: 20px;
    height: 20px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMTIgMTIgNDAgNDAiPjxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0zMiAxMy40Yy0xMC41IDAtMTkgOC41LTE5IDE5IDAgOC40IDUuNSAxNS41IDEzIDE4IDEgLjIgMS4zLS40IDEuMy0uOXYtMy4yYy01LjMgMS4xLTYuNC0yLjYtNi40LTIuNi0uOS0yLjEtMi4xLTIuNy0yLjEtMi43LTEuNy0xLjIuMS0xLjEuMS0xLjEgMS45LjEgMi45IDIgMi45IDIgMS43IDIuOSA0LjUgMi4xIDUuNSAxLjYuMi0xLjIuNy0yLjEgMS4yLTIuNi00LjItLjUtOC43LTIuMS04LjctOS40IDAtMi4xLjctMy43IDItNS4xLS4yLS41LS44LTIuNC4yLTUgMCAwIDEuNi0uNSA1LjIgMiAxLjUtLjQgMy4xLS43IDQuOC0uNyAxLjYgMCAzLjMuMiA0LjcuNyAzLjYtMi40IDUuMi0yIDUuMi0yIDEgMi42LjQgNC42LjIgNSAxLjIgMS4zIDIgMyAyIDUuMSAwIDcuMy00LjUgOC45LTguNyA5LjQuNy42IDEuMyAxLjcgMS4zIDMuNXY1LjJjMCAuNS40IDEuMSAxLjMuOSA3LjUtMi42IDEzLTkuNyAxMy0xOC4xIDAtMTAuNS04LjUtMTktMTktMTl6Ii8+PC9zdmc+);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
</style>
