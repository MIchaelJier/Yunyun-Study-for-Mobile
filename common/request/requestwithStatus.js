import { request } from './index.js'

export const requestwithStatus = (params) => {
	return new Promise((resolve,reject) => {
		request(params).then(res => {
			if(res.data.status){
				resolve(res.data)
			}else{
				reject(res.data.msg)
			}
		})
	})
}