<template>
	<view class="yun-image">
		<image  :src="src"
				:style="{opacity: show ? '1': '0',transition:`opacity ${delay}s`}"
				:mode="mode"
				@load="showitem"
				class="yun-image"
				lazy-load
		></image>
	</view>
		
</template>

<script>
	let observer = null;
	export default {
		data() {
			return {
				show: false,
				delay: 0.3
			};
		},
		props:{
			src:{
				type: String,
				default: ''
			},
			mode:{
				type: String,
				default: 'scaleToFill'
			},
			scrollTop: {
				type: Number,
				default: 0,
			}
		},
		methods:{
			showitem(){
				if(this.scrollTop === 0){
					this.show = true;
				}
			}
		},
		mounted() {
			// uni.createSelectorQuery().in(this).select('.yun-image').boundingClientRect().exec((res) => {
			// 	this.delay += res[0].top / 1000 > 0.5 ? 0.5 : res[0].top / 1000
			// })
		},
		destroyed(){
			 if (observer) {
			    observer.disconnect()
			}
		},
		watch:{
			scrollTop(newVal){
				observer = uni.createIntersectionObserver(this);
				observer.relativeToViewport().observe('.yun-image', (res) => {
					 this.show = res.intersectionRatio > 0 
				})
			}
		}
	}
</script>

<style lang="scss">
	.yun-image{
		width: 100%;
		height: 100%;
	}
</style>
