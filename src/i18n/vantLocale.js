import { Locale } from "vant"
import enUS from "vant/lib/locale/lang/en-US"
import viVN from "./vi-VN" // 可换成自己的语言包地址
export function vantLocale(lang) {
    switch (lang) {
        case "vi-VN":
            Locale.use("vi-VN", viVN)
            break
        default:
            Locale.use("en", enUS)
            break
    }
}