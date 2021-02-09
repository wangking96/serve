<template>
    <div class="editor">
        <editor api-key="no-api-key" 
            :init="initDate" 
            v-model="contentHtml"
            :placeholder="placeholderText" />
    </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
export default {
    components: {
        Editor
    },
    props: {
        width: Number,
        height: Number,
        placeholderText: String
    },
    data() {
        return {
            initDate: {
                language: 'zh_CN',
                // skin_url: '../static/skins/ui/oxide',
                width: this.width,
                height: this.height,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'emoticons',
                ],
                toolbar: 'undo redo | bold italic backcolor forecolor | h1 h2 h3 | link fontsizeselect fontselect | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help | emoticons' ,
                // init_instance_callback : function(editor){
                //     editor.notificationManager.open({
                //         text: '这是一条提示信息。',
                //     });
                // },
                // content_style: "div {font-size:24px; color: #843FA1; font-famliy: impact,chicago;}",
                setup: function(editor) {
                    editor.on('init', function() {
                        var style = document.createElement('style');
                        style.innerHTML = '.mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before {color: #fff;}#tinymce{color: #fff;}'
                        this.getBody().parentNode.children[0].appendChild(style)
                    });                       
                },
                placeholder_tag: 'div',
                // placeholder_attrs: { style: {position: 'absolute', top:'5px', left:0, color: '#000', padding: '1%', width:'98%', overflow: 'hidden', 'white-space': 'pre-wrap'} },
            },
            contentHtml: ''
        }
    } 
}
</script>
<style lang="scss">
.editor {
    width: 100%;
    .tox-tinymce {
        margin: 0 auto;
    }
    .tox .tox-statusbar {
        background-color: transparent;
    }
    .tox .tox-statusbar a, 
    .tox .tox-statusbar__path-item, 
    .tox .tox-statusbar__wordcount
    .tox .tox-statusbar__path div,
    .tox-statusbar div {
        color: #fff;
    }
    .tox .tox-edit-area__iframe {
        background-color: transparent;
    }
}
.tox .tox-menu {
    max-height: 300px !important;
}
.tox .tox-dialog-wrap__backdrop {
    background-color: rgba(0,0,0,.5) !important;
}
.tox .tox-notification--in {
    opacity: 0  !important;
    display: none !important;
}
.tox .tox-statusbar__branding {
    display: none !important;
}
.tox .tox-statusbar__text-container .tox-statusbar__wordcount {
    color: #fff;
}
.editor .tox {
    min-height: 380px;
    max-height: 380px;
}
</style>