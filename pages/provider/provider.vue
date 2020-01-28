<template>
	<view class="page">
		<view class="mainInfo">
			<view class="mainInfo-up">
				<view class="up-left">
					<image src="https://edu-image.nosdn.127.net/F5F5BDFDD00769E2E74262D0A0D36373.png?imageView&quality=100&thumbnail=600y600" 
						   mode=""
						   class="left-logo"></image>
					<view class="left-name">
						<text  style="font-size: 13px">锐亚教育</text>
						<text class="gray">北京锐亚科技游戏公司</text>
					</view>
				</view>
				<view class="up-right">
					<text style="font-size: 14px">1231</text>
					<text class="gray">学员</text>
				</view>
			</view>
			<view class="mainInfo-bottom">
				<view class="bottom-warp">
					<swiper indicator-dots 
							autoplay
							class="warp-swiper">
                        <swiper-item>
                           <image src="https://edu-image.nosdn.127.net/61ec0ec4ece84f28acf8be1109937042.jpg?imageView&quality=100&thumbnail=1053y483" 
								  mode="scaleToFill"
								  class="warp-image"></image>
                        </swiper-item>
                    </swiper>
				</view>
			</view>
		</view>
		<navigator url="/pages/Coursedetails/Coursedetails">
			go to Coursedetails
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// originalIndex:0
			}
		},
		methods: {
			
		},
		// onShow() {
		// 	this.$router.options.routes.forEach(item => {
		// 		if(item.meta.pagePath === 'pages/Coursedetails/Coursedetails') {
		// 			this.originalIndex = item.meta.pageIndex
		// 			item.meta.pageIndex = 100;
		// 		}
		// 	});
		// },
		// onHide() {
		// 	this.$router.options.routes.forEach(item => {
		// 		if(item.meta.pagePath === 'pages/Coursedetails/Coursedetails') {
		// 			item.meta.pageIndex = this.originalIndex;
		// 		}
		// 	})
		// }
	}
</script>

<style>
	@import url("provider.css");
</style>
