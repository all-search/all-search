import { createApp } from 'vue'
import index from '@src/index.vue'
import { initTmMethods } from '@src/util/storage'
import { getStorage } from '@src/util/storage'

async function init (): Promise<void> {
  initTmMethods()
  const mode = await getStorage<string>('mode') || 'top'

  let host = document.getElementById('all-search')
  if (!host) {
    host = document.createElement('div')
    host.id = 'all-search'
    if (mode === 'bottom') {
      document.documentElement.appendChild(host)
    } else {
      document.documentElement.insertBefore(host, document.body)
    }
  }

  // 手动创建 Shadow Root
  const shadowRoot = host.shadowRoot || host.attachShadow({ mode: 'open' })
  
  // 模拟 WXT 的结构: html > head + body
  let mockHtml = shadowRoot.querySelector('html')
  if (!mockHtml) {
    mockHtml = document.createElement('html')
    const mockHead = document.createElement('head')
    const mockBody = document.createElement('body')
    mockBody.id = 'as-mount-anchor'
    mockHtml.appendChild(mockHead)
    mockHtml.appendChild(mockBody)
    shadowRoot.appendChild(mockHtml)
  }

  const mountAnchor = shadowRoot.getElementById('as-mount-anchor')
  
  // 抛出事件通知 vite-plugin-monkey 的 cssSideEffects 注入样式
  window.dispatchEvent(new CustomEvent('as-inject-style'))
  
  // 开发模式补丁：vite-plugin-monkey 在 dev 模式下可能直接注入到 head
  // 我们需要把这些样式搬进 shadowRoot 内部的 head，否则 Shadow DOM 内部无样式
  if (process.env.NODE_ENV === 'development') {
    const migrateStyles = () => {
      const mockHead = shadowRoot.querySelector('head');
      if (!mockHead) return;
      
      const styles = document.querySelectorAll('style[data-vite-dev-id]');
      styles.forEach(style => {
        const devId = style.getAttribute('data-vite-dev-id') || '';
        // 仅搬运属于本项目 (all-search) 的样式，避免污染
        if (devId.includes('all-search') && !mockHead.contains(style)) {
          mockHead.appendChild(style.cloneNode(true));
        }
      });
    };
    migrateStyles();
    // 监听 head 变化，持续迁移热更新的样式
    const observer = new MutationObserver(migrateStyles);
    observer.observe(document.head, { childList: true });
  }

  // 检查是否已经挂载过（防止某些情况下重复执行）
  if (!(host as any).__vue_app__ && mountAnchor) {
    const app = createApp(index)
    app.mount(mountAnchor)
    ;(host as any).__vue_app__ = app
  }
}

init()
