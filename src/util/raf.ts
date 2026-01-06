class Raf {
  private _timerIdMap: {
    timeout: Record<symbol, number>;
    interval: Record<symbol, number>;
  };

  constructor () {
    this._timerIdMap = {
      timeout: {},
      interval: {}
    }
  }

  private run (type: 'timeout' | 'interval' = 'interval', handler: () => void, interval: number = 16.7): symbol {
    const now = Date.now
    let stime = now()
    let etime = stime
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
        if (type === 'timeout') {
          this.clearTimeout(timerSymbol)
        }
      }
    }
    
    this.setIdMap(timerSymbol, type, loop)
    return timerSymbol
  }

  private setIdMap (timerSymbol: symbol, type: 'timeout' | 'interval', loop: () => void): void {
    this._timerIdMap[type][timerSymbol] = requestAnimationFrame(loop)
  }

  setTimeout (handler: () => void, timeout?: number): symbol {
    return this.run('timeout', handler, timeout)
  }

  clearTimeout (timer: symbol): void {
    if (this._timerIdMap.timeout[timer]) {
      cancelAnimationFrame(this._timerIdMap.timeout[timer])
      delete this._timerIdMap.timeout[timer]
    }
  }

  setInterval (handler: () => void, timeout?: number): symbol {
    return this.run('interval', handler, timeout)
  }

  clearInterval (timer: symbol): void {
    if (this._timerIdMap.interval[timer]) {
      cancelAnimationFrame(this._timerIdMap.interval[timer])
      delete this._timerIdMap.interval[timer]
    }
  }
}

export default new Raf()
