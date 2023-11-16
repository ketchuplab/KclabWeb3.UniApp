<template>
	<view class="app">
		start app
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onShow() {
			this.getAppConfig();
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
	}
</style>