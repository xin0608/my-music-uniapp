<template>
	<view class="bottom-tabbar">
		<view class="tabbar-item" v-for="(item,index) in list" :key="item.name" @click="changeTab(item.path,index)">
			<image class="tabbar-icon" :src="curIndex==index?item.iconActiveSrc:item.iconSrc" mode="widthFix"></image>
			<view class="tabbar-name" :class="{'tabbar-name':true,'active':curIndex==index}">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		props: {
			curIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				// curIndex:0,
				list: [{
					name: '首页',
					iconSrc: '/static/tabbar/home.png',
					iconActiveSrc: '/static/tabbar/home-active.png',
					path: '/pages/index/index',

				}, {
					name: '我的',
					iconSrc: '/static/tabbar/my.png',
					iconActiveSrc: '/static/tabbar/my-active.png',
					path: '/pages/my/my'
				}]
			};
		},
		methods: {
			changeTab(path, index) {
				// this.curIndex=index
				uni.switchTab({
					url: path
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom-tabbar {
		width: 100vw;
		padding: 18rpx 0;
		background-color: #fff;
		box-shadow: 0 6rpx 22rpx 0 rgba(143, 152, 162, 0.2);
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.tabbar-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;


			.tabbar-icon {
				width: 50rpx;

			}

			.tabbar-name {
				font-size: 22rpx;
				font-weight: 500;
				color: #3D3D3D;

				&.active {
					color: #1296db;
				}
			}
		}
	}
</style>