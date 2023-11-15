<template>
	<ul class="nav">
		<li :key="menu.name" :class="menu.name==active?'active':''" v-for="menu in menusList" @click="goPage(menu.url)">
			<template v-if="menu.name=='Gem'">
				<div :class="menu.name==active?'home home-chk':'home'">
					<div class="img">
						<img :src="menu.name==active?menu.active:menu.icon" />
					</div>
					<div class="text">{{menu.name}}</div>
				</div>
			</template>
			<template v-else>
				<div class="img">
					<img :src="menu.name==active?menu.active:menu.icon" />
				</div>
				<div class="text">{{menu.name}}</div>
			</template>
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
						name: 'HP',
						icon: 'static/images/power.png',
						active: 'static/images/power-chk.png',
						url: '/pages/energy/index',
					},
					{
						name: 'Gem',
						icon: 'static/images/device.png',
						active: 'static/images/device.png',
						url: '/pages/connecting/index',
					},
					{
						name: 'Wallet',
						icon: 'static/images/wallet.png',
						active: 'static/images/wallet-chk.png',
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
	$color_main: #e99b3d;
	$color_li: #cdcdcd;
	$color_home: #e19a2e;
	$color_active: #000;

	.nav {
		position: fixed;
		height: 120rpx;
		line-height: 120rpx;
		display: flex;
		background: #fff;
		left: 0;
		right: 0;
		bottom: 0;
		list-style: none;
		padding: 0;
		margin: 0;
		z-index: 2;
		border-top: 1rpx solid $color_main;

		li {
			width: 33.33%;
			text-align: center;
			cursor: pointer;
			color: $color_li;

			.img {
				text-align: center;
				height: 70rpx;

				img {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.text {
				font-size: 28rpx;
				height: 50rpx;
				line-height: 50rpx;
			}

			.home {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				margin: 0 auto;
				margin-top: -50rpx;
				background: #fffc0;
				/* fallback for old browsers */
				background: -webkit-linear-gradient(to top, #fde5c9, rgb(255, 255, 255));
				/* Chrome 10-25, Safari 5.1-6 */
				background: linear-gradient(to top, #fde5c9, rgb(255, 255, 255));
				/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
				color: #f7cc97;

				.img {
					text-align: center;
					height: 90rpx;

					img {
						width: 100rpx;
						height: 100rpx;
					}

				}
			}

			.home-chk {
				color: $color_main;
				border: 1rpx solid $color_main;
			}
		}

		.active {
			color: $color_active;
			cursor: default;
		}
	}
</style>