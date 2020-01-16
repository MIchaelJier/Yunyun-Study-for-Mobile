<script>
	export default {
		onLaunch: function() {
			this.$store.commit('getUserInfo')
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

		padding-bottom: var(--window-bottom);
		/*刘海屏*/
		/* #ifdef APP-PLUS */
		padding-top:var(--status-bar-height)
		/* #endif */
	} 
	
</style>
