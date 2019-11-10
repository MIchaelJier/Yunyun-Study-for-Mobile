<template>
	<view class="page">
		<view class="titleBar">
		  <ul class="status">
		    <li>
		      <text :class=" status == '1' ? 'active':'' " @click="showStatus" data-status="1">我的课程</text>
		    </li>
		    <li>
		      <text :class=" status == '2' ? 'active':''" @click="showStatus" data-status="2">我的微专业</text>
		    </li>
		  </ul>
		</view>
		<scroll-view class="lists" scroll-y>
		        <block v-if="status == '1'">
		          <view class="none" v-if="my_courses.length < 1">
		            <image src="../../static/newBlank.png" alt="空结果" mode="widthFix"/>
		            <text class="nodata">未开始学习哦~</text>
		            <button type="primary" class="none-btn" >去发现值得学习的课程</button>
		          </view>
		
		          <view v-else>
		            <!-- <view v-for="my in my_courses" v-key="index">
		              <myCourse-module image="{{item.headImg}}" title="{{item.title}}" cid="{{item.id}}"></myCourse-module>
		            </view> -->
		            <view class="bottom">已经到达底部了亲</view>
		          </view>
		        </block>
		        <block v-else>
		          <view class="none" v-if="my_microSpecialty.length<1">
		            <image src="../../static/newBlank.png" alt="空结果" mode="widthFix"/>
		            <text class="nodata">未学习微专业哦~</text>
		            <button type="primary" class="none-btn" >去发现精彩微专业</button>
		          </view>	          
		        </block>
		      <!-- <view class="item" v-key="index" v-for="my_coursesId" >
		        <view class="content">      
		          <text class="title">{{item.text}}</text>
		        </view>  
		      </view> -->
		  </scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 my_courses:[],
				 my_microSpecialty:[],
				 status:1 
			}
		},
		onLoad() {
			
		},
		methods: {
			 showStatus: function(e){
			    let status = e.currentTarget.dataset.status;
				this.status = status
			  },
		}
	}
</script>

<style>
	@import url("myCourse.css");
</style>
