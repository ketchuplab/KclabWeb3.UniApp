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
			console.log('Settings onShow=>');
			this.getVolumeState();
		},
		methods: {
			switchChange(e) {
				// 開關
				console.log('switchChange=>', e.detail.value);
				this.volumeState = e.detail.value;
				this.setVolumeMute(e.detail.value);
			},
			setVolumeMute(state) {
				// 設定音量
				try {
					uni.setStorageSync("volume", state);
					window.Android.aosSetMusicOpen(state);
				} catch (e) {
					LogReport({
						type: 'error',
						logInfo: `log=>[${e}],track=>[page=>${this.$route.path} | function=>window.Android.aosSetMusicOpen]`,
					});
				}
			},
			getVolumeState() {
				// 獲取音量
				try {
					let localVolume = uni.getStorageSync('volume');
					console.log('getVolumeState=>localVolume=>', localVolume);
					if (localVolume == "") {
						let bMute = window.Android.aosGetMusicState();
						console.log('getVolumeState=>', bMute);
						this.volumeState = bMute;
					} else {
						window.Android.aosSetMusicOpen(localVolume);
						this.volumeState = localVolume;
					}
				} catch (e) {
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
	}
</style>