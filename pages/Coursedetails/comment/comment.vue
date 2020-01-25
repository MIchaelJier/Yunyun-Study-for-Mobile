<template>
	<view style="background: #fff;" v-if="Object.keys(this.commentsInfo).length !== 0">
		<view class="commentTotal">
			<view class="commentCount">
				<text class="commentCount-left">全部评价</text>
				<text class="commentCount-right">共{{ commentsInfo.rate.allNum }}个评价</text>
			</view>
			<view class="totalStar">
				<view class="totalStar-left">
					<text>{{ commentsInfo.rate.allRate }}</text>星
				</view>
				<view class="totalStar-right">
					<view class="totalStar-right-star"></view>
					<view class="totalStar-right-stripes">
						<view class="yunBoxProgBar" v-for="(num,index) in stars" :key="index">
							<view class="yunBoxProgBarOver" :style="{width:progBarOver(num) +'px' }"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="comments"  v-for="(com,index) in commentsInfo.comments" :key="index">
			<view class="comments-item">
				<view class="comments-item-head">
					<image :src="com.headimg">
				</view>
				<view class="comments-item-main">
					<view class="comments-item-main-line">
						<text class="line-name">{{ com.nikename }}</text>
						<view class="line-rate" v-if="com.rate >= 0">
							<uni-rate :value="com.rate" :size="17" disabled="true" class="line-rate"></uni-rate>
						</view>
					</view>
					<view class="comments-item-main-line line-small">
						<text>学习{{ com.prog }}个课时评价</text>
						<text>{{ com.date }}</text>
					</view>
					<view class="comments-item-main-line">
						<text>{{ com.content }}</text>
					</view>
					<view class="reply" v-if="com.reply&&com.reply!==''">
						<view class="reply-break"></view>
						<view>
							<text class="reply-title">[课程团队回复]</text>
							<text class="text-grey reply-time">{{ com.replydate }}</text>
						</view>
						<view class="reply-body">
							<text class="text-grey ">{{ com.reply }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment",
		data() {
			return {
				
			};
		},
		computed:{
			stars(){
				return Object.keys(this.commentsInfo).length !== 0 ?  this.commentsInfo.rate.star : 0
			},
			progBarOver(){
				return num => num / parseInt(this.commentsInfo.rate.allNum) * 191
			}
		},
		props: {
			commentsInfo: {
				type: Object,
				default: ()=>{}
			}
		},
	}
</script>

<style>
	@import url("comment.css");
</style>