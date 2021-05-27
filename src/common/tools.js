import moment from 'moment';

const weekObj = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六',
};

export const prevWeek = () => {
    let today = moment().date();
    let prevWeekArr = [];
    for (let i = 14; i > 0; i--) {
        let key = moment().date(today).day() || 0;
        let week = weekObj[key];
        let date = moment().date(today).format("MM-DD");
        prevWeekArr.push({
            date,
            week,
            id: i
        });
        today -= 1;
    }
    return prevWeekArr || [];
}

export const nextWeek = () => {
    let today = moment().date();
    let prevWeekArr = [];
    for (let i = 0; i < 14; i++) {
        let key = moment().date(today).day() || 0;
        let week = weekObj[key];
        let date = moment().date(today).format("MM-DD");
        prevWeekArr.push({
            date,
            week,
            id: i
        });
        today += 1;
    }
    return prevWeekArr || [];
}

export const debounce = (fn, delay = 200) => {
    let timer;
    return function () {
        const that = this;
        const args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(that, args);
        }, delay);
    }
}

//接口验证签名规格
export const encrypt = (obj) => {
    let arr = [],
        str = '',
        key;
    for (key in obj) {
        arr.push(key);
    }
    arr.sort();
    arr.forEach((item) => {
        str += item + '=' + obj[item] + '&';
    })
    str += '76576076c1f5f657b634e966c8836a06';
    return str;
}
export const appSource = () => {
    const u = navigator.userAgent;
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isiOS) {
        return "ios";
    } else {
        return "andriod";
    }
}