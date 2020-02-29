<template>
	<view class="page">
		<yun-refresh @isRefresh='isRefresh' ref="refresh">
			<yun-tab :tabs="tabs" :scrollTop="scrollTop" :bottomBarHeight="bottomBarHeight" @tabClick="tabClick" ref="tabs" >
				<template v-slot:0>
					<view class="none" v-if="my_courses.length === 0">
					  <image src="../../static/images/newBlank.png" alt="空结果" mode="widthFix"/>
					  <text class="nodata">未开始学习哦~</text>
					  <navigator url="/pages/index/index" hover-class="none" open-type="switchTab">
						  <button type="primary" class="none-btn" >去发现值得学习的课程</button>
					  </navigator>
					</view>
					<view v-else :style="{paddingBottom:bottomBarHeight + 'px'}">
							<view v-for="my in my_courses" :key="my.id">
							  <yun-box :image="my.picsrc" :title="my.name" :url=" '/pages/Coursedetails/Coursedetails?id=' + my.id">
								  <view class="yunBoxProg" v-if="my.overProgress != 0 && my.overProgress != ''">
									  <text class="yunBoxProgText">已学习{{my.overProgress}}/{{my.all}}课时</text>
									  <view class="yunBoxProgBar">
										  <view class="yunBoxProgBarOver" :style="{width:my.overProgress/my.all*444+'rpx' }"></view>
									  </view>
								  </view>
								  <view class="yunBoxBtn" v-else>开始学习</view>
							  </yun-box>
							</view>
							<!-- 加载更多 -->
							<uni-load-more :status="more_courses" iconType="circle" :iconSize="iconSize" :contentText="contentText"></uni-load-more>
							<!-- <view class="bottom">已经到达底部了亲</view> -->
			         </view>				
				</template>
				<template v-slot:1>
					<view class="none" v-if="my_microSpecialty.length === 0">
					  <image src="../../static/images/newBlank.png" alt="空结果" mode="widthFix"/>
					  <text class="nodata">未学习微专业哦~</text>
					  <button type="primary" class="none-btn" >去发现精彩微专业</button>
					</view>	  
					<view v-else :style="{paddingBottom:bottomBarHeight + 'px'}">
						<view v-for="my in my_microSpecialty" :key="my.id">
							<yun-box :image="my.picsrc" :title="my.name">
							</yun-box>
						</view>
						<!-- 加载更多 -->
						<uni-load-more :status="more_microSpecialty" iconType="circle" :iconSize="iconSize" :contentText="contentText"></uni-load-more>
						<!-- <view class="bottom">已经到达底部了亲</view> -->
					</view>
				</template>
			</yun-tab>
		</yun-refresh>
	</view>
</template>

<script>
	import { queryParams } from "@/utils/myMath.js"
	// let _initData = {};
	export default {
		data() {
			return {
				 add: 7,
				 my_courses:[],
				 more_courses:'more',
				 star_courses: 0,
				 
				 my_microSpecialty:[],
				 more_microSpecialty:'more',
				 star_microSpecialty: 0,
				 
				 tabs:['我的课程','我的微专业'],
				 tabs_status:0,
				 
				 scrollTop:0,
				 bottomBarHeight:0,
				 iconSize: 14,
				 contentText: {
					 contentdown: "上拉显示更多",
					 contentrefresh: "正在加载",
					 contentnomore: "已经到达底部了亲 ~",
				}
			}
		},
		computed:{
			isLogin(){
				return this.$store.getters['common/IsLogin']
			}
		},
		onLoad() {
			 // _initData = JSON.parse(JSON.stringify(this.$data));
			if(this.isLogin){
				this.firstRequest('/loco/assets/getMyCourses','my_courses');
			}else{
				this.$nextTick(() => {
					this.$refs.tabs.swiperHeight();
				})
			}
			// #ifndef MP-WEIXIN
				this.bottomBarHeight = 50
			// #endif
		},
		methods: {		
			tabClick(status){
				this.tabs_status = parseInt(status);
				// if(status == 1 && this.my_microSpecialty.length === 0){
				// 	 this.firstRequest('/getMyCourses','my_microSpecialty');
				// }
			},
			isRefresh(){
				setTimeout(() => {
					Object.assign(this.$data,this.$options.data());
					this.$refs.tabs.status = 0;
					this.firstRequest('/loco/assets/getMyCourses','my_courses').then( res => {
						this.$refs.refresh.endAfter() 
					})
				}, 500)
			},
			  //二次封装request
			 firstRequest(u,d,isFirst = true){
				let that = this,
					data = {
						size: that.add,
						current: that.tabs_status === 0 ? that.star_courses + 1 : that.star_microSpecialty + 1,
						sortType: 1 
					};
				u += queryParams(data,true);
				if(!isFirst){
					return that.$request({	url: u,	method: 'POST'})
				}else{
					return new Promise((resolve, reject) => {
						that.$request({
						   url: u,
						   method: 'POST',
						   showLoading: true
						  }).then(res => {
								if(res.data.status){
									res.data.data.length === this.add && this.tabs_status === 0 ? this.more_courses = 'more' :  this.more_courses = 'noMore';
									res.data.data.length === this.add && this.tabs_status === 1 ? this.more_microSpecialty = 'more' :  this.more_microSpecialty = 'noMore';
									that.$data[d] = res.data.data;
									that.$refs.tabs.swiperHeight();
									resolve(res);
								}
						});
					})
				}
			  }
		},
		onReachBottom() {
			if(this.more_courses !== 'noMore' && this.tabs_status === 0) {
				this.more_courses = 'loading';
				this.firstRequest('/getMyCourses','my_courses').then(res => {
							if(res.data.status){
								setTimeout(() => {
									let addlist = res.data.data;
									this.star_courses += 1;
									addlist.length === this.add ? this.more_courses = 'more' :  this.more_courses = 'noMore'
									this.my_courses.push(...addlist);
									this.$refs.tabs.swiperHeight();
								}, 500)
							}
					})
			}
			if(this.more_microSpecialty !== 'noMore' && this.tabs_status === 1) {
				console.log('add microSpecialty')
			}
		},
		onPageScroll(e) {
			this.scrollTop= e.scrollTop
		},
	}
</script>

<style>
	@import url("myCourse.css");
</style>
