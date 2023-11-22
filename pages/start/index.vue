<template>
	<view class="app">
		<view class="page page-web3">
			<view class="appName">{{appName}}</view>
			<view class="appDesc">{{appDesc}}</view>
			<view class="btnGo" @click="onGo">Go</view>
		</view>
	</view>
</template>

<script>
	import {
		config
	} from '@/utils/config.js';
	export default {
		data() {
			return {
				appName: '',
				appDesc: '',
			}
		},
		onShow() {
			this.appName = config.appName;
			this.appDesc = config.appDesc;
			// this.getAppConfig();
		},
		methods: {
			onGo() {
				// 進入應用
				let localToken = uni.getStorageSync('token') || '';
				console.log('onGo=>localToken=>', localToken);
				if (localToken != '') {
					try {
						window.Android.aosSetUserToken(localToken);
					} catch (e) {
						LogReport({
							type: 'error',
							logInfo: `log=>[${e}],track=>[page=>${this.$route.path} | function=>window.Android.aosSetUserToken]`,
						});
					}
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/home/index'
						});
					}, 2000);
				} else {
					uni.reLaunch({
						url: '/pages/login/index'
					});
				}
			},
			getAppConfig() {
				// 獲取應用配置資訊
				let that = this;
				let api = "/gemgemGoApps/getAppConfig";
				this.$http.get({
					api,
				}).then(res => {
					if (res.code === 0) {
						console.log('getAppConfig=>res.data=>', res.data);
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.app {
		display: block;

		.appName {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			color: #FFF;
			font-family: Poppins;
			font-size: 48rpx;
			font-style: normal;
			font-weight: 700;
			letter-spacing: -0.72rpx;
			text-align: center;
			margin-top: 200rpx;
		}

		.appDesc {
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			color: rgba(255, 255, 255, 0.70);
			text-align: center;
			font-family: Poppins;
			font-size: 32rpx;
			font-style: normal;
			font-weight: 400;
			letter-spacing: -0.32px;
			text-align: center;
		}

		.btnGo {
			width: 130rpx;
			height: 130rpx;
			line-height: 130rpx;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 15%;
			margin: 0 auto;
			text-align: center;
			font-size: 38rpx;
			font-weight: 700;
			color: #fff;
			border-radius: $uni-border-radius-circle;
			background: linear-gradient(93deg, rgba(255, 255, 255, 0.50) 5.69%, rgba(255, 255, 255, 0.20) 100.63%);
			backdrop-filter: blur(25rpx);
			cursor: pointer;
			animation: breathingAnimation 2s infinite alternate;
		}

		@keyframes breathingAnimation {
			0% {
				transform: scale(1);
			}

			100% {
				transform: scale(1.2);
			}
		}

	}
</style>