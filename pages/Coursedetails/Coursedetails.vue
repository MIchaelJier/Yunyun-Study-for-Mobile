<template>
	<view class="page" :class="courseInfo.isOwn ? 'xBottom' : ''">
	<!-- <view> -->
		<yun-drag-btn isDock :existTabBar="!courseInfo.isOwn"></yun-drag-btn>
		<yun-refresh @isRefresh='isRefresh' ref="refresh">
			<!-- 视频 开始 -->
			<view class="player">
				<my-video 
					:mySrc="nowVedio.src"
					:myPoster="courseInfo.photoUrl"
					:allId="allId"
				>
				</my-video>
				<!-- <video 
					:src="nowVedio" 
					:poster="courseInfo.photoUrl"
					controls
					id="video"></video> -->
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
					<directory :chapterList="chapterList" :isOwn="courseInfo.isOwn"  @changeVedio="changeVedio"></directory>
				</template>
				<!-- 目录 结束 -->			
				<!-- 评价 开始 -->			
				<template v-slot:2>
					<comment :commentsInfo="commentsInfo" :more="more" :isOwn="courseInfo.isOwn" :courseId="courseId"></comment>
				</template>
				<!-- 评价 结束 -->
			</yun-tab>
			<view class="underBar xBottom" style="background: none;border-top:none"  v-if="!courseInfo.isOwn"></view>
			<view class="underBar bottomFixed xBottom" v-if="!courseInfo.isOwn">
				<block v-if="courseInfo.isFree === 1">
					<view class="underBar-right" @click="addFreeCourse"><text>免费加入学习</text></view>
				</block>
				<block v-else>
					<view class="underBar-left text-balck" @click="addCart" hover-class="underBar-left-hover">
						<view class="ux-icon ux-ykt-icon-new-cart"></view>
						<text>加入购物车</text>
					</view>
					<view class="underBar-right" @click="addPay" hover-class="underBar-right-hover">
						<text>加入学习</text>
					</view>
				</block>
			</view>
		</yun-refresh>
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
	import myVideo from './video/myVideo.vue';
	import { queryParams } from '@/utils/myMath.js';
	let _initData = {};
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
				nowVedio:{},
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
			},
			allId(){
				if(Object.keys(this.nowVedio).length === 0){return {}}
				return {
						courseId : this.courseId ,
						videoId : this.nowVedio.id ,
						chapterId : this.nowVedio.chapterId,
						isStudy: this.nowVedio.isStudy
					}
			}
		},
		components: {
			introduction,
			directory,
			comment,
			myVideo
		},
		methods: {
			addCart(){
				let oldNum = this.cartNum,
					title = '';
				if(this.isLogin){
					this.$store.commit('cart/addCartOne', this.cartInfo);
					if(this.cartNum !== oldNum){
						this.$request({
						   url: `/last/cart/addCartToUser?courseId=${this.courseId}`,
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
			addFreeCourse(){
				if(this.courseInfo.isFree === 1 && !this.courseInfo.isOwn){
					this.$request({
					   url: `/last/detail/addFreeCourse?courseId=${this.courseId}`,
					   method: 'POST',	   
					   showLoading: true
					  }).then(res => {
						  let title = '';
						  res.data.status
							? title = '加入成功'
							: title = '加入失败';
						  this.toast(title);
						  this.courseInfo.isOwn = true;
						  this.underBarHeight = 0;
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
			changeVedio(video){
				// video ={id:'',src:''}
				this.nowVedio = video;
			},
			tabClick(status){
				if(status == 1 && this.chapterList.length === 0){
					this.firstRequest('/last/detail/getChapterlist','chapterList');
				}
				if(status == 2 && Object.keys(this.commentsInfo).length === 0){
					this.firstRequest('/last/detail/getComments','commentsInfo').then(() => {
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
								resolve(res.data.data);
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
			addPay(){
				uni.redirectTo({
					url: `/pages/payConfirm/payConfirm${queryParams(this.cartInfo,true)}`
				});
			},
			getNodeHeight(className,name){
				this.$nextTick(() => {
					uni.createSelectorQuery().in(this).select(className).boundingClientRect((res) => {
						res ? this[name] = res.height : ''
					}).exec();
				})
			},
			isRefresh(){
				Object.assign(this.$data,_initData);
				this.$refs.tabs.status = 0;
				setTimeout(() => {
					this.firstRequest('/last/detail/getCoursedetail','courseInfo').then(() => {
						this.$refs.refresh.endAfter() 
					})
				},500)
			}
		}, 
		onLoad(options) {
			this.courseId = options.id;
			_initData = JSON.parse(JSON.stringify(this.$data));
			this.getNodeHeight('.player','initTop');
			this.getNodeHeight('.underBar','underBarHeight');
			this.firstRequest('/last/detail/getCoursedetail','courseInfo').then( res => {
				uni.setNavigationBarTitle({
					title: res.productName
				})
			})
		},
		onShow() {
			uni.pageScrollTo({
			    scrollTop: this.scrollTop,
			    duration: 0
			});
		},
		onBackPress() {
			this.$refs['showpopup'].close()
		},
		// onPullDownRefresh() {
		// 	Object.assign(this.$data,_initData);
		// 	this.$refs.tabs.status = 0;
		// 	setTimeout(() => {
		// 		this.firstRequest('/loco/detail/getCoursedetail','courseInfo').then(() => {
		// 			uni.stopPullDownRefresh()
		// 		})
		// 	},500)
		// },
		onReachBottom() {
			if(this.$refs.tabs.status == 0) this.$refs.tabs.swiperHeight();
			if(this.$refs.tabs.status == 2 && this.more !== 'noMore'){
				this.more = 'loading';
				this.$request({
				   url: '/last/detail/getCommentsMore',
				   method: 'GET',
				   data:{
					   courseId: this.courseId,
					   current: this.star + 2, //从第二页开始
					   size: this.add,
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
