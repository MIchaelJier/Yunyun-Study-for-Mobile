<template>
	<view class="page">
		<!-- 视频 开始 -->
		<view class="player">
			<video 
				src="" 
				poster="https://edu-image.nosdn.127.net/a12090ea-6978-4e7a-bb7c-f7294094ab94.png?imageView&quality=100&crop=0_0_879_495&thumbnail=336y190"
				controls></video>
		</view>
		<!-- 视频 结束 -->
		<yun-tab :tabs="tabs" :scrollTop="scrollTop">
			<template v-slot:0>
				<view class="courseintrohead">
					<view class="courseintrohead-title">
						<view class="title-name text-balck">
							来自福布斯精英的25节金融思维课
						</view>
						<view class="title-other">
							<view class="title-other-star">
								<uni-rate :value="4.7" :size="17" disabled="true"></uni-rate>
							</view>
							<text class="text-grey">4.7分</text>
							<text class="text-grey title-other-full">3515人在学</text>
							<view class="title-other-tip">独家</view>
						</view>
					</view>
					<view class="courseintrohead-price">
						<view class="priceMain">
							<view class="nprice">
								<text class="yuan">¥</text>
								99.00
							</view>
							<view class="nprice-tip">特价仅剩10天9小时31分钟</view>
						</view>
						<view class="oprice text-grey">¥199.00</view>
					</view>
				</view>
				<view class="contentbox">
					<view class="youhuicontent">
						<view class="ux-ykt-icon-youhui youhui-tip"></view>
						<text class="youhui-full">减￥20</text>
						<view class="ux-ykt-icon-right-arrow youhui-arrow"></view>
					</view>
				</view>
				<view class="courseintro contentbox">
					<view class="courseintrobody">
						<view class="courseintrobody-title">课程介绍</view>
						<view class="courseintrobody-main text-grey">
							<!-- 富文本 nnodes属性为String -->
							<rich-text :nodes="intro"></rich-text>
						</view>
					</view>
					<view class="courseprovider">
						<uni-list>
						    <uni-list-item title="文豪金融" 
										   note="3512位学员"
										   thumb="https://edu-image.nosdn.127.net/f397a3c1-bb3c-43f6-a49b-c5527b061c59.png?imageView&quality=100&thumbnail=80y80" 
										   :show-badge="true"
										   badgeType="default"
										   badge-text="进入网校"
										   ></uni-list-item>
									
						</uni-list>
					</view>
					<view class="courseteacher">
						<view class="courseintrobody-title">讲师</view>
						<view class="courseteacher-main">
								<view class="courseteacher-main-top">
									<image class="top-headpic" src="https://edu-image.nosdn.127.net/eed99132-996e-4c26-b839-02d6220ae50d.jpg?imageView&quality=100&thumbnail=48x48&type=webp"></image>
									<text class="top-name">Michael</text>
								</view>
								<view class="courseteacher-main-detail">
									<text class="text-grey">2017年福布斯精英（30岁以下创业精英榜），纽约大学商学院毕业，剑桥大学商学院MBA，华尔街投行分析师，文豪金融创始人。希望将通俗易懂的金融和理财知识带给大家！</text>
								</view>
						</view>
					</view>
				</view>
			</template>
			<template v-slot:1>1</template>
			<template v-slot:2>2</template>
		</yun-tab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop:0,
				
				tabs:['简介','目录','评价'],
				intro:`25节听得懂的金融思维课 ，零基础，人人用得上！<br/>
							帮你快速入门金融学，建立财富观，开启有收益的人生！<br/>
							<br/>
							【为什么学这门课？】<br/>
							生活中听不懂新闻里金融名词？——这门课帮助你了解金融概念，摸清金融脉络<br/>
							年轻人没建立起财富观不知道怎样开始？——课程帮助你培养金融思维与自我财富意识<br/>
							普通人不知如何开启个人投资之路？——这里会讲金融投资那些事儿，帮助你玩转个人投资<br/>
							职场人要做管理层或创业但不了解相关知识？——这里有用得上的公司决策，帮你看清趋势<br/>
							<br/>
							【讲师介绍】<br/>
							文豪 福布斯精英（30岁以下创业精英榜）  <br/>
							纽约大学商学院毕业 剑桥大学商学院MBA<br/>
							华尔街投行分析师 文豪金融创始人 <br/>
							<br/>
							【课程包括】<br/>
							25堂精品课（包括视频版和音频版！） 永久观看 不限次数！<br/>
							涵盖金融思维、金融工具、个人投资、公司决策、未来趋势5大章节<br/>
							25个通俗易懂的金融案例切入及评析<br/>
							每节一个练习思考，帮助你实操锻炼<br/>
							N+关于提升金融思维的点拨！<br/>
							<br/>
							【价格说明】<br/>
							原价199，限时特价！越早加入越划算！<br/>
							<br/>
							【加群交流】<br/>
							助教微信：18801076695 ，加入文豪金融群，每周一次金融解读，不定期彩蛋，文豪老师也在，一起交流！<br/>
							<br/>
							<img src="https://edu-image.nosdn.127.net/b67e7cf6-7362-4f11-8a6c-7e30b3ddbfac.jpg?imageView&amp;quality=100&amp;type=webp" data-src="//edu-image.nosdn.127.net/b67e7cf6-7362-4f11-8a6c-7e30b3ddbfac.jpg?imageView&amp;quality=100&amp;type=webp" class="intro-img" id="auto-id-1574235103679" style="width: 100%;">`
			}
		},
		methods: {
			
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
	}
</script>

<style>
	@import url("Coursedetails.css");
</style>
