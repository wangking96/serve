import { defineComponent, onUnmounted, onUpdated } from 'vue';
import classnames from 'classnames';

import './index.scss';

const Message = defineComponent({
    props: {
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'info'
        },
        hide: {
            type: Function
        },
        show: {
            type: Function
        },
        duration: {
            type: Number,
            default: 2000
        }
    },
    setup(props) {
        let timeout:any = null
        onUpdated(() => {
            props.show && props.show()
        })

        onUnmounted(() => {
            clearTimeout(timeout)
        })

        timeout = setTimeout(() => {
            props.hide && props.hide()
        }, props.duration);

        return () => (
            <div class={ classnames('ball-live-message', 'ball-live-message-' + props.type) }>
                { props.text }    
            </div>
        )
    }
})

export default Message;