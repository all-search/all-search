/**
 * 向页面添加脚本
 * @param url 脚本地址
 */
export default function addScript (url: string): void {
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.src = url
  document.documentElement.appendChild(script)
}
