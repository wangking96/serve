<template>
	<div class="page-container-head" :style="`height: ${height}px`">
		<div class="head-navbar">
			<div class="head-navbar-left">
				<div class="hamburger" @click="menuClickToggle">
					<svg
						:class="{'is-active':true}"
						class="hamburger-svg"
						viewBox="0 0 1024 1024"
						xmlns="http://www.w3.org/2000/svg"
						width="64"
						height="64"
					>
						<path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
					</svg>
				</div>
				<el-breadcrumb class="breadcrumb" separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="head-tabs">
			<el-tabs 
				closable 
				type="card" 
				v-model="curRouteName" 
				@tab-remove="removeTab"
				@tab-click="changTabs">
				<el-tab-pane
					v-for="tab in tabs"
					:key="tab.name"
					:label="tab.name"
					:name="tab.name"
				>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { watchEffect, ref, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from "vue-router"
export default {
	props: {
		height: {
			type: Number
		}
	},
	setup(prps, { emit }){
		const route = useRoute()
		const router = useRouter()
		const curRouteName = ref('')
		const tabs = ref([])
		const store = useStore()
		const { ctx } = getCurrentInstance()
		ctx.wang.emit('foo', route.name)
		
		const menuClickToggle = ()=> {
			emit('menuClickToggle')
		}
		const addTab = params => {
			if(tabs.value.some(item => item.name === params.name) || params.path === '/') return
			store.state.config.isAddTab && tabs.value.push({
				name: params.name,
				path: params.path
			})
		}
		const changTabs = (path) => {
			router.push(path.paneName)
		}
		const removeTab = (routeName)=> {
			store.commit('SET_IS_ADD_TAB', false)
			
			var i = tabs.value.findIndex(item => item.name === routeName)
			i = i > 0 ? i - 1 : 0
			tabs.value = tabs.value.filter(tab => tab.name !== routeName)

			tabs.value[i] ? router.push(tabs.value[i].name) : router.push('/')
		}
		watchEffect(()=>{
			curRouteName.value = route.name
			addTab(route)
		})
		
		return {
			tabs,
			curRouteName,
			changTabs,
			removeTab,
			menuClickToggle
		}
	}
}
</script>

<style lang="scss" scoped>
.head {
	&-navbar {
		overflow: hidden;
		padding: 0 20px;
		box-shadow: 0px 4px 4px -2px rgba(0, 21, 41, 0.08);
		&-left {
			height: 50px;
			float: left;
			display: flex;
			.hamburger{
				height: 100%;
				display: flex;
				cursor: pointer;
				align-items: center;
				padding-right: 20px;
				&-svg{
					width: 20px;
					height: 20px;
				}
			}
			.breadcrumb{
				height: 100%;
				display: flex;
				align-items: center;
			}
		}
	}
	&-tabs {
		height: 40px;
	}
}

</style>

<style>
.el-tabs__nav-wrap {
	padding: 0 20px;
}
.el-tabs--card>.el-tabs__header .el-tabs__nav {
	border: 0;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
	border: 0;
    color: #fff;
	border-radius: 6px;
	background-color: #42b983;
}
.el-tabs__item, .el-tabs__nav-next, .el-tabs__nav-prev {
	height: 32px;
	line-height: 32px;
}
.head-tabs {
	margin-top: 10px;
    height: 32px !important;
}
.el-tabs__nav-wrap.is-scrollable {
	padding: 0 32px;
}
.el-tabs__nav-next, .el-tabs__nav-prev {
	font-size: 22px;
}
</style>