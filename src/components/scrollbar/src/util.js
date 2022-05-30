/*
 * @Description:
 * @User: lyy
 * @Date: 2022-05-06 12:18:31
 */
import ResizeObserver from 'resize-observer-polyfill';
export const isArray = Array.isArray;
export const isString = val => typeof val === 'string';
export const toObject = arr => {
    let obj = {};
	arr.map(item => {
		obj[item.key] = item.value;
	});
    return obj;
};
export const SCOPE = 'MElScrollbar';
export const GAP = 4; // top 2 + bottom 2 of bar instance
export const isNumber = val => {
    return typeof obj === 'number' && !isNaN(val);
};
export const debugWarn = (...args) => {
    console.error(...args);
  };
export const resizeHandler = entries => {
    for (const entry of entries) {
      const listeners = entry.target.__resizeListeners__ || [];
      if (listeners.length) {
        listeners.forEach(fn => { fn(); });
      }
    }
  };
  export const addResizeListener = (element, fn) => {
    if (!element.__resizeListeners__) {
      element.__resizeListeners__ = [];
      element.__ro__ = new ResizeObserver(resizeHandler);
      element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
  };
  export const removeResizeListener = (element, fn) => {
    if (!element || !element.__resizeListeners__) return;
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.__ro__.disconnect();
    }
  };

  export const addUnit = value => {
    if (isString(value)) {
      return value;
    } else if (isNumber(value)) {
      return value + 'px';
    }
    debugWarn(SCOPE, '属性 value 必须是 string 或 number 类型');
    return '';
  };

export const on = (
    element,
    event,
    handler,
    useCapture = false
  ) => {
    if (element && event && handler) {
      element.addEventListener(event, handler, useCapture);
    }
  };

  /* istanbul ignore next */
  export const off = (
    element,
    event,
    handler,
    useCapture = false
  ) => {
    if (element && event && handler) {
      element.removeEventListener(event, handler, useCapture);
    }
  };

  export const BAR_MAP = {
    vertical: {
      offset: 'offsetHeight',
      scroll: 'scrollTop',
      scrollSize: 'scrollHeight',
      size: 'height',
      key: 'vertical',
      axis: 'Y',
      client: 'clientY',
      direction: 'top',
    },
    horizontal: {
      offset: 'offsetWidth',
      scroll: 'scrollLeft',
      scrollSize: 'scrollWidth',
      size: 'width',
      key: 'horizontal',
      axis: 'X',
      client: 'clientX',
      direction: 'left',
    },
  };

  export const renderThumbStyle = ({ move, size, bar }) => {
    const style = {};
    const translate = `translate${bar.axis}(${move}%)`;

    style[bar.size] = size;
    style.transform = translate;
    style.msTransform = translate;
    style.webkitTransform = translate;

    return style;
  };
