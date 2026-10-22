<template>
  <div class="sites-page">
    <div class="sites-body">
    <!-- 分类导航 -->
    <nav
      class="site-nav"
      aria-label="分类">
      <button
        v-for="cate in localSites"
        :key="cate.name"
        type="button"
        class="nav-item"
        :class="{ 'is-active': tabName === cate.name, 'is-off': !cate.data.visible }"
        @click="tabName = cate.name">
        <span class="nav-label">{{ cate.nameZh }}</span>
        <span class="nav-count">{{ cate.list.length }}</span>
      </button>
      <button
        type="button"
        class="nav-add"
        @click="addCategory">
        <el-icon><Plus/></el-icon>
        新建分类
      </button>
    </nav>

    <section
      v-if="currentCate"
      class="site-panel">
      <!-- 分类标题 -->
      <header class="panel-head">
        <el-input
          v-if="renaming"
          ref="renameInput"
          v-model="currentCate.nameZh"
          class="rename-input"
          size="large"
          @blur="renaming = false"
          @keyup.enter="renaming = false" />
        <h2
          v-else
          class="panel-title"
          tabindex="0"
          @click="startRename"
          @keyup.enter="startRename">
          {{ currentCate.nameZh }}
          <el-icon class="title-edit">
            <EditPen/>
          </el-icon>
        </h2>

        <span class="panel-meta">
          {{ currentCate.list.length }} 个站点<template v-if="hiddenCount"> · {{ hiddenCount }} 个已隐藏</template>
        </span>

        <el-dropdown
          trigger="click"
          @command="handleCateCommand">
          <el-button
            text
            aria-label="分类操作">
            <el-icon><MoreFilled/></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="up">
                上移分类
              </el-dropdown-item>
              <el-dropdown-item command="down">
                下移分类
              </el-dropdown-item>
              <el-dropdown-item command="visible">
                {{ currentCate.data.visible ? '隐藏分类' : '显示分类' }}
              </el-dropdown-item>
              <el-dropdown-item
                command="show-all"
                :disabled="!hiddenCount">
                显示全部站点
              </el-dropdown-item>
              <el-dropdown-item
                command="hide-all"
                :disabled="!currentCate.list.some(i => i.data.visible)">
                隐藏全部站点
              </el-dropdown-item>
              <el-dropdown-item
                command="remove"
                divided>
                删除分类
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </header>

      <!-- 工具条 -->
      <div class="panel-toolbar">
        <el-input
          v-model="search"
          class="toolbar-search"
          placeholder="搜索名称或域名"
          clearable
          :prefix-icon="Search" />
        <el-radio-group
          v-model="filter"
          size="small">
          <el-radio-button label="all">
            全部
          </el-radio-button>
          <el-radio-button label="hidden">
            已隐藏
          </el-radio-button>
        </el-radio-group>
        <span class="toolbar-spacer" />
        <el-button
          type="primary"
          @click="addNewUrl">
          <el-icon><Plus/></el-icon>
          添加站点
        </el-button>
      </div>

      <!-- 站点列表 -->
      <draggable
        v-model="currentCate.list"
        class="engine-list"
        handle=".engine-drag"
        :animation="150"
        :disabled="sortingDisabled">
        <site-engine-row
          v-for="(item, index) in displayedList"
          :key="item.__uid"
          :item="item"
          :index="index"
          :last-index="displayedList.length - 1"
          :editing="editingUid === item.__uid"
          :icon-cache="iconCache"
          :sorting-disabled="sortingDisabled"
          :can-add-personal="!isPersonal(currentCate) && personalCategory.length > 0"
          @edit="startEdit(item)"
          @done="finishEdit(item, $event)"
          @cancel="cancelEdit"
          @icon="addIcon(item, $event)"
          @command="handleRowCommand(item, $event)" />
      </draggable>

      <div
        v-if="!displayedList.length"
        class="empty-state">
        <template v-if="search || filter !== 'all'">
          <p class="empty-title">
            没有匹配的站点
          </p>
          <el-button
            text
            type="primary"
            @click="clearFilter">
            清除筛选条件
          </el-button>
        </template>
        <template v-else>
          <p class="empty-title">
            这个分类还没有站点
          </p>
          <el-button
            text
            type="primary"
            @click="addNewUrl">
            添加第一个站点
          </el-button>
        </template>
      </div>
    </section>

    <div
      v-else
      class="empty-state">
      <p class="empty-title">
        还没有分类
      </p>
      <el-button
        text
        type="primary"
        @click="addCategory">
        新建一个分类
      </el-button>
    </div>

    </div>

    <!-- 保存条 -->
    <save-bar
      :dirty="dirty"
      @save="save"
      @revert="revert"
      @reset="reset" />

    <el-dialog
      v-model="dialogVisible"
      title="编辑图标"
      width="420px">
      <el-upload
        ref="elUpload"
        class="icon-uploader"
        action="#"
        :limit="1"
        :auto-upload="false"
        :show-file-list="false"
        accept="image/*"
        :on-change="handleIconChange">
        <el-button type="primary">
          上传
        </el-button>
        <template #tip>
          <div class="el-upload__tip">
            请尽量上传小于 20kb 的图片，以避免性能问题
          </div>
        </template>
      </el-upload>
      <template v-if="currentItem && currentItem.icon">
        <div class="icon-upload-preview">
          <img
            :src="currentItem.icon"
            alt="">
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
        <el-button @click="iconCancel">
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { ElMessage, ElMessageBox } from 'element-plus'
import { delStorage, getStorage, setStorage } from '@src/util/storage'
import useSites, { reloadSites } from '@src/components/useSites'
import parseUrl from '@src/util/parseUrl'
import siteEngineRow from '../components/site-engine-row.vue'
import saveBar from '../components/save-bar.vue'
import useUnsavedGuard from '../composables/use-unsaved-guard'

let uidSeed = 0
const ensureUid = (item) => {
  if (!item.__uid) {
    uidSeed += 1
    item.__uid = `s${uidSeed}`
  }
}

export default {
  name: 'sites',
  components: {
    draggable: VueDraggableNext,
    siteEngineRow,
    saveBar
  },
  setup () {
    const localSites = ref([])
    const savedSites = ref([])
    const tabName = ref('')
    const search = ref('')
    const filter = ref('all')
    const editingUid = ref(null)
    const renaming = ref(false)
    const renameInput = ref(null)
    const dialogVisible = ref(false)
    const currentItem = ref(null)
    const elUpload = ref(null)
    const iconCache = ref({})
    const savedSnapshot = ref('')
    let editBackup = null
    let newUid = null

    const { sites } = useSites()
    const personalCategory = computed(() => localSites.value.filter(item => item.name.indexOf('personal') > -1))

    const currentCate = computed(() => localSites.value.find(item => item.name === tabName.value) || null)

    const hiddenCount = computed(() => (currentCate.value?.list || []).filter(i => !i.data.visible).length)

    const displayedList = computed(() => {
      const list = currentCate.value?.list || []
      const keyword = search.value.trim().toLowerCase()
      return list.filter((item) => {
        if (filter.value === 'hidden' && item.data.visible) return false
        if (!keyword) return true
        const text = `${item.nameZh || ''} ${item.url || ''}`.toLowerCase()
        return text.includes(keyword)
      })
    })

    /** 搜索/筛选时禁用拖拽，避免拖到看不见的位置 */
    const sortingDisabled = computed(() => Boolean(search.value.trim()) || filter.value !== 'all')

    const dirty = computed(() => JSON.stringify(formatSites()) !== savedSnapshot.value)

    function clone (value) {
      return JSON.parse(JSON.stringify(value || []))
    }

    function formatSites () {
      return localSites.value.map(item => ({
        ...pickSite(item),
        nameZh: item.nameZh,
        name: item.name,
        list: (item.list || []).map(child => ({
          ...pickSite(child),
          nameZh: child.nameZh,
          url: child.url,
          icon: child.icon || '',
          data: child.data
        })),
        data: item.data
      }))
    }

    function pickSite (item) {
      const copy = { ...item }
      delete copy.__uid
      delete copy.nameZhBackup
      return copy
    }

    function init (val) {
      const next = clone(val)
      next.forEach((cate) => {
        cate.list = Array.isArray(cate.list) ? cate.list : []
        cate.list.forEach(ensureUid)
      })
      localSites.value = next
      savedSites.value = clone(next)
      savedSnapshot.value = JSON.stringify(formatSites())
      editingUid.value = null
      if (!next.some(item => item.name === tabName.value)) {
        tabName.value = next[0]?.name || ''
      }
    }

    watch(sites, (value) => {
      init(value)
    }, { immediate: true })

    getStorage('iconCache').then((iconData) => {
      iconCache.value = iconData || {}
    }).catch(() => {})

    /* ---------- 分类 ---------- */

    function addCategory () {
      // 用时间戳避免删除后重新添加时和已有分类重名（同一 name 会让导航串台）
      const name = `personal-${Date.now()}`
      localSites.value.push({ nameZh: '新分类', name, list: [], data: { visible: true } })
      tabName.value = name
    }

    function startRename () {
      renaming.value = true
      nextTick(() => renameInput.value?.focus?.())
    }

    function moveCategory (delta) {
      const index = localSites.value.findIndex(item => item.name === tabName.value)
      const target = index + delta
      if (index < 0 || target < 0 || target >= localSites.value.length) return
      const list = localSites.value
      ;[list[index], list[target]] = [list[target], list[index]]
      localSites.value = list
    }

    function handleCateCommand (command) {
      if (!currentCate.value) return
      if (command === 'rename') return startRename()
      if (command === 'up') return moveCategory(-1)
      if (command === 'down') return moveCategory(1)
      if (command === 'visible') {
        currentCate.value.data.visible = !currentCate.value.data.visible
        return
      }
      if (command === 'show-all' || command === 'hide-all') {
        const visible = command === 'show-all'
        currentCate.value.list.forEach((item) => { item.data.visible = visible })
        return
      }
      if (command === 'remove') removeCategory()
    }

    function removeCategory () {
      const target = currentCate.value
      if (!target) return
      ElMessageBox.confirm(`确定删除分类「${target.nameZh}」及其 ${target.list.length} 个站点吗？`, '删除分类', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const index = localSites.value.findIndex(item => item.name === target.name)
        localSites.value.splice(index, 1)
        tabName.value = localSites.value[Math.min(index, localSites.value.length - 1)]?.name || ''
      }).catch(() => {})
    }

    /* ---------- 站点 ---------- */

    function addNewUrl () {
      if (!currentCate.value) return
      const item = {
        nameZh: '新网址',
        url: 'https://www.baidu.com/s?wd=%s&ie=utf-8',
        data: { visible: true }
      }
      ensureUid(item)
      currentCate.value.list.push(item)
      editingUid.value = item.__uid
      editBackup = JSON.parse(JSON.stringify(item))
      newUid = item.__uid
    }

    /** 进入编辑态，同时记下快照，取消时用来还原 */
    function startEdit (item) {
      editingUid.value = item.__uid
      editBackup = JSON.parse(JSON.stringify(item))
      newUid = null
    }

    function finishEdit (item, value) {
      if (item && value) {
        item.nameZh = value.nameZh
        item.url = value.url
      }
      editingUid.value = null
      editBackup = null
      newUid = null
    }

    function cancelEdit () {
      const uid = editingUid.value
      const list = currentCate.value?.list || []
      const index = list.findIndex(item => item.__uid === uid)
      if (index > -1) {
        if (newUid === uid) {
          // 新增的站点，取消就直接丢弃
          list.splice(index, 1)
        } else if (editBackup) {
          Object.assign(list[index], editBackup)
        }
      }
      editingUid.value = null
      editBackup = null
      newUid = null
    }

    function clearFilter () {
      search.value = ''
      filter.value = 'all'
    }

    function handleRowCommand (item, command) {
      if (command === 'edit') return startEdit(item)
      if (command === 'icon') return addIcon(item)
      if (command === 'visible') {
        item.data.visible = !item.data.visible
        return
      }
      if (command === 'personal') {
        const personal = personalCategory.value[0]
        if (personal && !personal.list.includes(item)) {
          personal.list.push(item)
          ElMessage.success('已加入常用')
        }
        return
      }
      if (command === 'up' || command === 'down') {
        const list = currentCate.value.list
        const current = list.indexOf(item)
        const target = current + (command === 'up' ? -1 : 1)
        if (target < 0 || target >= list.length) return
        ;[list[current], list[target]] = [list[target], list[current]]
        return
      }
      if (command === 'remove') {
        currentCate.value.list.splice(currentCate.value.list.indexOf(item), 1)
      }
    }

    function isPersonal (cate) {
      return cate.name.indexOf('personal') > -1
    }

    /* ---------- 图标 ---------- */

    function addIcon (item, draft) {
      const { hostname } = parseUrl(draft?.url || item.url || '')
      currentItem.value = { ...item, icon: iconCache.value[hostname] || item.icon || '' }
      dialogVisible.value = true
    }

    function getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onerror = reject
        reader.onloadend = () => resolve(reader.result)
      })
    }

    function handleIconChange (file) {
      if (!/^image\//.test(file.raw.type)) {
        return ElMessage.error(`上传的文件类型为 ${file.raw.type}，请上传图片`)
      }
      getBase64(file.raw).then((res) => {
        currentItem.value.icon = res
      }).catch(() => ElMessage.error('上传失败'))
    }

    function handleIconRemove () {
      currentItem.value.icon = ''
      elUpload.value?.clearFiles?.()
    }

    function iconConfirm () {
      const { hostname } = parseUrl(currentItem.value.url || '')
      iconCache.value[hostname] = currentItem.value.icon || ''
      dialogVisible.value = false
    }

    function iconCancel () {
      currentItem.value = null
      elUpload.value?.clearFiles?.()
      dialogVisible.value = false
    }

    /* ---------- 保存 / 撤销 / 恢复默认 ---------- */

    async function save () {
      await setStorage('sites', formatSites())
      await setStorage('iconCache', iconCache.value)
      savedSites.value = clone(localSites.value)
      savedSites.value.forEach(cate => (cate.list || []).forEach(ensureUid))
      savedSnapshot.value = JSON.stringify(formatSites())
      ElMessage.success('保存成功')
    }

    function revert () {
      localSites.value = clone(savedSites.value)
      localSites.value.forEach(cate => (cate.list || []).forEach(ensureUid))
      editingUid.value = null
      ElMessage.info('已撤销未保存的修改')
    }

    function reset () {
      ElMessageBox.confirm('会清空所有自定义站点与图标，恢复为内置默认数据。确定继续吗？', '恢复默认', {
        confirmButtonText: '恢复默认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delStorage('sites')
        await delStorage('iconCache')
        iconCache.value = {}
        await reloadSites()
        ElMessage.success('已恢复默认数据')
      }).catch(() => {})
    }

    /* ---------- 离开提醒 ---------- */

    useUnsavedGuard(dirty)

    return {
      localSites,
      tabName,
      search,
      filter,
      editingUid,
      renaming,
      renameInput,
      currentCate,
      displayedList,
      hiddenCount,
      sortingDisabled,
      dirty,
      personalCategory,
      dialogVisible,
      currentItem,
      elUpload,
      iconCache,
      addCategory,
      startRename,
      handleCateCommand,
      addNewUrl,
      startEdit,
      finishEdit,
      cancelEdit,
      clearFilter,
      handleRowCommand,
      isPersonal,
      addIcon,
      handleIconChange,
      handleIconRemove,
      iconConfirm,
      iconCancel,
      save,
      revert,
      reset,
      formatSites
    }
  }
}
</script>

<style lang="scss">
.sites-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
}

/* 撑开剩余空间，内容少时保存条贴住视口底部 */
.sites-body {
  display: flex;
  flex: 1;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
}

/* ---------- 分类导航 ---------- */

.site-nav {
  position: sticky;
  top: 0;
  width: 188px;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  border-radius: 10px;
  background: var(--el-bg-color);
  box-shadow: 0 1px 4px rgba(0, 0, 0, .06);

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 7px 10px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    font-size: 13px;
    color: var(--el-text-color-regular);
    cursor: pointer;
    text-align: left;

    &:hover {
      background: var(--el-fill-color-light);
    }

    &.is-active {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
      font-weight: 600;
    }

    &.is-off .nav-label {
      color: var(--el-text-color-disabled);
      text-decoration: line-through;
    }
  }

  .nav-count {
    font-size: 11px;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color);
    border-radius: 8px;
    padding: 0 6px;
    line-height: 16px;
  }

  .nav-add {
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 7px 10px;
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    background: transparent;
    font-size: 13px;
    color: var(--el-text-color-secondary);
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
    }
  }
}

/* ---------- 内容区 ---------- */

.site-panel {
  flex: 1;
  min-width: 0;
  padding: 16px 20px 20px;
  border-radius: 10px;
  background: var(--el-bg-color);
  box-shadow: 0 1px 4px rgba(0, 0, 0, .06);
}

.panel-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.panel-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  cursor: text;
  border-radius: 4px;

  &:hover .title-edit,
  &:focus-visible .title-edit {
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid var(--el-color-primary);
    outline-offset: 2px;
  }
}

.title-edit {
  opacity: 0;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  transition: opacity .15s ease;
}

.rename-input {
  max-width: 260px;
}

.panel-meta {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.panel-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;

  .toolbar-search {
    width: 240px;
  }

  .toolbar-spacer {
    flex: 1;
  }
}

.engine-list {
  min-height: 8px;
}

.empty-state {
  padding: 48px 0;
  text-align: center;

  .empty-title {
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}

/* ---------- 图标上传 ---------- */

.icon-uploader {
  margin-bottom: 12px;
}

.icon-upload-preview {
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border: 1px dashed var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}

/* ---------- 响应式 ---------- */

@media (max-width: 1199px) {
  .sites-body {
    flex-direction: column;
    gap: 12px;
  }

  .site-nav {
    position: static;
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding: 6px;

    .nav-item {
      flex: none;
      white-space: nowrap;
    }

    .nav-add {
      margin-top: 0;
      flex: none;
      white-space: nowrap;
    }
  }
}

@media (max-width: 767px) {
  .site-panel {
    padding: 12px;
  }

  .panel-toolbar {
    flex-wrap: wrap;

    .toolbar-search {
      width: 100%;
    }

    .toolbar-spacer {
      display: none;
    }
  }
}
</style>
