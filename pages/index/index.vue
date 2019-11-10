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
		<view class="themes">
			<block v-for="th in themeList" :key="th.id">
				<view class="themes-item">
					<text class="themes-item-title">{{th.title}}</text>
					<view class="themes-item-contents">
						<block v-for="co in th.content" :key="co.contentid">
							<view class="themes-item-content">
								<view class="themes-item-content-main" 
									:style="{ width:co.size === 0 ? 'calc(100vw - 60rpx)' : 'calc(50vw - 40rpx)' , marginBottom: co.name ? '50rpx':'' }">
									<image :src="co.picsrc" mode="" :class="co.size === 0 ? 'themes-item-content-big' : 'themes-item-content-small' "></image>
									<text class="themes-item-content-name" v-if="co.name">{{ co.name }}</text>
									<view class="themes-item-content-price">
										<text class="price-red" v-if="co.nprice">￥{{ co.nprice }}</text>
										<text class="price-grey" v-if="co.oprice">￥{{ co.oprice }}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import { request } from "../../request/request.js"
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
				request({
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