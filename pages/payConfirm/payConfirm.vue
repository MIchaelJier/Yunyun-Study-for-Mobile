<template>
	<view class="page">
		<!-- 用户信息 开始-->
		<view class="userAccount">
			<view class="userAccount-top">
				<view class="account-msg">
					<text style="color: #333;">{{ userInfo.nikename }}</text>
					<text style="font-size: 12px;" v-if="userInfo.phone&&userInfo.phone !== ''">手机号：{{ userInfo.phone }}</text>
					<text style="font-size: 12px;" v-else>未绑定手机号</text>
				</view>
				<navigator class="account-btn" url="/pages/chooseLogin/chooseLogin" hover-class="none">
					<text>更换账号</text>
					<view class="btn-arrow">
						<uni-icons type="arrowright" size="20" color="#999"></uni-icons>
					</view>
				</navigator>
			</view>
			<view class="userAccount-bottom">
				<text class="bottom-tip">购买后不支持退款、转让，请确认开课时间或有效期后再提交订单</text>
			</view>
		</view>
		<!-- 用户信息 结束-->
		<!-- 购买信息 开始 -->
		<view class="content">
			
			<view class="payItem">
				<block v-for="item in payList" :key="item.ownerDto.ownerId" >
					<pay-item :payList="item.list" :ownerMsg="item.ownerDto" @getSum="countSum"></pay-item>
				</block>
				<view class="payItem-count">总计：￥{{ decimalAllPayPrice }}</view>
				<view class="couponBox" v-if="coupon.length > 0">
					<text>全场通用</text>
					 <picker @change="bindPickerChange" :value="nowCoupon" :range="coupon" range-key="couponName">
					        <view class="couponInput">
								<text>{{ coupon[nowCoupon].couponName }}</text>
								<uni-icons type="arrowdown" size="18"></uni-icons>
							</view>
					</picker>
				</view>
			</view>
			
			<view class="payMethod">
				<uni-collapse @change="openCollapse">
				    <uni-collapse-item title="支付方式" 
						:showadd="!collapseOpen" showAnimation 
						:addthumb="paymethods[nowmethods].icon" 
						:addtext="paymethods[nowmethods].name" 
						 :open="collapseOpen">
						<uni-list>
							<block v-for="method in paymethods" :key="method.id">
								<uni-list-item :title="method.name" show-extra-icon
								extraIconStyle="right:30rpx;position:absolute" :extraIconColor="method.color" 
								:extraIconType="method.type" 
								titleSize="13" :show-arrow="false" 
								:thumb="method.icon" thumbStyle="width:20px;height:20px"
								@click="choosePayMethods(method.id)"/>
							</block>
						</uni-list>
				    </uni-collapse-item>
				</uni-collapse>
			</view>
			<view class="goCoupon">
				<text>优惠券</text>
				<view @click="tapEdit('input')">
					<text>去兑换</text>
					<uni-icons type="arrowright" size="18" color="#999" style="font-weight: bold;"></uni-icons>
				</view>
			</view>
			<view class="content-tip">
				<text>注意：订单不支持退款、转让，提交订单则表示您同意</text>
				<text>《用户付费协议》</text>
			</view>
			<view class="submitArea xBottom" style="background: none;border-top:none;"></view>
		</view>
		<!-- 购买信息 结束 -->
		<!-- 总金额和确认按钮 开始 -->
		<view class="submitArea xBottom bottomFixed">
			<view class="submitArea-count">
					<text>实付金额：</text>
					<text style="color: #ff4400">￥{{ payPrice }}</text>
			</view>
			<view class="submitArea-btn">提交订单</view>
		</view>
		<!-- 总金额和确认按钮 结束 -->
		<!-- 拟态框 开始-->
		<yun-modal v-model="value" :mData="data" :type="type" @onConfirm="onConfirm" @cancel="cancel" ref="myModel"></yun-modal>
		<!-- 拟态框 结束-->
	</view>
</template>

<script>
	import payItem from './payItem.vue';
	import { toDecimal } from '../../utils/myMath.js';
	export default {
		data() {
			return {
				//折叠面板 参数
				paymethods:[
					{
						id:0,
						name:'微信支付',
						color:'#ff4400',
						type:'checkbox-filled',
						icon:'data:image/png;base64,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'
					},
					{
						id:1,
						name:'支付宝',
						color:'#d9ddde',
						type:'circle',
						icon:'data:image/png;base64,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'
					}
				],
				nowmethods: 0,
				collapseOpen: true,
				
				//拟态框 参数
				value:false,
				type:'default',
				data:{},
				inputData:{
					title:'优惠码兑换',
					content:[
						{content:'',type:'text',placeholder:'输入兑换码',borderColor:'#ddd',focus:true},
					],
					tip:{main:'',color:'red'}
				},
				
				//支付商品
				payList:[],
				allPayPrice:0,
				nowCoupon:0,
				
				//用户信息
				userInfo:{},
			}
		},
		computed:{
			decimalAllPayPrice(){
				return toDecimal(this.allPayPrice)
			},
			coupon(){
				return  this.$store.getters.getCoupon(3)
					.map(item => {
						item.consumingThreshold === 0
							? item.couponName = `优惠${item.amount}元(无门槛)，适用${item.targetName}`
							: item.couponName = `满${item.consumingThreshold}减${item.amount}，适用${item.targetName}`
						return item;
					})
					.filter(
						item => item.consumingThreshold === 0 ? '' : this.allPayPrice >= item.consumingThreshold
					)
			},
			payPrice(){
				return toDecimal(
						this.allPayPrice 
							- 
						parseFloat(this.coupon.length > 0 ? this.coupon[this.nowCoupon].amount : 0)
					)
			}
		},
		components: {
			payItem
		},
		methods: {
			//sum
			countSum(value){
			    this.allPayPrice += value;
			},
			// 点击 选择支付方式 改变勾选
			choosePayMethods(index){
				this.paymethods.forEach(item => {
					if(item.id === index){
						this.nowmethods = index;
						item.color = '#ff4400';
						item.type = 'checkbox-filled'
					}else{
						item.color = '#d9ddde';
						item.type = 'circle'
					}
				})
			},
			// 展开/收缩 折叠面板
			openCollapse(){
				this.collapseOpen = !this.collapseOpen;
			},
			// 弹出拟态框
			tapEdit(type) {
				this.type = type
				this.value = !this.value;
				switch(this.type){
					case 'default':
						this.data = this.defaultData;
						break;
					case 'input':
						this.data = this.inputData;
						break;
						}
			},
			// 拟态框 点击确认
			onConfirm() {
				
			},
			// 拟态框 点击取消
			cancel() {
				console.log('用户点击取消');
			},
			//picker
			bindPickerChange(e) {
			    this.nowCoupon = e.target.value
			}
		},
		onShow() {
			this.payList = this.$store.getters.getCartPay;
			this.userInfo = this.$store.getters.basicInfo;
		}
	}
</script>

<style>
	@import url("payConfirm.css");
</style>
