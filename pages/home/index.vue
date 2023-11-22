<template>
	<view class="app">
		<view class="page page-white">
			<view class="home">
				Your home page code！
			</view>
			<Navbar active='Home'></Navbar>
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

		.home {
			padding: 60rpx 30rpx;
		}
	}
</style>