<template>
	<view class="app">
		<view class="wallet">
			<view class="money">{{moneyGEM}}<text class="point">gem</text></view>
			<view class="address">{{showWallet}}<text class="copy" @click="onCopy"></text>
			</view>
		</view>
		<view class="menus">
			<view class="li" @click="onGoSettings">Settings</view>
			<view class="li" @click="onGoAbout">About</view>
		</view>
		<view class="btn-def" @click="onLogout">Log Out</view>
		<Navbar active='Wallet'></Navbar>
	</view>
</template>

<script>
	import {
		formatWalletAddress
	} from "@/utils/util.js";
	import Navbar from "@/components/Navbar/index.vue"
	export default {
		components: {
			Navbar,
		},
		data() {
			return {
				moneyGEM: 0.00,
				showWallet: '',
				walletAddress: '',
			};
		},
		onShow() {
			this.getUser();
		},
		methods: {
			onGoSettings() {
				uni.navigateTo({
					url: '/pages/settings/index'
				});
			},
			onGoAbout() {
				uni.navigateTo({
					url: '/pages/about/index'
				});
			},
			onCopy() {
				// console.log('onCopy');
				this.copyToClipboard(this.walletAddress);
			},
			onLogout() {
				// console.log('onLogout');
				this.toLogout();
			},
			toLogout() {
				this.getOut();
			},
			copyToClipboard(copyText) {
				uni.setClipboardData({
					data: copyText,
					success() {
						uni.showToast({
							title: 'Copied successfully',
							icon: 'success',
							duration: 1500
						});
					},
					fail() {
						uni.showToast({
							title: 'Copied failed',
							icon: 'none',
							duration: 1500
						});
					}
				});
			},
			getUser() {
				let that = this;
				let api = "/User/getUserBasicInfo";
				this.$http.get({
					api,
				}).then(res => {
					if (res.code === 0) {
						this.walletAddress = res.data.userBasicInfo.wallet_address;
						this.moneyGEM = res.data.gemStatisticInfo.token_count.toFixed(2);
						this.showWallet = formatWalletAddress(this.walletAddress);
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						})
					}
				});
			},
			getOut() {
				let that = this;
				let api = "/Login/gemLogout";
				this.$http.get({
					api,
				}).then(res => {
					if (res.code === 0) {
						uni.showToast({
							title: 'Logout successfully',
							icon: "none",
							duration: 2000
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/index'
							});
						}, 500);
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	$color_main: #e99b3d;

	.app {
		background: url('@/static/images/bg.jpg') center no-repeat;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		position: absolute;
		background-size: cover;
		filter: blur(0rpx);

		.wallet {
			width: 92%;
			background: rgba(0, 0, 0, 0.7);
			border-radius: 30rpx;
			margin: 100rpx 30rpx;
			padding: 100rpx 0 100rpx 0;

			.money {
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 72rpx;
				font-weight: lighter;
				color: $color_main;
			}

			.point {
				font-size: 28rpx;
				padding: 0 20rpx;
			}

			.address {
				font-size: 28rpx;
				height: 80rpx;
				line-height: 80rpx;
				color: $color_main;
				margin-top: 20rpx;
				text-align: center;
				cursor: pointer;

				.copy {
					padding: 30rpx;
					background: url('@/static/images/copy.png') center no-repeat;
					background-size: 50%;
				}
			}
		}

		.menus {
			width: 90%;
			margin: 0 auto;
			margin-bottom: 100rpx;


			.li {
				height: 100rpx;
				line-height: 100rpx;
				text-align: left;
				text-indent: 40rpx;
				font-size: 32rpx;
				cursor: pointer;
				background: #fff url('@/static/images/arrow-right.png') 96% center no-repeat;
				background-size: 6%;

				&:first-child {
					border-radius: 30rpx 30rpx 0 0;
					border-bottom: 1rpx solid #eee;
				}

				&:last-child {
					border-radius: 0 0 30rpx 30rpx;
				}
			}
		}
	}
</style>