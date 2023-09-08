import Vue from "vue";
Vue.mixin({
	methods:{
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
		
	}
})