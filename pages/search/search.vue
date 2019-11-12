<template>
	<view class="page">
		<view class="searchBar">
			<view class="searchBar-searchIcon"></view>
			<input type="text" 
				   value="" 
				   focus
				   v-model="inputValue"
				   placeholder-style="color:#ADB9D2"
				   placeholder="行家专业亲授，直击就业痛点"/>
			<text>搜索</text>
			<view class="searchBar-delIcon" @click="clearInput" v-show="inputValue !== ''"></view>
		</view>
		<view class="hotSearch" v-if="inputValue === ''">
			<text>热门搜索</text>
			<view class="hotSearch-content">
				<block v-for="tip in hotSearchArr" :key="tip.id">
					<view class="hotSearch-content-tip">{{ tip.title }}</view>
				</block>
			</view>
		</view>
		<view class="searchAss" v-else>
			<block v-for="tip in searchAssArr" :key="tip.id">
				<view class="searchAss-tip">{{ tip.title }}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue:'',
				hotSearchArr:'',
				searchAssArr:''
			}
		},
		onLoad() {
			let that = this;
			that.firstRequest(that,'/getHotSearch','hotSearchArr');
		},
		methods: {
			clearInput:function() {
				this.inputValue = '';
			},
			firstRequest:function(that,u,d){
					that.$request({
					   url: u,
					   method: 'GET',
					  }).then(res => {
							if(res.data.status === '200'){
								console.log(res.data)
								that.$data[d] = res.data.data;
							}
					});
			},
			// 防抖
			debounce: function (fn, wait) {
				if (this.fun !== null) {
					clearTimeout(this.fun)
				}
				this.fun = setTimeout(fn, wait)
			},
		},
		watch: {
			'inputValue':function(){
				// console.log(this.inputValue);
				// 用户输入停止0.5s进行联想
				if(this.inputValue !== '') {
					this.debounce(()=> {
						this.firstRequest(this,'/getHotSearch','searchAssArr');
					},500)
				}
			}
		}
		
	}
</script>

<style>
	@import url("search.css");
</style>
