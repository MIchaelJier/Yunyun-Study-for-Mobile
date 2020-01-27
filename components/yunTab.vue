<template>
	<view>
		<better-sticky :scrollTop="scrollTop" :initTop="initTop">
			<template v-slot:header>
				<view class="titleBar">
				  <ul class="status">
					<li  v-for="(item, index) in tabs" :key="index">
					  <text :class=" status == index ? 'active':'' " @click="showStatus" :data-status="index">{{ item }}</text>
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
						@animationfinish="getLeft()">
				        <block v-for="(item, index) in tabs" :key="index">
							<swiper-item >
								<view class="swiperflag"><!-- v-if="status == index" -->
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
					 	if(slot.top + slot.height < windowHeight && slot.top >= 0){
							// slot长度小于屏幕高度
							this.contentHeight = windowHeight - slot.top;
						}else{
							this.contentHeight = res[this.status].height
						}
					 }).exec()
				 })
			 }
		},
		mounted() {
			this.getLeft();
		},
		watch:{
			status(newVal){
				this.statusEvent(newVal)
			}
		}
	}
</script>

<style>
	/* tab选择卡头部 */
	.titleBar{
	  position: relative;
	  box-sizing: border-box;
	  width: 100%;
	  border-bottom: 1px solid #eee;
	  align-items: center;
	  background-color: white;
	}
	.titleBar .status{
	  display: flex;
	  padding: 0;
	}
	.titleBar .status li{
	  flex: 1;
	  display: inline-block;
	  height: 88rpx;
	  line-height: 88rpx;
	  text-align: center;
	}
	.titleBar .status li text{
	  color: #99a4bf;
	  display: inline-block;
	  height: 100%;
	  font-size: 15px;  
	  text-align: center;
	  padding: 0 16rpx;
	  box-sizing: border-box;
	  /* transition: all .5s; */
	}
	.titleBar .status li text.black{
	  color: #333;
	  padding: 0 40rpx;
	}
	.titleBar .status li text.active{
	  color:#2CC17B;
	}
	.line {
		display: block;
		height:6rpx;
		bottom: 6rpx;
		left: 0;
		z-index: 111;
		border-radius: 3rpx;
		position: relative;
	}
	.tabBody {
	  position: relative;
	}
</style>
