<template>
	<view class="app">
		<view class="page page-white">
			<view class="forget">
				<view class="step1" v-if="step=='step1'">
					<view class="remark">
						If you've forgotten your password, please fill in the email associated with your account. We
						will send a verification code to your email to ensure you are the legitimate owner of the
						account.
					</view>
					<br />
					<input class="input" type="email" maxlength="32" placeholder="Email" focus inputmode="email"
						confirm-type="done" v-model="email" />
					<view class="btn-sm" @click="onSendEmail">Send Again</view>
				</view>
				<view class="step2" v-if="step=='step2'">
					<input class="input" type="email" maxlength="32" placeholder="Email" disabled="true"
						inputmode="email" confirm-type="done" v-model="email" />
					<input class="input" type="text" maxlength="4" placeholder="Verification code" inputmode="text"
						confirm-type="done" v-model="code" />
					<input class="input" type="password" maxlength="32" placeholder="Password" inputmode="text"
						confirm-type="done" v-model="password1" />
					<input class="input" type="password" maxlength="32" placeholder="Confirm Password" inputmode="text"
						confirm-type="done" v-model="password2" />
					<view class="btn-sm" @click="onConfirm">Confirm</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				code: '',
				password1: '',
				password2: '',
				step: 'step1',
			};
		},
		onLoad() {

		},
		methods: {
			onConfirm() {
				// 校驗資料
				console.log('onRegister');
				if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) == false) {
					uni.showToast({
						title: 'Please enter the correct email address.',
						duration: 2000,
						icon: 'none'
					});
					return;
				} else if (this.code.length < 4) {
					uni.showToast({
						title: 'Please enter the verification code.',
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
					this.postChangePassword();
				}
			},
			postChangePassword() {
				// 重置密碼請求
				uni.showLoading({
					title: 'Resetting password...'
				});
				let api = "/user/resetPassword";
				// this.$http.post({
				// 	api,
				// 	params: {
				// 		email: this.email,
				// 		resetCode: this.code,
				// 		password: this.password1,
				// 	}
				// }).then(res => {
				// 	if (res.code === 0) {
						uni.hideLoading();
						uni.showToast({
							title: 'Succeeded in resetting the password.',
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/index'
							});
						}, 500);
				// 	}
				// });
			},
			onSendEmail() {
				// 傳送郵件
				console.log('onSendEmail');
				if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) == false) {
					uni.showToast({
						title: 'Please enter the correct email address.',
						duration: 2000,
						icon: 'none'
					});
					return;
				} else {
					this.postEmail();
				}
			},
			postEmail() {
				// 傳送郵件請求
				console.log('postEmail');
				uni.showLoading({
					title: 'Sending a verification code email....'
				});
				let api = "/user/sendResetCode";
				// this.$http.post({
				// 	api,
				// 	params: {
				// 		email: this.email,
				// 	}
				// }).then(res => {
				// 	if (res.code === 0) {
						uni.hideLoading();
				// 		if (res.data == true) {
							this.step = 'step2';
							uni.showToast({
								title: 'Sending the email successfully...',
								icon: 'none',
								duration: 2000
							});
				// 		} else {
				// 			uni.showToast({
				// 				title: res.msg,
				// 				icon: 'none',
				// 				duration: 2000
				// 			});
				// 		}
				// 	}
				// });
			},
		}
	}
</script>

<style lang="scss">
	.app {
		display: block;

		.forget {
			text-align: left;
			padding: 30rpx;

			.step1 {
				display: block;

				.remark {
					color: $uni-text-color;
					font-size: $uni-font-size-lg;
					font-weight: lighter;
					padding: 30rpx;
				}
			}

		}
	}
</style>