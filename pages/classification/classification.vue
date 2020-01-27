<!-- classification -->
<template>
	<view class="page">
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
								<text :class=" item.id === nowSelect ? 'tab-item-active' : ''">{{ item.name }}</text>
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
					<yun-swiper :list="bodyClass.swipe"></yun-swiper>
					<!-- tips-->
					<view class="content-tips">
							<block v-for="tip in tabClass[nowSelect].children" :key="tip.id">
								<view class="content-tip">{{ tip.name }}</view>
							</block>
					</view>
					<!-- 分类 -->
					<yunThemes :themeList="bodyClass.classList"></yunThemes>
				</view>
				
			</template>
		</better-sticky>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabClass:[
					{
						id:0,
						name:"职场提升",
						children:[
							{id: 1, name: "办公软件"},
							{id: 2, name: "效率工具"},
							{id: 3, name: "电脑基础"},
							{id: 4, name: "Excel"},
							{id: 5, name: "职场能力"},
							{id: 6, name: "商业管理"},
							{id: 7, name: "专业岗位"},
						]
					},{
						id:1,
						name:"编程与开发",
						children:[
							{id: 1, name: "编程语言"},
							{id: 2, name: "前端开发"},
							{id: 3, name: "后端开发"},
							{id: 4, name: "移动开发"},
							{id: 5, name: "网络与安全"},
						]
					},{
						id:2,
						name:"AI/数据科学",
						children:[
							{id: 1, name: "编程语言"},
							{id: 2, name: "前端开发"},
							{id: 3, name: "后端开发"},
							{id: 4, name: "移动开发"},
							{id: 5, name: "网络与安全"},
						]
					},{
						id:3,
						name:"产品与运营",
						children:[
							{id: 1, name: "编程语言"},
							{id: 2, name: "前端开发"},
							{id: 3, name: "后端开发"},
							{id: 4, name: "移动开发"},
							{id: 5, name: "网络与安全"},
						]
					},{
						id:4,
						name:"设计创意",
						children:[
							{id: 1, name: "编程语言"},
							{id: 2, name: "前端开发"},
							{id: 3, name: "后端开发"},
							{id: 4, name: "移动开发"},
							{id: 5, name: "网络与安全"},
						]
					},{
						id:5,
						name:"电子商务",
						children:[
							{id: 1, name: "编程语言"},
							{id: 2, name: "前端开发"},
							{id: 3, name: "后端开发"},
							{id: 4, name: "移动开发"},
							{id: 5, name: "网络与安全"},
						]
					},{
						id:6,
						name:"语言学习",
						children:[
							{id: 1, name: "编程语言"},
							{id: 2, name: "前端开发"},
							{id: 3, name: "后端开发"},
							{id: 4, name: "移动开发"},
							{id: 5, name: "网络与安全"},
						]
					}
				],
				bodyClass:'',
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
			if (options.class){
				let id = parseInt(options.class);
				this.nowSelect = id;
			}
			this.firstRequest('/getClassification','bodyClass').then(() => {
				this.initDone = true
			})
			this.$nextTick(() => {
				uni.createSelectorQuery().in(this).select('.header').boundingClientRect((res) => {
					if (res) {
						this.initTop = res.height
						console.log(this.initTop)
					}
				}).exec();
				this.getLeft();
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
						let nowSelect = that.nowSelect;
						console.log(nowSelect)
						that.$request({
						   url: u,
						   method: 'GET',
						   data:{
							   select: nowSelect,
						   }
						  }).then(res => {
								if(res.data.status === '200'){
									that.$data[d] = res.data.data;
									resolve();
								}
						});
				})
			},
			//tab条选中居中
			tabMid(id){
				this.$nextTick( () => { 
					let that = this;
					//改变页面标题名字
					let title =  that.tabClass.filter( i => i.id === that.nowSelect)[0].name;
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
					  data.forEach(function(arr,index){
						  if(index < id)
							distance += arr.width;
						});
						//偏移量 = 节点到srcoll-view起点长度 - 屏幕宽度/2 + 节点长度/2
					  that.scrollLeft = distance - that.$ww/2 + data[id].width/2;
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
				this.tabMid(this.nowSelect);
				this.firstRequest('/getClassification','bodyClass');
			}
		}
	}
</script>

<style>
	@import url("classification.css");
</style>
