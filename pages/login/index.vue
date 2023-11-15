<template>
	<view class="app">
		<view class="title">Log In<view class="signup" @click="onRegister">Sign Up</view>
		</view>
		<view class="login">
			<input class="input" type="email" maxlength="32" placeholder="Email" inputmode="email" confirm-type="done"
				focus v-model="email" />
			<input class="input" type="password" maxlength="32" placeholder="Password" inputmode="text"
				confirm-type="done" v-model="password" />
			<view class="btn-login" @click="onLogin">Log In</view>
			<br />
			<view class="link" @click="onForgot">Forgot your password?</view>
		</view>
	</view>
</template>

<script>
	import {
		LogReport
	} from '@/utils/util.js';
	export default {
		data() {
			return {
				email: '',
				password: '',
			};
		},
		onShow() {
			this.onLoginOut();
		},
		methods: {
			onRegister() {
				// console.log('onRegister');
				uni.redirectTo({
					url: '/pages/register/index'
				});
			},
			onLogin() {
				// console.log('onLogin');
				if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) == false) {
					uni.showToast({
						title: 'Please enter the correct email address.',
						duration: 2000,
						icon: 'none'
					});
					return;
				} else if (this.password.length < 1) {
					uni.showToast({
						title: 'Please enter password.',
						duration: 2000,
						icon: 'none'
					});
					return;
				} else {
					this.getLogin();
				}
			},
			onLoginOut() {
				try {
					uni.clearStorage();
					window.Android.aosUserLogout();
				} catch (e) {
					//TODO handle the exception
					LogReport({
						type: 'error',
						logInfo: `log=>[${e}],track=>[page=>${this.$route.path} | function=>window.Android.aosUserLogout]`,
					});
				}
			},
			onForgot() {
				// console.log('onForgot');
				uni.navigateTo({
					url: '/pages/forgot/index'
				});
			},
			getLogin() {
				uni.showLoading({
					title: 'Log in...'
				});
				let that = this;
				let api = "/Login/gemLogin";
				this.$http.noTonkenGet({
					api,
					params: {
						email: this.email,
						password: this.password,
						act: 0,
					}
				}).then(res => {
					if (res.code === 0) {
						// console.log('getLogin=>token=>', res.data);
						try {
							uni.setStorageSync("token", res.data);
							window.Android.aosSetUserToken(res.data);
						} catch (e) {
							//TODO handle the exception
							LogReport({
								type: 'error',
								logInfo: `log=>[${e}],track=>[page=>${this.$route.path} | function=>window.Android.aosSetUserToken]`,
							});
						}
						setTimeout(() => {
							uni.hideLoading();
							uni.reLaunch({
								url: '/pages/connecting/index'
							});
						}, 2000);
					} else {
						uni.setStorageSync("token", '');
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
		.login {
			text-align: left;
			padding: 30rpx;
		}
	}
</style>