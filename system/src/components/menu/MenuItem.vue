<template>
	<el-submenu :index="subMenu.path">
		<template #title>
			<i :class="subMenu.icon"></i>
			<span>{{subMenu.title}}</span>
		</template>
		<el-menu-item-group v-for="tmp in subMenu.subMenu" :key="tmp.path">
			<MenuItem v-if="tmp.subMenu && tmp.subMenu.length > 0" :subMenu="tmp" />
			<el-menu-item v-else :index="tmp.path">
				<template #title>
					<i :class="tmp.icon"></i>
					<span>{{tmp.title}}</span>
				</template>
			</el-menu-item> 
		</el-menu-item-group>
	</el-submenu>
</template>

<script>

// import { onMounted } from 'vue'

export default {
	props: {
		subMenu: {
			type: Object
		}
	},
	// setup(props){
	// 	onMounted(() => {
	// 		console.log(props.subMenu);
	// 	})
	// }
}
</script>

<style>

</style>