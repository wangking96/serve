<template>
	<div id="chat"></div>
</template>

<script>
var options = {
	chart: {
		type: 'line'
	},
	series: [{
		name: 'sales',
		data: [30,40,35,50,49,60,70,91,125]
	}],
	xaxis: {
		categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
	}
}
// import ApexCharts from 'apexCharts'
import { reactive, onMounted } from 'vue'
export default {
	setup(){
		const opt = reactive(options)
		onMounted(() => {
			console.log(opt, document.querySelector("#chart"));
			// var chart = new ApexCharts(document.querySelector("#chart"), opt);
			// chart.render();
		})
	}
}
</script>

<style>

</style>