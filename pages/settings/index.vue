<template>
	<view class="app">
		<view class="page page-web3">
			<view class="settings">
				<view class="box">
					<view class="box-head">Settings 1</view>
					<view class="box-body">
						<p>
							Your Settings 1
						</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		LogReport
	} from '@/utils/util.js';
	export default {
		data() {
			return {}
		},
		onShow() {
			console.log('Settings onShow=>');
		},
		methods: {
			// 這裡編寫你的設置程式
		}
	}
</script>

<style lang="scss">
	.app {
		display: block;

		.settings {
			padding: 60rpx 30rpx;
		}
	}
</style>