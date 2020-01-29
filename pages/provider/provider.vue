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
		<view class="goodCourseInfo">
			<yunThemes :themeList="goodCourseList" 
					   :boldTitle="false" 
					   :haveBottom="false">
			</yunThemes>
		</view>
		<view class="moreCourse">查看全部课程</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodCourseList:[
    {
      "id": 1,
      "title": "实战前端课程",
      "content": [
        {
          "contentid": 1,
          "size": 1,
          "picsrc": "https://edu-image.nosdn.127.net/a63f9726e91e4ab0945dd56664e55255.jpg?imageView&quality=100&crop=0_0_1190_668&thumbnail=340y191",
          "name": "使用Vue.js制作拼多多购物类APP",
		  "star":"4.7",
		  "learnNum":409,
          "oprice": "299.00",
          "nprice": "169.00"
        },
        {
          "contentid": 2,
          "size": 1,
          "picsrc": "https://edu-image.nosdn.127.net/57918425c1c842aab9bd0b74cc749f63.jpg?imageView&quality=100&crop=0_0_1190_671&thumbnail=340y191",
          "name": "使用Vue.js制作爱奇艺视频类App",
		  "star":"4.9",
		  "learnNum":391,
          "oprice": "299.00",
          "nprice": "169.00"
        },
        {
          "contentid": 3,
          "size": 1,
          "picsrc": "https://edu-image.nosdn.127.net/3ab5193047084308b157266fac019b03.jpg?imageView&quality=100&crop=0_0_904_509&thumbnail=340y191",
          "name": "使用Vue.js制作今日头条新闻App",
		  "star":"4.9",
		  "learnNum":298,
          "oprice": "299.00",
          "nprice": "169.00"
        },
        {
          "contentid": 4,
          "size": 1,
          "picsrc": "https://edu-image.nosdn.127.net/b48a753b402e4d70bdd6fdd7596842a4.jpg?imageView&quality=100&crop=0_0_1190_671&thumbnail=340y191",
          "name": "使用Vue.js制作云音乐跨平台APP",
		  "star":"4.9",
		  "learnNum":438,
          "oprice": "599.00",
          "nprice": "169.00"
        }
      ]
    },
	{
		"id": 2,
		"title": "实战数据课程",
		"content": [
		  {
		    "contentid": 5,
		    "size": 2,
		    "picsrc": "https://edu-image.nosdn.127.net/76f81ba9e4984f1a909ebbd074599466.jpg?imageView&quality=100&crop=0_0_439_247&thumbnail=220y138",
		    "name": "2019全新电商数据分析实战教程",
			"star":"4.7",
			"learnNum":409,
			"chapterNum":88,
		    "oprice": "299.00",
		    "nprice": "169.00"
		  },
		  {
		    "contentid": 6,
		    "size": 2,
		    "picsrc": "https://edu-image.nosdn.127.net/76f81ba9e4984f1a909ebbd074599466.jpg?imageView&quality=100&crop=0_0_439_247&thumbnail=220y138",
		    "name": "2019全新电商数据分析实战教程",
		  			"star":"4.7",
		  			"learnNum":409,
		  			"chapterNum":88,
		    "oprice": "299.00",
		    "nprice": "169.00"
		  },
		  {
		    "contentid": 7,
		    "size": 2,
		    "picsrc": "https://edu-image.nosdn.127.net/76f81ba9e4984f1a909ebbd074599466.jpg?imageView&quality=100&crop=0_0_439_247&thumbnail=220y138",
		    "name": "2019全新电商数据分析实战教程",
		  			"star":"4.7",
		  			"learnNum":409,
		  			"chapterNum":88,
		    "oprice": "299.00",
		    "nprice": "169.00"
		  }
		]
	}
      ]
			}
		},
		methods: {
			
		},
		onLoad() {
			
		}
	}
</script>

<style>
	@import url("provider.css");
</style>
