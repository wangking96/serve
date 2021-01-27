<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<script>
import User from '@/api/User'
export default {
	created() {
		this.getSetting()
	},
	methods: {
		getSetting() {
			User.getSetting().then(res => {
				this.$store.commit('SET_SETTING', res)
			})
		}
	}
}
</script>
<style lang="scss" scoped>
#app {
	position: relative;
	margin: 0 auto;
	min-width: 300px;
	max-width: 750px;
	height: 100%;
	overflow: hidden;
	background-color: $bg-light;
}
</style>
