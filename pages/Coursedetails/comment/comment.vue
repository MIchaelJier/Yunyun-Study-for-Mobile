<template>
	<view style="background: #fff;" v-if="Object.keys(this.commentsInfo).length !== 0">
		<!-- 总评 开始 -->
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
		<!-- 总评 结束 -->
		<!-- 评论 开始 -->
		<view class="comments"  v-for="(com,index) in commentsInfo.comments" :key="index">
			<view class="comments-item">
				<view class="comments-item-head">
					<view class="comments-item-head-image">
						<yun-image :src="com.headimg"></yun-image>
					</view>
				</view>
				<view class="comments-item-main">
					<!-- 评论者 信息 -->
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
					<!-- 内容 -->
					<view class="comments-item-main-line">
						<text>{{ com.content }}</text>
					</view>
					<!-- 回复 -->
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
		<!-- 加载更多 -->
		<uni-load-more :status="more" :contentText="contentText" iconType="circle" :iconSize="iconSize"></uni-load-more>
		<!-- 评论 结束 -->
	</view>
</template>

<script>
	export default {
		name: "comment",
		data() {
			return {
				iconSize: 18,
				contentText: {
						contentdown: "上拉加载更多评论",
						contentrefresh: "正在加载中...",
						contentnomore: "没有更多评论了",
					}
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
			},
			more: {
				type: String,
				default: 'more'
			}
		},
	}
</script>

<style>
	@import url("comment.css");
</style>