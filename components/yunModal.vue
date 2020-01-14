<template>
	<view class="mask" @tap="tapMask" :class="!value?'':'mask-show'" @touchmove.stop.prevent>
		<block v-if="type=='default'">
			<view class="default-view" @tap.stop>
				<view class="title">{{mData.title}}</view>
				<view class="content word-break">{{mData.content}}</view>
				<view class="btn">
					<view class="cancel" @tap="tapCancel" :style="{color:mData.cancelColor?mData.cancelColor:''}">{{mData.cancelText?mData.cancelText:'取消'}}</view>
					<view class="confirm" @tap="tapConfirm" :style="{color:mData.confirmColor?mData.confirmColor:''}">{{mData.confirmText?mData.confirmText:'确认'}}</view>
				</view>
			</view>
		</block>
		<block v-if="type=='input'&&value">
			<view class="input-view" :style="{'margin-bottom':bottom + 'px'}"  @tap.stop>
				<view class="title">{{mData.title}}</view>
				<view class="content">
					<view v-for="(item,index) in mData.content" :key="index" class="input-box">
						<view class="view" v-if="item.title">{{item.title}}</view>
						<block v-if="item.type=='number'">
							<input class="input" v-model="item.content" type="number" :password="item.type=='password'" :placeholder="item.placeholder"
							:class="item.title?'':'input-box-withoutTitle'" :style="'border: 1px solid ' + item.borderColor" :focus="item.focus"/>
						</block>
						<block v-if="item.type=='password'">
							<input class="input" v-model="item.content" :password="item.type=='password'" :placeholder="item.placeholder"
							:class="item.title?'':'input-box-withoutTitle'" :style="'border: 1px solid ' + item.borderColor" :focus="item.focus"/>
						</block>
						<block v-if="item.type=='digit'">
							<input class="input" v-model="item.content" type="digit" :password="item.type=='password'" :placeholder="item.placeholder"
							:class="item.title?'':'input-box-withoutTitle'" :style="'border: 1px solid ' + item.borderColor" :focus="item.focus"/>
						</block>
						<block v-if="item.type=='idcard'">
							<input class="input" v-model="item.content" type="idcard" :password="item.type=='password'" :placeholder="item.placeholder"
							:class="item.title?'':'input-box-withoutTitle'" :style="'border: 1px solid ' + item.borderColor" :focus="item.focus"/>
						</block>
						<block v-if="!item.type||item.type=='text'">
							<input class="input" v-model="item.content" type="text" :password="item.type=='password'" :placeholder="item.placeholder"
							:class="item.title?'':'input-box-withoutTitle'" :style="'border: 1px solid ' + item.borderColor" :focus="item.focus" 
							@focus="inputFocus" @blur="inputBlur"/>
						</block>
					</view>
					<view class="tip" v-if="mData.tip.main!==''" :style="'color:' + mData.tip.color">{{mData.tip.main}}</view>
				</view>
				<view class="btn">
					<view class="cancel" @tap="tapCancel" :style="{color:mData.cancelColor?mData.cancelColor:''}">{{mData.cancelText?mData.cancelText:'取消'}}</view>
					<view class="confirm" @tap="inputConfirm" :style="{color:mData.confirmColor?mData.confirmColor:''}">{{mData.confirmText?mData.confirmText:'确认'}}</view>
				</view>
			</view>
		</block>
		<block v-if="type=='custom'">
			<slot></slot>
		</block>
	</view>
</template>

<script>
	
	export default{
		props:{
			type:{
				type:String,
				default:'default'
			},
			value:{
				type:Boolean,
				default:false
			},
			maskEnable:{
				type:Boolean,
				default:true
			},
			mData:{
				type:[Object, Array],
				default:()=>{}
			},
			nav:{
				type:Boolean,
				default:true
			},
			navMask:{
				type:Boolean,
				default:false
			},
		},
		data(){
			return{
				navList:[],
				tabbarList:[],
				bottom:0,
			}
		},
		mounted() {
			//#ifdef APP-PLUS
			this.init()
			//#endif
		},
		methods:{
			//键盘事件
			inputFocus(e){
				//#ifdef H5 || MP-WEIXIN
				if(e.detail.hasOwnProperty('height')){
					this.bottom = e.detail.height
				}
				//#endif
			},
			inputBlur(){
				this.bottom = 0
			},
			checkboxChange(e){
				var items = this.mData,
				values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
				    const item = items[i]
				    if(values.includes(item.title)){
				        this.$set(item,'flag',true)
				    }else{
                        this.$set(item,'flag',false)
                    }
				}
				
			},
			inputConfirm(){
				this.$emit('onConfirm',this.mData.content)
				this.$emit('input',false)
			},
			tapCancel(){
				this.$emit('cancel')
				this.$emit('input',false)
			},
			tapConfirm(item){
				this.$emit('onConfirm',item)
				this.$emit('input',false)
			},
			tapMask(){
				if(!this.maskEnable) return
				if(this.type == 'multiSelect'){
					this.$emit('onConfirm',this.mData)
				}else{
					this.$emit('cancel',this.mData)
				}
				
				this.$emit('input',false)

			},
			creatPlusMask(navHeight,tabbarHeight,opacity){
				for (let i = 1; i <= 10; i++) {
					let navView = new plus.nativeObj.View('nav',{top:'0px',left:'0px',height:`${navHeight}px`,width:'100%'});
					navView.draw([
						{tag:'rect',id:'rect',color:`rgba(0,0,0,0.1)`,position:{top:'0px',left:'0px',width:'100%',height:'100%'}},
					]);
					navView.addEventListener("click", (e) => {
						this.tapMask()
					}, false);
					let tabbarView = new plus.nativeObj.View('tabbar',{bottom:'0px',left:'0px',height:`${tabbarHeight}px`,width:'100%'});
					tabbarView.draw([
						{tag:'rect',id:'rect',color:`rgba(0,0,0,0.1)`,position:{top:'0px',left:'0px',width:'100%',height:'100%'}},
					]);
					tabbarView.addEventListener("click", (e) => {
						this.tapMask()
					}, false);
					this.navList.push(navView)
					this.tabbarList.push(tabbarView)
				}
				
			},
			async init(){
				let promise = new Promise((resolve,reject)=>{
					uni.getSystemInfo({
						success: function(e) {
							let customBar
							customBar = e.statusBarHeight + 44;
							resolve(customBar)
						}
					})
				})
				let navHeight = await promise
				navHeight = this.nav?navHeight:0
				let tabbarHeight = uni.getSystemInfoSync().screenHeight - uni.getSystemInfoSync().windowHeight - navHeight
				this.creatPlusMask(navHeight,tabbarHeight,0.6)
				
				
				
			},
			showPlusMask(){
				let i = 0
				const temp = setInterval(()=>{
					if(i==9){
						clearInterval(temp)
					}else{
						if (this.navList[i]) this.navList[i].show()
						if (this.tabbarList[i]) this.tabbarList[i].show()
						// if(i!=0) this.navList[i-1].hide()
						// if(i!=0) this.tabbarList[i-1].hide()
						i++
					}
				},30)
			}
		},
		watch:{
			value:{
				immediate:true,
				handler(newVal,oldVal){
					if(!this.navMask) return
					//#ifdef APP-PLUS
					if(newVal) {
						// this.navView.show();
						// this.tabbarView.show();
						this.showPlusMask(0.6)
					}else{
						for (let item of this.navList) {
							item.hide();
						}
						for (let item of this.tabbarList) {
							item.hide();
						}
						// this.navView.hide();
						// this.tabbarView.hide();
					}
					//#endif
				}
			},
		}
	}
</script>

<style lang="scss">
	.mask{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999;
		background:rgba(0 ,0,0,0);
		transition: background 0.3s linear;
		display: flex;
		align-items: center;
		opacity: 0;
		visibility: hidden;
		justify-content: center;
		&.mask-show{
			background:rgba(0,0,0,0.6);
			visibility:visible;
			opacity: 1;
		}
		
	}
	.hover{
		background: #f2f2f2;
	}
	.default-view{
		width: 550rpx;
		font-weight: 400;
		font-size: 14px;
		background-color: #fff;
		border-radius: 6rpx;
		.title{
			height: 100rpx;
			display: flex;
			align-items: center;
			padding: 0 48rpx;
		}
		.content{
			padding: 40rpx 48rpx;
			min-height: 40px;
			font-size: 15px;
			line-height: 1.4;
			color: #999;
			text-align: center;
		}
		.btn{
			height: 80rpx;
			display: flex;
			flex-direction: row;
			.cancel{
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				background: #EEE;
				color: #666666;
			}
			.confirm{
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				color: rgb(255, 255, 255);
				background: #2CC17B;
			}
		}
	}
	.input-view{
		width: 550rpx;
		font-weight: 400;
		font-size: 14px;
		background-color: #fff;
		border-radius: 6rpx;
		margin-bottom: 0;
		transition: margin-bottom .5s;
		.title{
			height: 100rpx;
			display: flex;
			align-items: center;
			padding: 0 48rpx;
		}
		.content{
			padding: 20rpx 48rpx;
			min-height: 40px;
			font-size: 14px;
			color: #999;
			text-align: left;
		}
		.input-box-withoutTitle{
			border: 1px solid #ddd;
			width: 100%;
			padding: 16rpx 32rpx;
		}
		.input-box{
			display: flex;
			margin-bottom: 20rpx;
			.view{
				margin-right: 20rpx;
				min-width: 150rpx;
			}
			.input{
				font-size: 14px;
			}
		}
		.tip{
			height: 50rpx;
			line-height: 50rpx;
		}
		.btn{
			height: 80rpx;
			display: flex;
			flex-direction: row;
			.cancel{
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				background: #EEE;
				color: #666666;
			}
			.confirm{
				display: flex;
				flex: 1;
				justify-content: center;
				align-items: center;
				color: rgb(255, 255, 255);
				background: #2CC17B;
			}
		}
	}
	.word-break{
		word-wrap: break-word;
		word-break: break-all;
		white-space: pre-wrap;
	}
</style>
