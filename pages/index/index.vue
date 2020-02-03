<template>
	<view class="page">
		<!-- header -->
		<yun-header></yun-header>
		<!-- swiper -->
		<yun-swiper :list="swiperList"></yun-swiper>
		<!-- classify -->
		<view class="classify">
			<view class="classify-content">
					<block v-for="cl in classList" :key="cl.id">
						 <navigator :url="navigatorUrl(cl.id, cl.url)" hover-class="none" class="class">
							<image  :src="cl.picsrc"
									:style="{opacity: showNum === allShowNum ? '1': '0'}"
									@load="showAdd"
							></image>
							<text>{{ cl.titile }}</text>
						</navigator>
					</block>
			</view>
		</view>
		<!-- theme -->
		<yunThemes :themeList="themeList"></yunThemes>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				classList:[],
				themeList:[],
				
				showNum: 0,
			}
		},
		computed:{
			navigatorUrl(){
				return (id,url) => {
					if(id === 0){
						
					}else{
						return `/pages/classification/classification?class=${url - 1}`
					}
				}
			},
			allShowNum(){
				return this.classList.length;
			},
		},
		methods: {
			showAdd(){
				this.showNum += 1;
			},
			AllfirstRequest(){
				return Promise.all([
						this.firstRequest('/getSwiperPic','swiperList'), 
						this.firstRequest('/getClassList','classList'), 
						this.firstRequest('/getTheme','themeList')
					]).then(res => {
						res[1].forEach(item => {
							item.show = false;
						});
					})
			},
			//二次封装request
			firstRequest(u,d){
				let that = this;
				return new Promise((resolve, reject) => {
					that.$request({
					   url: u,
					   method: 'GET',
					  }).then(res => {
							if(res.data.status === '200'){
								that[d] = res.data.data;
								resolve(res.data.data);
							}
					});
				})
			},
		},
		onLoad() {
			this.AllfirstRequest();
		},
		onPullDownRefresh() {
			// this.swiperList = this.classList = this.themeList = []
			setTimeout(() => {
				this.AllfirstRequest().then( res => {
					uni.stopPullDownRefresh();
				})
			},500)
			
		}
	}
</script>

<style>
	@import url("index.css");
</style>