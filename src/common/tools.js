export const debounce = (fn, delay=200) => {
    let timer;
    return function () {
        const that = this;
        const args = arguments;
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(that, args);
        }, delay);
    }
}