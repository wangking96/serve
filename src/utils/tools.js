import vue from 'vue'
export function getScrollTop() {
    var scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scroll_top = document.body.scrollTop;
    }
    return scroll_top;
}

export function loadingFn(){
    let serveLoading = null
    serveLoading = vue.prototype.$loading({
        lock: true,
        text: '拼命加载中...',
        customClass: 'customloading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    return serveLoading
}