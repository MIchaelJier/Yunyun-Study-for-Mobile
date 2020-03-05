<template>
	<view>
		<block v-for="(item, index) in list" :key="index">
			<yun-box :image="item.picsrc" :title="item.title" :url="'/pages/Coursedetails/Coursedetails?id=' + item.url" :titleFontSize="15" lazy>
				<view class="item-content">
					<view class="item-content__num sb">
						<text>共{{ item.chapterNum }}课时</text>
						<text class="item-content__num__price-grey" v-if="item.oprice">￥{{ item.oprice }}</text>
					</view>
					<view class="item-content__num sb">
						<view>
							<text class="item-content__num__star">{{ item.star }}星</text>
							<text style="color: #8B8F97">{{ item.learned }}人学过</text>
						</view>
						<view class="item-content__num__price-red">￥{{ item.nprice }}</view>
					</view>
				</view>
			</yun-box>
		</block>
		<!-- 加载更多 -->
		<uni-load-more :status="more"  iconType="circle" :iconSize="iconSize"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				iconSize: 18,
				more:'more',
				start:0,
				add:7,
			}
		},
		props:{
			reqUrl:{
				type: String,
				default: '',
			},
			reqType:{
				type: [Number,String],
				default: 0,
			},
			providerId:{
				type: [Number,String],
				default: '',
			}
		},
		methods:{
			listRequest(times){
				const that = this;
				that.more = 'loading';
				return new Promise((resolve, reject) => {
					that.$request({
					   url: that.reqUrl,
					   method: 'POST',
					   header:{
					   	  'Content-Type':'application/json'
					   },
					   data:JSON.stringify({
						   lecturerUserNo: that.providerId,
						   orderType: parseInt(that.reqType), 
						   priceType: 0,
						   current:that.start + 1,
						   size:that.add,
					   })		    
					  }).then(res => {
							if(res.data.status){
								let data = res.data.data.searchresult;
								if(times === 0){
									that.list = data;
									that.start += 1;
									data.length === that.add ? that.more = 'more' :  that.more = 'noMore';
									that.$emit('afterReq');
								}else{
									setTimeout(() => {
										that.start += 1;
										data.length === that.add ? that.more = 'more' :  that.more = 'noMore';
										that.list.push(...data);
										that.$emit('afterReq');
									},500)
								}
								resolve();
							}
					});
				})
			},
		}
	}
</script>

<style lang="scss">
	.item-content {
		flex: 1;
		&__num{
			display: flex;
			align-items: center;
			font-size: 12px;
			margin-top: 12rpx;
			&__star{
				height: 24rpx;
				background: linear-gradient(-225deg, #34BC65 0%, #2CC17B 100%);
				line-height: 1;
				color: #fff;
				padding: 5rpx;
				border-radius: 5rpx;
				margin-right: 14rpx;
			}
			&__price-red{
				color: red;
			}
			&__price-grey{
				color: #999;
				text-decoration: line-through;
				margin-left: 10rpx;
			}
		}
	}
	.sb{
		justify-content: space-between
	}
</style>
