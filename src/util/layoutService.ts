import { getAsRoot } from './dom'
import { mountToPage, MountMode } from './mount'
import { setStorage } from './storage'

/**
 * 布局服务：统一管理宿主元素的挂载和布局模式切换
 */
export const LayoutService = {
  /**
   * 刷新当前布局位置
   * @param mode 指定模式
   * @param targetHost 可选的宿主元素，若不指定则通过 getAsRoot() 获取
   */
  refresh(mode: MountMode, targetHost?: HTMLElement): void {
    const host = targetHost || getAsRoot()
    if (host) {
      mountToPage(host, mode)
      
      // 更新宿主元素的类名，以便外部 CSS (global.scss) 响应
      const direction = (mode === 'left' || mode === 'right') ? 'vertical' : 'horizontal'
      
      host.classList.remove(
        'as-host-top', 'as-host-bottom', 'as-host-left', 'as-host-right',
        'as-host-horizontal', 'as-host-vertical'
      )
      host.classList.add(`as-host-${mode}`)
      host.classList.add(`as-host-${direction}`)
    }
  },

  /**
   * 切换布局模式并持久化
   */
  async setMode(mode: MountMode): Promise<void> {
    this.refresh(mode)
    await setStorage('mode', mode)
    
    // 广播事件，供跨组件/跨环境同步
    window.dispatchEvent(new CustomEvent('as-layout-change', { 
      detail: { mode } 
    }))
  }
}
