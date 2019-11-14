<!-- classification -->
<template>
	<view class="page">
		<!-- header -->
		<yun-header></yun-header>
		<better-sticky :scrollTop="scrollTop">
			<!-- tab -->
			<template v-slot:header>
				<scroll-view scroll-x="true" show-scrollbar="false" :scroll-left="scrollLeft">
					<view class="tab-items">
						<block v-for="item in tabClass" :key="item.id">
							<view class="tab-item" @click="chooseItem(item.id)">
								<text :class=" item.id === nowSelect ? 'tab-item-active' : ''">{{ item.name }}</text>
							</view>
						</block>
					</view>
				</scroll-view>
			</template>
			<!-- 内容 -->
			<template v-slot:content>
				<!-- 轮播图 -->
				<!-- tips-->
				<!-- 分类 -->
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
						name:"职场提升"
					},{
						id:1,
						name:"编程与开发"
					},{
						id:2,
						name:"AI/数据科学"
					},{
						id:3,
						name:"产品与运营"
					},{
						id:4,
						name:"设计创意"
					},{
						id:5,
						name:"电子商务"
					},{
						id:6,
						name:"语言学习"
					}
				],
				nowSelect:0,
				scrollLeft:0,
				
				scrollTop:0
			}
		},
		onLoad(options) {
			if (options.class){
				let id = parseInt(options.class);
				this.nowSelect = id;
			}
		},
		onReady() {
			this.tabMid(this.nowSelect);
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
		methods: {
			chooseItem:function(id){
				this.nowSelect = id;
			},
			firstRequest:function(that,u,d){
					let nowSelect = that.nowSelect;
					that.$request({
					   url: u,
					   method: 'GET',
					   data:{
						   select: nowSelect,
					   }
					  }).then(res => {
							if(res.data.status === '200'){
								console.log(res.data)
								that.$data[d] = res.data.data;
							}
					});
			},
			tabMid:function(id){
				let that = this;
				let item = uni.createSelectorQuery().selectAll('.tab-item');
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
				  that.scrollLeft = distance - that.$ww/2 + data[id].width/2
				}).exec();
			}
		},
		watch:{
			'nowSelect':function(){
				this.tabMid(this.nowSelect);
			}
		}
	}
</script>

<style>
	@import url("classification.css");
</style>
