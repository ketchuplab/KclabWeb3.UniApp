import App from './App';

// #ifndef VUE3

import Vue from 'vue';
import './uni.promisify.adaptor';

/*
全域性請求
*/
import {
	request
} from '@/utils/api.js';
Vue.config.productionTip = false;
Vue.prototype.$http = request;

/*
全域性日誌
*/
import {
	LogReport
} from '@/utils/util.js';
/*
全域性混入，定義全域性錯誤處理邏輯
*/
Vue.mixin({
	methods: {
		handleError(err, vm, info) {
			// console.error('Global error:', err, info);
			// 在這裡進行異常的上報、日誌記錄等操作
			LogReport({
				type: 'error',
				logInfo: `log=>[${err}],track=>[${vm}],info=>[${info}]`,
			});
		}
	},
	created() {
		// 生命週期函式：應用啟動時設定全域性錯誤處理函式
		Vue.config.errorHandler = this.handleError;
	},
	onShow() {
		uni.getNetworkType({
			success: (res) => {
				// console.log('當前網路狀態', res);
				if (res.networkType === 'none') {
					uni.showModal({
						title: 'Warning!',
						content: 'Please Connect to the Internet',
						success: function(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: '/pages/start/index'
								});
							}
						}
					});
				}
			}
		});
	},
});

/*
vconsole 日誌除錯,提交前需要注释  本地调试使用
*/
const vconsole = require('vconsole');
Vue.prototype.$vconsole = new vconsole();


App.mpType = 'app'
const app = new Vue({
	...App,
})
app.$mount()

// #endif

// #ifdef VUE3

import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}

// #endif