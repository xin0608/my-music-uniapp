<template>
	<view class="song-sheet-page" :style="{'--img':backImgUrl}">
		<uni-nav-bar @click-left="backRoute" left-icon="back" statusBar :border="false" backgroundColor="transparent" fixed></uni-nav-bar>
			<view class="bg" id="bg">
				<view class="header">
					<image class="coverImg" :src="coverImgUrl"></image>
					<view class="info-box">
						<view class="song-sheet-name">
							{{name}}
						</view>
						<view class="desc">
							{{stringSlice(description,60)}}
						</view>
					</view>
				</view>
				<!-- <view class="bg"> -->
				<view class="song-list-box">
					<view class="latest-music" v-for="item in tracks" :key="item.al.id"
						@click="toLink('/pages/play/play?id='+item.id)">
						<view class="song-info">
							<view class="song-name">{{item.al.name}}</view>
							<view class="singer">{{item.ar[0].name}}</view>
						</view>
						<image class="play-btn" src="@/static/index/play.png"></image>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				coverImgUrl: '',
				backImgUrl: '',
				name: '',
				description: '',
				tracks: []
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getSongSheetDetail()

		},
		methods: {
			getSongSheetDetail() {
				this.$ajax.post('/playlist/detail?id=' + this.id).then(res => {
					this.coverImgUrl = res.data.playlist.coverImgUrl
					this.backImgUrl = 'url(\'' + this.coverImgUrl + '\')'
					this.name = res.data.playlist.name
					this.description = res.data.playlist.description
					this.tracks = res.data.playlist.tracks
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.song-sheet-page {
		height: 100%;
		background: #F4F6F9;

		.bg {
			position: relative;
			width: 100vw;
		}

		.bg::before {
			content: '';
			width: 100vw;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: var(--img);
			background-size: cover;
			filter: blur(50px);
			transform: scale(3);
			
		}

		.header {
			position: relative;
			// height: 400rpx;

			.coverImg {
				width: 100vw;
				// height: 400rpx;
				// filter: blur(2px);
			}

			.info-box {
				width: 100vw;
				position: absolute;
				bottom: 0;
				font-size: 28rpx;
				color: #fff;
				padding: 20rpx;

				.song-sheet-name {
					// font-size: 24rpx;
					font-weight: bold;
				}

				.desc {
					font-size: 22rpx;
				}
			}

		}

		.song-list-box {
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx;
			position: absolute;

			.latest-music {
				padding: 18rpx;
				margin-bottom: 24rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 16rpx;
		
				.song-info {
					.song-name {
						font-size: 28rpx;
						color: #333;
					}

					.singer {
						font-size: 24rpx;
						color: #333;
					}
				}

				.play-btn {
					width: 40rpx;
					height: 40rpx;
				}

			}
		}
	}
</style>