<template>
	<view class="page">
		<!-- 视频 开始 -->
		<view class="player">
			<video 
				:src="nowVedio" 
				:poster="courseInfo.photoUrl"
				controls
				id="video"></video>
		</view>
		<!-- 视频 结束 -->
		<yun-tab :tabs="tabs" :scrollTop="scrollTop" :initTop="initTop" @tabClick="tabClick" ref="tabs">
			<!-- 简介 开始 -->
			<template v-slot:0>
				<introduction :courseInfo="courseInfo"></introduction>
			</template>
			<!-- 简介 结束-->
			<!-- 目录 开始 -->			
			<template v-slot:1>
				<directory :chapterList="chapterList" @changeVedio="changeVedio"></directory>
			</template>
			<!-- 目录 结束 -->			
			<!-- 评价 开始 -->			
			<template v-slot:2>
				<comment :commentsInfo="commentsInfo" :more="more"></comment>
			</template>
			<!-- 评价 结束 -->
		</yun-tab>
		<view class="underBar xBottom" style="background: none;border-top:none"></view>
		<view class="underBar bottomFixed xBottom">
			<view class="underBar-left text-balck" @click="addCart">
				<view class="ux-icon ux-ykt-icon-new-cart"></view>
				<text>加入购物车</text>
			</view>
			<view class="underBar-right">
				<text>加入学习</text>
			</view>
		</view>
	</view>
</template>

<script>
	import introduction from './Introduction/Introduction.vue';
	import directory from './directory/directory.vue';
	import comment from './comment/comment.vue';
	export default {
		data() {
			return {
				scrollTop:0,
				initTop:0,
				
				tabs:['简介','目录','评价'],
				courseId:'', //页面url获取
				courseInfo:{},
				chapterList:[],
				nowVedio:'',
				commentsInfo:{},
				
				//上拉加载参数
				more:'more',
				star:0,
				add:5,
			}
		},
		computed:{
			cartNum(){
				return this.$store.getters['cart/getCartNum']
			},
			cartInfo(){
				let { ownerId, ownername, photoUrl, productId, productName, oldPrice, discountPrice, deadlineTime } = this.courseInfo;
				return { ownerId, ownername, photoUrl, productId, productName, oldPrice, discountPrice, deadlineTime }
			}
		},
		components: {
			introduction,
			directory,
			comment
		},
		methods: {
			addCart(){
				let oldNum = this.cartNum,
					title = '';
				this.$store.commit('cart/addCartOne', this.cartInfo);
				this.cartNum !== oldNum
					? title = '成功添加到购物车'
					: title = '该课程已在购物车'
				
				uni.showToast({
				    title,
					icon:'none',
				    duration: 1000
				});
			},
			changeVedio(src){
				this.nowVedio = src;
			},
			tabClick(status){
				if(status == 1 && this.chapterList.length === 0){
					this.firstRequest('/getChapterlist','chapterList');
				}
				if(status == 2 && Object.keys(this.commentsInfo).length === 0){
					this.firstRequest('/getComments','commentsInfo');
				}
			},
			firstRequest(u,d){
				let that = this;
				return new Promise((resolve, reject) => {
					that.$request({
					   url: u,
					   method: 'GET',
					   data:{
						   courseId: this.courseId
					   }		   
					  }).then(res => {
							if(res.data.status === '200'){
								that.$data[d] = res.data.data;
								resolve();
							}
					});
				})
			},
			
		}, 
		onLoad(options) {
			this.courseId = options.id;
			this.$nextTick(() => {
				uni.createSelectorQuery().in(this).select('.player').boundingClientRect((res) => {
					res ? this.initTop = res.height : ''
				}).exec()
			});
			this.firstRequest('/getCoursedetail','courseInfo');
		},
		onPullDownRefresh() {
			// this.courseInfo = {};
			this.chapterList = [];
			this.nowVedio = '';
			this.commentsInfo = {};
			this.$refs.tabs.status = 0;
			this.star = 0;
			this.more = 'more';
			setTimeout(() => {
				this.firstRequest('/getCoursedetail','courseInfo').then(() => {
					uni.stopPullDownRefresh()
				})
			},500)
		},
		onReachBottom() {
			if(this.$refs.tabs.status == 2 && this.more !== 'noMore'){
				this.more = 'loading';
				this.$request({
				   url: '/getCommentsMore',
				   method: 'GET',
				   data:{
					   courseId: this.courseId,
					   star: this.star,
					   add: this.add,
				   }
				  }).then(res => {
						if(res.data.status === '200'){
							setTimeout(() => {
								let addcom = res.data.data.comments
								this.star += this.add;
								addcom.length === this.add ? this.more = 'more' :  this.more = 'noMore'
								this.commentsInfo.comments.push(...addcom);
							}, 500);
						}
				});
			}
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop
		},
		
	}
</script>

<style>
	.page {
		font: 12px/1.14 "Arial","Hiragino Sans GB", \5fae\8f6f\96c5\9ed1, "Helvetica", "sans-serif";
	}
	/* 视频开始 */
		.player,
		.player video{
			width: 100vw;
			height: 422rpx;
		}
	/* 视频 结束 */
	
	/* 底部固定栏 */
		.underBar {
			height: 126rpx;
			width: calc( 100% - 32rpx);
			background: #fff;
			padding: 0 16rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #f1f1f1;
		}
		.underBar-left {
			width: 160rpx;
			height: 96rpx;
			font-size: 18px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			padding-top: 10rpx;
		}
			.underBar-left text {
				font-size: 12px;
				padding-bottom: 10rpx;
			}
		.underBar-right {
			height: 96rpx;
			border-radius: 400rpx;
			background: #FF632A;
			font-size: 15px;
			color: #fff;
			display: flex;
			flex: 1;
			justify-content: center;
			align-items: center;
		}
</style>
