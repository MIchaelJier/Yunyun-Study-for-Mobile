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
		<yun-modal v-model="value" :mData="data" :type="type" @onConfirm="onConfirm" @cancel="cancel" ref="myModel"></yun-modal>
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
						if(this.$refs.myModel.mData.tip.main === ''){
							let newNikename = this.$refs.myModel.mData.content[0].content;
							console.log(newNikename);
							this.$request({
							   url: '/changeNike',
							   method: 'POST',
							   data:{
								   newNikename,
							   }
							  }).then(res => {
								  //更改页面 、缓存 和 vuex的保存值
								  this.userInfo.nikename = newNikename;
								  this.$store.commit('changeUserInfoAttr',{value:newNikename,key:'nikename'}); 
								  uni.setStorageSync('userInfo', this.$store.state.userInfo);
								  //更改成功 toast提示
								  uni.showToast({title:res.data.data.tip,icon:'none',duration:1000});
							  })
						}
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
		mounted() { //this.$refs.myModel获取值必须在mounted及之后
			//复杂对象监视
			this.$watch(
				function(){ //监听的属性
					// H5有效
					// return this.data.hasOwnProperty('content') ? this.data.content[0].content : '';
					return this.$refs.myModel.mData.hasOwnProperty('content') ? this.$refs.myModel.mData.content[0].content : ''
				},
				function(old,oldval){
					switch (old){
						case '':
							this.inputData.content[0].borderColor = '#f00';
							this.inputData.content[0].content = '';
							this.inputData.tip.main = '昵称不能为空';
							break;
						case this.userInfo.nikename:
							this.inputData.content[0].borderColor = '#f00';
							this.inputData.tip.main = '昵称不能相同';
							break;
						default:
							this.inputData.content[0].borderColor = '#ddd';
							this.inputData.content[0].content = old
							this.inputData.tip.main = '';
					}
				},
				// function(){
				// 	deep: true
				// }
			)
		}

	}
</script>
	
<style>
	@import url("userEdit.css");
</style>
