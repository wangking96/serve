<template>
	<div class="page">
		<div class="page-sidebar" :style="`width: ${sideBarWidth}px`">
			<el-scrollbar class="scrollBar">
				<div class="page-name">贵州醉酩酒业<br>管理系统</div>
				<Menu :collapse="collapse" />
			</el-scrollbar>
		</div>
		<div class="page-container" :style="`margin-left: ${sideBarWidth}px`">
			<Header :height="headerHeight" @menuClickToggle="menuClickToggle" />
			<div class="page-container-main" :style="`top: ${headerHeight}px`">
				<router-view v-slot="{ Component }">
					<transition name="slide-fade">
						<component :is="Component" />
					</transition>
				</router-view>
			</div>
		</div>
	</div>
</template>

<script>

import { ref } from 'vue'
import Menu from '../components/menu'
import Header from '../components/Header'

export default {
	components: {
		Menu,
		Header
	},
	setup() {
		const sideBarWidth = ref(220)
		const headerHeight = ref(100)
		const collapse = ref(false)
		const menuClickToggle = () =>{
			collapse.value = !collapse.value
			sideBarWidth.value = collapse.value ? 60 : 200
		}

		return {
			sideBarWidth,
			headerHeight,
			collapse,
			menuClickToggle
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	height: 100%;
	min-width: 100%;
	overflow: hidden;
	position: relative;
	&-sidebar {
		top: 0;
		left: 0;
		height: 100%;
		overflow: hidden;
		position: absolute;
		transition: width .28s ease-in-out;
		border-right: 1px solid #E4E7ED;
		color: rgb(191, 203, 217);
		background-color: rgb(48, 65, 86);	
		.scrollBar {
			height: 100%;
		}
	}
	&-name {
		padding: 20px;
		font-size: 22px;
		line-height: 34px;
		font-weight: bold;
		letter-spacing: 6px;
		background: #2b2f3a;
	}
	&-container {
		height: 100%;
		overflow: hidden;
		position: relative;
		background-color: #f3f3f4;
		transition: margin-left .35s ease-in-out;
		&-main {
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			padding: 0 20px 20px;
		}
	}
}
.slide-fade-enter-active {
	transition: all .5s ease-out;
	transition-delay: .5s;
}

.slide-fade-leave-active {
  transition: all .5s ease-out;
}
.slide-fade-enter-from{
	opacity: 0;
	transform: translateX(-30px);
}
.slide-fade-leave-to {
	opacity: 0;
	transform: translateX(20px);
}
</style>

<style lang="scss">
.page-sidebar{
	.el-scrollbar__wrap {
		overflow: hidden auto;
	}
}
</style>