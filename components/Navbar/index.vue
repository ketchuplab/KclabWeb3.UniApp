<template>
	<ul class="nav">
		<li :key="menu.name" v-for="menu in menusList" @click="goPage(menu.url)">
			<view :class="menu.name==active?'icon active':'icon'">
				<text :class="menu.icon"></text>
			</view>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			active: String,
		},
		data() {
			return {
				menusList: [{
						name: 'Message',
						icon: 'iconfont icon-message',
						url: '/pages/message/index',
					},
					{
						name: 'Home',
						icon: 'iconfont icon-home',
						url: '/pages/home/index',
					},
					{
						name: 'Wallet',
						icon: 'iconfont icon-my',
						url: '/pages/wallet/index',
					},
				]
			};
		},
		methods: {
			// 去跳轉頁面
			goPage(url) {
				console.log('goPage=>', url);
				uni.redirectTo({
					url: url
				});
			},
		},
	}
</script>

<style lang="scss">
	.nav {
		position: fixed;
		z-index: 2;
		left: 60rpx;
		bottom: 72rpx;
		right: 60rpx;
		height: 120rpx;
		line-height: 120rpx;
		list-style: none;
		flex-shrink: 0;
		border-radius: 65rpx;
		padding: 0;
		margin: 0 auto;
		background: var(--CTA, linear-gradient(89deg, #310BE8 3.08%, #0027FE 35.62%, #8200FF 63.79%, #D703FF 96.33%));
		display: flex;

		li {
			width: 33.33%;
			text-align: center;
			cursor: pointer;
			justify-content: center;
			align-items: center;
			display: flex;

			.icon {
				width: 80rpx;
				height: 80rpx;
				line-height: 80rpx;

				.iconfont {
					font-size: 40rpx;
					color: #fff;
					background-image: linear-gradient(143deg, #FFF 19.62%, rgba(255, 255, 255, 0.20) 109.73%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					stroke-width: 0.4rpx;
					stroke: #FFF;
					filter: drop-shadow(10rpx 10rpx 20rpx rgba(0, 0, 0, 0.10));
					backdrop-filter: blur(25rpx);
				}
			}

			.active {
				border-radius: 50%;
				border: 2rpx solid rgba(255, 255, 255, 0.00);
				background: rgba(255, 255, 255, 0.20);
				backdrop-filter: blur(25rpx);
				cursor: default;
			}
		}


	}
</style>