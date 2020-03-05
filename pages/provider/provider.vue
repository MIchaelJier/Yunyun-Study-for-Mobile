<template>
	<view class="page xBottom">
		<view class="mainInfo">
			<view class="mainInfo-up">
				<view class="up-left">
					<image :src="providerInfo.logoSrc" 
						   mode=""
						   class="left-logo"></image>
					<view class="left-name">
						<text  style="font-size: 13px">{{ providerInfo.providername }}</text>
						<text class="gray">{{  providerInfo.companyName }}</text>
					</view>
				</view>
				<view class="up-right">
					<text style="font-size: 14px">{{ providerInfo.studentNum }}</text>
					<text class="gray">学员</text>
				</view>
			</view>
			<view class="mainInfo-bottom">
				<view class="bottom-warp">
					<yun-swiper :list="swiperList" height="322rpx" width="702rpx" radius="10r"></yun-swiper>
					<!-- <swiper indicator-dots autoplay indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff" 
							interval="3000" duration="1000" class="warp-swiper">
							<swiper-item v-for="item in swiperList" :key="item.id">
								<image :src="item.picsrc" 
								  mode="scaleToFill"
								  class="warp-image"></image>
							</swiper-item>
                    </swiper> -->
				</view>
			</view>
			
		</view>
		<view class="goodCourseInfo">
			<yunThemes :themeList="goodCourseList" 
					   :boldTitle="false" 
					   :haveBottom="false">
			</yunThemes>
		</view>
		<navigator :url="'/pages/allCourse/allCourse?id=' + providerId">
			<view class="moreCourse">查看全部课程</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerId:'',
				providerInfo:{},
				swiperList:[],
				goodCourseList:[]
			}
		},
		methods: {
			AllfirstRequest(){
				return Promise.all([
						this.firstRequest('/getGoodCourseList','goodCourseList'),
						this.firstRequest('/getProviderSwiperList','swiperList'),
						this.firstRequest('/getproviderInfo','providerInfo'),
					]);
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
		onLoad(options) {
			this.providerId = options.ownerId;
			this.AllfirstRequest().then(res => {
				uni.setNavigationBarTitle({
				　　title: res[2].providername
				})
			})
		}
	}
</script>

<style>
	@import url("provider.css");
</style>
