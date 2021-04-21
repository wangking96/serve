import { defineComponent, onMounted, reactive, ref, Ref} from 'vue';
import classnames from "classnames";

import './index.scss'

const Tabs = defineComponent({
    props: {
        tabsList: Array as any,
        slotName: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        let curTabs:any = reactive({
            id: 1,
            left: 0,
            lineWidth: 0,
            title: '',
            title_icon: ''
        })
        let curIndex:number | any = ref(0)
        
        onMounted(() => {
            initTabs()
        })
        const initTabs = (() => {
            if(!props.tabsList || props.tabsList.length === 0) return
            let mainTabs:Element|any = document.querySelectorAll('.tabs-navbar-item');
            let left:number = 0
            for (let i = 0; i < props.tabsList.length; i++) {
                props.tabsList[i].lineWidth =  mainTabs?.[i].offsetWidth
                props.tabsList[i].left = left;
                left += mainTabs?.[i].offsetWidth
                if(curTabs.id === props.tabsList[i].id) {
                    curTabs.id = props.tabsList[i].id
                    curTabs.title = props.tabsList[i].title
                    curTabs.left = props.tabsList[i].left
                    curTabs.lineWidth = props.tabsList[i].lineWidth
                }
            }
        })
        const tabsClick = ((tab: object|any, index: number|any) => {
            curTabs.id = tab.id;
            curTabs.title = tab.title;
            curTabs.left = tab.left;
            curTabs.lineWidth = tab.lineWidth;
            curIndex.value = index
        })

        return () => (
            <div class="tabs">
                <div class="tabs-navbar">
                    {
                        (props.tabsList && props.tabsList.length > 0) && props.tabsList.map((item:any, index:any) => (
                            <div 
                                class={classnames('tabs-navbar-item', {'active': curTabs.id === item.id})} 
                                onClick={() => tabsClick(item, index)}
                                key={item.id}>
                                <img src={item.title_icon} alt=""/>
                                { item.title }
                            </div>
                        ))
                    }
                    <div class="tabs-navbar-line" style={{width: curTabs.lineWidth + 'px', left: curTabs.left + 'px'}}></div>
                </div>
                <div class="tabs-content">
                    <div class="tabs-content-animation" style={{transform: 'translateX(-' + curIndex.value * 100 + '%)'}}>
                        { props.slotName }
                    </div>
                </div> 
            </div>
        )
    }
})

export default Tabs