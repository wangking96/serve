import Vue from 'vue'
import { 
    Carousel,
    CarouselItem
} from 'element-ui'

const arr = [
    Carousel,
    CarouselItem
]

arr.forEach(item => {
    Vue.use(item)
})