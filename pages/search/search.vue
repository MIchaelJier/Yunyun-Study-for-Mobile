<template>
	<view class="page xBottom">
		<!-- 搜索区域 -->
		<view class="searchBar">
			<view class="searchBar-searchIcon"></view>
			<input type="text" 
				   value="" 
				   focus
				   @input="showResult ? searchText = '搜索' : ''"
				   v-model="inputValue"
				   placeholder-style="color:#ADB9D2"
				   :placeholder="inputPlaceholder"
				   confirm-type="search"
				   @confirm="showSearchResult(true)"/>
			<text @click="showSearchResult(false)" :style="{color: searchText !== '搜索' ? '#000' : '#2CC17B'}">{{ searchText }}</text>
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
			<better-sticky :scrollTop="scrollTop" :initDone="initDone">
				<template v-slot:header>
					<view class="conditionBar">
						<view class="conditionBar-main">
							<text class="conditionBar-sum">共 {{ searchSum }} 门相关课程</text>
							<view class="conditionBar-right">
								<view class="conditionBar-right-select">
									筛选：
									<yun-select :items="selectItems"  
												:show="showSelect" 
												ref="select" 
												@yunClick="showSelectF()"
												@func="requestNew"></yun-select>
								</view>
								<view class="conditionBar-right-select">
									排序：
									<yun-select :items="sortItems"
												:show="showSort" 
												ref="sort" 
												@yunClick="showSortF()"
												@func="requestNew"></yun-select>
								</view>
							</view>
						</view>
					</view>
				</template>
				<template v-slot:content style="z-index: 1;">
						<view class="searchResult-result" 
						:style="[{'z-index': refShow ? '-1':''}]"
						> <!-- {height: searchResultArr === '' ? '100vh':''}, -->
							<block v-for="(item, index) in searchResultArr" :key="index"> <!-- :key="item.id" -->
								<yun-box :image="item.picsrc" :title="item.title" :url="'/pages/Coursedetails/Coursedetails?id=' + item.url" lazy>				
									<view class="item-up">
										<view class="item-up-u">
											<uni-rate :value="item.star" size="10" disabled="true"></uni-rate>
										</view>
										<view class="item-up-s">{{ item.star }}</view>
										<view class="item-up-l">{{ item.learned }}人学过</view>
									</view>
									<view class="item-down">
										<view class="item-down-o" v-if="item.oprice && item.oprice != ''">
											<view v-if="item.oprice == 0">免费</view>
											<view v-else>¥{{ item.oprice }}</view>
										</view>
										<view class="item-down-n" v-if="item.oprice != 0 && item.nprice != ''">¥{{ item.nprice }}</view>
									</view>
									<view class="item-vip" v-if="item.vipprice && item.vipprice != ''">
										<view class="item-vip-icon">vip会员</view>
										<view v-if="item.vipprice == 0">免费</view>
										<view v-else>¥{{ item.vipprice }}</view>
									</view>
								</yun-box>
							</block>
							<!-- 加载更多 -->
							<uni-load-more :status="more" iconType="circle" :iconSize="iconSize"></uni-load-more>
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
				selectItems:[{id:0,name:'全部'},{id:1,name:'免费'},{id:2,name:'付费'}], //,{id:3,name:'只看VIP会员'}
				sortItems:[{id:0,name:'全部'},{id:1,name:'推荐'},{id:2,name:'畅销'},{id:3,name:'好课'}],
				showSelect:false,
				showSort:false,
				searchSum:0,
				searchResultArr:[],
				
				scrollTop:0,
				initDone:false,
				// 加载更多
				iconSize:18,
				more:'more',
				star:0, //页数
				add:7,
			}
		},
		computed:{
			refShow(){
				const select = this.$refs['select'] || {vShow:false},
					  sort = this.$refs['sort'] || {vShow:false};
				if((this.showSelect || select.vShow) || (this.showSort || sort.vShow))
					return select.vShow || sort.vShow
				else 
					return false
			}
		},
		onLoad() {
			this.firstRequest('/last/search/getHotSearch','hotSearchArr');
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
		methods: {
			showSelectF() {
				console.log('展开筛选列表');
				this.showSelect = !this.showSelect;
				this.showSort = false
			},
			showSortF() {
				console.log('展开排序列表');
				this.showSort =! this.showSort;
				this.showSelect = false
			},
			clearInput() {
				this.inputValue = this.searchResultArr = '';
				this.searchText = '搜索';
				this.showResult = false;
			},
			showSearchResult(keyboard = false) {
				if( this.inputValue === '' ) return;
				if( this.searchText === '返回' && !keyboard){
					uni.navigateBack({
					    delta: 1
					});
				}
				if(!this.showResult) {
					this.showResult = true;
					this.searchText = '返回';
					this.$nextTick(() => {
						this.getSearchResultFrist();
					})
					
				}
			},
			requestNew(){
				this.getSearchResultFrist() 
			},
			// 防抖
			debounce(fn, wait) {
				if (this.fun !== null) {
					clearTimeout(this.fun)
				}
				this.fun = setTimeout(fn, wait)
			},
			// 初次请求
			firstRequest(u,d){
				let that = this;
				return that.$request({
					   url: u,
					   method: 'GET',
					  }).then(res => {
							if(res.data.status === '200'){
								that[d] = res.data.data;
							}
					});
			
			},
			// 请求搜索结果
			getSearchResult(){
				const that = this, 
					  priceType = that.$refs['select'].nowSelect,
					  orderType =  that.$refs['sort'].nowSelect,
					  key = that.inputValue,
					  size = that.add,
					  current = that.star + 1;
				return that.$request({
				   url: '/last/search/getSearchResult',
				   method: 'POST',
				   header:{
				   		   'Content-Type':'application/json'
				   },
				   data: JSON.stringify({ priceType,orderType,key,size,current })
				  })
			},
			getSearchResultFrist(){ 
				this.showSort = this.showSelect  = false;
				this.star = 0;
				this.more = 'more';
				return this.getSearchResult().then(res => {
					this.searchSum = res.data.data.searchsum;
					let list = res.data.data.searchresult;
					this.star += 1;
					list.length === this.add ? this.more = 'more' :  this.more = 'noMore';
					this.searchResultArr = list;
					this.initDone = true;
				})
			}
		},
		// 下拉刷新
		// onPullDownRefresh() {
		// 	if(this.searchResultArr.length === 0){
		// 		this.inputValue = '';
		// 		this.firstRequest('/getHotSearch','hotSearchArr').then(() => {
		// 			uni.stopPullDownRefresh()
		// 		})
		// 	}else{
		// 		this.getSearchResultFrist().then(() => {
		// 			uni.stopPullDownRefresh()
		// 		})
		// 	}
		// },
		// 上拉加载更多
		onReachBottom() {
			if(this.more !== 'noMore') {
				this.more = 'loading';
				this.getSearchResult().then(res => {
							if(res.data.status){
								setTimeout(() => {
									let addlist = res.data.data.searchresult;
									this.star += 1;
									addlist.length === this.add ? this.more = 'more' :  this.more = 'noMore'
									this.searchResultArr.push(...addlist);
								}, 500)
							}
					})
			}
		},
		watch: {
			'inputValue':function(){
				// console.log(this.inputValue);
				this.showResult = false;
				this.searchAssArr = [];
				this.searchResultArr = '';
				// 用户输入停止0.5s进行联想
				if(this.inputValue !== '') {
					this.debounce(()=> {
						this.firstRequest('/last/search/getSearchAss','searchAssArr');
					},500)
				}
			}
		}
		
	}
</script>

<style>
	@import url("search.css");
</style>
