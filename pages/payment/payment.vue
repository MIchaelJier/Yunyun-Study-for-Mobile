<template>
	<view class="page">
			<view class="canvas">
				<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
			</view>
	</view>
</template>

<script>
	import { queryParams } from '../../utils/myMath.js';
	import uQRCode from '@/common/uqrcode/uqrcode.js'
	export default {
		data() {
			return {
				qrcodeSize: 129,
				qrcodeSrc: ''
			}
		},
		methods: {
			
		},
		onLoad(option) {
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
					}
			});	
		}
	}
</script>

<style>
.canvas {
		margin-top: 50rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-content: center;
	}
</style>
