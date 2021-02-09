<template>
    <div class="about">
        <h1>This is an about page</h1>
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
            </el-tabs>

            <el-steps :active="2" align-center>
                <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
            </el-steps>
    </div>
</template>

<script>
export default {
    data(){
        return {
            activeName: ''
        }
    },
    methods:{
        // handleClick(){

        // }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    text-decoration: underline;
}
</style>