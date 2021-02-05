
import User from '@/api/user.js'
export const mixinsMethods = {
    data() {
        return {
            codeImg: '',
            status: false,
            timeout: null,
            submiteText: '确定',
            codeObj: {}
        }
    },
    methods: {
        getCodeFn(){
            User.getCode().then(res => {
                if(res._captcha_id) {
                    this.codeObj = res
                }
            })
        },
        hideDialogFn(){
            let dialog = document.querySelector('.dialog')
            let wrap = dialog.querySelector('.dialog-wrap')
            wrap.style.marginTop = '-50vh'
            this.timeout = setTimeout(() => {
                document.body.removeChild(dialog)
                document.body.className = ''
            }, 280)
        }
    }
}