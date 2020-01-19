<script>
	export default {
		onLaunch: function() {
			this.$store.commit('getUserInfo');
			if(this.$store.getters.IsLogin){
				this.$request({
				   url: '/getCart',
				   method: 'GET',
				  }).then(res => {
						if(res.data.status === '200'){
							let list = res.data.data.list;
							list.forEach(item => {
								item.checked = false;
								item.list.forEach(course => {
									course.checked = false;
								})
							});
							this.$store.commit('changeCartList',list);
							this.$store.commit('changeCartflag',true);
						}
				})
			};
		},
		// onShow: function() {
		// 	this.$store.commit('getUserInfo')
		// },
		onHide: function() {
			console.log('同步')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./style/uxIcon.css");
	.page {
		width: 100%;
		height: 100%;
		background: #f7f7f7;
		position: absolute;
		font-family: "微软雅黑", Helvetica Neue,Helvetica,Arial,Sans-serif;

		/*iphone全面屏底部适配*/
	    padding-bottom: calc( constant(safe-area-inset-bottom));
		padding-bottom: calc(env(safe-area-inset-bottom));
		/*刘海屏*/
		/* #ifdef APP-PLUS */
		padding-top:var(--status-bar-height)
		/* #endif */
	} 
	.xBottom {
		/*iphone全面屏底部适配*/
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
</style>
