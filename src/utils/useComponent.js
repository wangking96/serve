import Vue from 'vue'
import { 
    Carousel, 
    CarouselItem, 
    Pagination, 
    MessageBox, 
    Message, 
    Loading,
    Select,
    Option,
    Upload,
    Dialog 
} from 'element-ui'
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'

const components = [
    Carousel,
    CarouselItem,
    Pagination,
    Select,
    Option,
    Upload,
    Dialog,
    infiniteScroll  
]
components.forEach(item => {
    Vue.use(item)
})


Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$loading = Loading.service;

Vue.prototype.$moment = moment

Vue.prototype.$baseImg = 'http://red.shortbak.com/'
// Vue.prototype.$baseImg = process.env.NODE_ENV === 'development' ? 'http://red.shortbak.com/' : ''