import { ElMessageBox } from 'element-plus'

/**
 * 危险操作的二次确认。
 * 取消时 resolve(false) 而不是抛错，调用方可以直接 `if (!await confirmReset(...)) return`。
 */
export default function confirmReset (options: {
  title: string
  message: string
  action?: string
}): Promise<boolean> {
  return ElMessageBox.confirm(options.message, options.title, {
    confirmButtonText: options.action || '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => true).catch(() => false)
}
