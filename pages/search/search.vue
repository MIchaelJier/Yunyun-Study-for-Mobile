<template>
	<view class="page">
		<view class="searchBar">
			<view class="searchBar-searchIcon"></view>
			<input type="text" 
				   value="" 
				   focus
				   @input="showResult ? searchText = '搜索' : ''"
				   v-model="inputValue"
				   placeholder-style="color:#ADB9D2"
				   placeholder="行家专业亲授，直击就业痛点"/>
			<text @click="showSearchResult" :style="{color: searchText !== '搜索' ? '#000' : '#2CC17B'}">{{ searchText }}</text>
			<view class="searchBar-delIcon" @click.stop="clearInput" v-show="inputValue !== ''"></view>
		</view>
		<!-- 热门搜索 -->
		<view class="hotSearch" v-if="inputValue === '' && !showResult">
			<text>热门搜索</text>
			<view class="hotSearch-content">
				<block v-for="tip in hotSearchArr" :key="tip.id">
					<view class="hotSearch-content-tip">{{ tip.title }}</view>
				</block>
			</view>
		</view>
		<!-- 搜索联想 -->
		<view class="searchAss" v-else-if="inputValue !== '' && !showResult">
			<block v-for="tip in searchAssArr" :key="tip.id">
				<view class="searchAss-tip">{{ tip.title }}</view>
			</block>
		</view>
		<!-- 搜索结果 -->
		<view class="searchResult" v-else>
			<view class="conditionBar">
				<text class="conditionBar-sum">共 1 门相关课程</text>
				<view class="conditionBar-right">
					<view class="conditionBar-right-select">
						筛选：
						<view class="green">
							<text  :decode="true">&nbsp;全部</text>
							<text class="ux-ykt-icon-right-arrow chooseBtn"></text>
						</view>
					</view>
					<view class="conditionBar-right-select">
						排序：
						<view class="green">
							<text :decode="true">&nbsp;好评</text>
							<text class="ux-ykt-icon-right-arrow chooseBtn"></text>
						</view>
					</view>
				</view>
			</view>
			{{ inputValue }}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue:'',
				hotSearchArr:'',
				searchAssArr:'',
				showResult:false,
				searchText:'搜索'
			}
		},
		onLoad() {
			let that = this;
			that.firstRequest(that,'/getHotSearch','hotSearchArr');
		},
		methods: {
			clearInput:function() {
				this.inputValue = '';
				this.searchText = '搜索';
				this.showResult = false;
			},
			showSearchResult:function() {
				if( this.inputValue === '' ) return;
				if( this.searchText === '取消' ){
					uni.navigateBack({
					    delta: 1
					});
				}
				if(!this.showResult) {
					this.showResult = true;
					this.searchText = '取消';
				}
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
