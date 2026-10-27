<template>
  <div
    class="sites-page"
    :data-hydrated="hydrated ? '1' : '0'">
    <div class="sites-body">
    <!-- 分类导航 -->
    <nav
      class="site-nav"
      aria-label="分类">
      <draggable
        v-model="localSites"
        class="nav-list"
        :animation="150"
        :disabled="renaming"
        :force-fallback="true"
        :fallback-tolerance="4"
        :delay="DRAG_DELAY"
        :delay-on-touch-only="true"
        :touch-start-threshold="TOUCH_THRESHOLD"
        @start="dragging = true"
        @end="dragging = false">
        <button
          v-for="cate in localSites"
          :key="cate.name"
          type="button"
          class="nav-item"
          :class="{ 'is-active': tabName === cate.name, 'is-off': !cate.data.visible }"
          :aria-current="tabName === cate.name ? 'true' : undefined"
          :title="`${cate.nameZh}：点击切换，拖动排序（触屏需长按）`"
          @click="tabName = cate.name">
          <span class="nav-label">{{ cate.nameZh }}</span>
          <span class="nav-count">{{ cate.list.length }}</span>
        </button>
      </draggable>
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
                command="fetch-icons"
                :disabled="!currentCate.list.length || fetching">
                抓取本分类图标
              </el-dropdown-item>
              <el-dropdown-item
                command="clear-icons"
                :disabled="!currentCate.list.length">
                清除本分类图标缓存
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
          <el-radio-button value="all">
            全部
          </el-radio-button>
          <el-radio-button value="hidden">
            已隐藏
          </el-radio-button>
        </el-radio-group>
        <span class="toolbar-spacer" />
        <el-button
          :loading="checking"
          :disabled="!displayedList.length"
          title="用一次真实搜索请求探测本分类的站点，失败的可以一键隐藏"
          @click="checkReachability">
          <el-icon><Connection/></el-icon>
          {{ checking ? '检测中…' : '检测可达性' }}
        </el-button>
        <el-button
          type="primary"
          @click="addNewUrl">
          <el-icon><Plus/></el-icon>
          添加站点
        </el-button>
      </div>

      <!-- 检测结果汇总 -->
      <div
        v-if="deadCount > 0"
        class="check-result">
        <span>检测到 <b>{{ deadCount }}</b> 个站点没有响应（可能已下线，或被反爬拦截）。</span>
        <el-button
          text
          type="danger"
          size="small"
          @click="hideDead">
          一键隐藏这些站点
        </el-button>
        <el-button
          text
          size="small"
          @click="clearCheck">
          忽略
        </el-button>
      </div>

      <!-- 站点列表 -->
      <draggable
        v-model="currentCate.list"
        class="engine-list"
        handle=".engine-drag"
        :animation="150"
        :disabled="sortingDisabled"
        :force-fallback="true"
        :delay="DRAG_DELAY"
        :delay-on-touch-only="true"
        :touch-start-threshold="TOUCH_THRESHOLD"
        @start="dragging = true"
        @end="dragging = false">
        <site-engine-row
          v-for="item in displayedList"
          :key="item.__uid"
          :item="item"
          :index="currentCate.list.indexOf(item)"
          :last-index="currentCate.list.length - 1"
          :editing="editingUid === item.__uid"
          :icon-cache="iconCache"
          :sorting-disabled="sortingDisabled"
          :can-add-personal="!isPersonal(currentCate) && personalCategory.length > 0"
          :probe-state="probeStateOf(item)"
          @edit="startEdit(item)"
          @done="finishEdit(item, $event)"
          @cancel="cancelEdit"
          @draft-dirty="editingDirty = $event"
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

    <site-icon-dialog
      v-model="dialogVisible"
      :site="currentItem"
      @confirm="handleIconConfirm" />
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { ElMessage } from 'element-plus'
import { EditPen, MoreFilled, Plus, Search, Connection } from '@element-plus/icons-vue'
import { delStorage, getStorage, setStorage } from '@src/util/storage'
import useSites, { reloadSites } from '@src/components/useSites'
import parseUrl from '@src/util/parseUrl'
import { fetchIconDataUrl, trimIconCache } from '@src/util/favicon'
import siteEngineRow from '../components/site-engine-row.vue'
import saveBar from '../components/save-bar.vue'
import siteIconDialog from '../components/site-icon-dialog.vue'
import useUnsavedGuard from '../composables/use-unsaved-guard'
import confirmReset from '../composables/confirm-reset'
import { probeSites } from '../composables/site-check'

let uidSeed = 0
const ensureUid = (item) => {
  if (!item.__uid) {
    uidSeed += 1
    item.__uid = `s${uidSeed}`
  }
}

/**
 * 触屏上长按多久才开始拖拽。
 * 移动端分类是横向滚动的，手指一按就进入拖拽会和横滑抢手势；
 * 桌面（鼠标）不受影响 —— delayOnTouchOnly 只在 touch 事件上生效。
 */
const DRAG_DELAY = 260
/** 按下后移动超过这个距离就判定为滚动/点按，取消拖拽 */
const TOUCH_THRESHOLD = 6

export default {
  name: 'sites',
  components: {
    draggable: VueDraggableNext,
    siteEngineRow,
    saveBar,
    siteIconDialog,
    // Options API 的模板只能看到 components 里注册的东西，
    // 图标不再全局注册（Element Plus 走按需引入），这里要显式登记
    EditPen,
    Connection,
    MoreFilled,
    Plus
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
    /** 正在抓图标，避免重复点触发并发请求 */
    const fetching = ref(false)
    /** 拖拽过程中不接收迟到的存储数据，否则 v-for 重渲染会把拖拽打断 */
    const dragging = ref(false)
    const iconCache = ref({})
    const savedSnapshot = ref('')
    const savedIconSnapshot = ref('{}')
    /** 行内编辑中的草稿是否和原值不同（草稿在子组件里，只有它知道） */
    const editingDirty = ref(false)
    /** 存储里读回来的数据是否已铺到界面；没铺之前不覆盖用户正在编辑的内容 */
    const hydrated = ref(false)
    let editBackup = null
    let newUid = null

    const { sites } = useSites()
    /** 常用分类固定叫 personal，其它自定义分类是 personal-<时间戳> */
    const personalCategory = computed(() => localSites.value.filter(item => item.name === 'personal'))

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

    /* ---------- 可达性检测（issue #35） ---------- */
    /** 正在检测 */
    const checking = ref(false)
    /** url → 检测结果；只保留当前分类的，切分类时清掉 */
    const probeStates = ref({})

    function probeStateOf (item) {
      return probeStates.value[item.url] || undefined
    }

    const deadUrls = computed(() => Object.keys(probeStates.value).filter(url => probeStates.value[url] === 'dead'))
    const deadCount = computed(() => deadUrls.value.length)

    function clearCheck () {
      probeStates.value = {}
    }

    async function checkReachability () {
      const list = displayedList.value.filter(item => typeof item.url === 'string' && item.url)
      if (!list.length || checking.value) return

      checking.value = true
      probeStates.value = {}
      // 先把所有条目标成「检测中」，用户能看到进度
      list.forEach(item => { probeStates.value[item.url] = 'checking' })

      try {
        await probeSites(list.map(item => item.url), (url, state) => {
          probeStates.value = { ...probeStates.value, [url]: state }
        })
        const dead = Object.values(probeStates.value).filter(state => state === 'dead').length
        if (dead) {
          ElMessage.warning(`有 ${dead} 个站点没有响应`)
        } else {
          ElMessage.success('本分类的站点都有响应')
        }
      } finally {
        checking.value = false
      }
    }

    /** 把不可达的站点隐藏（不删，用户还能在「已隐藏」里找回来） */
    function hideDead () {
      const dead = new Set(deadUrls.value)
      ;(currentCate.value?.list || []).forEach((item) => {
        if (dead.has(item.url)) {
          item.data = { ...item.data, visible: false }
        }
      })
      ElMessage.success(`已隐藏 ${dead.size} 个站点，记得保存`)
      clearCheck()
    }

    /**
     * 脏状态 = 站点数据变了 / 图标缓存变了 / 行内还有没提交的草稿。
     * 三者都要算，否则「只传了图标」或「改了一半没点完成」时保存是禁用的。
     *
     * 拆成三个 computed 是为了让 Vue 缓存：行内打字只会翻 editingDirty，
     * 不会每次都把整棵站点树和图标缓存重新 JSON.stringify（满缓存时 0.3~0.6MB）。
     */
    const sitesDirty = computed(() => JSON.stringify(formatSites()) !== savedSnapshot.value)
    const iconsDirty = computed(() => JSON.stringify(iconCache.value) !== savedIconSnapshot.value)
    const dirty = computed(() => sitesDirty.value || iconsDirty.value || editingDirty.value)

    function clone (value) {
      return JSON.parse(JSON.stringify(value || []))
    }

    /** 去掉仅界面用的 __uid，其余字段（包括用户手写的扩展字段）原样保留 */
    function stripUid (item) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __uid, ...rest } = item
      return rest
    }

    function formatSites () {
      return localSites.value.map(cate => ({
        ...stripUid(cate),
        list: (cate.list || []).map(child => ({ ...stripUid(child), icon: child.icon || '' }))
      }))
    }

    function init (val) {
      const next = clone(val)
      next.forEach((cate) => {
        cate.list = Array.isArray(cate.list) ? cate.list : []
        // 老数据 / 手写 JSON 可能没带 data，缺了会让整块界面渲染崩掉
        if (!cate.data || typeof cate.data !== 'object') cate.data = { visible: true }
        cate.list.forEach((child) => {
          if (!child.data || typeof child.data !== 'object') child.data = { visible: true }
          ensureUid(child)
        })
      })
      localSites.value = next
      savedSites.value = clone(next)
      savedSnapshot.value = JSON.stringify(formatSites())
      resetEditing()
      hydrated.value = true
      if (!next.some(item => item.name === tabName.value)) {
        tabName.value = next[0]?.name || ''
      }
    }

    watch(sites, (value) => {
      // 存储在线下页面要等 WebBridge 超时才回来；这期间用户可能已经在拖拽或编辑了，
      // 不能用「刚读到的默认值」把他正在做的事冲掉
      if (hydrated.value && (dirty.value || dragging.value)) return
      init(value)
    }, { immediate: true })

    getStorage('iconCache').then((iconData) => {
      iconCache.value = iconData || {}
      savedIconSnapshot.value = JSON.stringify(iconCache.value)
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

    /** 换分类时把行内编辑收掉，不然草稿会跟着记住的 uid 跑到别的分类里 */
    watch(tabName, () => {
      resetEditing()
    })

    /** 收起行内编辑状态（换分类、完成、取消、撤销都要清） */
    function resetEditing () {
      editingUid.value = null
      editingDirty.value = false
      editBackup = null
      newUid = null
    }

    /** 列表内交换两项；越界就什么都不做 */
    function moveWithin (list, index, delta) {
      const target = index + delta
      if (index < 0 || target < 0 || target >= list.length) return false
      ;[list[index], list[target]] = [list[target], list[index]]
      return true
    }

    function moveCategory (delta) {
      const index = localSites.value.findIndex(item => item.name === tabName.value)
      if (moveWithin(localSites.value, index, delta)) {
        // 触发视图更新（数组本身是同一个引用）
        localSites.value = [...localSites.value]
      }
    }

    function handleCateCommand (command) {
      if (!currentCate.value) return
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
      if (command === 'fetch-icons') return fetchCategoryIcons()
      if (command === 'clear-icons') return clearCategoryIcons()
      if (command === 'remove') removeCategory()
    }

    async function removeCategory () {
      const target = currentCate.value
      if (!target) return
      const ok = await confirmReset({
        title: '删除分类',
        message: `确定删除分类「${target.nameZh}」及其 ${target.list.length} 个站点吗？`,
        action: '删除'
      })
      if (!ok) return
      const index = localSites.value.findIndex(item => item.name === target.name)
      localSites.value.splice(index, 1)
      tabName.value = localSites.value[Math.min(index, localSites.value.length - 1)]?.name || ''
    }

    /* ---------- 站点 ---------- */

    function addNewUrl () {
      if (!currentCate.value) return
      // 正在编辑的旧行先收掉，否则会留下一条看不见的半成品
      if (editingUid.value) cancelEdit()
      // 搜索/筛选生效时新行看不见，先清掉条件
      clearFilter()
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
      editingDirty.value = false
    }

    function finishEdit (item, value) {
      if (item && value) {
        item.nameZh = value.nameZh
        item.url = value.url
      }
      resetEditing()
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
      resetEditing()
    }

    function clearFilter () {
      search.value = ''
      filter.value = 'all'
    }

    function handleRowCommand (item, command) {
      if (command === 'edit') return startEdit(item)
      if (command === 'icon') return addIcon(item)
      if (command === 'fetch-icon') return fetchIconFor(item)
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
        moveWithin(currentCate.value.list, currentCate.value.list.indexOf(item), command === 'up' ? -1 : 1)
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

    /**
     * 显式抓取一张图标（联网，按需触发）。
     * 配置页默认是「缓存优先 + 首字母兜底」，不主动请求任何外部服务；
     * 抓到的统一压成 32×32 PNG 再进 iconCache，一行 1–2KB。
     */
    async function fetchIconFor (item) {
      const { hostname } = parseUrl(item.url || '')
      if (!hostname) return ElMessage.warning('这一行没有有效的网址')
      if (iconCache.value[hostname]) return ElMessage.info('已经有缓存的图标了')
      fetching.value = true
      try {
        const dataUrl = await fetchIconDataUrl(item.url, item.icon)
        if (!dataUrl) {
          return ElMessage.warning('没抓到可缓存的图标，可以手动上传一个')
        }
        iconCache.value[hostname] = dataUrl
        ElMessage.success('已抓取，记得保存')
      } finally {
        fetching.value = false
      }
    }

    /** 批量抓取当前分类里还没有图标的站点；跳过着已经有的，静默忽略失败 */
    async function fetchCategoryIcons () {
      const list = currentCate.value?.list || []
      const targets = list.filter((item) => {
        const { hostname } = parseUrl(item.url || '')
        return !!hostname && !iconCache.value[hostname] && !item.icon
      })
      if (!targets.length) return ElMessage.info('本分类的图标都已经有了')
      fetching.value = true
      ElMessage.info(`正在抓取 ${targets.length} 个图标，稍等…`)
      let ok = 0
      try {
        for (const item of targets) {
          const { hostname } = parseUrl(item.url || '')
          const dataUrl = await fetchIconDataUrl(item.url, item.icon)
          if (dataUrl) {
            iconCache.value[hostname] = dataUrl
            ok += 1
          }
        }
      } finally {
        fetching.value = false
      }
      ElMessage({
        type: ok ? 'success' : 'warning',
        message: ok ? `抓到 ${ok}/${targets.length} 个图标，记得保存` : '一个也没抓到，可以手动上传'
      })
    }

    /** 清掉当前分类的图标缓存（用户上传的 item.icon 不动） */
    function clearCategoryIcons () {
      const list = currentCate.value?.list || []
      let removed = 0
      list.forEach((item) => {
        const { hostname } = parseUrl(item.url || '')
        if (hostname && iconCache.value[hostname]) {
          delete iconCache.value[hostname]
          removed += 1
        }
      })
      if (removed) ElMessage.success(`已清除 ${removed} 个图标缓存`)
      else ElMessage.info('本分类没有缓存过图标')
    }

    function addIcon (item, draft) {
      const url = draft?.url || item.url || ''
      const { hostname } = parseUrl(url)
      // 用草稿里的 URL：改过域名后图标要落在新域名上，否则永远显示不出来
      currentItem.value = { ...item, url, icon: iconCache.value[hostname] || item.icon || '' }
      dialogVisible.value = true
    }

    function handleIconConfirm ({ hostname, icon }) {
      if (!hostname) return
      // 确定时写缓存，「保存」再把它落盘；空字符串表示用户删掉了图标
      iconCache.value[hostname] = icon
      currentItem.value = null
    }

    /* ---------- 保存 / 撤销 / 恢复默认 ---------- */

    async function save () {
      // 图标缓存是「读-改-写」：内容脚本在用户浏览时也会往里加图标，
      // 整份覆盖会把这段时间新缓存的图标丢掉
      let latestIcons = {}
      try {
        latestIcons = (await getStorage('iconCache')) || {}
      } catch {
        latestIcons = {}
      }
      const mergedIcons = trimIconCache({ ...latestIcons, ...iconCache.value })

      await setStorage('sites', formatSites())
      await setStorage('iconCache', mergedIcons)
      iconCache.value = mergedIcons

      // 让共享的 sites 数据跟着更新，否则切到「编辑」页看到的还是旧数据，
      // 在那里点保存会把刚存的东西覆盖回去
      await reloadSites()

      savedSites.value = clone(localSites.value)
      savedSites.value.forEach(cate => (cate.list || []).forEach(ensureUid))
      savedSnapshot.value = JSON.stringify(formatSites())
      savedIconSnapshot.value = JSON.stringify(mergedIcons)
      ElMessage.success('保存成功')
    }

    function revert () {
      localSites.value = clone(savedSites.value)
      localSites.value.forEach(cate => (cate.list || []).forEach(ensureUid))
      iconCache.value = JSON.parse(savedIconSnapshot.value || '{}')
      resetEditing()
      ElMessage.info('已撤销未保存的修改')
    }

    async function reset () {
      const ok = await confirmReset({
        title: '恢复默认',
        message: '会清空所有自定义站点与图标，恢复为内置默认数据。确定继续吗？',
        action: '恢复默认'
      })
      if (!ok) return
      await delStorage('sites')
      await delStorage('iconCache')
      iconCache.value = {}
      savedIconSnapshot.value = '{}'
      hydrated.value = false
      await reloadSites()
      ElMessage.success('已恢复默认数据')
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
      editingDirty,
      personalCategory,
      dialogVisible,
      currentItem,
      iconCache,
      fetching,
      dragging,
      hydrated,
      // 模板里的 :prefix-icon="Search" 是表达式取值，Options API 只能从 setup 返回值里拿到
      Search,
      // 可达性检测（issue #35）
      checking,
      probeStates,
      probeStateOf,
      deadCount,
      checkReachability,
      hideDead,
      clearCheck,
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
      handleIconConfirm,
      save,
      revert,
      reset,
      formatSites,
      DRAG_DELAY,
      TOUCH_THRESHOLD
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
  width: 208px;
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  border-radius: 10px;
  background: var(--el-bg-color);
  box-shadow: 0 1px 4px rgba(0, 0, 0, .06);
  /* 视口矮于一整列分类时，导航自己滚，不然底部几项点不到（sticky 会一直吸在顶上） */
  max-height: calc(100vh - 100px);
  overflow-y: auto;

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-height: 40px;
    padding: 9px 12px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    font-size: 14px;
    color: var(--el-text-color-regular);
    cursor: pointer;
    text-align: left;
    user-select: none;
    transition: background-color .15s ease, color .15s ease;

    .nav-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover {
      background: var(--el-fill-color-light);
    }

    /* 触屏长按时的按下反馈，让用户知道「按住」已经生效 */
    &:active {
      background: var(--el-fill-color);
    }

    &:focus-visible {
      outline: 2px solid var(--el-color-primary);
      outline-offset: 2px;
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
    flex: none;
    min-width: 22px;
    padding: 0 7px;
    border-radius: 9px;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: var(--el-text-color-secondary);
    background: var(--el-fill-color);
  }

  .nav-add {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-height: 40px;
    padding: 9px 12px;
    border: 1px dashed var(--el-border-color);
    border-radius: 8px;
    background: transparent;
    font-size: 13px;
    color: var(--el-text-color-secondary);
    cursor: pointer;

    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary);
    }

    &:focus-visible {
      outline: 2px solid var(--el-color-primary);
      outline-offset: 2px;
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
  border-radius: 4px;

  .site-panel & {
    cursor: text;
  }

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

/* 「检测可达性」的结果条：只在检出不可达站点时出现 */
.check-result {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
  margin-bottom: 10px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--el-color-danger);
  background: var(--el-color-danger-light-9);
  border-radius: 8px;

  b {
    font-weight: 600;
  }
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

/* ---------- 图标上传样式已随 site-icon-dialog.vue 移走 ---------- */

/* ---------- 响应式 ---------- */

@media (max-width: 1199px) {
  .sites-body {
    flex-direction: column;
    gap: 12px;
  }

  .site-nav {
    position: static;
    width: 100%;
    max-height: none;
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 8px;

    .nav-list {
      flex-direction: row;
    }

    .nav-item {
      flex: none;
      min-height: 36px;
      white-space: nowrap;
    }

    .nav-add {
      margin-top: 0;
      min-height: 36px;
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
