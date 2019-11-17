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
			that.firstRequest(that,'/getSwiperPic','swiperList');
			that.firstRequest(that,'/getClassList','classList');
			that.firstRequest(that,'/getTheme','themeList');
		},
		methods: {
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
		}
	}
</script>

<style>
	@import url("index.css");
</style>