import Vue from "vue";
Vue.mixin({
	methods: {
		/**
		 * 截取字符串超出显示省略号
		 * @param {String} str 截取字符串
		 * @param {Number} sliceLength 超出字数 (汉字算2个长度 字母型外文、数字、符号字算1个长度)
		 * @returns {string}
		 */
		stringSlice(str, sliceLength = 30) {
			let count = 0;
			let resultStr = "";
			if (str) {
				for (let i = 0; i < str.length; i++) {
					if (/\w/.test(str[i])) {
						count += 1;
					} else {
						count += 2;
					}
					if (count <= sliceLength) {
						resultStr += str[i];
					} else {
						return resultStr + "...";
					}
				}
				return resultStr;
			} else {
				return "";
			}
		},
		// 简单页面跳转
		toLink(url, opts = {}) {
			let options = opts;
			options.url = url
			uni.navigateTo(options)
		},
		// 返回
		backRoute(delta = 1, opts = {}) {
			const pages = getCurrentPages()
			console.log(pages)
			let options = opts;
			options.delta = delta
			console.log('数据返回', options)
			uni.navigateBack(options)
			console.log('数据返回结束')
		},
		// 不足两位数补零
		zeroFill(val) {
			return val >= 10 ? val : '0'+val 
		},
		// 时间戳格式化
		getDateTime(val) {
			let time = new Date(val)
			let year = time.getFullYear()
			let month = time.getMonth() + 1
			let date = time.getDate()
			let hour = time.getHours()
			let min = time.getMinutes()
			let seconds = time.getSeconds()
			return year + '-' + this.zeroFill(month) + '-' + this.zeroFill(date) + ' ' + this.zeroFill(hour) +
				':' + this.zeroFill(min) + ':' + this.zeroFill(seconds)

		}
	}
})