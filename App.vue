
<script>
	import pageAnimation from './components/page-animation'
	export default {
		mixins: [pageAnimation],
		onLaunch: function() {
			this.$store.commit('common/getUserInfo');
			if(this.$store.getters['common/IsLogin']){
				this.$store.dispatch('cart/request_cart');
			};
		},
		// onShow: function() {
		// 	this.$store.commit('getUserInfo')
		// },
		// onHide: function() {
		// 	console.log('同步');
		// }
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./style/uxIcon.css");
	.page {
		width: 100%;
		min-height: 100%;
		background: #f7f7f7;
		position: absolute;
		font-family: "微软雅黑", Helvetica Neue,Helvetica,Arial,Sans-serif;
		/*刘海屏*/
		/* #ifdef APP-PLUS */
		padding-top:var(--status-bar-height)
		/* #endif */
	} 
	.xBottom {
		/*iphone全面屏底部适配*/
		padding-bottom: constant(safe-area-inset-bottom) !important;
		padding-bottom: env(safe-area-inset-bottom) !important;
	}
	.bottomFixed {
		position: fixed;
		bottom: 0;
	}
	
</style>
