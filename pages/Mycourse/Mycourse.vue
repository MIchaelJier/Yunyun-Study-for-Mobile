<template>
	<view class="page">
		<yun-tab :tabs="tabs" :scrollTop="scrollTop" :bottomBarHeight="bottomBarHeight" ref="tabs">
			<template v-slot:0>
				<view class="none" v-if="my_courses.length < 1">
				  <image src="../../static/images/newBlank.png" alt="空结果" mode="widthFix"/>
				  <text class="nodata">未开始学习哦~</text>
				  <button type="primary" class="none-btn" >去发现值得学习的课程</button>
				</view>
				<view v-else>
						<view v-for="my in my_courses" :key="my.id">
						  <yun-box :image="my.picsrc" :title="my.name">
							  <view class="yunBoxProg" v-if="my.overProgress != 0 && my.overProgress != ''">
								  <text class="yunBoxProgText">已学习{{my.overProgress}}/{{my.all}}课时</text>
								  <view class="yunBoxProgBar">
									  <view class="yunBoxProgBarOver" :style="{width:my.overProgress/my.all*444+'rpx' }"></view>
								  </view>
							  </view>
							  <view class="yunBoxBtn" v-else>开始学习</view>
						  </yun-box>
						</view>
						<view class="bottom">已经到达底部了亲</view>
		         </view>				
			</template>
			<template v-slot:1>
				<view class="none" v-if="my_microSpecialty.length<1">
				  <image src="../../static/images/newBlank.png" alt="空结果" mode="widthFix"/>
				  <text class="nodata">未学习微专业哦~</text>
				  <button type="primary" class="none-btn" >去发现精彩微专业</button>
				</view>	  
				<view v-else>
					<view v-for="my in my_microSpecialty" :key="my.id">
						<yun-box :image="my.picsrc" :title="my.name">
						</yun-box>
					</view>
				  <view class="bottom">已经到达底部了亲</view>
				</view>
			</template>
		</yun-tab>
		<view class="lists">
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 my_courses:[],
				 my_microSpecialty:[],
				 
				 tabs:['我的课程','我的微专业'],
				 scrollTop:0,
				 bottomBarHeight:0,
			}
		},
		onLoad() {
			let that = this;
			that.firstRequest('/getMyCourses','my_courses');
			// #ifdef APP-PLUS
				that.bottomBarHeight = 50
			// #endif
			// that.firstRequest(that,'/getMyCourses','my_microSpecialty');
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
								this.$refs.tabs.swiperHeight();
								resolve();
							}
					});
				})
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
