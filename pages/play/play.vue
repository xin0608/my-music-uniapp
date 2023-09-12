<template>
	<view class="play-page">
		<!-- 模糊背景 -->
		<image class="song-bg" :src=" (songInfo && songInfo.al && songInfo.al.picUrl)
		      +'?imageView&thumbnail=360y360&quality=75&tostatic=0'"></image>

		<!-- 留声机 容器-->
		<view class="song-wrapper">
			<!-- 留声机本身 css做动画-->
			<image src="../../static/play/bg.png" class="song-turn ani"
				:style="'animation-play-state:'+(playState ? 'running' : 'paused')">
				<view class="song-img">
					<image style="width: 100%" :src="(
					              songInfo && songInfo.al && songInfo.al.picUrl
					            )+'?imageView&thumbnail=360y360&quality=75&tostatic=0'"></image>
				</view>
			</image>
			<!-- 播放按钮 -->
			<view class="start-box" @click="audioStart">
				<image src="../../static/play/start.png" class="song-start" v-show="!playState"></image>
			</view>
			<!-- 播放歌词 容器 -->
			<view class="song-msg">
				<!-- 歌曲名 -->
				<view class="m-song-h2">
					<view class="m-song-sname">{{ songInfo.name }}-{{
			              songInfo && songInfo.ar && songInfo.ar[0].name
			            }}</view>
				</view>
				<!-- 歌词部分-随着时间切换展示一句歌词 -->
				<view class="lrcContent">
					<view class="lrc">{{ curLyric }}</view>
				</view>
			</view>
			<!-- 留声机 唱臂 -->
			<image src="../../static/play/needle-ab.png" class="needle" :style="'transform: rotate'+needleDeg"></image>
		</view>
		<audio @timeupdate="showLyric" :src="'https://music.163.com/song/media/outer/url?id='+id+'.mp3'"></audio>
		<!-- 菜单栏 -->
		<view class="menu">
			<image class="more" src="../../static/play/more.png" @click="handleShowMore"></image>
		</view>
		<!-- 评论区 上拉 -->
		<view class="comment-box" v-if="showMore">
			<view class="header">
				<view class="title">评论区</view>
				<image @click="showMore=false" class="close-icon" src="../../static/close.png"></image>
			</view>
			<view class="scroll-box">
				<!-- 缺省图 -->
				<view v-if="!commentList.length" class="empty-box">
					<image  class="empty" mode="widthFix"
						src="../../static/play/comment-empty.png"></image>
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
			</view>
			<!-- 评论输入框 -->
			<view class="search-box">
				<u-search search-icon="edit-pen" placeholder="评论一句" v-model="keyword" action-text="发送"></u-search>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				playState: false, // 音乐播放状态(true暂停, false播放)
				id: '', // 上一页传过来的音乐id
				songInfo: {}, // 歌曲信息
				lyric: {}, // 歌词枚举对象(需要在js拿到歌词写代码处理后, 按照格式保存到这个对象)
				curLyric: "", // 当前显示哪句歌词
				lastLy: "", // 记录当前播放歌词
				showMore: false,
				commentList: [],
				keyword:''
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
			// this.showLyric();
		},
		methods: {
			getSong() {
				this.$ajax.get('/song/detail?ids=' + this.id).then(res => {
					// console.log("res:", res)
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
				// 返回得到的歌词对象(可以打印看看)
				//   console.log(lyricObj);
				return lyricObj;
			},
			audioStart() {
				// 播放按钮 - 点击事件
				if (!this.playState) {
					// 如果状态为false

					this.$refs.audio.play(); // 调用audio标签的内置方法play可以继续播放声音
				} else {
					this.$refs.audio.pause(); // 暂停audio的播放
				}
				this.playState = !this.playState; // 点击设置对立状态
			},
			showLyric() {
				// 监听播放audio进度, 切换歌词显示
				// this.$refs.audio.addEventListener("timeupdate", () => {
				let curTime = Math.floor(this.$refs.audio.currentTime);
				// 避免空白出现
				if (this.lyric[curTime]) {
					this.curLyric = this.lyric[curTime];
					this.lastLy = this.curLyric;
				} else {
					this.curLyric = this.lastLy;
				}
				// });
			},
			handleShowMore() {
				this.showMore = !this.showMore
				this.getCommentList()
			},
			// 获取评论列表
			getCommentList() {
				this.$ajax.get('/comment/new?type=0&sortType=3&pageSize=20', {
					id: this.id,
					// pageNo: this.pageNo,
					cursor: Date.now(),
				}).then(res => {
					this.commentList = res.data.data.comments
				})

			}
		}
	}
</script>
<style scoped lang="scss">
	.song-bg {
		width: 100vw;
		// height: 100vh;
		height: 100%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		overflow: hidden;
		z-index: 1;
		opacity: 1;
		filter: blur(25px);
		/*模糊背景 */
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
		z-index: 10001;
	}

	.song-turn {
		width: 100%;
		height: 100%;
		// background: url("./img/bg.png") no-repeat;
		background-size: 100%;
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

	.song-start {
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

	.left-incon {
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 24px;
		z-index: 10001;
		color: #fff;
	}

	.ani {
		animation: turn 5s linear infinite;
	}

	@keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}

	.menu {
		position: fixed;
		width: 100vw;
		height: 100rpx;
		background-color: #fff;
		bottom: 0;
		display: flex;
		align-items: center;
		// justify-content: flex-end;
		padding: 0 20rpx;
		z-index: 9999999;

		.more {
			width: 50rpx;
			height: 50rpx;

		}
	}

	.comment-box {
		background-color: #fff;
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 75vh;
		border-radius: 20rpx 20rpx 0 0;
		z-index: 999999999999;

		.header {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx;

			.title {
				font-size: 24rpx;
			}

			.close-icon {
				position: absolute;
				right: 0;
				width: 50rpx;
				height: 50rpx;
			}
		}

		.scroll-box {
			height: 80%;
			margin-bottom: 20rpx;
			overflow-y: scroll;
			.empty-box{
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
		.search-box{
			border-top:2rpx solid #9999992e;
			width: 100%;
			padding: 10rpx 0;
		}
	}
</style>