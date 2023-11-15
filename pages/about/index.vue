<template>
	<view class="app">
		<view class="about">
			<view class="box">
				<view class="subTitle">Contact Us</view>
				<view class="content">
					<p>
						Email: info@gemgemgo.xyz
					</p>
					<p>
						Twitter: KetchupRepublic
					</p>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {};
		},
		onShow() {
			// console.log('Discover onShow=>');
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	$color_main: #e99b3d;

	.app {
		display: block;

		.about {
			background: #fff;
			margin: 20rpx;
			border-radius: 20rpx;
			padding: 20rpx;

			.box {
				width: 100%;
				margin-bottom: 20rpx;

				.subTitle {
					height: 60rpx;
					line-height: 60rpx;
					font-size: 32rpx;
					text-align: left;
					border-bottom: 5rpx solid $color_main;
					font-weight: bolder;
					text-indent: 20rpx;
				}

				.content {
					font-size: 28rpx;
					text-align: left;
					padding: 20rpx;

					p {
						padding: 10rpx 0;
					}
				}
			}

		}
	}
</style>