<template>
	<view>
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
		<view class="courseintrohead">
			<view class="courseintrohead-title">
				<view class="title-name text-balck">
					{{ courseInfo.productName }}
				</view>
				<view class="title-other">
					<view class="title-other-star" v-if="courseInfo.rate >= 0">
						<uni-rate :value="courseInfo.rate" size="17" disabled="true"></uni-rate>
					</view>
					<text class="text-grey">{{  courseInfo.rate }}分</text>
					<text class="text-grey title-other-full">{{  courseInfo.learningNum }}人在学</text>
					<block  v-for="(tip, index) in courseInfo.tips" :key="index">
						<view class="title-other-tip">{{ tip }}</view>
					</block>
				</view>
			</view>
			<view class="courseintrohead-price">
				<view class="priceMain">
					<view class="nprice">
						<text class="yuan">¥</text>
						{{ courseInfo.discountPrice&&courseInfo.discountPrice!=='' ? courseInfo.discountPrice : courseInfo.oldPrice }}
					</view>
					<view class="nprice-tip" v-if="remainingTime">{{ remainingTime }}</view>
				</view>
				<view class="oprice text-grey" v-if="courseInfo.discountPrice&&courseInfo.discountPrice!==''">
					¥{{ courseInfo.oldPrice }}
				</view>
			</view>
		</view>
		<view class="contentbox">
			<view class="youhuicontent" v-for="(coupon,index) in courseInfo.coupons" :key="index" @click="togglePopup(coupon.link)">
				<view class="ux-ykt-icon-youhui youhui-tip" v-if="coupon.type === 0"></view>
				<view class="ux-ykt-icon-lingquan youhui-tip" v-if="coupon.type === 1"></view>
				<text class="youhui-full" :style="{color:coupon.type === 1 ? '#FF4400':'#333740'}">{{ coupon.content }}</text>
				<view class="ux-ykt-icon-right-arrow youhui-arrow"></view>
			</view>
		</view>
		<view class="courseintro contentbox">
			<view class="courseintrobody">
				<view class="courseintrobody-title">课程介绍</view>
				<view class="courseintrobody-main text-grey">
					<!-- 富文本 nnodes属性为String -->
					<rich-text :nodes="courseInfo.description"></rich-text>
				</view>
			</view>
			<view class="courseprovider">
				<uni-list>
				    <uni-list-item :title="courseInfo.ownername" 
								   :note="courseInfo.ownerStudentNum +'位学员'"
								   :thumb="courseInfo.ownerPhotoUrl" 
								   :show-badge="true"
								   badgeType="default"
								   badge-text="进入网校"
								   ></uni-list-item>
							
				</uni-list>
			</view>
			<view class="courseteacher">
				<view class="courseintrobody-title">讲师</view>
				<view class="courseteacher-main">
					<block v-for="teacher in courseInfo.teachers" :key="teacher.teacherId">
						<view class="courseteacher-main-top">
							<image class="top-headpic" :src="teacher.headImg"></image>
							<text class="top-name">{{ teacher.name }}</text>
						</view>
						<view class="courseteacher-main-detail">
							<text class="text-grey">{{ teacher.teacherIntro }}</text>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { monthDayDiff,formatTime,TimeAdd } from "../../../utils/timeFormat.js"
	export default {
		name: "Introduction",
		data() {
			return {
				couponList:[],
		
			};
		},
		computed:{
			remainingTime(){
				if(this.courseInfo.discountTime && this.courseInfo.discountTime !== 0){
					let { days, hours, minutes, seconds } = monthDayDiff(new Date(),this.courseInfo.discountTime)
					return `特价仅剩${days}天${hours}小时${minutes}分钟`
				}
			}
		},
		props: {
			courseInfo: {
				type:[Object, Array],
				default:()=>{}
			}
		},
		methods:{
			togglePopup(link) {
				if(link){
					// window.location.href = link
					// 跳转到活动页面
				}else{
					// this.$nextTick(() => {...})
					this.$request({
					   url: '/getCourseCoupon',
					   method: 'GET',
					   data:{
						   productId:this.courseInfo.productId,
						   ownerId:this.courseInfo.ownerId
					   }
					  }).then(res => {
							if(res.data.status === '200'){
								if(this.couponList.length === 0){
									let cou = res.data.data.coupons;
									cou.forEach( out => {
										 out.list = out.list.map( item => {
											item.isHave = this.$store.getters['cart/isHaveCoupon'](item.couponId)
											return item
										});
									})
									this.couponList = cou;
								}
								this.$refs['showpopup'].open();
							}
					});
				}
			},
			addCoupon(coupon){
				if(!coupon.isHave){
					coupon.isHave = true;
					let {amount,consumingThreshold,couponId,isVip,ownerId,creatorName,creatorUrl,targetId,targetName,targetType} = coupon;
					let add = {amount,consumingThreshold,couponId,isVip,ownerId,targetId,targetName,targetType};
					add.used = false;
					if(coupon.saveTime){
						add.createTime = formatTime(new Date());
						add.endTime = TimeAdd(add.createTime , {
							days: parseInt(coupon.saveTime)
						})
					}else if(coupon.createTime && coupon.endTime){
						add.createTime = coupon.createTime;
						add.endTime = coupon.endTime
					}
					// console.log(add)
					this.$store.commit('cart/addCouponOne', add)
				}
			}
		}
	}
</script>

<style>
	@import url("Introduction.css");
</style>
