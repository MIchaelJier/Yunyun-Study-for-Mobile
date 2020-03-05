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
				<block v-for="(item,index) in payList" :key="item.ownerDto.ownerId" >
					<pay-item :payList="item.list" :ownerMsg="item.ownerDto" :listKey="index" @getSum="countSum" @addUsedConpon="addUsedConpon"></pay-item>
				</block>
				<view class="payItem-count">总计：￥{{ decimalAllPayPrice }}</view>
				<view class="payItem-coupon" v-if="coupon.length > 0">
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
			<view class="submitArea-btn" @click="confirmToPay">提交订单</view>
		</view>
		<!-- 总金额和确认按钮 结束 -->
		<!-- 拟态框 开始-->
		<yun-modal v-model="value" :mData="data" :type="type" @onConfirm="onConfirm" @cancel="cancel" ref="myModel"></yun-modal>
		<!-- 拟态框 结束-->
	</view>
</template>

<script>
	import payItem from './payItem.vue';
	import { toDecimal, queryParams } from '../../utils/myMath.js';
	import { alipayBase64, wxpayBase64 } from '../../static/icon/base64Icon.js';
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
						icon: wxpayBase64
					},
					{
						id:1,
						name:'支付宝',
						color:'#d9ddde',
						type:'circle',
						icon: alipayBase64
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
				return  this.$store.getters['cart/getCoupon'](3)
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
			},
			orderList(){
				let list = [];
				this.payList.forEach( item => {
					item.list.forEach( (inner,index) => {
						let obj = {
							courseId: inner.productId ,
							couponId: ''
						}
						index === 0 ? obj.couponId = item.couponId : ''
						list.push(obj)
					})
				})
				return list
			}
		},
		components: {
			payItem
		},
		methods: {
			// 提交订单 后台确认信息
			confirmToPay(){
				let data = 
				this.$request({
				   url: `/loco/pay/createOrder`,
				   method: 'POST',
				   header:{
				   		'Content-Type':'application/json'
				   },
				   data:JSON.stringify({
					orderList: this.orderList ,
					payType: this.nowmethods + 1
					})
				  }).then(res => {
						if(res.data.status){
							let OrderNo = res.data.data.OrderNo;
							uni.navigateTo({
								url:`/pages/payment/payment?orderNo=${OrderNo}&pricePaid=${this.payPrice}&payType=${this.nowmethods + 1}`
							})
						}else{
							uni.showToast({
							    title: res.data.msg,
								icon:'none'
							});
						}
				});	
			},
			//sum
			countSum(value){
			    this.allPayPrice += value;
			},
			//在payList中第一项加入使用的优惠券id
			addUsedConpon(index,value){
				this.payList[index].couponId = value
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
			this.payList = this.$store.getters['cart/getCartPay'];
			this.userInfo = this.$store.getters['common/basicInfo'];
		}
	}
</script>

<style>
	@import url("payConfirm.css");
</style>
