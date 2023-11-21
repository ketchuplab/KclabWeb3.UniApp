<template>
	<view class="app">
		<view class="page page-white">
			<view class="message">
				Message
			</view>
			<Navbar active='Message'></Navbar>
		</view>
	</view>
</template>

<script>
	import Navbar from "@/components/Navbar/index.vue";
	export default {
		components: {
			Navbar,
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.app {
		display: block;

		.message {
			padding: 60rpx 30rpx;
		}
	}
</style>