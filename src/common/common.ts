import { 
    getDocumentTop,
    getWindowHeight,
    getScrollHeight, 
} from "./scroll";

// 足球赛事状态
export const statusList:any = {
    0: '比赛异常', 
    1: '未开赛',
    2: '上半场',
    3: '中场',
    4: '下半场',
    5: '加时赛',
    6: '加时赛(弃用)',
    7: '点球决战',
    8: '完场',
    9: '推迟',
    10: '中断',
    11: '腰斩',
    12: '取消',
    13: '待定'
};

// 蓝球赛事状态
// 0 比赛异常,
// 1 未开赛,
// 2 第一节,
// 3 第一节完,
// 4 第二节,
// 5 第二节完,
// 6 第三节,
// 7 第三节完,
// 8 第四节,
// 9 加时,
// 10 完场,
// 11 中断,
// 12 取消,
// 13 延期,
// 14 腰斩,
// 15 待定

enum basketballPotition {
    C = '中锋',
    F = '前锋',
    SF = '小前锋',
    PF = '大前锋',
    G = '后卫',
    SG = '得分后卫',
    PG = '组织后卫'
}
enum footballPotition {
    D = '后卫',
    F = '前锋',
    G = '守门员',
    M = '中场'
}

// 球员位置 1.足球   2.篮球
export const positionFn = (key:number, poIndex:number) :void => {
    const positionObj:any = {
        1: footballPotition,
        2: basketballPotition
    }
    return positionObj[key][poIndex] || '未知'
}

// 赛事状态颜色
const basketballBlue:number[] = [1, 9, 13, 15];
const basketballGreen:number[] = [2, 3, 4, 5, 6, 7, 8];
const basketballGray:number[] = [0, 10, 11, 12];

const footballBlue:number[] = [1, 9, 13, 14, 15];
const footballGreen:number[] = [2, 3, 4, 5, 6, 7];
const footballGray:number[] = [0, 8, 10, 11, 12];

const statusObj: any = {
    1: {
        blue: footballBlue,
        green: footballGreen,
        gray: footballGray,
    },
    2: {
        blue: basketballBlue,
        green: basketballGreen,
        gray: basketballGray,
    }
}
export const getColor = (key: number|any, status: number|any) => {
    // key: 1.足球 2.篮球
    if (statusObj[key].blue.includes(status)) {
        return "#3C8BF7";
    } else if (statusObj[key].green.includes(status)) {
        return "#3BB40C";
    } else if (statusObj[key].gray.includes(status)) {
        return "#939393";
    }
};

 // 滚动到底部
 export const scrollToBottom = (callback:any) => {
    window.onscroll = function () {
        //监听事件内容
        if (getScrollHeight() <= getWindowHeight() + getDocumentTop()) {
            //当滚动条到底时,这里是触发内容
            callback && callback(true);
        }else{
            callback && callback(false);
        }
    };
};
// 获取滚动高度
export const getScrollTop = () => {
    var scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scroll_top = document.body.scrollTop;
    }
    return scroll_top;
}

// 获取元素offsetTop
export const getMainTop = ((el: string):number => {
    const main:HTMLElement | null = document.querySelector(el);
    const top:number = main && main.offsetTop || 0;
    return top
})

    // 计算总和
export const getTotal = (list: number[], type: number|any):number => {
    if(type === 2) {
        return list.reduce((sum, cur) => {
            return sum + cur < 0 ? 0 : sum + cur;
        }, 0);
    }else{
        return list[0] + list[5]
    }
};