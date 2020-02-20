<template>
	<view class="yun-image">
		<image  :src="src"
				:style="{opacity: show ? '1': '0',transition:`opacity ${delay}s`,borderRadius:radius + 'px'}"
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
				delay: 0.5,
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
			lazy: {
				type: Boolean,
				default: false
			},
			radius: {
				type: [String,Number],
				default: 0
			}
		},
		methods:{
			showitem(){
				if(this.lazy){
					this.lazyObserve();
				}else{
					this.show = true
				}
			},
			//监控
			lazyObserve(){
				observer = uni.createIntersectionObserver(this);
				observer.relativeToViewport({top: 0 , bottom: 0}).observe('.yun-image', (res) => {
					// #ifdef H5 
						const aProps = Object.getOwnPropertyNames(res.intersectionRect);
						this.show = aProps.some(item => res.intersectionRect[item]>0);
						// 会出现相交区域高度为0的情况 所得intersectionRect为0
						// this.show = res.intersectionRect > 0 
					// #endif
					// #ifdef MP-WEIXIN || APP-PLUS
						this.show = res.intersectionRatio > 0 
					// #endif
					
				})
			}
		},
		mounted() {
			// this.$nextTick( () => {
				
			// })
		},
		destroyed(){
			 if (observer) {
			    observer.disconnect()
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
