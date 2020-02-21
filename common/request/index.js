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
	//
	if(params.url.includes("/test/")){
		header["Authorization"] = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJxcSI6bnVsbCwidXNlcl9uYW1lIjoiMTg4NTg0ODY5NTkiLCJuaWNrTmFtZSI6IuWCqOW3suWJjSIsInVzZXJObyI6MTIzMDQ5NzU2NzI0MzExMjQ0OCwic2V4IjpudWxsLCJtb2JpbGUiOm51bGwsIndlY2hhdCI6bnVsbCwidXNlck5hbWUiOiIxODg1ODQ4Njk1OSIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiLmma7pgJrnlKjmiLcifV0sImNsaWVudF9pZCI6Inl1bi1jbGllbnQiLCJ1c2VyX2F2YXRhcl91cmwiOiIiLCJhY3R1YWxOYW1lIjpudWxsLCJhdWQiOlsieXVuLWNsaWVudCJdLCJzY29wZSI6WyJhbGwiXSwiZXhwIjoxNTgyMzIxMjIxLCJqdGkiOiIxOGI3ZDU5My0wYjdmLTQ1M2EtYjk3NS1lMWUyMjY3NjVkZTEiLCJpbnRyb2R1Y3Rpb24iOm51bGwsImVtYWlsIjpudWxsfQ.LqTihj87wPGBlMW0vMboyqyAgZ10DjWEj7yq_XuRVp4lKRttzkYNUBiQszhOJeydmdYRIZwlp7qkDm0dHfEbwyKpuHJGSdUsVgrmVI8BM6csgSn2LF5ab-xKohIP9VjwGnHv_hhmutvjt1m32UcBxkgyw1cTP4p9-MgVfuqGtOwEzUqL_WV0pLFCcX5wiH4QI3M7t7yGsLrcfPez0WLlfi-tbmvyqgSSm8QveSJhPDQgq9L1xBgG12B-I39V1pmoGxeAg-U-u4e9klHQRP6iDfrTiDAxTmFWO_RDFfiOIwTqxp2icZAihmMa7aIiXDTXdWd7flDIVS_rUdfRGS_6mA'; 
		//uni.getStorageSync("token");
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