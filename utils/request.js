export const request = (params) => {
	/*
	* showLoading loading遮罩层 
	* url:'/my/...' 表示请求头携带token
	* 其他参数参考uni.request
	*/
	let header = {...params.header};
	// console.log(params.url);
	if(params.url.includes("/my/")){
		header["Authorization"] = uni.getStorageSync("token");
		params.url = params.url.substr(3,);
	}
	// 个人服务器上的模拟接口
	const baseUrl = "http://47.101.132.224:9000/mock/11"; 
	// 测试接口
	const testUrl = "" ;
	// 正式接口
	const formalUrl = "" ;

	if (params.showLoading){
	 	uni.showLoading({
	 		title: '加载中',
	 		mask: true
	 	})
	 }
	return new Promise((resolve,reject) => {
		uni.request({
			...params,
			header:header,
			url:baseUrl + params.url,
			success:(res) => {
				console.log(res.data); 
				resolve(res);
			},
			fail:(err) => {
				reject(err)
			} 
		})
	})
}