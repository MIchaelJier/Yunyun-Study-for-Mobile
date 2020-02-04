<template>
	<view class="box">
		<view class="box__main"  @click="enter()">
			<view  class="boxPost">
				<view class="postimage" v-if="image">
					<yun-image :src="image" :scrollTop="scrollTop" :mode="mode"></yun-image>
				</view>
			</view>
			<view class="boxRight"> <!-- :style="{ height: image&&fitImage ? '137rpx':'' }" -->
				<text class="title" v-if="title" 
					 :style="{fontSize:titleFontSize +'px'}">{{ title }}</text>
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import yunImage from './yunImage.vue'
	export default {
		data() {
			return {
				
			};
		},
		components:{
			yunImage 
		},
		props: {
			title: {  // 列表标题
			  type: String,
			  default: ''
			},
			image: {  // 列表配图
			  type: String,
			  default: ''
			}, 
			url: {   // 列表跳转
			  type: String,
			  default: ''
			}, 
			titleFontSize: {
			  type: [String,Number],
			  default: 16	
			},
			scrollTop: { //图片懒加载
			  type: Number,
			  default: 0
			},
			mode: {
				type: String,
				default: 'scaleToFill'
			},
		},
		methods: {
			enter:function() {
				console.log(this.url)
			}
		}
	}
</script>

<style lang="scss">
	.box {
		background: #fff;
		&__main{
			padding: 17px 10px 17px 0;
			margin-left: 15px;
			position: relative;
			border-bottom: 1px solid #f1f1f1;
			display: flex;
			align-items: center;
			background: #fff;
			.boxPost {
				height: 137rpx;
				width: 220rpx;
				border-radius: 5rpx;
				padding-right: 20rpx;
				flex: 0 0 220rpx;
				.postimage {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
					overflow: hidden;
				}
			}
			.boxRight {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				min-height: 137rpx;
				flex: 1;
				.title {
					color: #333;
				}
			}
		}
	}


	

</style>
