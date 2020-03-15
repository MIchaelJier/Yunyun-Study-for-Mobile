<template>
	<view>
		<view
			id="_drag_button"
			class="drag"
			:style="'left: ' + left + 'px; top:' + top + 'px;'"
			@click="click"
			@touchstart="touchstart"
			@touchmove.stop.prevent="touchmove"
			@touchend="touchend"
			:class="{transition: isDock && !isMove }"
		>
		
			<view class="drag drag-under"
			:style="{width: isShow ? '450rpx': '40px',transform:`translateX(calc(${left < windowWidth/2 ? '50% - 40rpx' : '40rpx - 50%'}))`}">
				<view  v-show="isShow" class="drag-under-content" :style="{margin: left < windowWidth/2 ? '0 0 0 80rpx' : '0 80rpx 0 0'}">
					<block v-for="(item, index) in btnItem" :key="index">
						<view class="drag-under-content-item" @click="backLastPage">
							<view class="icon-box"><view :class="item.font"></view></view>
							<text>{{ item.name }}</text>
						</view>
					</block>
				</view>
			</view>
			<view class="drag-circle-v" :class="{'drag-circle-active': isShow}"></view>
			<view class="drag-circle-h" :class="{'drag-circle-active': isShow}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'drag-button',
		props: {
			isDock:{
				type: Boolean,
				default: false
			},
			existTabBar:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				top:0,
				left:0,
				width: 0,
				height: 0,
				offsetWidth: 0,
				offsetHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				isMove: true,
				edge: 10,
				text: '按钮',
				isShow: false,
				btnItem: [
					{font:'ux-ykt-icon-right-arrow', name:'返回'},
					{font:'ux-ykt-icon-cart2', name:'购物车'},
					{font:'ux-ykt-icon-account-fill', name:'账号'}
				]
			}
		},
		mounted() {
			const sys = uni.getSystemInfoSync();
			
			this.windowWidth = sys.windowWidth;
			this.windowHeight = sys.windowHeight;
			
			// #ifdef APP-PLUS
				this.existTabBar && (this.windowHeight -= 50);
			// #endif
			if (sys.windowTop) {
				this.windowHeight += sys.windowTop;
			}
			console.log(sys)
			
			const query = uni.createSelectorQuery().in(this);
			query.select('#_drag_button').boundingClientRect(data => {
				this.width = data.width;
				this.height = data.height;
				this.offsetWidth = data.width / 2;
				this.offsetHeight = data.height / 2;
				this.left = this.windowWidth - this.width - this.edge;
				this.top = this.windowHeight - this.height - this.edge;
			}).exec();
		},
		methods: {
			backLastPage() {
				uni.navigateBack({
				    delta: 2
				});
			},
			click() {
				this.isShow = !this.isShow;
				this.$emit('btnClick');
			},
			touchstart(e) {
				this.$emit('btnTouchstart');
			},
			touchmove(e) {
				// 单指触摸
				if (e.touches.length !== 1) {
					return false;
				}
				
				this.isMove = true;
				
				this.left = e.touches[0].clientX - this.offsetWidth;
				
				let clientY = e.touches[0].clientY - this.offsetHeight;
				// #ifdef H5
					clientY += this.height;
				// #endif
				let edgeBottom = this.windowHeight - this.height - this.edge;

				// 上下触及边界
				if (clientY < this.edge) {
					this.top = this.edge;
				} else if (clientY > edgeBottom) {
					this.top = edgeBottom;
				} else {
					this.top = clientY
				}
				
			},
			touchend(e) {
				if (this.isDock) {
					let edgeRigth = this.windowWidth - this.width - this.edge;
					
					if (this.left < this.windowWidth / 2 - this.offsetWidth) {
						this.left = this.edge;
					} else {
						this.left = edgeRigth;
					}
					
				}
				
				this.isMove = false;
				
				this.$emit('btnTouchend');
			},
		}}
</script>

<style lang="scss">
	.drag {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		box-shadow: 0 0 6upx rgba(0, 0, 0, 0.4);
		color: $uni-text-color-inverse;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		font-size: $uni-font-size-sm;
		position: fixed;
		z-index: 999;
		
		&.transition {
			transition: left .3s ease,top .3s ease;
		}
		&-under {
			transition-property: width, height;
			transition-duration: 0.2s;
			border-radius:80rpx;
			width: 80rpx;
			height: 80rpx;
			&-content {
				display: flex;
				&-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 0 20rpx;
					.icon-box{
						width: 40rpx;
						height: 40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 14px;
					}
				}
			}
		}
		&-circle-v {
			position: absolute;
			width: 4rpx;
			height: 40rpx;
			left: 38rpx;
			top: 20rpx;
			background-color: white;
			transform: rotate(0deg);
			transition: transform 0.3s;
			z-index: 9999;
		}
		
		&-circle-h {
			position: absolute;
			width: 40rpx;
			height: 4rpx;
			left: 20rpx;
			top: 38rpx;
			background-color: white;
			transform: rotate(0deg);
			transition: transform 0.3s;
			z-index: 9999;
		}
		
		&-circle-active {
			transform: rotate(135deg);
		}
	}
	
</style>
