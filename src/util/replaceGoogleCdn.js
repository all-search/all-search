function createScriptElement (file) {
  let jsElm = document.createElement('script')
  jsElm.src = file
  return jsElm
}

export default function () {
  let scripts = document.querySelectorAll('script')
  scripts.forEach(function (script) {
    if (
      script.src.indexOf('googleapis.com') >= 0 ||
      script.src.indexOf('themes.googleusercontent.com') >= 0 ||
      script.src.indexOf('www.google.com/recaptcha/') >= 0
    ) {
      let url = script.src
        .replace('http://', 'https://')
        .replace('googleapis.com', 'proxy.ustclug.org')
        .replace('themes.googleusercontent.com', 'google-themes.lug.ustc.edu.cn')
        .replace('www.google.com/recaptcha/', 'www.recaptcha.net/recaptcha/')
      script.parentNode.replaceChild(createScriptElement(url), script)
    }
  })
}
