<!-- classification -->
<template>
	<view class="page xBottom">
		<!-- header -->
		<view class="header">
			<yun-header></yun-header>
		</view>
		<better-sticky :scrollTop="scrollTop" :initTop="initTop" :initDone="initDone">
			<!-- tab -->
			<template v-slot:header>
				<scroll-view scroll-x="true" show-scrollbar="false" :scroll-left="scrollLeft" class="scrollTab">
					<view class="tab-items">
						<block v-for="item in tabClass" :key="item.id">
							<view class="tab-item" @click="chooseItem(item.id)">
								<text :class=" item.id === nowSelect ? 'tab-item-active' : ''">{{ item.titile }}</text>
							</view>
						</block>
					</view>
					<view class="line"
						:style="{background: lineColor,width: lineStyle.width || 0, transform: lineStyle.transform,transitionDuration: lineStyle.transitionDuration}">
					</view>
				</scroll-view>
			</template>
			<!-- 内容 -->
			<template v-slot:content>
				<!-- 轮播图 -->
				<view > <!-- :style="{height: bodyClass === '' ? '100000px':''}" -->
					<yun-swiper :list="swiperList"></yun-swiper>
					<!-- tips-->
					<view class="content-tips" v-if="tabClass.length > 0">
							<block v-for="tip in tabClass[nowSelect - 1].children" :key="tip.id">
								<view class="content-tip">{{ tip.name }}</view>
							</block>
					</view>
					<!-- 分类 -->
					<yunThemes :themeList="bodyClass"></yunThemes>
				</view>
				
			</template>
		</better-sticky>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabClass:[],
				swiperList:[],
				bodyClass:[],
				nowSelect:0,
				duration: 0.3,
				lineStyle: {},
				lineColor: '#2CC17B',
				scrollLeft:0,
				
				scrollTop:0,
				initTop:0,
				initDone:false,
			}
		},
		onLoad(options) {
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			if (options.class){
				let id = options.class;
				this.nowSelect = id;
			}
			Promise.all([
				this.firstRequest('/loco/index/getClassList','tabClass'),
				this.firstRequest('/loco/index/advList','swiperList'),
				this.firstRequest('/loco/index/list','bodyClass')
			]).then(() => {
				uni.hideLoading()
				this.initDone = true
				this.tabMid(this.nowSelect);
				this.$nextTick(() => {
					uni.createSelectorQuery().in(this).select('.header').boundingClientRect((res) => {
						if (res) {
							this.initTop = res.height
							// console.log(this.initTop)
						}
					}).exec();
				});
			})
			
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
		methods: {
			//点击tab选中项目
			chooseItem(id){
				this.nowSelect = id;
			},
			//二次封装request
			firstRequest(u,d){
				let that = this;
				return new Promise((resolve, reject) => {
						let categoryId1 = that.nowSelect;
						that.$request({
						   url: u,
						   method: 'GET',
						   data:{
							   categoryId1,
							   plat: 1
						   },
						   // showLoading: true
						  }).then(res => {
								if(res.data.status){
									that.$data[d] = res.data.data;
									resolve();
								}
						});
				})
			},
			//tab条选中居中
			tabMid(id){
				id --;
				this.$nextTick( () => { 
					let that = this;
					//改变页面标题名字
					let title =  that.tabClass.filter( i => i.id === that.nowSelect)[0].titile;
					uni.setNavigationBarTitle({
					　　title: title
					})
					//设置srcoll-view srcollTop值
					const item = uni.createSelectorQuery().selectAll('.tab-item');
					item.fields({
					  size: true,
					  scrollOffset: true
					}, data => {
					  // console.log("得到节点信息" + JSON.stringify(data));
					  let distance = 0;
					  data.forEach((arr,index) => {
						  if(index < id) 
							distance += arr.width;
						});
						//偏移量 = 节点到srcoll-view起点长度 - 屏幕宽度/2 + 节点长度/2
					  that.scrollLeft = distance - that.GlobalData.$windowWidth/2 + data[id].width/2;
					  that.getLeft()
					}).exec();
				})
			},
			getLeft(){
				this.$nextTick( () => {
					let scrollLeft = 0;
					uni.createSelectorQuery().in(this).select('.scrollTab').scrollOffset().exec((res) => {
						scrollLeft = res[0].scrollLeft
					})
					uni.createSelectorQuery().in(this).select('.tab-item-active').boundingClientRect().exec((res) => {
						const left = scrollLeft + res[0].left + res[0].width / 2
						this.lineStyle = {
							width: `${res[0].width}px`,
							transform: `translateX(${left}px) translateX(-50%)`,
							transitionDuration: `${this.duration}s`
						};
					});
				})
			 },	
		},
		watch:{
			'nowSelect'(){
				if(this.tabClass.length + this.bodyClass.length + this.swiperList.length > 0 ){
					uni.showLoading({
						title: '加载中',
						mask: true
					})
					this.tabMid(this.nowSelect);
					Promise.all([
						this.firstRequest('/loco/index/list','bodyClass'),
						this.firstRequest('/loco/index/advList','swiperList')
					]).then(res => {
						uni.hideLoading()
					})
					
				}
			}
		}
	}
</script>

<style>
	@import url("classification.css");
</style>
