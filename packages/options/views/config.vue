<template>
  <div class="config-shell">
    <header class="top-bar">
      <div class="top-bar-inner">
        <a
          class="brand"
          href="#"
          @click.prevent="goHome">
          <span
            class="brand-mark"
            aria-hidden="true">搜</span>
          <span class="brand-name">
            全搜
            <span class="brand-en">All-Search</span>
          </span>
        </a>

        <nav
          class="top-nav"
          aria-label="配置分类">
          <router-link
            v-for="tab in tabs"
            :key="tab.path"
            :to="tab.path"
            class="nav-tab"
            :class="{ 'is-active': isActive(tab.path) }">
            <el-icon class="nav-icon">
              <component :is="tab.icon" />
            </el-icon>
            <span class="nav-text">{{ tab.label }}</span>
          </router-link>
        </nav>

        <div class="top-actions">
          <el-dropdown
            trigger="click"
            @command="onThemeChange">
            <button
              type="button"
              class="icon-btn"
              :title="`主题：${themeLabel}`"
              :aria-label="`主题：${themeLabel}`">
              <el-icon><component :is="themeIcon" /></el-icon>
            </button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="opt in THEME_OPTIONS"
                  :key="opt.value"
                  :command="opt.value">
                  <span class="theme-option">
                    <el-icon><component :is="opt.icon" /></el-icon>
                    <span>{{ opt.label }}</span>
                    <el-icon
                      v-if="preference === opt.value"
                      class="theme-check"
                    >
                      <Check />
                    </el-icon>
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <a
            class="icon-btn gh-btn"
            href="https://github.com/all-search/all-search"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            aria-label="GitHub">
            <span class="gh-icon" />
          </a>
        </div>
      </div>
    </header>

    <el-scrollbar class="page-scroll">
      <main class="page-main">
        <div class="page-inner">
          <version-alert />
          <router-view />
        </div>
      </main>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Brush,
  Check,
  Document,
  Grid,
  Monitor,
  Moon,
  Operation,
  Sunny
} from '@element-plus/icons-vue'
import { useTheme } from '@src/components/useTheme'
import versionAlert from '@src/components/version-alert.vue'
import type { ThemePreference } from '@src/util/theme'

const route = useRoute()
const router = useRouter()

const tabs = [
  { label: '站点', path: '/config/sites', icon: Grid },
  { label: '编辑', path: '/config/edit', icon: Document },
  { label: '划词工具栏', path: '/config/toolbar', icon: Brush },
  { label: '交互', path: '/config/interaction', icon: Operation }
]

const THEME_OPTIONS: Array<{ value: ThemePreference, label: string, icon: unknown }> = [
  { value: 'auto', label: '跟随系统', icon: Monitor },
  { value: 'light', label: '浅色', icon: Sunny },
  { value: 'dark', label: '深色', icon: Moon }
]

const { preference, isDark } = useTheme()

// Element Plus 的 dark css vars 由 html.dark 驱动
watch(isDark, (dark) => {
  document.documentElement.classList.toggle('dark', dark)
}, { immediate: true })

const themeLabel = computed(
  () => THEME_OPTIONS.find(opt => opt.value === preference.value)?.label || '跟随系统'
)
const themeIcon = computed(
  () => THEME_OPTIONS.find(opt => opt.value === preference.value)?.icon || Monitor
)

function onThemeChange (value: ThemePreference) {
  preference.value = value
}

function isActive (path: string) {
  return route.path.startsWith(path)
}

/** 插件里是 chrome-extension://<id>/options.html，写死的 /all-search 会 404，统一走路由 */
function goHome () {
  router.push('/config/sites')
}
</script>

<style lang="scss">
.config-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f6f8;

  html.dark & {
    background: #141414;
  }
}

/* ---------- 顶栏 ---------- */

/* 底色和分隔线拉满整宽，内容跟正文对齐到同一个 1200 栏 */
.top-bar {
  flex: none;
  height: 56px;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid var(--el-border-color-lighter);

  html.dark & {
    background: #1d1e1f;
    border-bottom-color: #2b2b2e;
  }
}

.top-bar-inner {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--el-text-color-primary);
  flex: none;

  .brand-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, var(--el-color-primary), #7c5cff);
  }

  .brand-name {
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
  }

  .brand-en {
    margin-left: 4px;
    font-size: 12px;
    font-weight: 400;
    color: var(--el-text-color-secondary);
  }
}

.top-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.nav-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 14px;
  color: var(--el-text-color-regular);
  text-decoration: none;
  white-space: nowrap;
  transition: background-color .15s ease, color .15s ease;

  .nav-icon {
    font-size: 16px;
    opacity: .75;
  }

  &:hover {
    background: var(--el-fill-color-light);
    color: var(--el-text-color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--el-color-primary);
    outline-offset: 2px;
  }

  &.is-active {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 600;

    .nav-icon {
      opacity: 1;
    }
  }
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: none;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--el-text-color-regular);
  font-size: 17px;
  cursor: pointer;

  &:hover {
    background: var(--el-fill-color-light);
    color: var(--el-text-color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--el-color-primary);
    outline-offset: 2px;
  }
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 96px;

  .theme-check {
    margin-left: auto;
    color: var(--el-color-primary);
  }
}

.gh-icon {
  display: block;
  width: 17px;
  height: 17px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23606666' d='M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z'/%3E%3C/svg%3E");
  background-size: 100% 100%;
  background-repeat: no-repeat;

  html.dark & {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23c9cacd' d='M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z'/%3E%3C/svg%3E");
  }
}

/* ---------- 内容区 ---------- */

.page-scroll {
  flex: 1;
  min-height: 0;

  /* el-scrollbar 的 view 默认高度随内容，撑满后页面内的 sticky 底栏才会贴在视口底部 */
  .el-scrollbar__view {
    height: 100%;
  }
}

.page-main {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 24px 24px;
}

.page-inner {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .top-bar {
    padding: 0 12px;
  }

  .top-bar-inner {
    gap: 12px;
  }

  .brand .brand-en {
    display: none;
  }

  .nav-tab .nav-text {
    display: none;
  }

  .nav-tab {
    padding: 0 10px;
  }

  .page-main {
    padding: 12px;
  }
}
</style>
