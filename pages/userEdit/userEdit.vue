<template>
	<view class="page">
		<view class="editAccount-box">
			<view class="box-acount">
				<text class="account-itemName">头像</text>
				<view style="flex: 1;">
					<image :src="userInfo.haedImage" mode="" class="account-img" style="float: right;"></image>
				</view>
				<text class="box-edit" @tap="editHead">选取</text>
			</view>
			<view class="box-acount">
				<text class="account-itemName">昵称</text>
				<text style="flex:1;text-align: right;">{{ userInfo.nikename }}</text>
				<text class="box-edit" @tap="tapEdit('input')">编辑</text>
			</view>
		</view>
			
		<!-- 退出登录按钮 -->
		<view class="quitBtn" @tap="tapEdit('default')">退出登录</view>
		<!-- 拟态框 -->
		<yun-modal v-model="value" :mData="data" :type="type" @onConfirm="onConfirm" @cancel="cancel" ref="myModel"></yun-modal>
		<!-- 图片剪裁 -->
		<yun-image-cutter @ok="onok" @cancel="oncancle" :blob="false" :url="cutterUrl" :fixed="false"  :maxWidth="200" :maxHeight="200"></yun-image-cutter>
	</view>
</template>

<script>
	import yunImageCutter from "@/components/yunImageCutter.vue";
	import { wxBase64,appBase64,getImgSize } from "@/utils/fileType.js"
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
				},
				
				cutterUrl:'',
				picMaxSize:30
			}
		},
		components: {
			yunImageCutter
		},
		methods: {
			// 选择图片并剪裁
			editHead(){
				uni.chooseImage({
				    count: 1, 
				    sizeType: ['compressed'], 
				    sourceType: ['album'], 
				    success: (res) => {
				        this.cutterUrl = res.tempFilePaths[0];
						console.log('cutterUrl:' + res.tempFilePaths[0]);
				    }
				});
			},
			onok(ev) {
				// console.log(getImgSize(ev.path));
				this.cutterUrl = "";				
				// uni.showToast({title:'修改中',icon:'none',duration:1000});
				// #ifdef H5
				this.changeHead(
					this.httpUserInfo('base64Url',ev.path)
				);
				// #endif
				// #ifdef APP-PLUS
				this.changeHead(
					appBase64(ev.path).then(res => {
						this.httpUserInfo('base64Url',res)
					})
				);
				// #endif
				// #ifdef MP-WEIXIN
				this.changeHead(
					wxBase64(ev.path).then(res => {
						this.httpUserInfo('base64Url',res)
					})
				);
				// #endif
			},
			changeHead(promise){
				promise.then(res => {
					//图片地址 加上时间戳，防止缓存
					const userAvatarUrl= `${res.data.data.userAvatarUrl}?${new Date().getTime().toString()}`
					this.userInfo.haedImage = userAvatarUrl;
					this.changeStorage('haedImage', userAvatarUrl );
					uni.showToast({title:'修改成功',icon:'none',duration:500});
				}).catch(err => {
					console.log(err)
				})
			},
			//修改 vuex和localStorage的值
			changeStorage(key,value){
				this.$store.commit('common/changeUserInfoAttr',{value,key});
				uni.setStorageSync('userInfo', this.$store.getters['common/allInfo']);
			},
			oncancle() {// cutterUrl设置为空，隐藏控件
				this.cutterUrl = "";
			},
			// 编辑昵称
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
						this.User.$signout();
						break;
					case 'input':
						//传给后台更改数据
						if(this.$refs.myModel.mData.tip.main === ''){
							let newNikename = this.$refs.myModel.mData.content[0].content;
							console.log(newNikename);
							this.httpUserInfo('nickName',newNikename)
							  .then(res => {
								  //更改页面 、缓存 和 vuex的保存值
								  this.userInfo.nikename = newNikename;
								  this.changeStorage('nikename',newNikename);
								  //更改成功 toast提示
								  uni.showToast({title:'修改成功',icon:'none',duration:1000});
							  })
						}
						break;
				}
			},
			cancel(){
				console.log('用户点击取消');
			},
			// 单个 修改用户信息http请求
			httpUserInfo(dataName,dataInner){
				if(dataName === 'base64Url' && getImgSize(dataInner) > this.picMaxSize){
					uni.showToast({
						title:`图片过大（超过${this.picMaxSize}KB）`,
						icon:'none',
						duration:500
					})
					return new Promise((resolve, reject) => {reject('image is too large')})
				}
				return this.$request({
					url: '/last/user/setUserProfile',
					method: 'POST',
					header: {
					    "Content-Type": "application/x-www-form-urlencoded"
					}, 
					data:{
						[dataName]: dataInner,
					},
					showLoading:true
				})
			},
		},
		onShow() {
			this.userInfo = this.$store.getters['common/basicInfo'];
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
