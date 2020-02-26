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
		<yun-tab :tabs="tabs" 
				 :scrollTop="scrollTop" 
				 :initTop="initTop" 
				 :bottomBarHeight="underBarHeight"
				 @tabClick="tabClick" 
				 ref="tabs" 
				 >
			<!-- 简介 开始 -->
			<template v-slot:0>
				<introduction :courseInfo="courseInfo" ref="introduction" @open="open"></introduction>
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
		<!-- 插屏弹窗 -->
		<uni-popup ref="showpopup" type="bottom">  <!-- @change="change" -->
			<scroll-view class="couponsPopup xBottom" scroll-y>
				<view class="couponsList" v-for="(item, index) in couponList" :key="index">
					<view class="coupons-type">{{ item.type }}</view>
					<view class="coupon-item" v-for="coupon in item.list" :key="coupon.couponId">
						<view class="item-firstline">
							<view>
								<text class="item-amount">￥{{ coupon.amount }}</text>
								<text v-if="coupon.consumingThreshold === 0" style="font-size: 12px">无金额门槛</text>
								<text v-else style="font-size: 12px">满￥{{ coupon.consumingThreshold }}可用</text>
							</view>
							<view class="item-btn" 
								:style="{color:coupon.isHave ? '#666':'#FF6600','border-color':coupon.isHave ? '#666':'#FF6600'}"
								@click="addCoupon(coupon)">{{ coupon.isHave ? '已领取':'领取' }}</view>
						</view>
						<text class="item-other">适用范围：{{ coupon.targetName }}</text>
						<text class="item-other" v-if="coupon.createTime&&coupon.endTime">
							有效时间：{{coupon.createTime}}-{{coupon.endTime}}
						</text>
						<text class="item-other" v-if="coupon.saveTime">
							领取后{{ coupon.saveTime }}天有效
						</text>
					</view>
				</view>
			</scroll-view>
		</uni-popup>
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
				underBarHeight:0,
				
				courseId:'', //页面url获取
				courseInfo:{},
				chapterList:[],
				couponList:[],
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
				return { ownerId, ownername, photoUrl, productId, productName, oldPrice, discountPrice: discountPrice === '' ? oldPrice : discountPrice, deadlineTime }
			},
			isLogin(){
				return  this.$store.getters['common/IsLogin']
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
				if(this.isLogin){
					this.$store.commit('cart/addCartOne', this.cartInfo);
					if(this.cartNum !== oldNum){
						this.$request({
						   url: `/loco/cart/addCartToUser?courseId=${this.courseId}`,
						   method: 'POST',	   
						   showLoading: true
						  }).then(res => {
							  res.data.status
								? title = '成功添加到购物车'
								: title = '同步失败'
							  this.toast(title)
						  })
					}else{
						title = '该课程已在购物车';
						this.toast(title)
					}
				}else{
					uni.navigateTo({
						url:'/pages/chooseLogin/chooseLogin'
					})
				}
			},
			toast(title){
				uni.showToast({
				    title,
					icon: 'none',
					mask: true,
					duration: 500
				});
			},
			changeVedio(src){
				this.nowVedio = src;
			},
			tabClick(status){
				if(status == 1 && this.chapterList.length === 0){
					this.firstRequest('/loco/detail/getChapterlist','chapterList');
				}
				if(status == 2 && Object.keys(this.commentsInfo).length === 0){
					this.firstRequest('/loco/detail/getComments','commentsInfo').then(() => {
						if(this.commentsInfo.comments.length < this.add){
							this.more = 'noMore'
						}
					})
				}
			},
			firstRequest(u,d){
				let that = this;
				return new Promise((resolve, reject) => {
					that.$request({
					   url: u,
					   method: 'GET',
					   showLoading: true,
					   data:{
						   courseId: that.courseId,
						   size: that.add
					   }		   
					  }).then(res => {
							if(res.data.status){
								that.$data[d] = res.data.data;
								that.$refs.tabs.swiperHeight();
								resolve();
							}
					});
				})
			},
			open(){
				this.couponList = this.$refs.introduction.couponList;
				this.$refs['showpopup'].open();
			},
			addCoupon(coupon){
				 this.$refs.introduction.addCoupon(coupon)
			},
			getNodeHeight(className,name){
				this.$nextTick(() => {
					uni.createSelectorQuery().in(this).select(className).boundingClientRect((res) => {
						res ? this[name] = res.height : ''
					}).exec();
				})
			},
		}, 
		onLoad(options) {
			console.log(options)
			this.courseId = options.id;
			this.getNodeHeight('.player','initTop');
			this.getNodeHeight('.underBar','underBarHeight');
			this.firstRequest('/loco/detail/getCoursedetail','courseInfo'); // /getCoursedetail
		},
		onShow() {
			uni.pageScrollTo({
			    scrollTop: this.scrollTop,
			    duration: 0
			});
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
				this.firstRequest('/loco/detail/getCoursedetail','courseInfo').then(() => {
					uni.stopPullDownRefresh()
				})
			},500)
		},
		onReachBottom() {
			if(this.$refs.tabs.status == 0) this.$refs.tabs.swiperHeight();
			if(this.$refs.tabs.status == 2 && this.more !== 'noMore'){
				this.more = 'loading';
				this.$request({
				   url: '/loco/detail/getCommentsMore',
				   method: 'GET',
				   data:{
					   courseId: this.courseId,
					   start: this.star + 2, //从第二页开始
					   add: this.add,
				   }
				  }).then(res => {
						if(res.data.status){
							setTimeout(() => {
								let addcom = res.data.data.comments
								this.star += 1;
								addcom.length === this.add ? this.more = 'more' :  this.more = 'noMore'
								this.commentsInfo.comments.push(...addcom);
								this.$refs.tabs.swiperHeight();
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
	@import url("Coursedetails.css");
</style>
