import store from '@/store' 
import { signout } from '../signOut.js'
/**
 * 请求封装
 * @param {Boolean} isCheckToken  是否判断token并退出登录 
 * @param {Boolean} params.showLoading  loading遮罩层 
 * @param {Boolean} params.isFile      是否上传文件
 * @param {string}  params.url          "/test/..."表示请求头携带token
 * @param params.其他参数参考 uni.request 和 uni.uploadFile
 * return Promise
 */
export const request = (params, isCheckToken = true) => {
   // 个人服务器上的模拟接口
   const mockUrl = "https://www.yingjiechen.cn/yun-mock/mock/11"; 
   // 测试接口
   const testUrl = "https://zfroot.top:8081/yun" ;
   // 本地转发层接口
   const localUrl = "http://192.168.0.170:3333/yun"
   // const localUrl = "https://www.yingjiechen.cn/yun-api/yun/"
   // 正式接口
   const formalUrl = "https://www.yingjiechen.cn/yun-api/yun" ;
   
   let header = {...params.header},
	   baseUrl = mockUrl;
	   
	// console.log(params.url);
	//
	if(params.url.search(/test|loco|last/g) > 0){
		if(store.getters['common/IsLogin']) {
			header["Authorization"] = `Bearer ${store.getters['common/allInfo'].token}`;
		}
		if(params.url.includes("/test/"))	baseUrl = testUrl;
		if(params.url.includes("/loco/"))	baseUrl = localUrl;
		if(params.url.includes("/last/"))	baseUrl = formalUrl;
		params.url = params.url.substr(5,);
	}
	// params.showLoading = true
	if (params.showLoading){
	 	uni.showLoading({
	 		title: '加载中',
	 		mask: true
	 	})
	 }
	 
	return new Promise((resolve,reject) => {
		const sendParams= {
			...params,
			header,
			url:baseUrl + params.url,
			success:(res) => {
				params.showLoading ? uni.hideLoading() : '' ;
				if(res.data.errmsg === 'Error: Request failed with status code 401' && isCheckToken){
					signout();
					uni.showToast({
						title:'登录失效',
						icon:'none',
						duration:500
					})
					uni.navigateTo({
						url:'/pages/chooseLogin/chooseLogin'
					})
				}
				console.log(res.data); 
				resolve(res);
			},
			fail:(err) => {
				params.showLoading ? uni.hideLoading() : '' ;
				uni.showToast({
					title:'请求错误',
					icon:'none',
					duration:500
				})
				reject(err)
			} 
		}
		
		if(params.isFile){
			uni.uploadFile(sendParams)
		}else{
			uni.request(sendParams)
		}
	})
}