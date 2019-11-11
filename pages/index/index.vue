<template>
	<view class="page">
		<!-- header -->
		<yun-header></yun-header>
		<!-- swiper -->
		<swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000" :duration="1000" class="swiperBox">
			<swiper-item v-for="sw in swiperList" :key="sw.id">
				<image :src="sw.picsrc" class="swiperImage"></image>
			</swiper-item>
		</swiper>
		<!-- classify -->
		<view class="classify">
			<view class="classify-content">
					<block v-for="cl in classList" :key="cl.id">
						<view class="class">
							<image  :src="cl.picsrc"></image>
							<text>{{ cl.titile }}</text>
						</view>
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
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>