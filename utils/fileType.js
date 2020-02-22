 /*
 *	app端图片路径转base64
 *	@param path 图片路径
 *  return Promise
 * */
 export const appBase64 = path => {  
			      return new Promise((resolve, reject) => {  
			        plus.zip.compressImage({  
			          src: path,  
			          dst: `_doc/temp/${+new Date()}.jpg`,  
			          quality: 70,  
			        },  
			        ({ target, size }) => {  
			          plus.io.resolveLocalFileSystemURL(target, (file) => {  
			            const fileReader = new plus.io.FileReader();  
			            fileReader.readAsDataURL(file);  
			            fileReader.onloadend = ({ target: { result } }) => {  
			              resolve(result);  
			            };  
			          });  
			        },  
			        (e) => {  
			          reject(e);  
			        });  
			      });  
			    };
 /*
 *	小程序端图片路径转base64
 *	@param path 图片路径
 *  return Promise
 * */
 export const wxBase64 = path => {
				  return new Promise((resolve, reject) => {
					  // uni.request({ //真机上失效
					  //      url:path,
					  //      responseType: 'arraybuffer', 
					  //      success: res => {
					  //            let base64 = wx.arrayBufferToBase64(res.data); 
					  //            base64　= 'data:image/png;base64,' + base64　
					  //            resolve(base64); 
					  //          },
					  //        fail: err => {
					  // 	        reject(err); 
					  //          }
					  //    })
					  uni.getFileSystemManager().readFile({
					      filePath: path, 
					      encoding: 'base64',
					      success: res => { 
					          let base64 = 'data:image/jpeg;base64,' + res.data;
					          resolve(base64); 
					      },
						  fail: err => {
						  	 reject(err); 
						  }
					  })
				  })
			}
				
	