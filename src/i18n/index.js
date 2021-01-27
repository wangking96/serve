import Vue from "vue"
import VueI18n from "vue-i18n"
// 导入语言包信息
import en from "./locale/en.json"
import viVN from "./locale/vi-VN.json"

import { vantLocale } from './vantLocale'

Vue.prototype.$vantLocale = vantLocale
// 注册i18n
Vue.use(VueI18n)

// 语言包根据语言环境分类
const messages = {
  en,
  "vi-VN": viVN
};
const language = localStorage.getItem("_L")
// 通过选项创建 VueI18n 实例并导出
const i18n = new VueI18n({
  locale: language || 'en', // 设置当前语言环境，默认英文
  messages // 设置语言环境对应信息
});

export default i18n