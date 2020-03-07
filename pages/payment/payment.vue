<template>
	<view class="page">
		<view class="topBar">
			<image :src="topIcon" class="topBar-icon"></image>
		</view>
		<block v-if="!paySuccess">
			<view class="mainInfo">
				<view class="mainInfo-price">
					<text>￥{{ info.pricePaid }}</text>
				</view>
				<view class="canvas">
					<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
				</view>
				<view class="mainInfo-notice">
				   <view>1.请在订单有效期支付</view>
			       <view> 2.请勿重复支付，一律不到账</view>
			       <view> 3.请输入正确的金额，否则一律不到账</view>
			       <view style="color: #2C405A;">订单：{{ info.orderNo }}</view>
				   <view class="middle">
					   <uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :hour="2" :minute="0" :second="0" :show-day="false"></uni-countdown>
				   </view>
				</view>
				<view class="mainInfo-scan">
					<uni-icons type="scan" size="60" color="#2CC17B"></uni-icons>
					<view class="mainInfo-scan-text">打开{{ this.info.payType == 1 ? '微信' : '支付宝' }}扫一扫</view>
				</view>
			</view>
			<view class="success-btn" @click="successPay">
				我已完成支付
			</view>
			<view class="success-btn" style="background: #ff632a;" @click="cancelPay">
				取消订单
			</view>
		</block>
		<block v-else>
			<view class="mainInfo">
				<view class="middle">
					<uni-icons type="checkmarkempty" size="100" color="#2CC17B"></uni-icons>
				</view>
				<view class="success-text">支付成功</view>
			</view>
			<view class="success-btn" @click="backIndex">
				返回
			</view>
		</block>
	</view>
</template>

<script>
	import { queryParams } from '../../utils/myMath.js';
	import uQRCode from '@/common/uqrcode/uqrcode.js'
	import { alipayBase64, wxpayBase64 } from '../../static/icon/base64Icon.js';
	export default {
		data() {
			return {
				qrcodeSize: 129,
				qrcodeSrc: '',
				info:{},
				paySuccess: false
			}
		},
		computed:{
			topIcon() {
				return this.info.payType == 1 ? wxpayBase64 : alipayBase64
			}
		},
		methods: {
			successPay(){
				this.$request({
				   url: '/loco/pay/getOrderStatus',
				   method: 'GET',
				   data:{
					   orderId: this.info.orderNo
				   },
				   showLoading: true
				  }).then(res => {
					  if(res.data.data ? res.data.data.orderType === 1 : false){
						  this.paySuccess = true
					  }else{
						  uni.showToast({
						  	title: '您的订单尚未支付成功',
						  	mask: true,
						  	icon: 'none',
						  	duration: 1000
						  })
					  }
				  })
			},
			cancelPay(){
				this.$request({
				   url: `/loco/assets/cancelOrder?orderNo=${this.info.orderNo}`,  
				   method: 'POST',
				   showLoading: true
				}).then(res => {
					let title = res.data.status ? '取消成功' : '取消失败'
					uni.showToast({
						title,
						icon:'none',
						duration:1000
					})
					if(res.data.status){
						setTimeout( () => {
							uni.switchTab({
								url: '/pages/index/index'
							});
						},1000)
					}
				})
			},
			backIndex(){
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		},
		onLoad(option) {
			this.info = option;
			if(option.success ? option.success == 1 : false){
				this.paySuccess = true
			}else{
				uni.showLoading({
					title: '二维码生成中',
					mask:true
				})
				console.log(option)
				option.accessMode = 3;
				this.$request({
				   url: `/loco/pay/unifiedPay${queryParams(option,true)}`,
				   method: 'GET'
				  }).then(res => {
					  const qr_code = res.data.alipay_trade_precreate_response.qr_code;
					  const msg = res.data.alipay_trade_precreate_response.msg;
					  // const qr_code = 'https://qr.alipay.com/bax07872wgqqczm9ouzx0088';
						if(qr_code){
							uQRCode.make({
								canvasId: 'qrcode',
								text: qr_code,
								size: this.qrcodeSize,
								margin: 10,
								success: innerRes => {
									this.qrcodeSrc = innerRes
								},
								complete: () => {
									uni.hideLoading()
								}
							})
						}else if(msg){
							uni.showToast({
								title: msg,
								mask:true,
								icon: 'none',
								duration: 500
							})
						}
				});	
			}
		}
	}
</script>

<style>
	@import url("payment.css");
</style>
