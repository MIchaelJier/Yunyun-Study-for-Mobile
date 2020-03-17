<template>
	<view class="page">
			<yun-refresh @isRefresh='isRefresh' ref="refresh">
				<!-- header -->
				<yun-header></yun-header>
				<!-- swiper -->
				<yun-swiper :list="swiperList"></yun-swiper>
				<!-- classify -->
				<view class="classify">
					<view class="classify-content">
							<block v-for="cl in classList" :key="cl.id">
								 <navigator :url="navigatorUrl(cl.id, cl.url)" hover-class="none" class="class">
									<!-- <image  :src="cl.picsrc"
											:style="{opacity: cl.show ? '1': '0'}"
											@load="showitem(cl.id)"
									></image> -->
									<view class="classimage">
										<yun-image :src="cl.picsrc" radius="50%"></yun-image>
									</view>
									<text>{{ cl.titile }}</text>
								</navigator>
							</block>
					</view>
				</view>
				<!-- theme -->
				<yunThemes :themeList="themeList"></yunThemes>
			</yun-refresh>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				classList:[],
				themeList:[],
				
				scrollTop: 0 
			}
		},
		computed:{
			navigatorUrl(){
				return (id,url) => {
					if(id === 0){
						
					}else{
						return `/pages/classification/classification?class=${url}`
					}
				}
			},
			isLogin(){
				return this.$store.getters['common/IsLogin']
			}
		},
		methods: {
			AllfirstRequest(){
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				return Promise.all([
						this.firstRequest('/last/index/advList','swiperList'), 
						this.firstRequest('/last/index/getClassList','classList'), 
						this.firstRequest('/last/index/list','themeList')
					]).then(res => {
						uni.hideLoading()
						return res
					})
			},
			//二次封装request
			firstRequest(u,d){
				let that = this;
				return new Promise((resolve, reject) => {
					that.$request({
					   url: u,
					   method: 'GET',
					   data:{
						   plat:1
					   }
					  }).then(res => {
							if(res.data.status){
								that[d] = res.data.data;
								resolve(res.data.data);
							}
					});
				})
			},
			isRefresh(){
				setTimeout(() => {
					this.AllfirstRequest().then( res => {
						this.$refs.refresh.endAfter() 
					})
				}, 500)
			}
		},
		onLoad() {
			this.AllfirstRequest();		
		},
		// onPullDownRefresh() {
		// 	// this.swiperList = this.classList = this.themeList = []
		// 	setTimeout(() => {
		// 		this.AllfirstRequest().then( res => {
		// 			uni.stopPullDownRefresh();
		// 		})
		// 	},500)
		// }
		watch:{
			isLogin(){
				this.AllfirstRequest();		
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>