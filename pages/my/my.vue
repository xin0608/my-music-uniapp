<template>
	<view class="my-page">
	
		<tabbar :curIndex="1"></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar.vue'
	
	export default {
		components: {
			tabbar
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">

</style>
