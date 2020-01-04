<template>
	<view>
		<view class="inputbox" :style="'border: 1px solid '+ color">
			<view class="box-icon" >
				<uni-icons :type="icon" size="25" color="#bdbdbd"></uni-icons>
			</view>
			<input :type="inputType" value="" v-model="text" 
				   :placeholder="inputPlaceholder" 
				   :maxlength="maxLen"
				   class="box-input"  placeholder-class="box-input-placeholder"
				   />
			<view class="box-tip" v-show="text !== ''">
				<uni-icons type="clear" size="20" @click="clearInput"></uni-icons>
				<!-- color="#c5ccd8" -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:'',
				color:'#c5cddb'
			};
		},
		props: {
			icon: {
			   type: String,
			   default: 'help-filled'
			},
			inputType: {
			   type: String,
			   default: ''
			},
			inputPlaceholder: {
				type: String,
				default: ''
			},
			maxLen: {
				type: String || Number,
				default: '140'
			}
		},
		methods:{
			clearInput() {
				this.text = '';
			},
			emptyWarn() {
				if(this.text === ''){
					this.color = '#fa6060'
				}else{
					this.color = '#c5cddb'
				}
			}
		},
		watch:{
			'text'(text){	
				// #ifdef H5
				if(this.text.length > parseInt(this.maxLen)){
					this.text = text.slice(0,11)
				}
				// #endif
			}
		}
	}
</script>

<style>
	.inputbox {
		width: 100%;
	    border-radius: 2px;
	    height: 88rpx;
	    line-height: 88rpx;
		margin-bottom: 0px;
	    background: #fff;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	.box-icon {
		float: left;
	    text-align: center;
	    padding: 0 10rpx 0 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box-input {
	    height: 100%;
	    line-height: 88rpx;
		background: #fff;
		border: 0;
		flex: 1;
		padding: 0 0 0 16rpx;
		color: #333;
		font: 12px/1.14 "Microsoft YaHei","微软雅黑","宋体",helvetica,"Hiragino Sans GB";
		font-size: 16px;
		font-weight: bold;
		outline-style: none ;
		outline-width: 0px ;
		border: none ;
		border-style: none ;
		text-shadow: none ;
		-webkit-appearance: none ;
		-webkit-user-select: text ;
		outline-color: transparent ;
		box-shadow: none;
	}
	.box-input:-webkit-autofill,select:-webkit-autofill {  
	    -webkit-box-shadow: 0 0 0px 1000px white  inset !important;  
	} 
	.box-input-placeholder,
	.box-input::placeholder{
		font-size: 13px;
		font-weight: 400;
		color: #bdbdbd;
	}
	.box-tip {
		float: right;
		padding: 0 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
