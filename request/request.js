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
	const baseUrl = "http://yapi.demo.qunar.com/mock/31070"; //测试环境

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
				resolve(res)
			},
			fail:(err) => {
				reject(err)
			} 
		})
	})
}