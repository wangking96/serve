export const debounce = (fn, delay=200) => {
    let timer = null;
    return function () {
        const args = arguments;
        const that = this;
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(that, args)
        }, delay)
    }
}

export const throttle = (fn, delay=200) => {
    let previous;
    return function () {
        const that = this;
        const args = arguments;
        const now = Date.now();
        if(now - previous > delay) {
            fn.apply(that, args);
        }
    }
}