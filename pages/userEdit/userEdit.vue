<template>
	<view class="page">
		<view class="editAccount-box">
			<view class="box-acount">
				<image :src="userInfo.haedImage" mode="" class="account-img"></image>
				<text style="flex:1">{{ userInfo.nikename }}</text>
				<text class="box-edit">编辑</text>
			</view>
		</view>
		<!-- 退出登录按钮 -->
		<view class="quitBtn" @click="quit">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
			}
		},
		methods: {
			quit(){
				let that = this;
				uni.showModal({
				    title: '提示',
				    content: '确定退出登录？',
				    success: function (res) {
				        if (res.confirm) {
				            that.$store.commit('changeUserInfo',{});
							uni.removeStorageSync('userInfo');
							uni.switchTab({
								url: '/pages/index/index'
							});
				        } 
				    }
				});
			}
		},
		onShow() {
			this.userInfo = this.$store.getters.basicInfo;
			if(Object.keys(this.userInfo).length === 0) {
				uni.navigateTo({
					url:'/pages/chooseLogin/chooseLogin'
				})
			}
		}
	}
</script>
	
<style>
	@import url("userEdit.css");
</style>
