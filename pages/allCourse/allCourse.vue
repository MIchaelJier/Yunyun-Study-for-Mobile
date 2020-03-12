<template>
	<view class="pagex Bottom">
		<yun-tab :tabs="tabs"
				 :scrollTop="scrollTop" 
				 @tabClick="tabClick" 
				 ref="tabs" 
				 >
			<!-- 畅销 开始 -->
			<template v-slot:0>
				<course-list reqUrl="/last/search/getSearchResult" 
							:providerId="providerId" 
							reqType="2"
							@afterReq="swiperHeight()"  
							ref="popular">
				</course-list>
			</template>
			<!-- 畅销 结束-->
			<!-- 好评 开始 -->			
			<template v-slot:1>
				<course-list reqUrl="/last/search/getSearchResult" 
							:providerId="providerId"
							reqType="1"
							 @afterReq="swiperHeight()"  
							 ref="praised">
				 </course-list>
			</template>
			<!-- 好评 结束 -->			
			<!-- 最新 开始 -->			
			<template v-slot:2>
				<course-list reqUrl="/last/search/getSearchResult" 
							:providerId="providerId" 
							reqType="3"
							@afterReq="swiperHeight()"  
							ref="newest">
				</course-list>
			</template>
			<!-- 最新 结束 -->
		</yun-tab>
	</view>
</template>

<script>
	import courseList from './courseList.vue';
	export default {
		data() {
			return {
				scrollTop:0,
				tabs:['畅销','好评','最新'],
				
				providerId:'',
			}
		},
		components: {
			courseList
		},
		methods: {
			tabClick(status){
				if(status == 1 && this.$refs.praised.list.length === 0){
					//加载好评
					this.$refs.praised.listRequest(0);
				}
				if(status == 2 && this.$refs.newest.list.length === 0){
					//加载最新
					this.$refs.newest.listRequest(0);
				}
			},
			swiperHeight(){
				this.$refs.tabs.swiperHeight();
			}
		},
		onLoad(options) {
			this.providerId = options.id;
			this.$nextTick(() => {
				this.$refs.popular.listRequest(0);
			})
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		},
		onReachBottom() {
			const refs = this.$refs,
				  status = refs.tabs.status;
			if(status == 0 && refs.popular.more === 'more'){
				refs.popular.listRequest(1);
			}
			if(status == 1 && refs.praised.more === 'more'){
				refs.praised.listRequest(1);
			}
			if(status == 2 && refs.newest.more === 'more'){
				refs.newest.listRequest(1);
			}
		}
	}
</script>

<style>
</style>
