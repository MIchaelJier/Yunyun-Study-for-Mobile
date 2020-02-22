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
   // 本地转发层接口
   const localUrl = "http://localhost:3333/yun"
   // 正式接口
   const formalUrl = "" ;
   
   let header = {...params.header},
	   baseUrl = mockUrl;
	   
	// console.log(params.url);
	//
	if(params.url.search(/test|loco/g) > 0){
		header["Authorization"] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsieXVuLWNsaWVudCJdLCJ1c2VyX25hbWUiOiIxODg1ODQ4Njk1OSIsIm5pY2tOYW1lIjoiTWljaGFlbCIsInNjb3BlIjpbImFsbCJdLCJ1c2VyTm8iOjEyMzA0OTc1NjcyNDMxMTI0NDgsInVzZXJBdmF0YXJVcmwiOiJodHRwczovL2ZpbGUuemZyb290LnRvcC9pbWFnZS91c2VyLzEyMzA0OTc1NjcyNDMxMTI0NDguanBnIiwiZXhwIjoxNTgyMzkxMTU2LCJ1c2VyTmFtZSI6IjE4ODU4NDg2OTU5IiwiYXV0aG9yaXRpZXMiOlsi5pmu6YCa55So5oi3Il0sImp0aSI6ImIwMmU2ZGY4LWIzNjQtNDIwYS04YmRhLTY4MDE3NTcxZDVmMCIsImNsaWVudF9pZCI6Inl1bi1jbGllbnQifQ.UbGVOwx92MwuzaNpb29GoOhFKuCqClgx2CgCUAYNu3CUySPF7jN0h1svedw-Tap36pH_XxuXlmU0zT7nnGUffKwbizPNkIF8vUVqRQshhj4-w_jwWSPkh-O6qfTm_CitgDJMjEoLs4-7Nu5eim7l2tk_TRU6R1Wg31bFIadbuykeq2yQ0OWKqpR--OWogCXMnryokl_4BT3JATORU3W6fOu31cCzGg7O16fJfbPBM4CKL_Zr-2O2xPKqPE7G7_IwQzRS6OYqSVYFdKCzgsXlFQXvZndcug5JJkx-UBNEqXUw9EFOwwdgZ_iZe7jPGf1yJub3wr1_3X3UdEt_EnBKUQ'
		//`Bearer ${uni.getStorageSync("token")}`;
		if(params.url.includes("/test/"))	baseUrl = testUrl;
		if(params.url.includes("/loco/"))	baseUrl = localUrl;
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