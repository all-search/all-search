export default function addScript (url) {
  let script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.src = url
  document.documentElement.appendChild(script)
}
