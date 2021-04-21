/**
 * 声明 文件后缀名
 */
declare module '*.less';
declare module '*.sass';
declare module '*.scss';
declare module '*.json';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.js';

/**
 * 声明 第三方模块
 */
declare module 'react-components';
declare module 'swiper';


declare module '*.vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
