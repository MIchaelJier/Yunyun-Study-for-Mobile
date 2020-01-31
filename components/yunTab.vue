<template>
	<view>
		<better-sticky :scrollTop="scrollTop" :initTop="initTop">
			<template v-slot:header>
				<view class="titleBar">
				  <ul class="status">
					<li  v-for="(item, index) in tabs" :key="index" class="item">
					  <text :class=" status == index ? 'active':'' " @click="showStatus" :data-status="index" class="text">{{ item }}</text>
					</li>
				  </ul>
				  <view class="line" 
						:style="{background: lineColor,width: lineStyle.width || 0, transform: lineStyle.transform,transitionDuration: lineStyle.transitionDuration}">
				  </view>
				</view>
			</template>
			<template v-slot:content>
				<swiper class="tabBody" 
						@change="sliderSwiper" 
						:current="status" 
						:style="{height:contentHeight + 'px'}"
						@animationfinish="getLeft()"
						>
				        <block v-for="(item, index) in tabs" :key="index">
							<swiper-item><!-- v-if="status == index" -->
								<view class="swiperflag">
									<!-- #ifdef   H5 -->
									<slot :name="index"></slot>
									<!-- #endif--> 
									
									<!-- #ifdef APP-PLUS || MP-WEIXIN --> 
									<slot name="{{ index }}"></slot>
									<!-- #endif --> 
								</view>
							</swiper-item>
						</block>
				</swiper>
			</template>
		</better-sticky>
	</view>
</template>

<script>
	// import betterSticky from "../betterSticky.vue"
	export default {
		data() {
			return {
				status:0,
				contentHeight:0,
				duration: 0.2,
				lineStyle: {},
				lineColor: '#2CC17B',
			};
		},
		props:{
			tabs: { //需循环的标签列表
				type: Array,
				default () {
					return [];
				}
			},
			scrollTop: { //滚动值
				type: [String, Number],
				default: 0
			},
			initTop: {  //tab到顶部初始值
				type: [String, Number],
				default: 0
			},
			bottomBarHeight: { //底部fixed栏高度
				type: [String, Number],
				default: 0
			}
		},
		methods:{
			 showStatus(e){
			     let status = e.currentTarget.dataset.status;
			     this.status = status;
			     this.swiperHeight();
			 },
			 sliderSwiper(e){
				 this.status = e.detail.current;
				 this.swiperHeight();
			 },
			 statusEvent(status){
				 this.$emit('tabClick',status)
			 },
			 getLeft(){
				uni.createSelectorQuery().in(this).select('.active').boundingClientRect().exec((res) => {
					// console.log(res[0].left);
					const left = res[0].left + res[0].width / 2
					this.lineStyle = {
						width: `${res[0].width}px`,
						transform: `translateX(${left}px) translateX(-50%)`,
						transitionDuration: `${this.duration}s`
					};
				});
			 },
			 swiperHeight(){
				 this.$nextTick(() => {
					 uni.createSelectorQuery().in(this).selectAll('.swiperflag').boundingClientRect((res) => {
						const slot = res[this.status],
						      { windowHeight } = uni.getSystemInfoSync();	
							  // console.log({slot,windowHeight})
					 	if(slot.top + slot.height < windowHeight - this.bottomBarHeight && slot.top >= 0){
							// slot长度小于屏幕高度
							this.contentHeight = windowHeight - slot.top - this.bottomBarHeight;
						}else{
							this.contentHeight = res[this.status].height
						}
					 }).exec()
				 })
			 }
		},
		mounted() {
			setTimeout( () => {
				this.getLeft();
			},300)
			// 300是 路由动画时间
		},
		watch:{
			status(newVal){
				this.statusEvent(newVal)
			}
		}
	}
</script>

<style lang="scss">
	/* tab选择卡头部 */
	.titleBar {
	  position: relative;
	  box-sizing: border-box;
	  width: 100%;
	  border-bottom: 1px solid #eee;
	  align-items: center;
	  background-color: white;
	  
	  .line {
	  	display: block;
	  	height: 6rpx;
	  	bottom: 6rpx;
	  	left: 0;
	  	z-index: 111;
	  	border-radius: 3rpx;
	  	position: relative;
	  }
	  
	  .status {
	    display: flex;
	    padding: 0;
		
		.item {
			flex: 1;
			display: inline-block;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			
			.text {
			  color: #99a4bf;
			  display: inline-block;
			  height: 100%;
			  font-size: 15px;  
			  text-align: center;
			  padding: 0 16rpx;
			  box-sizing: border-box;
			  /* transition: all .5s; */
			}
			.black {
			  color: #333;
			  padding: 0 40rpx;
			}
			.active {
			  color:#2CC17B;
			}
		}
	  }
	}

	.tabBody {
	  position: relative;
	}
</style>
