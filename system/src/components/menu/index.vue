<template>
	<el-menu
		text-color="rgb(191, 203, 217)"
		background-color="#304156"
		active-text-color="#409EFF"
		:collapse="collapse" 
		:collapse-transition="false"
		:default-active="activeIndex"
		:unique-opened="true"
		@select="menuSelect">
		<template v-for="item in menus" :key="item.path">
			<MenuItem v-if="item.subMenu" :subMenu="item" />
			<el-menu-item v-else :index="item.title">
				<template #title>{{item.title}}</template>
				<i :class="item.icon"></i>
			</el-menu-item>
		</template>
	</el-menu>
</template>

<script>

const menus = [
	{ icon: 'el-icon-s-home', title: "Home", path: '/home' },
	{ icon:'el-icon-s-grid', title: "Guide", path: '/guide' },
	{ icon:'el-icon-s-promotion', title: "Dashboard", path: '/dashboard'},
	{ icon:'el-icon-s-data', title: "Chart", path: '/chart'},
	{ icon:'el-icon-s-marketing', title: "Person", path: '/person', subMenu: [
		{ icon:'el-icon-s-marketing', title: "ssssssss", path: '/s1'},
		{ icon:'el-icon-s-marketing', title: "ssssssss", path: '/s2'},
		{ icon:'el-icon-s-marketing', title: "ssssssss", path: '/s3'},
		{ icon:'el-icon-s-marketing', title: "ssssssss", path: '/s4'}
	]},
	{ icon:'el-icon-s-shop', title: "Infomation", path: '/icon', subMenu: [
		{ icon:'el-icon-s-marketing', title: "ssssssss", path: '/s1'},
		{ icon:'el-icon-s-marketing', title: "ssssssss", path: '/s2'},
		{ icon:'el-icon-s-marketing', title: "ssssssss", path: '/s3'},
		{ icon:'el-icon-s-marketing', title: "ssssssss", path: '/s4'}
	]}
]

import { ref, getCurrentInstance, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import MenuItem from './MenuItem'

export default {
	name: 'Menu',
	components: {
		MenuItem
	},
	props: {
		collapse: {
			type: Boolean,
			default: false
		}
	},
	setup(){
		const route = useRoute()
		const router = useRouter()
		const store = useStore()
		const activeIndex = ref('')
		
		const { ctx } = getCurrentInstance()

		const menuSelect = (path) => {
			store.commit('SET_IS_ADD_TAB', true)
			router.push(path)
		}
		watchEffect(()=>{
			activeIndex.value = route.name
		})
		
		ctx.wang.on('foo', e => console.log('foo', e) )
		
		return {
			menus,
			menuSelect,
			activeIndex
		}
	}
}
</script>

<style>
.el-menu-item i,
.el-submenu__title i {
    color: rgb(191, 203, 217);
}
.el-menu-item.is-active,
.is-opened .el-menu .el-menu-item {
    background-color: #1f2d3d!important;
}
.is-opened .el-menu .el-menu-item:hover {
  background-color: rgb(3, 19, 33) !important;
}
.el-menu-item.is-active {
	border-left: 2px solid #3c8dbc;
}
</style>