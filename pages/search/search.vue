<template>
	<view class="page">
		<!-- 搜索区域 -->
		<view class="searchBar">
			<view class="searchBar-searchIcon"></view>
			<input type="text" 
				   value="" 
				   focus
				   @input="showResult ? searchText = '搜索' : ''"
				   v-model="inputValue"
				   placeholder-style="color:#ADB9D2"
				   :placeholder="inputPlaceholder"/>
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
			<better-sticky :scrollTop="scrollTop">
				<template v-slot:header>
					<view class="conditionBar">
						<view class="conditionBar-main">
							<text class="conditionBar-sum">共 1 门相关课程</text>
							<view class="conditionBar-right">
								<view class="conditionBar-right-select">
									筛选：
									<view class="green" @click="showSelect = !showSelect;showSort = false">
										<text>全部</text>
										<text class="ux-ykt-icon-right-arrow chooseBtn"></text>
									</view>
								</view>
								<view class="conditionBar-right-select">
									排序：
									<view class="green" @click="showSort =! showSort;showSelect = false">
										<text>好评</text>
										<text class="ux-ykt-icon-right-arrow chooseBtn"></text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="conditionBar-bottom-select" v-show="showSelect">
						<yun-select :items="selectItems"  ref="select" @func="requestNew('selectItems','select')"></yun-select>
					</view>
					<view class="conditionBar-bottom-sort" v-show="showSort">
						<yun-select :items="sortItems" ref="sort" @func="requestNew('sortItems','sort')"></yun-select>
					</view>
				</template>
				<template v-slot:content>
					<view class="searchResult-result" :style="{height: searchResultArr === '' ? '100vh':''}">
						<block v-for="item in searchResultArr" :key="item.id">
							<yun-box :image="item.picsrc" :title="item.title"></yun-box>
						</block>
					</view>
				</template>
			</better-sticky>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue:'',
				inputPlaceholder:'行家专业亲授，直击就业痛点',
				hotSearchArr:'',
				searchAssArr:'',
				showResult:false,
				searchText:'搜索',
				selectItems:[{id:0,name:'全部'},{id:1,name:'免费'},{id:2,name:'付费'},{id:3,name:'只看VIP会员'}],
				sortItems:[{id:0,name:'好评'},{id:1,name:'畅销'},{id:2,name:'全部'}],
				showSelect:false,
				showSort:false,
				searchResultArr:'',
				
				scrollTop:0,
			}
		},
		onLoad() {
			let that = this;
			that.firstRequest(that,'/getHotSearch','hotSearchArr');
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
		methods: {
			clearInput:function() {
				this.inputValue = '';
				this.searchResultArr = '';
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
					let that = this,
						inputData = that.inputValue;
						
					that.$request({
					   url: '/getSearchResult',
					   method: 'GET',
					   data:{
						
						   input:inputData
					   }
					  }).then(res => {
							if(res.data.status === '200'){
								console.log(res.data)
								that.searchResultArr = res.data.data;
							}
					});
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
			requestNew:function(items,ref){
				let that = this,
					selectData = that[items][that.$refs[ref].nowSelect],
					inputData = that.inputValue;
				that.searchResultArr = [];
				console.log(selectData);
				that.$request({
				   url: '/getSearchResult',
				   method: 'GET',
				   data:{
					   select:selectData,
					   input:inputData
				   }
				  }).then(res => {
						if(res.data.status === '200'){
							console.log(res.data)
							that.searchResultArr = res.data.data;
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
				this.searchAssArr = [];
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
