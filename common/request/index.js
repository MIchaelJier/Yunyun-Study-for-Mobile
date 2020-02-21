/**
 * 请求封装
 * @param {Boolean} showLoading  loading遮罩层 
 * @param {Boolean} isFile      是否上传文件
 * @param {string}  url          '/test/...'表示请求头携带token
 * @param 其他参数参考 uni.request 和 uni.uploadFile
 * return Promise
 */
export const request = (params) => {
   // 个人服务器上的模拟接口
   const mockUrl = "http://47.101.132.224:9000/mock/11"; 
   // 测试接口
   const testUrl = "https://zfroot.top:8081/yun" ;
   // 正式接口
   const formalUrl = "" ;
   
   let header = {...params.header},
	   baseUrl = mockUrl;
	   
	// console.log(params.url);
	if(params.url.includes("/test/")){
		header["Authorization"] = uni.getStorageSync("token");
		params.url = params.url.substr(5,);
		baseUrl = testUrl;
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
			url:baseUrl + params.url,
			success:(res) => {
				params.showLoading ? uni.hideLoading() : '' ;
				console.log(res.data); 
				resolve(res);
			},
			fail:(err) => {
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