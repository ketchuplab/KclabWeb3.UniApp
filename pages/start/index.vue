<template>
	<view class="app">
		<view class="index" :style="{ backgroundImage: dynamicBackground }">
		</view>
		<view class="go" @click="onGo">Go</view>
		<view class="co">
			Ketchup Republic All Rights Reserved
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lang: '_en',
				dynamicBackground: "url('static/images/init.jpg')",
			}
		},
		onShow() {
			this.getAppConfig();
		},
		methods: {
			onGo() {
				let localToken = uni.getStorageSync('token') || '';
				// console.log('onGo=>localToken=>', localToken);
				if (localToken != '') {
					try {
						window.Android.aosSetUserToken(localToken);
					} catch (e) {
						//TODO handle the exception
						LogReport({
							type: 'error',
							logInfo: `log=>[${e}],track=>[page=>${this.$route.path} | function=>window.Android.aosSetUserToken]`,
						});
					}
					setTimeout(()=>{
						uni.reLaunch({
							url: '/pages/connecting/index'
						});
					},2000);
				} else {
					uni.reLaunch({
						url: '/pages/login/index'
					});
				}
			},
			getAppConfig() {
				let that = this;
				let api = "/gemgemGoApps/getAppConfig";
				this.$http.get({
					api,
				}).then(res => {
					if (res.code === 0) {
						this.lang = res.data.lang;
						// console.log('getAppConfig=>', this.lang);
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						})
					}
				});
			},
			langBgImage(lang) {

			}
		}
	}
</script>

<style lang="scss">
	.app {
		display: block;

		.index {
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			background-repeat: no-repeat;
			background-size: 100%;
		}

		.go {
			text-align: center;
			padding: 30rpx;
			font-size: 48rpx;
			font-weight: lighter;
			color: #fff;
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
			line-height: 60rpx;
			margin: 0 auto;
			cursor: pointer;
			animation: breathing 3s infinite;
			position: fixed;
			bottom: 165rpx;
			left: 0;
			right: 0;
		}

		.co {
			text-align: center;
			padding: 15rpx;
			font-size: 28rpx;
			font-weight: lighter;
			color: #e99b3d;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 30rpx;

			.name {
				font-size: 48rpx;
				height: 60rpx;
				line-height: 60rpx;
				padding-bottom: 30rpx;
			}
		}
	}
</style>