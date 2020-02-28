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
/*
 *	获取base64字节流的图片的大小
 *	@param {String} base64url 图片的Base64编码
 * 	return Number 单位:KB
 * */			
 export const getImgSize = base64url => {
					//获取base64图片大小，返回KB数字
					let noheadStr = base64url.replace('data:image/jpeg;base64,', '');
					
					let strLength = noheadStr.length;
					let fileLength = parseInt(strLength - (strLength / 8) * 2);
					// 由字节转换为KB
					let size = "";
					size = (fileLength / 1024).toFixed(2);
					return parseInt(size);
				}