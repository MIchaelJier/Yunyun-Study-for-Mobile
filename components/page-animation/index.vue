<script>
	import './index.css'
	import { pageIndexSetting } from './setting.js'
	export default {
		// #ifdef H5
		data() {
			return {
				before:'',
				afterstart:'',
				isBack:false,
			};
		},
		onLaunch: function() {
			// 监听浏览器返回按钮
			window.addEventListener("popstate", (e) => { 
				this.isBack = true;
			}, false); 
			this.equipSetting();
			this.show()
			this.$router.beforeEach((toPage, fromPage, next) => {
				let type = toPage.meta.pageIndex >= fromPage.meta.pageIndex;
				this.before =  type ? 'animation-before' : 'animation-before2';
				this.afterstart =  type ? 'animation-afterstart' : 'animation-afterstart2';
				setTimeout(this.hide(next));
			})
			this.$router.afterEach(() => {
				this.isBack = false
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
				setTimeout(() => {
					this.before = this.isBack ? 'animation-before2' : this.before;
					this.afterstart = this.isBack ? 'animation-afterstart2' : this.afterstart;
					
					const classList = document.querySelector('uni-page').classList
					classList.add(this.before,'animation-leave')
					classList.remove('animation-show')
					setTimeout(() => {
						classList.remove(this.before, 'animation-leave')
						callback && callback();
					}, 300);
				},20)
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
