import { PropType, ComponentPublicInstance, unref, Ref } from "vue";

/**
 * @Description: 检测设备 ;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export const inBrowser = typeof window !== "undefined";
export function isAndroid(): boolean {
  return inBrowser ? /android/.test(navigator.userAgent.toLowerCase()) : false;
}

export function isIOS(): boolean {
  return inBrowser
    ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    : false;
}

/**
 * @Description: 检查类型 ;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */

export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === "object";
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isNumeric(val: string | number): val is string {
  return typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
}

export function isNaN(val: number): val is typeof NaN {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }

  // eslint-disable-next-line no-self-compare
  return val !== val;
}

export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}

/**
 * @Description:  vue类型;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */

// unknown type for Vue prop
export const UnknownProp = (null as unknown) as PropType<unknown>;

// eslint-disable-next-line
export type ComponentInstance = ComponentPublicInstance<{}, any>;

/**
 * @Description:检查手机号  ;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export function isMobile(value: string): boolean {
  value = value.replace(/[^-|\d]/g, "");
  return (
    /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
  );
}

/**
 * @Description:  检查时间;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export function isDate(val: unknown): val is Date {
  return (
    Object.prototype.toString.call(val) === "[object Date]" &&
    !isNaN((val as Date).getTime())
  );
}

/**
 * @Description:  深度克隆;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export function deepClone<T extends Record<string, any> | null | undefined>(
  obj: T
): T {
  if (!isDef(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return (obj.map((item) => deepClone(item)) as unknown) as T;
  }

  if (typeof obj === "object") {
    const to = {} as Record<string, any>;
    Object.keys(obj).forEach((key) => {
      to[key] = deepClone(obj[key]);
    });

    return to as T;
  }

  return obj;
}

/**
 * @Description:  dom事件;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export function stopPropagation(event: Event) {
  event.stopPropagation();
}

export function preventDefault(event: Event, isStopPropagation?: boolean) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}

export function trigger(target: Element, type: string) {
  const inputEvent = document.createEvent("HTMLEvents");
  inputEvent.initEvent(type, true, true);
  target.dispatchEvent(inputEvent);
}

/**
 * @Description:  是否隐藏元素;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export function isHidden(
  elementRef: HTMLElement | Ref<HTMLElement | undefined>
) {
  const el = unref(elementRef);
  if (!el) {
    return false;
  }

  const style = window.getComputedStyle(el);
  const hidden = style.display === "none";

  // offsetParent returns null in the following situations:
  // 1. The element or its parent element has the display property set to none.
  // 2. The element has the position property set to fixed
  const parentHidden = el.offsetParent === null && style.position !== "fixed";

  return hidden || parentHidden;
}

/**
 * @Description:  滚动;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export type ScrollElement = Element | Window;

function isWindow(val: unknown): val is Window {
  return val === window;
}

export function getScrollTop(el: ScrollElement): number {
  const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
}

export function setScrollTop(el: ScrollElement, value: number) {
  if ("scrollTop" in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

export function getRootScrollTop(): number {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function setRootScrollTop(value: number) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}

// get distance from element top to page top or scroller top
export function getElementTop(el: ScrollElement, scroller?: ScrollElement) {
  if (isWindow(el)) {
    return 0;
  }

  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}

export function getVisibleHeight(el: ScrollElement) {
  if (isWindow(el)) {
    return el.innerHeight;
  }
  return el.getBoundingClientRect().height;
}

export function getVisibleTop(el: ScrollElement) {
  if (isWindow(el)) {
    return 0;
  }
  return el.getBoundingClientRect().top;
}

// hack for iOS12 page scroll
// see: https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800
export function resetScroll() {
  if (isIOS()) {
    setRootScrollTop(getRootScrollTop());
  }
}

/**
 * @Description:  生成随机数范围;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * @Description: 防抖和节流 ;
 * @Param:  ;
 * @Return:  ;
 * @Author: Full
 */
export const debounce = (fn: Function, debTime: number) => {
  let timer: any = null;
  return (debTime: number, ...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, debTime);
  };
};

export const throttle = (fn: Function, rateTime: number) => {
  let prev = Date.now() - rateTime;
  return (...args: any[]) => {
    if (Date.now() - prev >= rateTime) {
      fn.apply(this, args);
      prev = Date.now();
    }
  };
};
