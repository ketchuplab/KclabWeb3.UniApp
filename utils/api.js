import {
	config
} from '@/utils/config.js';
import {
	getParamsHash
} from '@/utils/util.js';

/*
對uni.request二次封裝
*/
export const request = {
	post: function({
		api,
		method = "POST",
		params,
		header = {
			'content-type': 'application/x-www-form-urlencoded',
			'x-access-token': uni.getStorageSync('token') || '',
			'x-sign': `${getParamsHash(params)}`,
		}
	}) {
		return new Promise((resolve, reject) => {
			let defaultParams = {}
			let data = Object.assign(defaultParams, params)
			let url = config.baseUrl + api
			uni.request({
				url,
				data,
				method,
				header,
				timeout: 15000,
				success: (res) => {
					if (res.data.code === 0) {
						resolve(res.data);
					} else {
						if (res.data.code === 2003 || res.data.code === 1 || res.data
							.code === 10001) {
							uni.showLoading({
								title: res.data.msg,
							});
							setTimeout(function() {
								uni.hideLoading();
								uni.reLaunch({
									url: '/pages/login/index'
								});
							}, 2000);
						} else {
							resolve(res.data);
						}
					}
				},
				fail(error) {
					uni.showToast({
						title: 'Unable to Connect to the Internet',
						duration: 2000,
						icon: 'none'
					});
				},
			})
		})
	},
	get: function({
		api,
		method = "GET",
		params,
		header = {
			'content-type': 'application/x-www-form-urlencoded',
			'x-access-token': uni.getStorageSync('token') || '',
			'x-sign': `${getParamsHash(params)}`,
		}
	}) {
		return new Promise((resolve, reject) => {
			let defaultParams = {}
			let data = Object.assign(defaultParams, params)
			let url = config.baseUrl + api
			uni.request({
				url,
				data,
				method,
				header,
				timeout: 15000,
				success: (res) => {
					if (res.data.code === 0) {
						resolve(res.data);
					} else {
						if (res.data.code === 2003 || res.data.code === 1 || res.data
							.code === 10001) {
							uni.showLoading({
								title: res.data.msg,
							});
							setTimeout(function() {
								uni.hideLoading();
								uni.reLaunch({
									url: '/pages/login/index'
								});
							}, 2000);
						} else {
							resolve(res.data);
						}
					}
				},
				fail(error) {
					uni.showToast({
						title: 'Unable to Connect to the Internet',
						duration: 2000,
						icon: 'none'
					});
				},
			})
		})
	},
	noTonkenGet: function({
		api,
		method = "GET",
		params,
		header = {
			'content-type': 'application/x-www-form-urlencoded',
			'x-sign': `${getParamsHash(params)}`,
		}
	}) {
		return new Promise((resolve, reject) => {
			let defaultParams = {}
			let data = Object.assign(defaultParams, params)
			let url = config.baseUrl + api
			uni.request({
				url,
				data,
				method,
				header,
				timeout: 15000,
				success: (res) => {
					if (res.data.code === 0) {
						resolve(res.data);
					} else {
						if (res.data.code === 2003 || res.data.code === 1 || res.data
							.code === 10001) {
							uni.showLoading({
								title: res.data.msg,
							});
							setTimeout(function() {
								uni.hideLoading();
								uni.reLaunch({
									url: '/pages/login/index'
								});
							}, 2000);
						} else {
							resolve(res.data);
						}
					}
				},
				fail(error) {
					uni.showToast({
						title: 'Unable to Connect to the Internet',
						duration: 2000,
						icon: 'none'
					});
				},
			});
		})
	},
}