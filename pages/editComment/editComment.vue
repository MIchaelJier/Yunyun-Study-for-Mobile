<template>
	<view>
		<view class="page">
			 <comment-box 
				:headPicValue="userInfo.haedImage"
				textareaPlaceholder="请尽可能详尽描述你的学习经历，例如学习成果、课程内容、讲师风格、教学服务等。"
				headTitleValue="课程评分"
				:infoReceive="infoReceive"
				@submit="submit"
			 ></comment-box> 
		</view>
	</view>
</template>

<script>
	import { queryParams } from "@/utils/myMath.js"
	import commentBox from './commentBox.vue'
	export default {
		data() {
			return {
				id: '',
				userInfo:{},
				infoReceive:{
					score:0,
					textareaValue:"",
				}
			}
		},
		computed:{
			isLogin(){
				return this.$store.getters['common/IsLogin']
			}
		},
		components: { commentBox },
		methods: {
			submit(infoReceive){
				if(!this.isLogin){
					this.toast('未登录')
				}else if(infoReceive.score == 0 || infoReceive.textareaValue === ''){
					this.toast('评分和评价不能为空')
				}else{
					this.$request({
					   url: `/loco/detail/addComment${queryParams({
						   courseId: this.id,
						   evaluationContent: infoReceive.textareaValue,
						   evaluationRank: infoReceive.score
					   },true)}`,
					   method: 'POST',
					   showLoading: true
					  }).then(res => {
						  let title = ''
						  title = res.data.status ? '发布成功' : res.data.msg
						  this.toast(title)
					 });
				}
			},
			toast(title){
				uni.showToast({
				    title,
					icon: 'none',
					mask: true,
					duration: 500
				});
			}
		},
		onLoad(options) {
			this.id = options.id;
			if(this.isLogin){
				this.userInfo = this.$store.getters['common/basicInfo'];
				this.$request({
				   url: '/loco/detail/getUserComment',
				   method: 'GET',
				   data:{
					   courseId:options.id
				   },
				   showLoading: true
				  }).then(res => {
					    const data = res.data.data;
						if(res.data.status && data !== ''){
							this.infoReceive.score = data.evaluationRank;
							this.infoReceive.textareaValue = data.evaluationContent;
						}
				 });
			}
		},
	}
</script>

<style>

</style>
