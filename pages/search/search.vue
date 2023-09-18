<template>
	<view class="search-page">
		<view class="search-box">
			<uni-search-bar placeholder="搜索" bgColor="#fff" v-model="searchVal"  :radius="20">
			</uni-search-bar>
		</view>

		<view class="list-box">
			<view class="title">热门搜索</view>
			<view class="key-item" v-for="item in hotList" :key="item.id" :data-name="item.first"
				@click="clickHot($event)">
				{{item.first}}
			</view>
		</view>
		<view class="list-box" v-if="resultList.length">
			<view class="title">最佳匹配</view>
			<view class="list-item" v-for="item in resultList" :key="item.id"
				@click="toLink('/pages/play/play?id='+item.id)">
				<view class="song-info">
					<view class="song-name">{{item.name}}</view>
					<view class="singer">{{item.artists[0].name}}</view>
				</view>
				<image class="play-btn" src="@/static/index/play.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchVal: "",
				hotList: [],
				resultList: [],

			}
		},
		onLoad() {
			this.getHotList()

		},
		watch: {
			searchVal(val) {
				if (val.length === 0) return this.resultList = []
				this.getSearchList(val)
			}
		},
		methods: {
			getHotList() {
				this.$ajax.get('/search/hot').then(res => {
					this.hotList = res.data.result.hots;
				})
			},
			getSearchList(val) {
				const params = {
					type: 1,
					keywords: val
				}
				this.$ajax.get('/search', params).then(res => {
					this.resultList = res.data.result.songs;
				})
			},
			clickHot(e) {
				const keyword = e.target.dataset.name
				this.searchVal = keyword

			},
		}
	}
</script>

<style scoped lang="scss">
	.search-page {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: auto;
		padding:0 20rpx;
		background: #F4F6F9;


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

			.key-item {
				display: inline-block;
				border-radius: 50rpx;
				margin: 0 20rpx 10rpx;
				padding:12rpx  16rpx;
				font-size: 22rpx;
				color: #333333;
				background: #fff;
				// border: 2rpx solid #ADADAD;
			}

			.list-item {
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
</style>