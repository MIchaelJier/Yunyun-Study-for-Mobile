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
						 <navigator :url="'/pages/classification/classification?class='+cl.url" hover-class="none" class="class">
							<image  :src="cl.picsrc"></image>
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
				themeList:[]
			}
		},
		onLoad() {
			let that = this;
			that.firstRequest('/getSwiperPic','swiperList');
			that.firstRequest('/getClassList','classList');
			that.firstRequest('/getTheme','themeList');
		},
		methods: {
			//二次封装request
			firstRequest(u,d){
				let that = this;
				return new Promise((resolve, reject) => {
					that.$request({
					   url: u,
					   method: 'GET',
					  }).then(res => {
							if(res.data.status === '200'){
								that.$data[d] = res.data.data;
								resolve();
							}
					});
				})
			},
		}
	}
</script>

<style>
	@import url("index.css");
</style>