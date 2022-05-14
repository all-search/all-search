class Raf {
  constructor () {
    this.init()
  }

  init () {
    this._timerIdMap = {
      timeout: {},
      interval: {}
    }
  }

  run (type = 'interval', handler, interval = 16.7) {
    const now = Date.now
    let stime = now()
    let etime = stime
    // 创建Symbol类型作为key值，保证返回值的唯一性，用于清除定时器使用
    const timerSymbol = Symbol('timerSymbol')
    const loop = () => {
      this.setIdMap(timerSymbol, type, loop)
      etime = now()
      if (etime - stime >= interval) {
        if (type === 'interval') {
          stime = now()
          etime = stime
        }
        handler()
        type === 'timeout' && this.clearTimeout(timerSymbol)
      }
    }
    this.setIdMap(timerSymbol, type, loop)
    return timerSymbol // 返回Symbol保证每次调用setTimeout/setInterval返回值的唯一性
  }

  setIdMap (timerSymbol, type, loop) {
    this._timerIdMap[type][timerSymbol] = requestAnimationFrame(loop)
  }

  setTimeout (handler, timeout) { // 实现setTimeout 功能
    return this.run('timeout', handler, timeout)
  }

  clearTimeout (timer) {
    cancelAnimationFrame(this._timerIdMap.timeout[timer])
  }

  setInterval (handler, timeout) { // 实现setInterval功能
    return this.run('interval', handler, timeout)
  }

  clearInterval (timer) {
    cancelAnimationFrame(this._timerIdMap.interval[timer])
  }
}

export default new Raf()
