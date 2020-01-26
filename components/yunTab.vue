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
				</view>
			</template>
			<template v-slot:content>
				<view class="tabBody">
				        <block v-for="(item, index) in tabs" :key="index">
							<view v-if="status == index">
								<!-- #ifdef   H5 --> 
								<slot :name="index"></slot>
								<!-- #endif--> 
								
								<!-- #ifdef APP-PLUS || MP-WEIXIN --> 
								<slot name="{{ index }}"></slot>
								<!-- #endif --> 
							</view>
						</block>
				</view>
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
				  this.status = status
			 },
			 statusEvent(status){
				 this.$emit('tabClick',status)
			 },
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
	}
	.titleBar .status li text.black{
	  color: #333;
	  padding: 0 40rpx;
	}
	.titleBar .status li text.active{
	  color:#2CC17B;
	  border-bottom: 6rpx solid #2CC17B;
	}
	.tabBody {
	  position: relative;
	}
</style>
