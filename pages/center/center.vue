<template>
	<view class="page">
		<view @click="jumpto(0)">
			<view class="userInfo" hover-class="userInfo-active" v-if="JSON.stringify(userInfo) === '{}'">
				<image src="../../static/images/unLogin.png" mode="" class="userInfo-img"></image>
				<text>登录/注册</text>
			</view>
			<view class="userInfo" hover-class="userInfo-active" v-else>
				<image :src="userInfo.haedImage" mode="" class="userInfo-img"></image>
				<view class="userInfo-msg">
					<text>{{ userInfo.nikename }}</text>
					<text class="msg-way">正在使用{{ loginWay }}账号登陆</text>
				</view>
				<uni-icons type="arrowright" size="20" color="#999"></uni-icons>
			</view>
		</view>
		<uni-list>
		    <uni-list-item title="我的订单" font-icon="ux-ykt-icon-cash" @click="jumpto(1)"></uni-list-item>
		    <uni-list-item title="我的优惠券" font-icon="ux-ykt-icon-coupon" font-icon-size="12" @click="jumpto(2)"></uni-list-item>
			<uni-list-item title="我的购物车" font-icon="ux-ykt-icon-cart"  @click="jumpto(3)"></uni-list-item>
			<uni-list-item title="我的学习卡" font-icon="ux-ykt-icon-xuexiqia" font-icon-size="12" @click="jumpto(4)"></uni-list-item>
		</uni-list>
		<view class="blackMargin"></view>
		<uni-list>
			<uni-list-item title="分享赚学费" font-icon="ux-ykt-icon-notice"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				loginWay:''
			}
		},
		methods:{
			jumpto(id){
				let url = '';
				const actions = new Map([
				  [0, ()=>{url='/pages/userEdit/userEdit'}],
				  [1, ()=>{url='/pages/order/order'}],
				  [2, ()=>{url='/pages/coupon/coupon'}],
				  [3, ()=>{url='/pages/cart/cart'}],
				  [4, ()=>{console.log('开发中')}],
				  [false, ()=>{url='/pages/chooseLogin/chooseLogin'}],
				]);
				//执行
				(actions.get(JSON.stringify(this.userInfo) !== '{}' && id) || actions.get('default')).call(this);
				
				uni.navigateTo({
					url,
				})
			}
		},
		onShow() {
			this.userInfo = this.$store.getters.basicInfo;
			if(Object.keys(this.userInfo).length !== 0) {
				 switch (this.userInfo.loginWay){
				 	case 1:
						this.loginWay = '手机'
				 		break;
				 	case 2:
				 		this.loginWay = 'QQ'
				 		break;
					case 3:
						this.loginWay = '微信'
						break;
				 }
			}
		},
	}
</script>

<style>
	@import url("center.css");
</style>