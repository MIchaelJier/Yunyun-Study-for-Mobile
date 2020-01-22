<template>
	<view>
		<view class="commentTotal">
			<view class="commentCount">
				<text class="commentCount-left">全部评价</text>
				<text class="commentCount-right">共213个评价</text>
			</view>
			<view class="totalStar">
				<view class="totalStar-left">
					<text>4.8</text>
					星
				</view>
				<view class="totalStar-right">
					<view class="totalStar-right-star"></view>
					<view class="totalStar-right-stripes">
						<view class="yunBoxProgBar">
							<view class="yunBoxProgBarOver" :style="{width:44+'rpx' }"></view>
						</view>
						<view class="yunBoxProgBar">
							<view class="yunBoxProgBarOver" :style="{width:44+'rpx' }"></view>
						</view>
						<view class="yunBoxProgBar">
							<view class="yunBoxProgBarOver" :style="{width:44+'rpx' }"></view>
						</view>
						<view class="yunBoxProgBar">
							<view class="yunBoxProgBarOver" :style="{width:44+'rpx' }"></view>
						</view>
						<view class="yunBoxProgBar">
							<view class="yunBoxProgBarOver" :style="{width:44+'rpx' }"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="comments">
			<view class="comments-item">
				<view class="comments-item-head">
					<image src="https://img-ph-mirror.nosdn.127.net/6Fi6pVFB-gnffbXrGV0pRw==/286260051415163309.jpg">
				</view>
				<view class="comments-item-main">
					<view class="comments-item-main-line">
						<text class="line-name">Michael</text>
						<view class="line-rate">
							<uni-rate :value="4.7" :size="17" disabled="true" class="line-rate"></uni-rate>
						</view>
					</view>
					<view class="comments-item-main-line line-small">
						<text>学习20个课时评价</text>
						<text>11月24日</text>
					</view>
				</view>
			</view>
			<view class="comments-item">
				<view class="comments-item-head">
					<image src="https://img-ph-mirror.nosdn.127.net/6Fi6pVFB-gnffbXrGV0pRw==/286260051415163309.jpg">
				</view>
				<view class="comments-item-main">
					<view class="comments-item-main-line">
						<text class="line-name">Michael</text>
						<view class="line-rate">
							<uni-rate :value="4.7" :size="17" disabled="true" class="line-rate"></uni-rate>
						</view>
					</view>
					<view class="comments-item-main-line line-small">
						<text>学习20个课时评价</text>
						<text>11月24日</text>
					</view>
					<view class="comments-item-main-line">
						<text>好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好</text>
					</view>
					<view class="reply">
						<view class="reply-break"></view>
						<view>
							<text class="reply-title">[课程团队回复]</text>
							<text class="text-grey reply-time">2018-10-19</text>
						</view>
						<view class="reply-body">
							<text class="text-grey ">听得懂，用得上，这也是我们理想中课程的样子！谢谢你的学习感受，给了老师和课程团队极大动力，努力用心做好内容！</text>
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
		props: {
			
		},
	}
</script>

<style>
	@import url("comment.css");
</style>