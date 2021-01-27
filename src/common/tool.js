// 处理倒计时
export function countdown(n) {
    let h = Math.floor(n / 3600) // 小时
    let m = Math.floor(n % (3600) / 60) // 分
    let s = Math.floor(n % 60) // 秒
    h = h.toString()
    m = m.toString()
    s = s.toString()
    h = h.length <= 1 ? '0' + h : h
    m = m.length <= 1 ? '0' + m : m
    s = s.length <= 1 ? '0' + s : s
    return h + ':' + m + ':' + s
}