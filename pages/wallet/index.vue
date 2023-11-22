<template>
	<view class="app">
		<view class="page page-gray">
			<view class="wallet">
				<view class="card">
					<view class="money">{{moneyGEM}}<text class="point">gem</text></view>
					<view class="address">{{showWallet}}<text class="copy" @click="onCopy"></text>
					</view>
				</view>
				<view class="menus">
					<view class="li" @click="onGoSettings">Settings</view>
					<view class="li" @click="onGoAbout">About</view>
				</view>
				<view class="btn-sm" @click="onLogout">Log Out</view>
			</view>
			<Navbar active='Wallet'></Navbar>
		</view>
	</view>
</template>

<script>
	import {
		formatWalletAddress
	} from "@/utils/util.js";
	import Navbar from "@/components/Navbar/index.vue";
	export default {
		components: {
			Navbar,
		},
		data() {
			return {
				moneyGEM: 0.00,
				showWallet: 'your wallet *** address',
				walletAddress: '',
			};
		},
		onShow() {
			// this.getUser();
		},
		methods: {
			onGoSettings() {
				// 跳轉到設置
				uni.navigateTo({
					url: '/pages/settings/index'
				});
			},
			onGoAbout() {
				// 跳轉到關於
				uni.navigateTo({
					url: '/pages/about/index'
				});
			},
			onCopy() {
				// 複製錢包地址
				console.log('onCopy');
				this.copyToClipboard(this.walletAddress);
			},
			onLogout() {
				// 退出登錄
				console.log('onLogout');
				this.getOut();
			},
			copyToClipboard(copyText) {
				// 複製到粘貼板
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
				// 獲取用戶資料
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
				// 退出登錄請求
				let that = this;
				let api = "/Login/gemLogout";
				// this.$http.get({
				// 	api,
				// }).then(res => {
				// 	if (res.code === 0) {
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
				// 	} else {
				// 		uni.showToast({
				// 			title: res.msg,
				// 			duration: 2000,
				// 			icon: 'none'
				// 		});
				// 	}
				// });
			},
		}
	}
</script>

<style lang="scss">
	.app {
		display: block;

		.wallet {
			padding: 60rpx 30rpx;

			.money {
				color: #FFF;
				text-align: center;
				font-family: Poppins;
				font-size: 120rpx;
				font-style: normal;
				font-weight: 700;
				letter-spacing: -1.2rpx;
				text-transform: capitalize;
				height: 160rpx;
				line-height: 200rpx;

				.point {
					font-size: $uni-font-size-base;
					padding: 0 10rpx;
				}
			}

			.address {
				font-size: $uni-font-size-base;
				height: 140rpx;
				line-height: 140rpx;
				text-align: center;

				.copy {
					background: url('@/static/images/icon-copy.png') center no-repeat;
					background-size: 50%;
					padding: 5px 20px;
					cursor: pointer;
				}
			}

		}
	}
</style>