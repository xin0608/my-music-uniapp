<template>
	<view class="index-page">
		<view class="content-box">
			<!-- 搜索栏 start -->

			<!-- 搜索栏 end -->

			<!-- 推荐歌单 start -->
			<!-- 最多只显示6个 ，最后一个显示查看更多-->
			<view class="list-box">
				<view class="title">推荐歌单</view>
				<view class="list-items-box">
					<view class="list-item" v-for="(item,index) in recommendedSongList" :key="index">
						<image class="song-img" :src="item.songImg"></image>
						<view class="song-name">{{stringSlice(item.songName,10)}}</view>
					</view>
					<view class="list-item more" v-if="showMore">
						<image class="more-icon" src="@/static/index/more.png"></image>
						<view>查看更多</view>
					</view>
				</view>
			</view>
			<!-- 推荐歌单 end -->

			<!-- 最新音乐 start -->
			<view class="list-box">
				<view class="title">最新音乐</view>
				<view class="latest-music" v-for="item in latestMusic" :key="item.id">
					<view class="song-info">
						<view class="song-name">{{item.songName}}</view>
						<view class="singer">{{item.singer}}</view>
					</view>
					<image class="play-btn" src="@/static/index/play.png"></image>
				</view>
			</view>
			<!-- 最新音乐 end -->
		</view>
		<!-- tabbar start -->
		<tabbar></tabbar>
		<!-- tabbar end -->
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
				showMore: false, //推荐歌单是否展示“更多”
				recommendedSongList: [{
						id: 1,
						songImg: '/static/index/album1.jpg',
						songName: '这是我最爱的小情歌'
					}, {
						id: 2,
						songImg: '/static/index/album3.jpg',
						songName: '你永远不懂我快乐'
					}, {
						id: 3,
						songImg: '/static/index/album2.jpeg',
						songName: '啦啦啦啦啦啦啦'
					},
					{
						id: 4,
						songImg: '/static/index/album3.jpg',
						songName: '这是我最爱的小情歌'
					}, {
						id: 5,
						songImg: '/static/index/album2.jpeg',
						songName: '你永远不懂我快乐'
					}, {
						id: 6,
						songImg: '/static/index/album1.jpg',
						songName: '啦啦啦啦啦啦啦'
					},
					{
						id: 7,
						songImg: '/static/index/album3.jpg',
						songName: '你永远不懂我快乐'
					},
				],
				latestMusic: [{
						id: 1,
						songName: '这是我最爱的小情歌',
						singer: 'me',
					},
					{
						id: 2,
						songName: '你永远不懂我快乐',
						singer: 'me',
					},
					{
						id: 3,
						songName: '啦啦啦啦啦啦啦',
						singer: 'me',
					},
				]
			}
		},
		onLoad() {
			this.handleReplaceMore()
		},
		methods: {
			// 处理推荐歌单数量过多渲染问题
			handleReplaceMore() {
				if (len <= 6) return
				const len = this.recommendedSongList.length
				this.recommendedSongList.splice(5)
				this.showMore = true

			}
		}
	}
</script>

<style lang="scss" scoped>
	.index-page {
		padding: 0 20rpx;
		height: 100vh;
		background: #F4F6F9;

		.content-box {
			padding-bottom: 120rpx;
			overflow-y: scroll;


			.list-box {
				width: 100%;
				margin-bottom: 20rpx;


				.title {
					font-size: 34rpx;
					font-weight: bold;
					margin-bottom: 20rpx;
				}

				.list-items-box {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: space-between;
					font-size: 24rpx;

					.list-item {
						width: 30%;
						height: 236rpx;
						background-color: #fff;
						display: flex;
						flex-direction: column;
						border-radius: 16rpx;
						box-shadow: 0 6rpx 22rpx 0 rgba(143, 152, 162, 0.2);
						margin-bottom: 20rpx;

						&.more {
							width: 32%;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							font-size: 28rpx;
							color: #333333;

							.more-icon {
								width: 50rpx;
								height: 50rpx;
							}
						}



						.song-img {
							width: 100%;
							height: 200rpx;
							border-radius: 16rpx 16rpx 0 0;

						}

						.song-name {
							padding: 10rpx 20rpx;
							font-size: 28rpx;
							color: #333333;
							// font-weight: bold;
						}
					}
				}

				.latest-music {
					padding: 32rpx;
					margin-bottom: 24rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-radius: 16rpx;
					background-color: #fff;

					.song-info {
						.song-name {
							font-size: 28rpx;
							color: #333333;
						}

						.singer {
							font-size: 24rpx;
							color: #ADADAD;
						}
					}

					.play-btn {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}
</style>