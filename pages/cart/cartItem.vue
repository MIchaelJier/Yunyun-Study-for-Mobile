<template>
	<view>
		<view class="cart-item">
			<checkbox-group class="item-title" :data-id="ownerMsg.ownerId" @change="allCheck">
				<checkbox :value="ownerMsg.ownerId" :checked="allChecked" color="#ff632a" style="transform:scale(0.6)"/>
				<text @click.stop="enter('/pages/provider/provider?ownerId=' + ownerMsg.ownerId)">{{ ownerMsg.ownername }}</text>
			</checkbox-group>
			<checkbox-group class="item-courses" :data-id="ownerMsg.ownerId" @change="courseCheck">
				<label class="course" v-for="course in cartList" :key="course.productId">
					<checkbox :value="course.productId" :data-id="course.productId"
					:checked="course.checked" 
					color="#ff632a" class="course-checkbox"
					/>
					<view class="course-body" @click.stop="enter('/pages/Coursedetails/Coursedetails?id=' + course.productId)">
						<view class="course-img">
							<yun-image :src="course.photoUrl"></yun-image>
						</view>
						<view class="course-msg">
							<text style="font-size: 14px;color: #3C4A55;">{{ course.productName }}</text>
							<text style="margin: 6rpx 0;" v-if="course.deadlineTime === 0">永久有效</text>
							<text style="margin: 6rpx 0;" v-else>有效期至{{ course.deadlineTime }}</text>
							<text style="color: #3C4A55;">￥{{ course.discountPrice }}</text>
						</view>
					</view>
					<text class="course-delBtn" @click.stop="cartDel(course.productId)">删除</text>
				</label>			
				<view class="item-courses-bottom">
					<view class="bottom-main">
						<text>该机构小结：</text>
						<text style="color: #FF4400;font-size: 14px;">￥{{ totalCount }}</text>
					</view>
				</view>
			</checkbox-group>
			<!-- 拟态框 -->
			<yun-modal v-model="value" :mData="modelData" type="default" @onConfirm="onConfirm" @cancel="cancel" ref="myModel"></yun-modal>
		</view>
	</view>
</template>

<script>
	import { toDecimal } from '../../utils/myMath.js'
	export default {
		data() {
			return {
				// 弹出框
				value:false,
				modelData:{title:'提示',content:'确认删除该课程？',cancelText:'取消'},
				delProductId:'',
			};
		},
		computed:{
			// 新增课程 勾选 无法更新
			// totalCount(){
			// 	let total = 0;
			// 	this.cartList.forEach( course => {
			// 		if(course.checked) total += parseFloat(course.discountPrice)
			// 	})
			// 	return toDecimal(total)
			// },
		},
		props:{
			cartList: {
			    type: Array,
			    default () {
			    	return [];
			    }
			},
			ownerMsg: {
			    type: Object,
			    default () {
			    	return {};
			    }
			},
			allChecked: {
			    type: Boolean,
				default:false,
			},
			totalCount: { 
				type: String,
				default: '0.00',
			}
		},
		methods:{
			// 机构选择
			allCheck(e){
				this.$emit('itemCheck',e.currentTarget.dataset.id);
			},
			// 课程选择
			courseCheck(e){
				let detail = {
					key:e.currentTarget.dataset.id,
					value:e.detail.value
				}
				this.$emit('courseCheck',detail);
			},
			// 删除课程
			cartDel(productId){
				this.value = !this.value;
				this.delProductId = productId;
				
			},
			onConfirm() {
				this.$store.commit('cart/delCartOne',{
					ownerId:this.ownerMsg.ownerId,
					productId:this.delProductId,
				});
				this.$request({
				   url: `/last/cart/delCartToUser?courseId=${this.delProductId}`,
				   method: 'POST',   
				   showLoading: true
				}).then(res => {
					let title = '';
					res.data.status ? title = '删除成功' : title = '同步失败'
					uni.showToast({
					    title,
						icon: 'none',
						mask: true,
						duration: 500
					});
				})
				this.delProductId = '';
			},
			cancel(){
				this.delProductId = '';
			},
			enter(url) {
				if(url && url !== ''){
					uni.navigateTo({
						url: url
					})
				}
			}
		},
	}
</script>

<style>
	.item-title {
		width: calc( 100% - 20rpx);
		height: 68rpx;
		background: #F7F9FC;
	    padding: 0 10rpx;
		font-size: 12px;
		display: flex;
		align-items: center;
	}
	.course {
		padding: 24rpx 10rpx;
		width: calc ( 100% - 20rpx);
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		font-size: 12px;
		color: #99A4BF;
		position: relative;
		background: #fff;
	}
		.course-checkbox {
			transform:scale(0.6);
			position: absolute;
			height: 100%;
		}
		.course-body {
			padding: 0 54rpx;
			width: calc( 100% - 128rpx);
			display: flex;
		}
			.course-img {
				width: 200rpx;
				height: 108rpx;
			}
			.course-msg {
				width: calc( 100% - 230rpx); /* 215rpx */
				display: flex;
				flex-direction: column;
				padding-left: 15rpx;
			}
		.course-delBtn {
			position: absolute;
			right: 40rpx;
		}
	.item-courses-bottom {
		/* padding: 30rpx 20rpx; */
		background: #fff;
		padding-top: 20rpx;
		margin-bottom: 16rpx;
	}
		.bottom-main {
			margin: 0 20rpx;
			padding: 20rpx 0;
			text-align: right;
			width: calc(100% - 40rpx);
			font-size: 12px;
			color: #70788C;
			border-top: 1px solid #E6EAE5;
		}
	
</style>
