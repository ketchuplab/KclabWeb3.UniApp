<template>
	<view class="app">
		<view class="settings">
			<view class="form">
				<view class="title">Sound {{volumeState==true?'On':'Off'}}</view>
				<switch style="transform:scale(0.7)" :checked="volumeState==true?true:false" @change="switchChange" />
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
			return {
				volumeState: true,
			}
		},
		onShow() {
			// console.log('Settings onShow=>');
			this.getVolumeState();
		},
		methods: {
			switchChange(e) {
				// console.log('switchChange=>', e.detail.value);
				this.volumeState = e.detail.value;
				this.setVolumeMute(e.detail.value);
			},
			setVolumeMute(state) {
				try {
					uni.setStorageSync("volume", state);
					window.Android.aosSetMusicOpen(state);
				} catch (e) {
					//TODO handle the exception
					LogReport({
						type: 'error',
						logInfo: `log=>[${e}],track=>[page=>${this.$route.path} | function=>window.Android.aosSetMusicOpen]`,
					});
				}
			},
			getVolumeState() {
				try {
					let localVolume = uni.getStorageSync('volume');
					// console.log('getVolumeState=>localVolume=>', localVolume);
					if (localVolume == "") {
						let bMute = window.Android.aosGetMusicState();
						// console.log('getVolumeState=>', bMute);
						this.volumeState = bMute;
					} else {
						window.Android.aosSetMusicOpen(localVolume);
						this.volumeState = localVolume;
					}
				} catch (e) {
					//TODO handle the exception
					LogReport({
						type: 'error',
						logInfo: `log=>[${e}],track=>[page=>${this.$route.path} | function=>window.Android.aosGetMusicState]`,
					});
				}

			},
		}
	}
</script>

<style lang="scss">
	.app {
		display: block;

		.settings {
			width: 80%;
			border-radius: 30rpx;
			margin: 30rpx auto;
			padding: 20rpx;
			background: #fff url('@/static/images/bg-arrow.png') top right no-repeat;
			display: flex;
			box-shadow: 0rpx 0rpx 5rpx -5rpx #000;
			cursor: pointer;

			.form {
				width: 100%;
				padding: 20rpx;
				display: flex;
				height: 60rpx;
				line-height: 60rpx;

				.title {
					font-size: 32rpx;
					padding: 0;
					text-align: left;
					margin-right: 30rpx;
					width: 100%;
				}

			}
		}
	}
</style>