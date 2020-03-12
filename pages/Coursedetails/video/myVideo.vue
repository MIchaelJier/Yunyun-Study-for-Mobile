<template>
		<video
			:src="mySrc" 
			:poster="myPoster"
			@timeupdate="timecontrol"
			@pause="updateLearnTime"
			@ended="updateLearnTime"
			controls
			enable-danmu danmu-btn :danmu-list="danmuList"
			class="video"
			id="myVideo"
		>
			<!-- 注意 App端不支持 cover-view的嵌套使用 -->
			<!-- #ifndef APP-PLUS -->
				<cover-view class="video-control">
					<cover-view class="multi rate" @tap="showSwitchRate">x {{ currentRate }}</cover-view>
				</cover-view>
				<cover-view class="multi-list rate" :class="{ active: rateShow }">
					<cover-view
						v-for="(item, index) in ['0.5', '0.8', '1.0', '1.25', '1.5']"
						:key="index"
						class="multi-item rate"
						:data-rate="item"
						@tap="switchRate"
						:class="{ active: item == currentRate }"
					>
						{{ item }}
					</cover-view>
				</cover-view>
			<!-- #endif -->
			
			<!-- #ifdef APP-PLUS -->
				<cover-view class="video-control multi rate"  @tap="showSubNvue">
					x {{ currentRate }}
				</cover-view>
			<!-- #endif -->
		</video>
</template>

<script>
	import { formatSeconds } from "@/utils/timeFormat.js"
	import { queryParams } from "@/utils/myMath.js"
	export default {
		data() {
			return {
				currentTime:0,
				videoContext: '',
				controlShow: false,
				rateShow: false,
				currentRate: 1.0,
				danmuList: [{
                    text: '第 1s 出现的弹幕',
                    color: '#ff0000',
                    time: 1
                },
                {
                    text: '第 3s 出现的弹幕',
                    color: '#ff00ff',
                    time: 3
                }]
			}
		},
		computed:{
			currentString(){
				return formatSeconds(this.currentTime)
			},
			trueVideo(){
				return this.mySrc !== '' && this.videoId !== '' && Object.keys(this.allId).length !== 0
			}
		},
		props: {
			mySrc:{
				type: String,
				default:''
			},
			myPoster:{
				type: String,
				default:''
			},
			allId: {
				type: Object,
				default: () => {},
				/* {
					courseId : 
					videoId : 
					chapterId : 
				} */
			}
		},
		methods:{
			timecontrol({detail}){
				this.currentTime = detail.currentTime
			},
			updateLearnTime(){
				if(this.trueVideo){
					const data = {
						lastLearnTime: this.currentString,
						periodId: parseInt(this.allId.videoId),
						courseId: parseInt(this.allId.courseId),
						chapterId: parseInt(this.allId.chapterId),
					}
					const url = this.allId.isStudy 
									? `/last/detail/updateAlreadyLearnTime${queryParams(data,true)}` 
									: `/last/detail/updateLearnTime${queryParams(data,true)}`
					this.$request({ 
					   url,
					   method: 'POST',	   
					})
				}
			},
			// 快进 设置
			// #ifndef APP-PLUS
				// videoclick(){
				// 	this.controlShow = !this.controlShow
				// },
				showSwitchRate(rate) {
					let that = this;
					that.rateShow = true;
				},
				switchRate(e) {
					let that = this;
					let rate = Number(e.currentTarget.dataset.rate);
					that.currentRate = rate;
					that.rateShow = false;
					console.log(rate)
					this.videoContext.playbackRate(rate);
				},
			// #endif
			// #ifdef APP-PLUS
				showSubNvue() {
					const subNvue=uni.getSubNVueById('Fast_forward');
					subNvue.show('slide-in-right',200);
					uni.$on('Fast_forward_rate', (data) => {
						this.currentRate = data;
					})  
				},
			// #endif
		},
		mounted() {
			this.videoContext = uni.createVideoContext('myVideo',this);		    
		},
		destroyed() {
			this.updateLearnTime()
		}
	}
</script>

<style>
	@import url("myVideo.css");
</style>
