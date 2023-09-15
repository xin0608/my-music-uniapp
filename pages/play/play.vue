<template>
	<view class="play-page">
		<!-- 模糊背景 -->
		<image class="song-bg"
			:src=" (songInfo && songInfo.al && songInfo.al.picUrl)+'?imageView&thumbnail=360y360&quality=75&tostatic=0'">
		</image>

		<!-- 留声机 容器-->
		<view class="song-wrapper">
			<!-- 留声机本身 css做动画-->
			<view :class="{'song-pause':true,'song-play':playState}">
				<view class="song-img">
					<image style="width: 100%"
						:src="(songInfo && songInfo.al && songInfo.al.picUrl)+'?imageView&thumbnail=360y360&quality=75&tostatic=0'">
					</image>
				</view>
			</view>
			<!-- 播放按钮 -->
			<view class="start-box" @click="handlePlay">
				<image src="../../static/play/click-to-play.png" class="play-or-pasue-icon" v-show="!playState"></image>
				<image src="../../static/play/click-to-pause.png" class="play-or-pasue-icon" v-show="playState"></image>
			</view>
			<!-- 播放歌词 容器 -->
			<view class="song-msg">
				<!-- 歌曲名 -->
				<view class="m-song-h2">
					<view class="m-song-sname">{{songInfo.name}}-{{songInfo && songInfo.ar && songInfo.ar[0].name}}
					</view>
				</view>
				<!-- 歌词部分-随着时间切换展示一句歌词 -->
				<view class="lrcContent">
					<view class="lrc">{{ curLyric }}</view>
				</view>
			</view>
			<!-- 留声机 唱臂 -->
			<image src="../../static/play/needle-ab.png" class="needle" :style="'transform: rotate('+needleDeg+')'">
			</image>
		</view>
		<!-- 菜单栏 -->
		<view class="menu">
			<image class="more" src="../../static/play/comment.png" @click="handleShowMore"></image>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="showMore" @click="showMore=false">
			<!-- 评论区 上拉 -->
			<view class="comment-box" @click.stop="()=>{}">
				<view class="header">
					<view class="title">评论数 {{totalNum}}</view>
					<image @click="showMore=false" class="close-icon" src="../../static/close.png"></image>
				</view>
				<scroll-view class="scroll-box" scroll-y @scrolltolower="handleScrolltolower">
					<!-- 缺省图 -->
					<view v-if="!commentList.length" class="empty-box">
						<image class="empty" mode="widthFix" src="../../static/play/comment-empty.png"></image>
						<view>暂无评论，快来评论吧๑ŐεŐ๑</view>
					</view>

					<view v-else class="comment-items" v-for="item in commentList" :key="item.id">
						<image :src="item.user.avatarUrl" class="head-sculpture" mode="aspectFill"></image>
						<view class="comment-info">
							<view class="nickname">{{item.user.nickname}}</view>
							<view class="comment">
								{{item.content}}
							</view>
							<view class="time-and-like">
								<view class="time">{{getDateTime(item.time)}}</view>
								<view class="like">
									<image class="like-icon" src="../../static/play/like.png"></image>
									<view class="like-num">{{item.likedCount}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<!-- 评论输入框 -->
				<view class="search-box">
					<u-search search-icon="edit-pen" placeholder="评论一句" v-model="keyword" action-text="发送"></u-search>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	const audioContext = uni.createInnerAudioContext()
	export default {
		data() {
			return {
				playState: false, // 音乐播放状态(true正在播放, false暂停中)
				id: '', // 上一页传过来的音乐id
				songInfo: {}, // 歌曲信息
				lyric: {}, // 歌词枚举对象(需要在js拿到歌词写代码处理后, 按照格式保存到这个对象)
				curLyric: "", // 当前显示哪句歌词
				lastLy: "", // 记录当前播放歌词
				showMore: false,
				commentList: [],
				keyword: '',
				currenttime: 0,
				// 数据分页
				pageNo: 1,
				pageSize: 20,
				totalNum: 0,
				time: Date.now(),
				hasMoreToLoading: false,
			}

		},
		computed: {
			needleDeg() {
				// 留声机-唱臂的位置属性
				return this.playState ? "-7deg" : "-38deg";
			},

		},
		onLoad(options) {
			this.id = options.id
			this.getSong()
			this.showLyric();
			this.getCommentList()
		},
		methods: {
			handlePlay() {
				this.playState = !this.playState
				if (this.playState) {
					audioContext.src = 'https://music.163.com/song/media/outer/url?id=' + this.id + '.mp3'
					audioContext.volume = 0.5
					audioContext.play()
				} else {
					audioContext.pause()
					this.currenttime = audioContext.currentTime
				}
				this.showLyric()
			},
			getSong() {
				this.$ajax.get('/song/detail?ids=' + this.id).then(res => {
					this.songInfo = res.data.songs[0];
				})
				this.$ajax.get('/lyric?id=' + this.id).then(res => {
					const lyrContent = res
					const lyricStr = lyrContent.data.lrc.lyric;
					this.lyric = this._formatLyr(lyricStr);
					// 初始化完毕先显示零秒歌词
					this.curLyric = this.lyric[0];
				})
			},
			_formatLyr(lyricStr) {
				// 可以看network观察歌词数据是一个大字符串, 进行拆分.
				let reg = /\[.+?\]/g; //
				let timeArr = lyricStr.match(reg); // 匹配所有[]字符串以及里面的一切内容, 返回数组
				//   console.log(timeArr); // ["[00:00.000]", "[00:01.000]", ......]
				let contentArr = lyricStr.split(/\[.+?\]/).slice(1); // 按照[]拆分歌词字符串, 返回一个数组(下标为0位置元素不要,后面的留下所以截取)
				//   console.log(contentArr);
				let lyricObj = {}; // 保存歌词的对象, key是秒, value是显示的歌词
				timeArr.forEach((item, index) => {
					// 拆分[00:00.000]这个格式字符串, 把分钟数字取出, 转换成秒
					let ms = item.split(":")[0].split("")[2] * 60;
					// 拆分[00:00.000]这个格式字符串, 把十位的秒拿出来, 如果是0, 去拿下一位数字, 否则直接用2位的值
					let ss =
						item.split(":")[1].split(".")[0].split("")[0] === "0" ?
						item.split(":")[1].split(".")[0].split("")[1] :
						item.split(":")[1].split(".")[0];
					// 秒数作为key, 对应歌词作为value
					lyricObj[ms + Number(ss)] = contentArr[index];
				});
				return lyricObj;
			},
			showLyric() {
				audioContext.onTimeUpdate(() => {
					let curTime = Math.floor(audioContext.currentTime);
					// 避免空白出现
					if (this.lyric[curTime]) {
						this.curLyric = this.lyric[curTime];
						this.lastLy = this.curLyric;
					} else {
						this.curLyric = this.lastLy;
					}

				})

			},
			handleShowMore() {
				this.showMore = !this.showMore
			},
			// 列表滚动到底部时触发处理函数
			handleScrolltolower(e) {
				if (!this.hasMoreToLoading) return
				// 加载下一页
				this.pageNo += 1
				this.getCommentList()
			},
			// 获取评论列表
			getCommentList() {
				this.$ajax.get('/comment/new?type=0&sortType=3', {
					id: this.id,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					cursor: this.time,
				}).then(res => {
					const newList = res.data.data.comments;
					// 记住上一个请求的最后一个数据
					this.time = newList[newList.length - 1].time;
					this.hasMoreToLoading = res.data.data.hasMore
					this.totalNum = res.data.data.totalCount
					this.commentList.push(...newList)
				})

			}
		}
	}
</script>
<style scoped lang="scss">
	.song-bg {
		width: 100vw;
		height: 100%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		overflow: hidden;
		z-index: 1;
		opacity: 1;
		/*模糊背景 */
		filter: blur(25px);
	}

	.song-bg::before {
		/*纯白色的图片做背景, 歌词白色看不到了, 在背景前加入一个黑色半透明蒙层解决 */
		content: " ";
		background: rgba(0, 0, 0, 0.5);
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}

	.song-wrapper {
		position: fixed;
		width: 247px;
		height: 247px;
		left: 50%;
		top: 50px;
		transform: translateX(-50%);
		z-index: 2;
	}

	.song-pause {
		width: 100%;
		height: 100%;
		background: url('../../static/play/bg.png') no-repeat;
		background-size: 100%;
	}

	.song-play {
		animation: headRotate 6s linear infinite;
	}

	/* 头像旋转效果  */
	@keyframes headRotate {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(180deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}


	.start-box {
		position: absolute;
		width: 156px;
		height: 156px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.play-or-pasue-icon {
		width: 56px;
		height: 56px;
	}

	.needle {
		position: absolute;
		transform-origin: left top;
		width: 73px;
		height: 118px;
		top: -40px;
		left: 112px;
		transition: all 0.6s;
	}

	.song-img {
		width: 154px;
		height: 154px;
		position: absolute;
		left: 50%;
		top: 50%;
		overflow: hidden;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}

	.m-song-h2 {
		margin-top: 20px;
		text-align: center;
		font-size: 18px;
		color: #fefefe;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.lrcContent {
		margin-top: 50px;
	}

	.lrc {
		font-size: 14px;
		color: #fff;
		text-align: center;
	}

	.menu {
		position: fixed;
		width: 100vw;
		height: 100rpx;
		background-color: #fff;
		bottom: 0;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		z-index: 3;

		.more {
			width: 50rpx;
			height: 50rpx;

		}
	}

	.mask {
		width: 100vw;
		height: 100vh;
		position: fixed;
		z-index: 4;
	}

	.comment-box {
		background-color: #fff;
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 75vh;
		border-radius: 20rpx 20rpx 0 0;
		z-index: 5;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 32rpx 20rpx;

			.title {
				font-size: 24rpx;
			}

			.close-icon {
				position: absolute;
				right: 20rpx;
				width: 50rpx;
				height: 50rpx;
			}
		}

		.scroll-box {
			height: 80%;

			.empty-box {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;

				.empty {
					width: 200rpx;
				}
			}


			.comment-items {
				display: flex;
				padding: 24rpx 32rpx;

				.head-sculpture {
					width: 78rpx;
					height: 78rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				.comment-info {
					flex: 1;
					font-size: 24rpx;
					color: #999999;

					.comment {
						font-size: 28rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #333333;
					}

					.time-and-like {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.like {
							display: flex;
							align-items: center;

							.like-icon {
								width: 50rpx;
								height: 50rpx;
							}
						}
					}

				}
			}
		}

		.search-box {
			border-top: 2rpx solid #9999992e;
			width: 100%;
			padding: 10rpx 0;
		}
	}
</style>