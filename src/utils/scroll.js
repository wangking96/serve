function fallback(fn) {
    const ms = 16
    const id = setTimeout(fn, ms)
    return id
}

function raf(fn) {
    return (window.requestAnimationFrame || fallback).call(window, fn)
}

function setScrollTop(el, value) {
    if ('scrollTop' in el) {
        el.scrollTop = value
    } else {
        el.scrollTo(el.scrollX, value)
    }
}
export function getScrollTop(el) {
    // iOS scroll bounce cause minus scrollTop
    const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset
    return Math.max(top, 0)
}

function getRootScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}
  
function setRootScrollTop(value) {
    setScrollTop(window, value);
    setScrollTop(document.body, value)
}

let timer = null
export function scrollTopTo(scroller, to, duration, callback) {
    let current = getScrollTop(scroller)
    const isDown = current < to
    const frames = duration === 0 ? 1 : Math.round(duration * 1000 / 16)
    const step = (to - current) / frames

    function animate() {
        current += step

        if (isDown && current > to || !isDown && current < to) {
            current = to
        }

        setScrollTop(scroller, current)

        if (isDown && current < to || !isDown && current > to) {
            raf(animate)
        } else if (callback) {
            raf(callback)
        }
        // if (isDown && current < to || !isDown && current > to) {
        //     timer = setTimeout(animate, 16)
        // } else if (callback) {
        //     timer = setTimeout(callback, 16)
        // }
    }

    animate()
}


function getRect(el, scroller) {
    const rect = {}
    const elRect = el.getBoundingClientRect()
    const scrollerRect = getScrollerRect(scroller)
    rect.height = elRect.height

    if (scroller === window || scroller === document.body) {
      rect.top = elRect.top + getRootScrollTop()
    } else {
      rect.top = elRect.top + getScrollTop(scroller) - scrollerRect.top
    }
    return rect
}
function getScrollerRect(scroller) {
    if (scroller.getBoundingClientRect) {
        return scroller.getBoundingClientRect()
    }
    return {
        top: 0,
        left: 0
    }
}

export function getActiveAnchorIndex(scroller, sticky, stickyOffsetTop) {
    const children = scroller.children
    const scrollTop = getScrollTop(scroller)
    const rects = []

    for (let j = 0; j < children.length; j++) {
        const element = children[j]
        rects.push(getRect(element, scroller))
    }

    for (let i = children.length - 1; i >= 0; i--) {
        const prevHeight = i > 0 ? rects[i - 1].height : 0
        const reachTop = sticky ? prevHeight + stickyOffsetTop : 0
        // console.log(scrollTop, reachTop, rects[i].top)
        if (scrollTop + reachTop >= rects[i].top) {
            return i
        }
    }
    return -1
}
let p = 0, t = 0
export function getIndex(scroller) {
    let direction = 0
    const children = scroller.children
    const scrollTop = getScrollTop(scroller)

    p = scrollTop
    if (t < p) {
        // 下滚
        // console.log('下滚')
        direction = 0
    } else {
        // 上滚
        // console.log('上滚')
        direction = 1
    }
    setTimeout(() => {
        t = p
    }, 0)

    for (let i = 0; i < children.length; i++) {
        const element = children[i]
        
        if (direction) {
            // 上滚
            const scrollerRect = getScrollerRect(scroller)
            const elRect = element.getBoundingClientRect()
            const range = scrollerRect.top - elRect.top
            const height = element.offsetHeight
            const bottom = scroller.offsetHeight - (height - range)
            if (Math.abs(bottom) < 50) {
                return { index: i, direction }
            }
        } else {
            // 下滚
            const top = scrollTop - element.offsetTop
            if (Math.abs(top) < 50) {
                return { index: i, direction }
            }
        }
    }
    return { index: -1, direction }
}