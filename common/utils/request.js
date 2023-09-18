// 引入 uni-ajax 模块
import ajax from 'uni-ajax'
import Vue from 'vue'
import {baseUrl} from '@/common/utils/config.js'
// 创建请求实例
const instance = ajax.create({
	// 初始配置
	baseURL: 'http://localhost:3000',
	// baseURL: baseUrl,
	showLoading: true
})

// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		// 在发送请求前做些什么
		if (config.showLoading) {
			uni.showLoading({
				title: '加载中',
				mask: true,
			})
		}
		console.log("请求数据：", config)
		return config
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
instance.interceptors.response.use(
	response => {
		// 对响应数据做些什么
		console.log("响应数据：", response) //测试需要看，上线前删除
		uni.hideLoading();
		// const data = response.data;
		// if (data.ret != 0 || data.msg != "success") {
		// 	uni.showToast({
		// 		icon: "none",
		// 		title: data.msg,
		// 		duration: 2000,
		// 		mask: true,
		// 	})
		// }
		// return data
		return response
	},
	error => {
		// 对响应错误做些什么
		uni.hideLoading();
		return Promise.reject(error)
	}
)

// 如果您是像我下面这样挂载在 Vue 原型链上，则通过 this.$ajax 调用
Vue.prototype.$ajax = instance

// 导出 create 创建后的实例
export default instance