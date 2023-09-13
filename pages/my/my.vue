<template>
	<view class="my-page">
		<!-- 顶部背景图 -->
		<view class="top-bg"></view>
		<view class="content-box">
			<view class="header">
				<view class="info-box">
					<image src="@/static/my/head-sculpture.jpg" class="head-sculpture" mode="aspectFill"></image>
					<view class="name">xin</view>
				</view>
				<view class="info-box">
					<image class="icon" src="@/static/my/concern.png"></image>
					<view>关注</view>
				</view>
			</view>
			<view class="menu">
				<view>
					<image class="icon" src="@/static/my/collect.png"></image>
					<view>收藏</view>
				</view>
				<view>
					<image class="icon" src="@/static/my/folder.png"></image>
					<view>本地</view>
				</view>
				<view>
					<image class="icon" src="@/static/my/microphone.png"></image>
					<view>有声</view>
				</view>
			</view>
			<view class="bottom-box">-------------------------更多功能敬请期待-------------------------</view>
		</view>
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
	.my-page {
		height: 100vh;
		background: #F4F6F9;

		.top-bg {
			width: 100vw;
			height: 400rpx;
			position: fixed;
			background-image: linear-gradient(45deg, #7A88FF, #7AFFAF);
		}

		.content-box {
			width: 100vw;
			padding: 0 32rpx;
			position: absolute;
			top: 200rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			color: #999;

			.icon {
				width: 50rpx;
				height: 50rpx;
			}

			.header {
				padding: 50rpx 32rpx;
				background-color: #fff;
				border-radius: 20rpx 20rpx 0 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #333;

				.info-box {
					display: flex;
					align-items: center;
				}

				.head-sculpture {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				.name {
					margin-left: 20rpx;
				}
			}

			.menu {
				background-color: #fff;
				margin: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 32rpx;
				font-size: 24rpx;
				color: #999;
			}

			.bottom-box {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 100rpx;
			}
		}
	}
</style>