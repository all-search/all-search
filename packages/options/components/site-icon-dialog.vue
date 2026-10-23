<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import parseUrl from '@src/util/parseUrl'
import { normalizeUploadedIcon } from '@src/util/favicon'

/**
 * 站点图标弹窗：上传 / 预览 / 删除。
 *
 * 只管「这一个站点当前的图标长什么样」，不碰存储：
 * 确定时把 hostname 和最终图标交给父组件，由它写 iconCache。
 */
const props = defineProps<{
  modelValue: boolean
  /** 当前编辑的站点（url 取草稿，改过域名后图标要落在新域名上） */
  site?: { url?: string, icon?: string } | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm', payload: { hostname: string, icon: string }): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const uploader = ref<any>(null)
const icon = ref('')
const hostname = ref('')

const open = () => {
  const parsed = parseUrl(props.site?.url || '')
  hostname.value = parsed.hostname
  icon.value = props.site?.icon || ''
  // 不清理的话 :limit="1" 会让第二次上传的 on-change 不再触发
  uploader.value?.clearFiles?.()
}

watch(() => props.modelValue, (value) => {
  if (value) open()
})

function getBase64 (file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onerror = reject
    reader.onloadend = () => resolve(String(reader.result || ''))
  })
}

async function handleChange (file: any) {
  if (!/^image\//.test(file.raw?.type || '')) {
    return ElMessage.error(`上传的文件类型为 ${file.raw?.type}，请上传图片`)
  }
  try {
    const base64 = await getBase64(file.raw)
    // 统一压成 32×32 PNG，顺手拦掉超大的图（存储是 localStorage / chrome.storage）
    const normalized = await normalizeUploadedIcon(base64)
    if (!normalized) {
      return ElMessage.error('图片过大或无法识别，请换一张小图（32×32 左右最佳）')
    }
    icon.value = normalized
  } catch {
    ElMessage.error('上传失败')
  }
}

function handleRemove () {
  icon.value = ''
  uploader.value?.clearFiles?.()
}

function cancel () {
  uploader.value?.clearFiles?.()
  visible.value = false
}

function confirm () {
  uploader.value?.clearFiles?.()
  visible.value = false
  if (!hostname.value) return
  emit('confirm', { hostname: hostname.value, icon: icon.value })
}
</script>

<template>
  <el-dialog
    v-model="visible"
    title="编辑图标"
    width="420px">
    <el-upload
      ref="uploader"
      class="icon-uploader"
      action="#"
      :limit="1"
      :auto-upload="false"
      :show-file-list="false"
      accept="image/*"
      :on-change="handleChange">
      <el-button type="primary">
        上传
      </el-button>
      <template #tip>
        <div class="el-upload__tip">
          请尽量上传小于 20kb 的图片，以避免性能问题
        </div>
      </template>
    </el-upload>
    <template v-if="icon">
      <div class="icon-upload-preview">
        <img
          :src="icon"
          alt="">
      </div>
      <el-button
        type="danger"
        @click="handleRemove">
        删除
      </el-button>
    </template>
    <template #footer>
      <el-button
        type="primary"
        @click="confirm">
        确定
      </el-button>
      <el-button @click="cancel">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss">
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
</style>
