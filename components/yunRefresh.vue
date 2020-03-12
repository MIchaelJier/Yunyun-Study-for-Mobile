<template>
	<view @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<view class='refreshBox' :style="isTranform">
			<view class='refresh' :style="isZoom" :class="isEnd == 2 ? 'animationSmall' : '' ">
				<view class='refreshWord' v-if="isEnd == 0">松开刷新</view>
				<view class='refreshCirle animation' v-if="isEnd == 1"></view>
				<view v-if="isEnd == 2">
					<uni-icons type="checkmarkempty" size="50r"></uni-icons>
				</view>
			</view>
		</view>
		<block v-show="isEnd === 0">
			<slot></slot>
		</block>
	</view>
</template>

<script>
	import uniIcons from '../uniUI/components/uni-icons/uni-icons.vue'
	export default {
		name: 'refresh',
		props: {
			  isTop:{
				  type:Number,
				  default:1
			  }
		},
		components:{
			uniIcons
		},
		data() {
			return {
				isTranf: 0,
				touchStart: '',
				touchMove: '',
				isEnd: 0,
				isShow: false
			};
		},
		
		methods: {
			refreshStart(e) {
				if (this.isEnd == 0 && this.isTop == 1) {
					this.touchStart = e.changedTouches[0].pageY
				}
			},
			refreshMove(e){
				if (this.isEnd == 0 && this.isTop == 1) {
					var touchStart = this.touchStart,
						oldMove = this.touchMove,
						newMove = e.changedTouches[0].pageY
					if (touchStart <= newMove) {
						var isTranf = touchStart > newMove ? 0 : newMove - touchStart
						this.isTranf = isTranf
						this.touchMove = e.changedTouches[0].pageY
					}
				} else{
					this.isTranf = 0
					this.isEnd = 0
					this.touchStart = 9999
				}
			},
			refreshEnd(e) {
				var that = this
				if (this.isEnd == 0 && this.isTop == 1) {
					if (this.isTranf >= 90 && this.isShow) {
						this.isTranf = 125
						this.isEnd = 1
						this.$emit('isRefresh');
					} else {
						this.isTranf = 0
					}
				}
			},
			endAfter(){ //刷新结束调用
				uni.showToast({
					icon: 'none',
					title: '刷新成功',
					duration: 500
				});
				this.isEnd = this.isShow ? 2 : 0;
				setTimeout(() => {
					this.isTranf = 0
					this.isEnd = 0
					this.isShow = false
				}, 600)
			}
		},
		computed: {
			isTranform() {
				var isTranf = this.isTranf > 150 ? 150 : this.isTranf
				var isTemp = `transform: translateY(${isTranf-100}px);`
				return isTemp
			},
			isZoom() {
				var isTranf = this.isTranf > 125 ? 125 : this.isTranf
				var isTemp = `zoom:${isTranf/125};`
				return isTemp
			}
		},
		mounted() {
			this.$nextTick( () => {
				uni.createIntersectionObserver(this)
					.relativeToViewport({top: 0 , bottom: 0})
					.observe('.refresh', (res) => {
						if(this.change){
							clearTimeout(this.change);
						}
						if(res.intersectionRatio > 0){
							this.change = setTimeout(() => {
								this.isShow = true
							}, 100);
						}else{
							this.isShow = false
						}
					});
			})
		}
	}
</script>

<style lang="scss">
	@mixin flexCenter {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.refreshBox {
		margin:0 auto;
		width: 100%;
		height: 100rpx;
		overflow: hidden;
		max-height: 300rpx;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		transform: translateY(-100rpx);
		@include flexCenter;
		.animationSmall {
			animation: small 1.1s both;
		}
		.refresh {
			min-width: 50rpx;
			height: 50rpx;
			background: #FFFFFF;
			box-shadow: 0 0 16rpx 0 rgba(0, 0, 0, 0.10);
			border-radius: 50rpx;
			@include flexCenter;
			.refreshWord{
				width: 150rpx;
				height: 26rpx;
				font-size: 24rpx;
				line-height: 26rpx;
				text-align: center;
				border-radius: 26rpx;
			}
			.refreshCirle {
				width: 26rpx;
				height: 26rpx;
				border-radius: 50%;
				display: inline-block;
				position: relative;
				border: 6rpx solid black;
				border-bottom-color: transparent;
				border-top-color: transparent;
			}
			.animation {
				animation: rotate 1.1s infinite;
				animation-timing-function: cubic-bezier(0.3, 1.65, 0.7, -0.65);
			}
			.true {
				color: black;
			}
			.iconYes {
				width: 34rpx;
				height: 34rpx;
			}
	}
	@keyframes small {
		0% {
			transform: scale(1)
		}
		20%{
			transform: scale(1.4)
		}
		100% {
			transform: scale(0)
		}
	}

	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	
</style>

