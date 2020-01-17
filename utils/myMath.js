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