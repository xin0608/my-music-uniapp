<template>
	<view class="song-sheet-page">
		<view class="list-items-box">
			<view class="list-item" v-for="item in songSheetList" :key="item.id"
				@click="toLink('/pages/songList/songSheetDetail?id='+item.id)">
				<image class="song-img" :src="item.coverImgUrl"></image>
				<view class="song-name">{{stringSlice(item.description,24)}}</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				songSheetList: []
			}
		},
		onLoad() {
			this.getSongSheetList()
		},
		methods: {
			getSongSheetList() {
				this.$ajax.get('/top/playlist/highquality').then(res => {
					console.log("歌单：", res)
					this.songSheetList = res.data.playlists
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.song-sheet-page {
		padding: 20rpx;

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
	}
</style>