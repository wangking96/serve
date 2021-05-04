<template>
   <div class="container">
       <button @click="updatePassword">修改密码</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import request from "../common/request";
import Api from "../api/api";
export default defineComponent({
    setup() {
        const ctx = getCurrentInstance() 
        // console.log(ctx?.appContext.config.globalProperties.$http);
        
        const data:object = {
            device: 1
        }

        request({
            url: Api.config,
            params: data,
            method: 'get'
        }).then(res => {
            console.log(res);
        })

        const updatePassword = () => {
            request({
                url: Api.updatePassword,
                params: {
                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9haS1zcG9ydHMuemJpdGNsb3VkLmNvbVwvYXBpXC92MVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2MjAwMzQ3NDEsImV4cCI6MTYyMDEyMTE0MSwibmJmIjoxNjIwMDM0NzQxLCJqdGkiOiJ2OTdHSlZuVzY3SHB1TnQzIiwic3ViIjo0NywicHJ2IjoiNmY5OWI1OTJlYzdjMGQ5ZjQ0MmRkYWUyNGExY2FkNmE3ZDRhMmVhNCJ9.iQ-HxwHK1GRea4m8WgwRY1C4Prc9QPbmwE4o33GiPSw',
                    old_password: '9999999',
                    new_password: '111111111',
                    device: 1,
                },
                method: 'post'
            }).then(res => {
                console.log(res);
            })
        }
        
        return {
            updatePassword
        }
    },
})
</script>

<style scoped lang="scss">
.container {

}
</style>