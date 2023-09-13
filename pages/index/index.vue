<template>
	<view class="index-page">
		<view class="content-box">
			<view class="search-box" @click="toLink('/pages/search/search')">
				<uni-search-bar placeholder="搜索"  v-model="keyword" cancelButton="none"  :radius="20">
				</uni-search-bar>
			</view>
			<!-- 推荐歌单 start -->
			<!-- 最多只显示6个 ，最后一个显示查看更多-->
			<view class="list-box">
				<view class="title">推荐歌单</view>
				<!-- 缺省图 -->
				<view class="empty-img-box" v-if="!recommendedSongList.length">
					<image class="empty" src="../../static/index/empty2.png"></image>
					<view>服务器出问题啦，请稍后再试๑ŐεŐ๑</view>
				</view>
				<view class="list-items-box" v-else>
					<view class="list-item" v-for="(item,index) in recommendedSongList" :key="index">
						<image class="song-img" :src="item.picUrl"></image>
						<view class="song-name">{{stringSlice(item.name,24)}}</view>
					</view>
					<view class="list-item more" v-if="showMore">
						<u-icon class="more-icon" name="grid-fill" color="#2979ff" size="28"></u-icon>
						<view>查看更多</view>
					</view>
				</view>
			</view>
			<!-- 推荐歌单 end -->

			<!-- 最新音乐 start -->
			<view class="list-box">
				<view class="title">最新音乐</view>
				<!-- 缺省图 -->
				<view class="empty-img-box" v-if="!latestMusic.length">
					<image class="empty" src="../../static/index/empty2.png"></image>
					<view>服务器出问题啦，请稍后再试๑ŐεŐ๑</view>
				</view>
				<view v-else class="latest-music" v-for="item in latestMusic" :key="item.id"
					@click="toLink('/pages/play/play?id='+item.id)">
					<view class="song-info">
						<view class="song-name">{{item.name}}</view>
						<view class="singer">{{item.song.artists[0].name}}</view>
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
				recommendedSongList: [],
				latestMusic: [],
				keyword: ''
			}
		},
		onLoad() {
			this.getRecommendList()
			this.getLatestMusic()
		},
		methods: {
			// 处理推荐歌单数量过多渲染问题
			handleReplaceMore() {
				if (len <= 6) return
				const len = this.recommendedSongList.length
				this.recommendedSongList.splice(5)
				this.showMore = true
			},
			// 获取推荐歌单列表
			getRecommendList() {
				this.$ajax.get('/personalized', {
					limit: 6
				}).then(res => {
					this.recommendedSongList = res.data.result
					this.handleReplaceMore()
				})
			},
			// 获取最新音乐列表
			getLatestMusic() {
				this.$ajax.get('/personalized/newsong', {
					limit: 20
				}).then(res => {
					this.latestMusic = res.data.result
				})
			},
		}

	}
</script>

<style lang="scss" scoped>
	.index-page {
		height: 100%;
		padding: 0 20rpx;
		background: #F4F6F9;

		.content-box {
			height: 100vh;
			padding-bottom: 120rpx;
			overflow-y: scroll;

			.search-box {
				margin: 20rpx 0;
			}

			.list-box {
				width: 100%;
				margin-bottom: 20rpx;


				.title {
					font-size: 34rpx;
					font-weight: bold;
					margin-bottom: 20rpx;
					border-left: 10rpx solid #5aa2dc;
					padding-left: 18rpx;
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
						height: 280rpx;
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
							font-size: 22rpx;
							color: #333333;
							// font-weight: bold;
						}
					}
				}

				.latest-music {
					padding: 18rpx;
					margin-bottom: 24rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-radius: 16rpx;
					// background-color: #fff;

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

	.empty-img-box {
		width: 100%;
		height: 400rpx;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.empty {
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>