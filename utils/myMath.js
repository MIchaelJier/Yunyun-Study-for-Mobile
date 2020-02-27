/* 
* 强制保留2位小数，不足补 0 
*/
	export const toDecimal = x => {    
			        let f = parseFloat(x);    
			        if (isNaN(f)) {    
			            return false;    
			        }    
			        f = Math.round(x*100)/100;
					let s = f.toString(),
						rs = s.indexOf('.');    
			        if (rs < 0) {    
			            rs = s.length;    
			            s += '.';    
			        }    
			        while (s.length <= rs + 2) {    
			            s += '0';    
			        }    
			        return s;    
			    }
/* 
* 遍历数组 返回第一个值为true的index
*/
	export const condition = arr => {
		for(let i = 0 ; i < arr.length ; i++ ){
			if(arr[i]) return i+1;
		}
		return 0;
	}
/**
   * 对象转url参数
   * @param {*} data
   * @param {*} isPrefix
   */
 export const queryParams = (data, isPrefix = false) => {
	   isPrefix = isPrefix ? isPrefix : false
       let prefix = isPrefix ? '?' : ''
       let _result = []
       for (let key in data) {
         let value = data[key]
         // 去掉为空的参数
         if (['', undefined, null].includes(value)) {
           continue
         }
         if (value.constructor === Array) {
           value.forEach(_value => {
             _result.push(encodeURIComponent(key) + '[]=' + encodeURIComponent(_value))
           })
         } else {
           _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
         }
       }
       return _result.length ? prefix + _result.join('&') : ''
    }
