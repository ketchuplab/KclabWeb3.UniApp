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
				this.toLogout();
			},
			toLogout() {
				// 通過接口請求退出登錄
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

	}
</style>