<template>
	<view class="page">
		<view class="editAccount-box">
			<view class="box-acount">
				<image :src="userInfo.haedImage" mode="" class="account-img"></image>
				<text style="flex:1">{{ userInfo.nikename }}</text>
				<text class="box-edit" @tap="tapEdit('input')">编辑</text>
			</view>
		</view>
		<!-- 退出登录按钮 -->
		<view class="quitBtn" @tap="tapEdit('default')">退出登录</view>
		<!-- 拟态框 -->
		<yun-modal v-model="value" :mData="data" :type="type" @onConfirm="onConfirm" @cancel="cancel" navMask></yun-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				value:false,
				type:'default',
				data:{},
				defaultData:{title:'提示',content:'确认退出登录？',cancelText:'取消',confirmColor:'#f00'},
				inputData:{
					title:'修改昵称',
					content:[
						{content:'',type:'text',placeholder:'请输入新昵称',borderColor:'#ddd',focus:true},
					],
					tip:{main:'',color:'red'}
				}
			}
		},
		methods: {
			tapEdit(type) {
				this.type = type
				this.value = !this.value;
				// this.data = this.inputData;
				switch(this.type){
					case 'default':
						this.data = this.defaultData;
						break;
					case 'input':
						this.data = this.inputData;
						this.inputData.content[0].content = this.userInfo.nikename
						break;
						}
			},
			onConfirm() {
				switch(this.type){
					case 'default':
						//退出登录
						this.$store.commit('changeUserInfo',{});
						uni.removeStorageSync('userInfo');
						uni.switchTab({
							url: '/pages/index/index'
						});
						break;
					case 'input':
						//传给后台更改数据
						break;
				}
			},
			cancel(){
				console.log('用户点击取消');
			},
		},
		onShow() {
			this.userInfo = this.$store.getters.basicInfo;
			if(Object.keys(this.userInfo).length === 0) {
				uni.navigateTo({
					url:'/pages/chooseLogin/chooseLogin'
				})
			}
		},
	}
</script>
	
<style>
	@import url("userEdit.css");
</style>
