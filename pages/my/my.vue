<template>
	<view class="my-page">
		<!-- 顶部背景图 -->
		<view class="top-bg"></view>
		<view class="content-box">
			<view class="header">
				<view class="info-box">
					<image src="@/static/my/head-sculpture.jpg" class="head-sculpture" mode="aspectFill"></image>
					<view class="signature-box">
						<view class="name">xin</view>
						<view class="signature">签名：红红火火恍恍惚惚或</view>
					</view>
				</view>
				<view class="info-box">
					<image class="icon" src="@/static/my/concern.png"></image>
					<view>关注16</view>
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
				<view>
					<image class="icon" src="@/static/my/purchased.png"></image>
					<view>已购</view>
				</view>
			</view>
			<view class="more-info">
				<view class="title">最近播放</view>
				<swiper class="swiper" previous-margin="20rpx" next-margin="20rpx" :display-multiple-items="3">
					<swiper-item>
						<view class="list-items-box">
							<image class="item-img"
								src="http://p1.music.126.net/fJVwOtBJo9TK13UVd6z_Dg==/109951164687320270.jpg"></image>
							<image class="play-btn" src="@/static/play/click-to-play.png"></image>
							<view class="item-name">已播歌曲</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="list-items-box">
							<image class="item-img"
								src="http://p1.music.126.net/5noG3sFSgZk5vHl9yV_5Mw==/109951165796624203.jpg"></image>
							<image class="play-btn" src="@/static/play/click-to-play.png"></image>
							<view class="item-name">vip歌曲</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="list-items-box">
							<image class="item-img"
								src="http://p1.music.126.net/xMXW7c204Qt_teJlCeYclQ==/109951165002446157.jpg"></image>
							<image class="play-btn" src="@/static/play/click-to-play.png"></image>
							<view class="item-name">猜你喜欢</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="list-items-box">
							<image class="item-img"
								src="http://p2.music.126.net/WhaYZ2tvkVQJSkmXL9FzzA==/109951165563896271.jpg"></image>
							<image class="play-btn" src="@/static/play/click-to-play.png"></image>
							<view class="item-name">已播视频</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="list-items-box">
							<image class="item-img"
								src="http://p2.music.126.net/CjtmdENKsr0-dJNCnPEs7A==/109951165178046649.jpg"></image>
							<image class="play-btn" src="@/static/play/click-to-play.png"></image>
							<view class="item-name">歌单：2023</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="bottom-box">-------------------------更多功能，敬请期待-------------------------</view>
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
				color: #999;

				.info-box {
					display: flex;
					align-items: center;

					.signature-box {
						margin-left: 20rpx;

						.name {
							font-size: 32rpx;
							color: #333;
						}

						.signature {
							font-size: 22rpx;
						}
					}
				}

				.head-sculpture {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
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

			.more-info {
				.title {
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 20rpx;
				}


				.list-items-box {
					width: 210rpx;
					position: relative;

					.item-img {
						width: 210rpx;
						height: 260rpx;
						border-radius: 24rpx;

					}

					.play-btn {
						width: 50rpx;
						height: 50rpx;
						position: absolute;
						top: 210rpx;
						left: 0;
					}

					.item-name {
						font-size: 24rpx;
						color: #999;
					}
				}

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