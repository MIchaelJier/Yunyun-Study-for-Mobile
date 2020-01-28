<script>
	import './index.css'
	import { pageIndexSetting } from './setting.js'
	export default {
		// #ifdef H5
		data() {
			return {
				before:'',
				afterstart:'',
			};
		},
		onLaunch: function() {
			this.equipSetting();
			this.show()
			this.$router.beforeEach((toPage, fromPage, next) => {
				const type = toPage.meta.pageIndex >= fromPage.meta.pageIndex
				this.before =  type ? 'animation-before' : 'animation-before2';
				this.afterstart =  type ? 'animation-afterstart' : 'animation-afterstart2';
				this.hide(next);
			})
			this.$router.afterEach(() => {
				setTimeout(this.show, 50)
			});
		},
		methods: {
			equipSetting(){
				this.$router.options.routes.forEach((item,index) => {
					pageIndexSetting.forEach(page => {
						page.path === item.meta.pagePath  
							? item.meta.pageIndex = page.index 
							: ''
					})
				});
			},
			hide(callback) {
				const classList = document.querySelector('uni-page').classList
				classList.add(this.before,'animation-leave')
				classList.remove('animation-show')
				setTimeout(() => {
					classList.remove(this.before, 'animation-leave')
					callback && callback();
				}, 300);
			},
			show() {
				const classList = document.querySelector('uni-page').classList
				classList.add(this.afterstart,'animation-before')
				setTimeout(() => {
					classList.add('animation-enter', 'animation-after', 'animation-show')
					setTimeout(() => {
						classList.remove('animation-before', 'animation-after', 'animation-enter',this.afterstart)
					}, 300)
				}, 20);
			},
		},
		
		// #endif
	}
</script>
