<template>
	<view class="app">
		<view class="page page-web3">
			<view class="about">
				<view class="box">
					<view class="box-head">Contact Us</view>
					<view class="box-body">
						<p>
							Email: {{email}}
						</p>
						<p>
							Twitter: {{twitter}}
						</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		config
	} from "@/utils/config.js";
	export default {
		data() {
			return {
				email: config.email,
				twitter: config.twitter,
			};
		},
		onShow() {
			// console.log('Discover onShow=>');
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.app {
		display: block;

		.about {
			padding: 60rpx 30rpx;
		}
	}
</style>