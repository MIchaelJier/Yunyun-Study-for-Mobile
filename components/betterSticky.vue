<template name="betterSticky">
	<view class="tui-sticky-class">
		<!--sticky 容器-->
		<view class="tui-sticky-header" 
			 :class="[isFixed === true ? 'tui-sticky-fixed' : '']" 
			 :style="{transform:transform,webkitTransform:transform}">
			<slot name="header"></slot>
		</view>
		<view :style="{height:holderHeight + 'px'}" v-if="isFixed"></view>
		<!--sticky 容器-->
		<!--内容-->
		<view :style="{height: initDone?'':'10000px'}">
			<slot name="content"></slot>
		</view>
	</view>
</template>

<script>
	/**initDone 初始
	 * scrollTop 页面滚动高度
	 * initTop 初始高度
	 * isUp 是否开启顶格
	 * 
	 * 引用页需要加的：
	 * onLoad(options) {
	 *	 this.$nextTick(() => {
	 *		uni.createSelectorQuery().in(this).select('.class').boundingClientRect((res) => {
	 *			if (res) {
	 *				this.initTop = res.height
	 *			}
	 *		}).exec()
	 *	 })
	 * },
	 * onPageScroll(e) {
	 *	 this.scrollTop= e.scrollTop
	 * },
	 * **/
	export default {
		name: "tuiSticky",
		props: {
			scrollTop: {
				type: [String, Number],
			},
			initTop: {
				type: [String, Number],
				default: 0
			},
			initDone: {
				type: Boolean,
				default: true
			},
			isUp: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			scrollTop(newValue, oldValue) {
				this.updateStickyChange();
			}
		},
		// #ifdef H5
		mounted() {
			this.init();
		},
		// #endif
		onReady() {
			this.init();
		},
		data() {
			return {
				timer: null,
				top: 0,
				height: 0,
				holderHeight: 0,
				translateY: 0,
				isFixed: false
			};
		},
		computed:{
			transform(){
				return `translate3d(0,${this.translateY}px,0)`
			}
		},
		methods: {
			init(){
				this.$nextTick(() => {
					this.updateScrollChange();
					uni.createSelectorQuery().in(this).select('.tui-sticky-header').boundingClientRect((res) => {
						if (res) {
							console.log(res,`tui-sticky-header's msg`)
							this.holderHeight = res.height 
						}
					}).exec()
				})
			},
			updateStickyChange() {
				const top = this.top;
				const height = this.height;
				const scrollTop = this.scrollTop
					
				const delY = scrollTop - (top + height) ; // 顶格操作，效果参考日期条
				this.isFixed = (scrollTop >= top && (this.isUp ? delY <= 0 : true)) ? true : false
				this.translateY = 0
				if (delY < 0 && -delY < this.holderHeight && this.isUp) {
					this.translateY = -this.holderHeight - delY
				}	
				
			},
			updateScrollChange() {
				if (this.timer) {
					clearTimeout(this.timer)
					this.timer = null
				}
				this.timer = setTimeout(() => {
					const className = '.tui-sticky-class';
					const query = uni.createSelectorQuery().in(this);
					query.select(className).boundingClientRect((res) => {
						if (res) {
							this.top > 0 || this.initTop === 0 ?
								this.top = res.top
								: this.top = this.initTop
							
							this.height = res.height;
						}
					}).exec()
				}, 300)
			}
		},
	}
</script>

<style>
	.tui-sticky-fixed {
		width: 100%;
		position: fixed;
		top: 0;
		/* #ifdef APP-PLUS */
		top: var(--status-bar-height);
		/* #endif */
		z-index: 1;
	}
</style>