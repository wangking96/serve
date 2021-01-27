
// 简单的节流函数
export function throttle(func, wait, mustRun) {
    let timeout, startTime = new Date()
 
    return function() {
        const context = this,
            args = arguments,
            curTime = new Date()
 
        clearTimeout(timeout)
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun){
            func.apply(context,args)
            startTime = curTime
        // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(func, wait)
        }
    }
}


// 防抖动函数
export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


// 数字补零
export function numBzero(num, x=2) {
    num = String(num)
    while (num.length < x) {
        num = '0' + num
    }
    return num
}

export function replaceSeperator(str, s=',') {
    str = str.replace(/;|,|\s|\n|\|/g, s)
    str = str.replace(s+s, s)
    return str
} 