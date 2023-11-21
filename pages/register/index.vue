<template>
	<view class="app">
		<view class="topbar-title">Sign Up<text class="skip" @click="onLogin">Log In</text></view>
		<view class="page page-white">
			<view class="register">
				<input class="input" type="email" maxlength="32" placeholder="Email" focus inputmode="email"
					confirm-type="done" v-model="email" />
				<input class="input" type="password" maxlength="32" placeholder="Password" inputmode="text"
					confirm-type="done" v-model="password1" />
				<input class="input" type="password" maxlength="32" placeholder="Confirm Password" inputmode="text"
					confirm-type="done" v-model="password2" />
				<view class="btn" @click="onRegister">Sign Up</view>
				<br />
				<view class="link" @click="onForgot">Forgot your password?</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password1: '',
				password2: '',
			};
		},
		onLoad() {

		},
		methods: {
			onRegister() {
				// 去註冊
				console.log('onRegister');
				if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) == false) {
					uni.showToast({
						title: 'Please enter the correct email address.',
						duration: 2000,
						icon: 'none'
					});
					return;
				} else if (this.password1.length < 1) {
					uni.showToast({
						title: 'Please enter password.',
						duration: 2000,
						icon: 'none'
					});
					return;
				} else if (this.password2.length < 1) {
					uni.showToast({
						title: 'Please reconfirm your password.',
						duration: 2000,
						icon: 'none'
					});
					return;
				} else if (this.password1 != this.password2) {
					uni.showToast({
						title: 'The two passwords are inconsistent',
						duration: 2000,
						icon: 'none'
					});
					return;
				} else {
					this.getRegister();
				}
			},
			onLogin() {
				// 去登入
				console.log('onLogin');
				uni.redirectTo({
					url: '/pages/login/index'
				});
			},
			onForgot() {
				// 找回密碼
				console.log('onForgot');
				uni.navigateTo({
					url: '/pages/forgot/index'
				});
			},
			getRegister() {
				// 請求註冊資料
				uni.showLoading({
					title: 'Registration underway....'
				});
				let api = "/Login/gemLogin";
				this.$http.post({
					api,
					params: {
						email: this.email,
						password: this.password1,
						act: 1,
					}
				}).then(res => {
					if (res.code === 0) {
						uni.hideLoading();
						uni.showToast({
							title: 'Registered successfully',
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/index'
							});
						}, 500);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.app {
		display: block;

		.register {
			padding: 160rpx 30rpx;
		}
	}
</style>